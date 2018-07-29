import {check} from "meteor/check";
import {ActLog} from "../../../data";

export const rpgActLog_dba = {
    createActLog: function (data) {
        check(data.userId, String);
        check(data.action, String);
        Meteor.call('ActLog.insertLog', (data));
    },

    loadActLogs: function (data) {
        check(data.start, Number);
        check(data.limit, Number);
        const logs = ActLog.find({},
            {
                sort: {
                    createdTime: -1
                },
                skip: data.start,
                limit: data.limit
            }).fetch();
        return logs;
    }
};