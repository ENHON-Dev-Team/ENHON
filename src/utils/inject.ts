import { IPlugin } from '../types/Plugin';

export default (pluginList: Map<string, IPlugin>) => {
  pluginList.forEach(async plugin => {
    const pluginId = plugin.id;

    const pluginPath = await Enhon.getPluginPath(pluginId);
    const pluginScript = plugin.entry;
    await import(`${pluginPath}/${pluginScript}`);
  });
};