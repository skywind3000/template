# Electron

## ��Ŀ��չ

��ǰ�� [react-webpack](../react-webpack) ��Ŀ�Ļ����ϣ�������Ŀ��Ŀ¼��

```bash
npm install -D electron electron-is-dev concurrently wait-on
```

��Ŀ��Ŀ¼���� `main.js` �������£�

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
    win.loadURL('http://localhost:3000'); // ����ģʽ���� Webpack Dev Server
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html')); // ����ģʽ���ع�������ļ�
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

�޸� `package.json` �� "scripts" ���֣���ӣ�

```json
"scripts": {
  "start": "webpack-dev-server --mode development",
  "build": "webpack --mode production",
  "electron": "electron .",
  "dev": "concurrently \"npm start\" \"wait-on http://localhost:3000 && electron .\""
}
```

Ȼ���޸� "main" �ֶ�Ϊ��

```json
"main": "main.js",
```

������ `webpack.config.js` �ļ����� "entry" �ֶ�����������ݣ�

```js
  target: 'electron-renderer',
```

Ȼ���ã�

```bash
npm run dev
```

��ʼ����
