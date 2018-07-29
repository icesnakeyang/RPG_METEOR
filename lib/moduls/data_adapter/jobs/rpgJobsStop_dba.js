import {JobsStop} from "../../../data";
import {check} from "meteor/check";
import {rpgJobsStop_service} from "../../service/jobs/rpgJobsStop_service";

export const rpgJobsStop_dba = {
    totalStop: function (jobId) {
        check(jobId, String);
        const cc = JobsStop.find({
            jobId: jobId
        }).count();
        return cc;
    },

    /**
     * 统计userId未阅读的jobId的终止任务日志
     * @param data
     * @returns {*}
     */
    newStop: function (data) {
        check(data.jobId, String);
        check(data.userId, String);

        const cc = JobsStop.find({
            jobId: data.jobId,
            readTime: {$exists: false},
            createdUserId: {$ne: data.userId}
        }).count();
        return cc;
    },

    loadStop:function(data) {
        check(data.jobId, String);
        const logs = JobsStop.find({
            jobId: data.jobId
        },{
           sort:{
               createdTime:-1
           }
        }).fetch();
        return logs;
    },

    loadCurrentStop:function(data){
        check(data.jobId,String);

        const log=JobsStop.findOne({
            jobId:data.jobId,
            processResult:{$exists:false}
        });
        return log;
    },

    createNewStop:function (data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.remark, String);
        check(data.refund, Number);
        check(data.processUserId, String);
        Meteor.call('JobsStop.insertNew', data);
    },

    editStop:function(data){
        check(data.jobId, String);
        check(data.userId, String);
        check(data.remark, String);
        check(data.refund, Number);
        Meteor.call('JobsStop.edit', data);
    },

    setReadTime:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        Meteor.call('JobsStop.setReadTime', data);
    },

    rejectStop:function (data) {
        check(data.jobId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        Meteor.call('JobsStop.setReject', data);
    },

    agreeStop:function (data) {
        check(data.jobId, String);
        check(data.partyAId, String);
        check(data.partyBId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        Meteor.call('JobsStop.setAgree', data);
    }
};