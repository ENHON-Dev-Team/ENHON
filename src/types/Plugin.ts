export interface IPluginAuthors {
  /**
   * 插件作者
   */
  name: string;

  /**
   * 插件作者主页
   */
  link: string;
};

export interface IPlugin {
  /**
   * 插件名
   */
  name: string;

  /**
   * 插件ID
   */
  id: string;

  /**
   * 插件描述
   */
  description?: string;

  /**
   * 插件版本名
   */
  versionName: string;

  /**
   * 插件版本号
   */
  versionCode: number;

  /**
   * 插件作者们的信息
   */
  authors: IPluginAuthors[];

  /**
   * 插件图标
   *
   * 可传入Material Icon图标名，也可传入一个指向图片文件的相对路径。若传入文件为svg，则该svg大小应为24*24
   */
  icon: string;

  /**
   * 插件入口文件，仅支持js文件
   */
  entry: string;

  /**
   * 插件的入口HTML
   */
  page: string;
};