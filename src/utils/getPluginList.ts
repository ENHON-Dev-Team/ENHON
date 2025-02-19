import { IPlugin } from '../types/Plugin';

export default async (): Promise<Map<string, IPlugin>> => {
  return await Enhon.getPluginList();
};