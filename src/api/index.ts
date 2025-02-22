import * as mdui from './mdui/mdui';
import { EnhonPlugin } from './plugin/plugin';

Object.defineProperty(window, 'EnhonAPI', {
  value: {
    mdui,
    plugin: {
      EnhonPlugin,
    },
  },
  writable: true,
});