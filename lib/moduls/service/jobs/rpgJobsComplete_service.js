import {rpgJobsComplete_dba} from "../../data_adapter/jobs/rpgJobsComplete_dba";
import {check} from "meteor/check";

export const rpgJobsComplete_service={
    newComplete: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        const cc=rpgJobsComplete_dba.newComplete(data);
        return cc;
    },

    totalComplete:function (jobId) {
        check(jobId, String);
        const cc=rpgJobsComplete_dba.totalComplete(jobId);
        return cc;
    },

    setComplete: function (data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.remark, String);
        rpgJobsComplete_dba.setComplete(data);
    },

    setReadTime:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        rpgJobsComplete_dba.setReadTime(data);
    },

    setAccept:function (data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.remark, String);
        rpgJobsComplete_dba.setAccept(data);
    },

    setReject:function (data) {
        check(data.jobId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        rpgJobsComplete_dba.setReject(data);
    },

    loadCompleteByJobId: function (data) {
        check(data.jobId, String);
        const logs = rpgJobsComplete_dba.loadCompleteByJobId(data);
        return logs;
    }
};