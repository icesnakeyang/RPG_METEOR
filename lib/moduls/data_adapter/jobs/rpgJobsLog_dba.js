import {JobsLog} from "../../../data";
import {check} from "meteor/check";

export const rpgJobsLog_dba={

    /**
     * 统计一个任务的我未阅读的新日志
     * @param jobId
     * @param userId
     * @returns {Promise|*}
     */
    newLog: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        //未阅读任务日志
        let cc;
        cc = JobsLog.find({
            jobId: data.jobId,
            readTime: {$exists: false},
            createdUserId: {$ne: data.userId}
        }).count();
        return cc;
    },

    totalLog:function (jobId) {
        check(jobId, String);

        var cc=0;
        cc=JobsLog.find({
            jobId:jobId
        }).count();
        return cc;
    },

    setReadTime:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        Meteor.call('JobsLog.setReadTime', data);
    },

    loadLogsByJobId: function (data) {
        check(data.jobId, String);

        var logs = JobsLog.find({
            jobId: data.jobId
        }, {
            sort: {createdTime: -1}
        }).fetch();
        return logs;
    },

    createNewLog:function (data) {
        check(data.jobId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        Meteor.call('JobsLog.insertNew', data);
    }
};