import { ipcMain } from 'electron';
import { app } from 'electron';
import os from 'os';

export default function registerIpc() {
    ipcMain.handle('get-app-path', () => {
        return app.getAppPath();
    });
    
    ipcMain.handle('get-os-type', () => {
        return os.type();
    });
    
    ipcMain.handle('get-os-platform', () => {
        return os.platform();
    });
}

