<script lang="ts">
import { ipcRenderer } from 'electron';
import { defineComponent } from 'vue';
import 'mdui';
import { setColorScheme, type NavigationRailItem } from 'mdui';
import './api/index';
import registerPage from './utils/registerPage';
import inject from './utils/inject';

export default defineComponent({
  created(){
    ipcRenderer.send('ready-to-show');
  },
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

<style>
.introduction {
  color: rgb(var(--mdui-color-on-surface-variant));
  display: block;
  opacity: 1;
  word-break: normal;
  white-space: pre-warp;
  word-wrap: break-word;
  transition: opacity var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);
  font-size: var(--mdui-typescale-body-small-size);
  font-weight: var(--mdui-typescale-body-small-weight);
  letter-spacing: var(--mdui-typescale-body-small-tracking);
  line-height: var(--mdui-typescale-body-small-line-height);
}
</style>
