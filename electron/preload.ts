import { ipcRenderer, contextBridge } from 'electron';
import { IPlugin } from '../src/types/Plugin';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('Enhon', {
  getPluginList: (): Promise<Map<string, IPlugin>> => ipcRenderer.invoke('Enhon.getPluginList'),
  getPluginPath: (pluginId: string): Promise<string> => ipcRenderer.invoke('Enhon.getPluginPath', pluginId),
  getSystemColour: (): Promise<string> => ipcRenderer.invoke('Enhon.getSystemColour'),
  getConfig: <T>(id: string, defaultConfig?: T): Promise<T> => ipcRenderer.invoke('Enhon.getConfig', id, defaultConfig),
  setConfig: <T>(id: string, config: T) => ipcRenderer.send('Enhon.setConfig', id, config),
});
