import {check} from "meteor/check";
import {rpgJobsAppeal_service} from "../../service/jobs/rpgJobsAppeal_service";

export const rpgJobsAppeal_uia = {
    totalAppeal: function (jobId) {
        check(jobId, String);
        const cc = rpgJobsAppeal_service.totalAppeal(jobId);
        return cc;
    },

    newAppeal: function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        const data={
            jobId:jobId,
            userId:userId
        };
        const cc = rpgJobsAppeal_service.newAppeal(data);
        return cc;
    },

    createAppeal: function (data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.title, String);
        check(data.content, String);
        rpgJobsAppeal_service.createAppeal(data);
    },

    loadAppealsByJobId: function (jobId) {
        check(jobId, String);
        const data = {
            jobId: jobId
        };
        const appeals = rpgJobsAppeal_service.loadAppealsByJobId(data);
        return appeals;
    },

    loadAppealByAppealId: function (appealId) {
        check(appealId, String);
        const data = {
            appealId: appealId
        };
        const appeal = rpgJobsAppeal_service.loadAppealByAppealId(data);
        return appeal;
    },

    loadAppealsToBoard: function () {
        const appeals = rpgJobsAppeal_service.loadAppealsToBoard();
        return appeals;
    },

    loadCurrentAppealByJobId: function (jobId) {
        check(jobId, String);
        const data = {
            jobId: jobId
        };
        const appeal = rpgJobsAppeal_service.loadCurrentAppealByJobId(data);
        return appeal;
    },

    setReadTime: function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        const data = {
            jobId: jobId,
            userId: userId
        };
        rpgJobsAppeal_service.setReadTime(data);
    },

    viewAppeal: function (appealId) {
        check(appealId, String);
        const data = {
            appealId: appealId
        };
        rpgJobsAppeal_service.viewAppeal(data);
    }
};