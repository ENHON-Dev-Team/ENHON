<script lang="ts">
import { defineComponent } from 'vue';
import 'mdui';
import { setColorScheme, type NavigationRailItem } from 'mdui';
import './api/index';
import registerPage from './utils/registerPage';
import inject from './utils/inject';

export default defineComponent({
  async mounted(){
    setColorScheme(await Enhon.getSystemColour());
    const pluginList = await Enhon.getPluginList();

    inject(pluginList);
    registerPage(pluginList);
    customElements.whenDefined('mdui-navigation-rail-item').then(() => {
      (document.querySelector('mdui-navigation-rail-item[value=Home]')! as NavigationRailItem).click();
    });
  },
});
</script>

<template>
  <mdui-navigation-rail id="navigation"></mdui-navigation-rail>

  <div id="pluginPage"></div>
</template>
