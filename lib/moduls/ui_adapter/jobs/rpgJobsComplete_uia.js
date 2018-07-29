import {rpgJobsComplete_service} from "../../service/jobs/rpgJobsComplete_service";
import {check} from "meteor/check";

export const rpgJobsComplete_uia={
    newComplete: function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        const data={
            jobId:jobId,
            userId:userId
        };
        const cc=rpgJobsComplete_service.newComplete(data);
        return cc;
    },

    totalComplete:function (jobId) {
        check(jobId, String);
        const cc=rpgJobsComplete_service.totalComplete(jobId);
        return cc;
    },

    setComplete: function (data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.remark, String);
        rpgJobsComplete_service.setComplete(data);
    },

    setReadTime:function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        const data={
            jobId:jobId,
            userId:userId
        };
        rpgJobsComplete_service.setReadTime(data);
    },

    setAccept:function (data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.remark, String);
        rpgJobsComplete_service.setAccept(data);
    },

    setReject:function (data) {
        check(data.jobId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        rpgJobsComplete_service.setReject(data);
    },

    loadCompleteByJobId: function (jobId) {
        check(jobId, String);
        const data={
            jobId:jobId
        };
        const logs = rpgJobsComplete_service.loadCompleteByJobId(data);
        return logs;
    }
};