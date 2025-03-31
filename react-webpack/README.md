## react-webpack

�½�һ����Ŀ¼��Ȼ���ȥ��ʼ����Ŀ��

```bash
npm init -y
npm install react react-dom
npm install -D webpack webpack-dev-server webpack-cli
npm install -D babel-loader @babel/preset-env @babel/preset-react html-webpack-plugin
```

����Ŀ��Ŀ¼�½� `.babelrc` �ļ���

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

�Լ� `webpack.config.js` �ļ���

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

����Ŀ��Ŀ¼�½� `public` �� `src` ����Ŀ¼�����༭ `public/index.html` �ļ���

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

�� `package.json` ��������

```json
"scripts": {
  "start": "webpack-dev-server --mode development",
  "build": "webpack --mode production"
}
```

���� `src/index.js` �������£�

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

�ٴ��� `src/App.js` �������£�

```js
import React from 'react';

export default function App() {
  return <h1>Hello, World!</h1>;
}
```

��Ŀ������

```bash
npm start
```

���ɡ�

## ·������

ע������� boilerplate ���ɵ� `dist/index.html` �д������£�

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

����صĽű�·���� `/bundle.js` ����ô������һЩ�Ǹ�·���ĵط����з��ʻ��Ҳ�������ļ������������Ϊ���·�� `./bundle.js` �Ļ����Խ�����⡣

�������޸� `webpack.config.js` ���潫 `output` ����� `publicPath` ֵ�� "/" �ĳ� "./"

```js
    publicPath: '/'
```

����������һ�������ǿ���ģʽ�£��� `npm start` ���е��Ի��������и��Զ����ĸ÷����ж������Ǵ�����ǿ���ģʽ������Ļ��� "./" �������Ļ��� "/" ���ɣ�

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

�����ˣ������ʹ�� router����ô "./" ���Ǳȷ���Ĳ���ʽ�����ʹ�� router �Ļ�����Ҫ�� "./" �ĳɶ�Ӧ�ķ�����ľ���·�������� "/my-app1/" ֮��ı���·�����⡣
