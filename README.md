# 自动复读插件 for KiviBot

[![npm-version](https://img.shields.io/npm/v/kivibot-plugin-auto-repeat?color=527dec&label=kivibot-plugin-auto-repeat&style=flat-square)](https://npm.im/kivibot-plugin-auto-repeat)
[![dm](https://shields.io/npm/dm/kivibot-plugin-auto-repeat?style=flat-square)](https://npm.im/kivibot-plugin-auto-repeat)

[`KiviBot`](https://beta.kivibot.com) 的 qq 群聊自动复读插件，快来一起~~快乐+1~~

**安装**

```shell
/plugin add auto-repeat
```

**启用**

```shell
/plugin on auto-repeat
```

**使用**
tips: 本插件指令前缀默认为空(可设置，但感觉没啥必要)

```shell
  1. 开启复读 : 开启本群复读功能
  2. 关闭复读 : 关闭本群复读功能
  3. 开启全群复读 : 开启所有群聊复读功能
  4. 关闭全群复读 : 关闭所有群聊复读功能
  5. 复读触发数 <触发数> : 修改最小触发数
  6. 复读指令前缀 <前缀> : 修改本插件的指令前缀
```

**默认配置**

-   插件配置

```typescript
//对于插件整体，有如下默认配置
PluginConfig: {
    // 指令前缀(默认无)
    cmdPrefix: "",
    // 默认全群启用
    enableAll: false,
    // 启用群聊
    enableGroups: [],
    // 默认最小三次触发复读
    triggerCount: 3
},
```

**TODO**

暂无

**更新日志**

-   1.0.0
    -   第一版

