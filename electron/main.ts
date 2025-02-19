import { app, BrowserWindow, ipcMain, screen } from 'electron';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import { IPlugin } from '../src/types/Plugin';

const require = createRequire(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

const exe = path.join(app.getPath('exe'), '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

const pluginRegisterMap: Map<string, string> = new Map();

let win: BrowserWindow | null;

const createWindow = () => {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    autoHideMenuBar: true,
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height,
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  win.webContents.openDevTools();
};

ipcMain.handle('Enhon.getPluginList', () => {
  const pluginMap: Map<string, IPlugin> = new Map();

  pluginRegisterMap.forEach(pluginPath => {
    const pluginJson: IPlugin = require(`${pluginPath}/plugin.json`);
    pluginMap.set(pluginJson.id, pluginJson);
  });

  return pluginMap;
});

ipcMain.handle('Enhon.getPluginPath', (_, pluginId: string): string => {
  return pluginRegisterMap.get(pluginId)!;
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(async () => {
  const pluginList = await fs.readdir(path.join(exe, 'plugins'));

  pluginList.forEach(async plugin => {
    try{
      const pluginJson: IPlugin = await require(path.join(exe, `plugins/${plugin}/plugin.json`));
      pluginRegisterMap.set(pluginJson.id, path.join(exe, `plugins/${plugin}`).toString());
    } catch{
      return;
    }
  });

  createWindow();
});
