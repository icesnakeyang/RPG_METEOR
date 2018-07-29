import {check} from "meteor/check";
import {rpgJobsRepeal_service} from "../../service/jobs/rpgJobsRepeal_service";
import {rpgJobs_service} from "../../service/jobs/rpgJobs_service";
import {rpgJobsRepeal_dba} from "../../data_adapter/jobs/rpgJobsRepeal_dba";

export const rpgJobsRepeal_uia = {
    createRepeal: function (data) {
        check(data.appealId, String);
        check(data.createdUserId, String);
        check(data.title, String);
        check(data.content, String);
        rpgJobsRepeal_service.createRepeal(data);
    },

    loadRepealsByAppealId: function (appealId) {
        check(appealId, String);
        const data = {
            appealId: appealId
        };
        const repeals = rpgJobsRepeal_service.loadRepealsByAppealId(data);
        return repeals;
    },

    loadRepealByRepealId: function (repealId) {
        check(repealId, String);
        const data = {
            repealId: repealId
        };
        const repeal = rpgJobsRepeal_service.loadRepealByRepealId(data);
        return repeal;
    },

    totalRepealByAppeal: function (appealId) {
        check(appealId, String);
        const data = {
            appealId: appealId
        };
        const repeals = rpgJobsRepeal_service.totalRepealByAppeal(data);
        return repeals;
    },

    newRepealByAppeal: function (appealId, userId) {
        check(appealId, String);
        check(userId, String);
        const data = {
            appealId: appealId,
            userId: userId
        };
        const cc = rpgJobsRepeal_service.newRepealByAppeal(data);
        return cc;
    },

    newRepealByRepeal:function (userId, repealId) {
        check(repealId, String);
        check(userId, String);
        const data={
            repealId:repealId,
            userId:userId
        };
        const cc = rpgJobsRepeal_service.newRepealByRepeal(data);
        return cc;
    },

    newProcessRepeal: function (userId, appealId) {
        check(userId, String);
        const data = {
            userId: userId
        };
        if(appealId){
            data.repealId=appealId;
        }
        const cc = rpgJobsRepeal_service.newProcessRepeal(data);
        return cc;
    },

    rejectRepeal: function (data) {
        check(data.repealId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        /**
         * 校验条件
         * 1、job存在，job.appeal为true
         * 2、current appeal存在
         * 3、repeal存在，process 未处理
         * 4、processUserId为甲方，或者乙方
         */
        const repeal = rpgJobsRepeal_service.loadRepealByRepealId(data);
        if (!repeal) {
            return;
        }
        if (repeal.processTime) {
            return;
        }
        const job = rpgJobs_service.loadById(repeal.jobId);
        if (!job) {
            return;
        }
        if (job.appeal !== true) {
            return;
        }
        if (job.partyAId !== data.processUserId && job.partyBId !== data.processUserId) {
            return;
        }
        if (data.processRemark === '') {
            return;
        }
        rpgJobsRepeal_service.rejectRepeal(data);
    },

    setReadTime: function (repealId, userId) {
        check(repealId, String);
        check(userId, String);
        const data = {
            repealId: repealId,
            userId: userId
        };
        rpgJobsRepeal_service.setReadTime(data);
    },

    agreeRepeal: function (data) {
        check(data.repealId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        rpgJobsRepeal_service.agreeRepeal(data);
    }
};