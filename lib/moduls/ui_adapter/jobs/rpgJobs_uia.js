import {check} from "meteor/check";
import {rpgJobs_service} from "../../service/jobs/rpgJobs_service";
import {rpgJobs_dba} from "../../data_adapter/jobs/rpgJobs_dba";

export const rpgJobs_uia = {
    /**
     * 增删改查/////////////////////////////////////////////////////////////////////////////////////////////////////
     */
    loadByTitle: function (title) {
        check(title, String);
        const jobs = rpgJobs_service.loadByTitle(title);
        return jobs;
    },

    loadByCodeName: function (keyName) {
        check(keyName, String);
        const jobs = rpgJobs_service.loadByCodeName(keyName);
        return jobs;
    },

    loadById: function (jobId) {
        check(jobId, String);
        const job = rpgJobs_service.loadById(jobId);
        return job;
    },

    loadJobs: function (userId, status, party) {
        check(userId, String);
        check(status, String);
        check(party, String);
        const data = {
            userId: userId,
            status: status,
            party: party
        };
        const jobs = rpgJobs_service.loadJobs(data);
        return jobs;
    },

    loadAllMatchJobs: function () {
        const jobs = rpgJobs_service.loadAllMatchJobs();
        return jobs;
    },

    createNewJob: function (data) {
        check(data.userId, String);
        check(data.reward, Number);
        check(data.title, String);
        check(data.codeName, String);
        check(data.content, String);
        check(data.days, Number);
        check(data.taskId, String);
        check(data.createdUserId, String);
        return rpgJobs_service.createNewJob(data);
    },

    loadAllMatchJobs: function () {
        const jobs = rpgJobs_service.loadAllMatchJobs();
        return jobs;
    },

    loadOverdueJobs:function () {
        const jobs=rpgJobs_service.loadOverdueJobs();
        return jobs;
    },

    /**
     * total 统计/////////////////////////////////////////////////////////////////////////////////////////////////////
     */
    totalJobs: function (userId, status, party) {
        check(userId, String);
        check(status, String);
        check(party, String);
        const data = {
            userId: userId,
            status: status,
            party: party
        };
        let cc = 0;
        cc = rpgJobs_service.totalJobs(data);
        return cc;
    },

    /**
     * new 新消息/////////////////////////////////////////////////////////////////////////////////////////////////////
     */

    newJobs: function (userId, status, party) {
        check(userId, String);
        check(status, String);
        check(party, String);
        const data = {
            userId: userId,
            status: status,
            party: party
        };
        let cc = 0;
        cc = rpgJobs_service.newJobs(data);
        return cc;
    },

    newMyPartyAUnread: function (userId) {
        check(userId, String);
        const data = {
            userId: userId,
            status: 'all',
            party: 'partyA'
        };
        const cc = rpgJobs_service.newPartyA(data);
        return cc;
    },

    newMyPartyBUnread: function (userId) {
        check(userId, String);
        const data = {
            userId: userId,
            status: 'all',
            party: 'partyB'
        };
        const cc = rpgJobs_service.newPartyB(data);
        return cc;
    },

    newUnreadJob: function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        let data = {
            jobId: jobId,
            userId: userId
        };
        const cc = rpgJobs_service.newAJob(data);
        return cc;
    },

    setReadOverdue:function (jobId, userId) {
        check(jobId, String);
        check(userId,String);
        const data={
            jobId:jobId,
            userId,userId
        };
        rpgJobs_service.setReadOverdue(data);
    }
};