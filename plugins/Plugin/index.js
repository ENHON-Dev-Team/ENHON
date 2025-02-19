const broadcastChannal = new BroadcastChannel('Enhon.plugins.Plugin');

broadcastChannal.onmessage = async e => {
  if(e.data == 'load'){
    const pluginList = await Enhon.getPluginList();
    const div = document.querySelector('#plugins');

    pluginList.forEach(plugin => {
      const card = document.querySelector('#card').content.cloneNode(true);
      const isPluginIconIsFile = plugin.icon.includes('.') ? true : false;

      const authors = [];
      plugin.authors.forEach(author => {
        authors.push(`<a href=${author.link}>${author.name}</a>`);
      });

      if(isPluginIconIsFile) card.querySelector('#pluginIcon').src = `${Enhon.getPluginPath(plugin.id)}/${plugin.icon}`;
      else card.querySelector('#pluginIcon').icon = plugin.icon;

      card.querySelector('#pluginName').textContent = plugin.name;
      card.querySelector('#pluginAuthors').innerHTML = authors.join(' | ');
      card.querySelector('#pluginDesc').textContent = plugin.description;
      card.querySelector('#pluginVersion').textContent = plugin.versionName;
      card.querySelector('#pluginSettings').onclick = () => console.log(`${plugin.id} settings`);

      div.append(card);
    });
  }
};