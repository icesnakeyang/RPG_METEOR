import {check} from "meteor/check";
import {JobsMatch} from "../../../data";

export const rpgJobsMatch_dba = {
    /**
     * 统计任务的分配日志数量
     */
    totalMatch: function (jobId) {
        check(jobId, String);

        const cc = JobsMatch.find({
            jobId: jobId
        }).count();
        return cc;
    },

    newMatchMe:function (userId) {
        check(userId, String);
        const cc=JobsMatch.find({
            matchUserId:userId,
            readTime:{$exists:false}
        }).count();
        return cc;
    },

    createNewJobMatch: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        Meteor.call('JobsMatch.insert', data);
    },

    loadJobsMatchList:function (data) {
        check(data.jobId, String);
        var logs=JobsMatch.find({
            jobId:data.jobId
        }, {
            sort:{createdTime :-1}
        }).fetch();
        return logs;
    },

    setReadTime:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        Meteor.call('JobsMatch.setRead', data);
    },

    isMatchMe:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        /**
         * 检查当前任务是否是分配给我的新任务
         */
        const match=JobsMatch.find({
            jobId:data.jobId,
            matchUserId:data.userId,
            processResult:{$exists:false}
        }).fetch();
        if(match.length>0){
            return true;
        }
        return false;
    },

    agreeMatch:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processUserId, String);
        Meteor.call('JobsMatch.agree', data);
    },

    rejectMatch:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        Meteor.call('JobsMatch.reject', data);
    },

    loadMatchUnprocess:function () {
        const matches=JobsMatch.find({
            processTime:{$exists:false}
        }).fetch();
        return matches;
    },

    setMatchOverdue:function (data) {
        check(data.matchId, String);
        Meteor.call('JobsMatch.setOverdue', data);
    }
};