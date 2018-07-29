import {check} from "meteor/check";
import {rpgJobsLog_service} from "../../service/jobs/rpgJobsLog_service";

export const rpgJobsLog_uia={
    totalLog:function (jobId) {
        check(jobId, String);
        const cc=rpgJobsLog_service.totalLog(jobId);
        return cc;
    },

    newLog: function (userId, jobId) {
        check(userId, String);
        check(jobId, String);
        const data={
            userId:userId,
            jobId:jobId
        };
        const cc = rpgJobsLog_service.newLog(data);
        return cc;
    },

    setReadTime:function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        const data={
            jobId:jobId,
            userId:userId
        };
        rpgJobsLog_service.setReadTime(data);
    },

    loadLogsByJobId: function (jobId) {
        check(jobId, String);
        const data={
            jobId:jobId
        };
        const logs = rpgJobsLog_service.loadLogsByJobId(data);
        return logs;
    },

    createNewLog:function (data) {
        check(data.jobId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        rpgJobsLog_service.createNewLog(data);
    }
};