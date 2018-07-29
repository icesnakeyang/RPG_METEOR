import {check} from "meteor/check";
import {rpgJobsStop_service} from "../../service/jobs/rpgJobsStop_service";

export const rpgJobsStop_uia={
    totalStop: function (jobId) {
        check(jobId, String);
        const cc = rpgJobsStop_service.totalStop(jobId);
        return cc;
    },

    newStop:function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        const data={
            jobId:jobId,
            userId:userId
        };
        const cc=rpgJobsStop_service.newStop(data);
        return cc;
    },

    loadStop(jobId, userId){
        check(jobId,String);
        const data={
            jobId:jobId
        };
        const logs=rpgJobsStop_service.loadStop(data);
        return logs;
    },

    loadCurrentStop:function(jobId) {
        check(jobId, String);
        const data={
            jobId:jobId
        };
        const log = rpgJobsStop_service.loadCurrentStop(data);
        return log;
    },

    saveStop:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.remark, String);
        check(data.refund, Number);
        rpgJobsStop_service.saveStop(data);
    },

    setReadTime:function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        const data={
            jobId:jobId,
            userId:userId
        };
        rpgJobsStop_service.setReadTime(data);
    },

    rejectStop:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processRemark, String);
        rpgJobsStop_service.rejectStop(data);
    },

    agreeStop:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processRemark, String);
        rpgJobsStop_service.agreeStop(data);
    }
};