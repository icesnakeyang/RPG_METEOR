import {check} from "meteor/check";
import {rpgJobsLog_dba} from "../../data_adapter/jobs/rpgJobsLog_dba";

export const rpgJobsLog_service = {
    totalLog: function (jobId) {
        check(jobId, String);
        const cc = rpgJobsLog_dba.totalLog(jobId);
        return cc;
    },

    newLog: function (data) {
        check(data.userId, String);
        check(data.jobId, String);
        const cc = rpgJobsLog_dba.newLog(data);
        return cc;
    },

    setReadTime:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        rpgJobsLog_dba.setReadTime(data);
    },

    loadLogsByJobId: function (data) {
        check(data.jobId, String);
        const logs = rpgJobsLog_dba.loadLogsByJobId(data);
        return logs;
    },

    createNewLog:function (data) {
        check(data.jobId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        rpgJobsLog_dba.createNewLog(data);
    }
};