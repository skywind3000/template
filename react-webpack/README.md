## react-webpack

新建一个空目录，然后进去初始化项目：

```bash
npm init -y
npm install react react-dom
npm install -D webpack webpack-dev-server webpack-cli
npm install -D babel-loader @babel/preset-env @babel/preset-react html-webpack-plugin
```

在项目根目录新建 `.babelrc` 文件：

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

以及 `webpack.config.js` 文件：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    port: 3000
  }
};
```

在项目根目录新建 `public` 和 `src` 两个目录，并编辑 `public/index.html` 文件：

```html
<html>
    <head>
		<title>My Demo</title>
    </head>
    <body>
        <div id="root">
        </div>
    </body>
</html>
```

在 `package.json` 中添加命令：

```json
"scripts": {
  "start": "webpack-dev-server --mode development",
  "build": "webpack --mode production"
}
```

创建 `src/index.js` 内容如下：

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

再创建 `src/App.js` 内容如下：

```js
import React from 'react';

export default function App() {
  return <h1>Hello, World!</h1>;
}
```

项目开启：

```bash
npm start
```

即可。

## 路径矫正

注意上面的 boilerplate 生成的 `dist/index.html` 中代码如下：

```html
<html>
	<head>
		<title>My Demo</title>
		<script defer="defer" src="/bundle.js"></script>
	</head>
	<body>
		<div id="root"></div>
	</body>
</html>
```

其加载的脚本路径是 `/bundle.js` ，那么发布到一些非根路径的地方进行访问会找不到这个文件，如果把它改为相对路径 `./bundle.js` 的话可以解决问题。

做法是修改 `webpack.config.js` 里面将 `output` 下面的 `publicPath` 值由 "/" 改成 "./"

```js
    publicPath: '/'
```

但是这样有一个问题是开发模式下，用 `npm start` 进行调试会出错，因此有个自动化的该法，判断现在是打包还是开发模式，打包的话用 "./" 而开发的话用 "/" 即可：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: isProduction ? './' : '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ],
    devServer: {
      port: 3000
    }
  };
}
```

就行了，如果不使用 router，那么 "./" 就是比方便的部署方式，如果使用 router 的话，需要把 "./" 改成对应的发布后的绝对路径，比如 "/my-app1/" 之类的避免路径问题。
