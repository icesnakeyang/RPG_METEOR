import {check} from "meteor/check";
import {rpgActLog_service} from "../../service/administrator/rpgActLog_service";

export const rpgActLog_uia={
    createActLog: function (data) {
        check(data.userId, String);
        check(data.action, String);
        rpgActLog_service.createActLog(data);
    },

    loadActLogs:function (data) {
        const logs=rpgActLog_service.loadActLogs(data);
        return logs;
    }
};