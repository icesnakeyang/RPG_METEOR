import {CompleteLogs, JobsComplete} from "../../../data";
import {check} from "meteor/check";

export const rpgJobsComplete_dba = {
    /**
     * 统计userId未阅读的jobId的完成任务日志
     * @param jobId
     * @param userId
     * @returns {Promise|*}
     */
    newComplete: function (data) {
        check(data.jobId, String);
        check(data.userId, String);

        let cc;
        cc = JobsComplete.find({
            jobId: data.jobId,
            readTime: {$exists: false},
            createdUserId: {$ne: data.userId}
        }).count();
        cc+=JobsComplete.find({
            jobId:data.jobId,
            processResult:{$exists:true},
            processReadTime:{$exists:false},
            processUserId:{$ne:data.userId}
        }).count();
        return cc;
    },

    totalComplete: function (jobId) {
        check(jobId, String);

        var cc = 0;
        cc = JobsComplete.find({
            jobId: jobId
        }).count();
        return cc;
    },

    setComplete: function (data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.remark, String);
        Meteor.call('JobsComplete.setComplete', data);
    },

    setReadTime:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        Meteor.call('JobsComplete.setReadTime', data);
    },

    setAccept:function (data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.remark, String);
        Meteor.call('JobsComplete.setAccept', data);
    },

    setReject:function (data) {
        check(data.jobId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        Meteor.call('JobsComplete.setReject', data);
    },

    loadCompleteByJobId: function (data) {
        check(data.jobId, String);
        const logs = JobsComplete.find({
            jobId: data.jobId
        }, {
            sort: {createdTime: -1}
        }).fetch();
        return logs;
    },
};
