import {check} from "meteor/check";
import {rpgJobsMatch_service} from "../../service/jobs/rpgJobsMatch_service";

export const rpgJobsMatch_uia = {
    totalMatch: function (jobId) {
        check(jobId, String);
        const cc = rpgJobsMatch_service.totalMatch(jobId);
        return cc;
    },

    createNewJobMatch: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        rpgJobsMatch_service.createNewJobMatch(data);
    },

    loadJobsMatchList: function (jobId) {
        check(jobId, String);
        const matches = rpgJobsMatch_service.loadJobsMatchList(jobId);
        return matches;
    },

    setReadTime: function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        rpgJobsMatch_service.setReadTime(jobId, userId);
    },

    isMatchMe: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        return rpgJobsMatch_service.isMatchMe(data);
    },

    agreeMatch: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processUserId, String);
        rpgJobsMatch_service.agreeMatch(data);
    },

    rejectMatch: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        rpgJobsMatch_service.rejectMatch(data);
    },

    getMatchExpireDate: function (jobId) {
        check(jobId, String);
        const data={
            jobId:jobId
        };
        const expDate = rpgJobsMatch_service.getMatchExpireDate(data);
        return expDate;
    }
};