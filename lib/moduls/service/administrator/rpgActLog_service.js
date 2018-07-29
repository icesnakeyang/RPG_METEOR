import {check} from "meteor/check";
import {rpgActLog_dba} from "../../data_adapter/administrator/rpgActLog_dba";

export const rpgActLog_service = {
    createActLog: function (data) {
        check(data.userId, String);
        check(data.action, String);
        rpgActLog_dba.createActLog(data);
    },

    loadActLogs: function (data) {
        if (!data) {
            var data = {};
        }
        if (!data.start) {
            data.start = 0;
        }
        if (!data.limit) {
            data.limit = 200;
        }
        const logs = rpgActLog_dba.loadActLogs(data);
        return logs;
    }
};