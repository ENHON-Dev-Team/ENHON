import type { NavigationRail } from 'mdui';
import { IPlugin } from '../types/Plugin';

export default (pluginList: Map<string, IPlugin>) => {
  const navigationBar = document.querySelector('#navigation') as NavigationRail;

  pluginList.forEach(async plugin => {
    const pluginId = plugin.id;
    const pluginName = plugin.name;
    const pluginIcon = plugin.icon.includes('.') ? await (await fetch(`${Enhon.getPluginPath(pluginId)}/${plugin.icon}`)).text() : plugin.icon;
    const broadcastChannal = new BroadcastChannel(`Enhon.plugins.${pluginId}`);

    const navigationBarItem = document.createElement('mdui-navigation-rail-item');
    navigationBarItem.icon = pluginIcon;
    navigationBarItem.textContent = pluginName;
    navigationBarItem.value = pluginId;
    navigationBarItem.onclick = async () => {
      const pluginHTML = plugin.page;
      const pluginPath = await Enhon.getPluginPath(pluginId);
      const page = await (await fetch(`${pluginPath}/${pluginHTML}`)).text();
      document.querySelector('#pluginPage')!.innerHTML = page;

      broadcastChannal.postMessage('load');
    };

    navigationBar.append(navigationBarItem);
  });
};