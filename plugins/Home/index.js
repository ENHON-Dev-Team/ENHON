const thisPlugin = new window.EnhonAPI.plugin.EnhonPlugin('Home');

thisPlugin.onload(async () => {
  const devModeSwitch = document.querySelector('#devMode');
  const config = await Enhon.getConfig('Home', { devMode: false });
  devModeSwitch.checked = config.devMode;

  devModeSwitch.addEventListener('change', (e) => {
    Enhon.setConfig('Home', { devMode: e.target.checked });
    Enhon.devMode(e.target.checked);
  });

});