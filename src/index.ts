import { KiviPlugin, segment } from "@kivibot/core";
import { compareArrays, validateNumber } from "./utils";
import type { AutoRepeatConfig } from "./types";
//@ts-ignore
const { version } = require("../package.json");
const plugin = new KiviPlugin("auto-repeat", version);

const config: AutoRepeatConfig = {
    // 指令前缀
    cmdPrefix: "",
    // 是否全群启用
    enableAll: false,
    // 启用群聊
    enableGroups: [],
    // 最小触发数
    triggerCount: 3
};

let lastMessages: Record<number, any[]> = {} as any;
let repeatCounts: Record<number, number> = {} as any;

plugin.onMounted((bot, admins) => {
    plugin.saveConfig(Object.assign(config, plugin.loadConfig()));
    // 输出配置信息
    plugin.logger.info(`自动复读插件指令前缀: ${config.cmdPrefix === "" ? "空" : config.cmdPrefix}`);
    plugin.logger.info(`自动复读插件启用范围: ${config.enableAll ? "所有群聊" : "部分群聊"}`);
    plugin.logger.info(`自动复读插件最小触发数: ${config.triggerCount}`);

    // 主逻辑
    plugin.onGroupMessage(e => {
        // 若未开启全群复读则过滤未开启群聊
        if (!config.enableGroups.includes(e.group_id) && !config.enableAll) return;
        const { group_id: gid, message } = e;
        // 若此群聊还没有记录则加入消息数组
        if (!lastMessages[gid]) {
            lastMessages[gid] = message;
            repeatCounts[gid] = 1;
        } else {
            // 若有记录比较消息数组是否相等,image比较的是file名
            if (compareArrays(lastMessages[gid], message)) {
                // 相等则触发次数++
                repeatCounts[gid]++;
                // 若触发次数等于预设次数则复读
                if (repeatCounts[gid] === config.triggerCount) return e.reply(lastMessages[gid]);
            } else {
                // 若不相等则替换上一个消息数组
                lastMessages[gid] = message;
                repeatCounts[gid] = 1;
            }
        }
    });

    // 以下为开关和配置的屎山
    plugin.onAdminCmd(`${config.cmdPrefix}复读指令前缀`, (e, param) => {
        const prefix = param[0];
        if (!prefix || prefix === "") {
            config.cmdPrefix = "";
            plugin.saveConfig(config);
            return e.reply(`已重置复读插件指令前缀,重启插件后生效`, true);
        }
        config.cmdPrefix = prefix;
        plugin.saveConfig(config);
        return e.reply(`已将复读插件指令前缀设置为 ${prefix},重启插件后生效`, true);
    });
    plugin.onAdminCmd(`${config.cmdPrefix}复读触发数`, (e, param) => {
        if (!param[0]) return;
        const num = param[0];
        if (!validateNumber(num)) return e.reply("输入的数字不合法哦，请输入纯数字");
        config.triggerCount = Number(num);
        plugin.saveConfig(config);
        return e.reply(`已将复读最小触发数设置为 ${num}`, true);
    });
    plugin.onAdminCmd(`${config.cmdPrefix}开启复读`, e => {
        if (e.message_type != "group") return e.reply("请在群聊中使用本指令");
        if (config.enableAll) return e.reply("已全群开启复读功能，如需单独设置请使用指令 关闭全群复读 后再进行设置");
        config.enableGroups.push(e.group_id);
        plugin.saveConfig(config);
        return e.reply("本群已开启复读功能", true);
    });
    plugin.onAdminCmd(`${config.cmdPrefix}关闭复读`, e => {
        if (e.message_type != "group") return e.reply("请在群聊中使用本指令");
        if (config.enableAll) return e.reply("已全群开启复读功能，如需单独设置请使用指令 关闭全群复读 后再进行设置");
        if (config.enableGroups.includes(e.group_id)) {
            const idx = config.enableGroups.findIndex(gid => gid === e.group_id);
            config.enableGroups.splice(idx, 1);
            // 重置记录
            if (lastMessages[e.group_id]) {
                delete lastMessages[e.group_id];
                delete repeatCounts[e.group_id];
            }
            plugin.saveConfig(config);
        }
        return e.reply("本群已关闭复读功能", true);
    });
    plugin.onAdminCmd(`${config.cmdPrefix}开启全群复读`, e => {
        config.enableAll = true;
        plugin.saveConfig(config);
        return e.reply("已开启全群复读功能", true);
    });
    plugin.onAdminCmd(`${config.cmdPrefix}关闭全群复读`, e => {
        config.enableAll = false;
        // 重置记录
        lastMessages = {};
        repeatCounts = {};
        plugin.saveConfig(config);
        return e.reply("已关闭全群复读功能", true);
    });
});

export { plugin };

