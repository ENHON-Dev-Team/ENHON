# 插件开发

> [!CAUTION]
> 应用处于早期开发版本，提供的任何用于插件开发的API可能随时改变！

这是插件开发的简易教程和开发文档。

## 1. 配置插件

插件需要通过`plugin.json`配置基础信息。

`plugin.json`的内容应如下：

```json
{
  "$schema": "https://raw.githubusercontent.com/ENHON-Dev-Team/ENHON/refs/heads/main/plugin.schema.json", // 官方schema支持
  "name": "插件", // 插件名
  "id": "Plugin", // 插件id，用于内部识别
  "description": "官方插件管理页", // 插件描述
  "versionName": "1.0.0", // 插件版本名，用于对用户显示
  "versionCode": 1, // 插件版本号，用于内部检查更新
  "authors": [ // 接受多个作者，但至少有一个
    {
      "name": "ENHON Dev Team", // 插件作者名
      "link": "https://github.com/ENHON-Dev-Team" // 插件作者主页
    }
  ],
  "icon": "extension", // 插件图标，接受一个Material Icon图标名，或一个指向图片文件的相对路径
  "entry": "index.js", // 插件脚本入口
  "page": "index.html", // 插件主页
  "settingsPage": "settings.html" // 可选。插件设置页
}
```

> [!CAUTION]
> 注意：`plugin.json`应位于插件的根目录

## 2. 插件结构

一个插件一般由3~5个文件构成，其中必须包含：`plugin.json`文件、插件脚本文件和插件主页。

至于图标文件和设置页文件则不是必须，可按需添加。

## 3. 插件脚本编写

在插件脚本中，需要在入口文件先创建一个插件对象，脚本的实现代码应作为一个回调函数传入`onload`。

```javascript
const thisPlugin = new window.EnhonAPI.plugin.EnhonPlugin('Your plugin id');

thisPlugin.onload(() => {
  // your code here...
});
```

由于本应用使用`mdui`UI库，本应用已将其所有内置函数暴露至`window.EnhonAPI`中， 你可以通过`window.EnhonAPI.mdui.具体函数名`调用使用。

类似地，你可以直接在html文件中使用`mdui`提供的组件。

## 4. 调试

考虑到安全因素，目前的插件系统仅考虑操作渲染进程，与主进程的交互仅可通过`ENHON`提供的API进行

但是对于一些问题，仍然需要提供主进程的日志以帮助定位问题，所以该节仍介绍主进程的调试方式

### 渲染进程

通过`ENHON`主页提供的`开发者模式`功能打开`开发者工具`

### 主进程

通过命令行工具打开`ENHON`主程序

## 5. 进程间通信API

### getPluginList

无传入参数，获取一个由<插件id，插件`plugin.json`内容>组成的Map

### getPluginPath

传入插件id，获取该插件的绝对路径

### getSystemColour

无传入参数，获取系统主题色

### getConfig

传入插件id和一个可选的默认返回值，获取插件存储的数据

### getParsedPath

同[`path.join`](https://nodejs.cn/api/path/path_join_paths.html)

### setConfig

传入插件id和要写入的**完整**数据，无返回值