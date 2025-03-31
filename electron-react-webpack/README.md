# Electron

## 项目扩展

在前面 [react-webpack](../react-webpack) 项目的基础上，进入项目根目录：

```bash
npm install -D electron electron-is-dev concurrently wait-on
```

项目根目录创建 `main.js` 内容如下：

```js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:3000'); // 开发模式加载 Webpack Dev Server
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html')); // 生产模式加载构建后的文件
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

修改 `package.json` 的 "scripts" 部分，添加：

```json
"scripts": {
  "start": "webpack-dev-server --mode development",
  "build": "webpack --mode production",
  "electron": "electron .",
  "dev": "concurrently \"npm start\" \"wait-on http://localhost:3000 && electron .\""
}
```

然后修改 "main" 字段为：

```json
"main": "main.js",
```

继续打开 `webpack.config.js` 文件，在 "entry" 字段下面添加内容：

```js
  target: 'electron-renderer',
```

然后用：

```bash
npm run dev
```

开始调试
