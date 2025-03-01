/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}

declare namespace Enhon {
  const getPluginList: () => Promise<Map<string, import('../src/types/Plugin').IPlugin>>;
  const getPluginPath: (pluginId: string) => Promise<string>;
  const getSystemColour: () => Promise<string>;
  const getConfig: <T>(id: string, defaultConfig?: T) => Promise<T>;
  const getParsedPath: (...args: string[]) => Promise<string>;
  const setConfig: <T>(id: string, config: T) => void;
  const devMode: (status: boolean) => void;
}
