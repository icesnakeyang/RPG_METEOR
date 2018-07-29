import {JobsAppeal} from "../../../data";
import {check} from "meteor/check";

export const rpgJobsAppeal_dba={
    totalAppeal:function (jobId) {
        check(jobId, String);
        const cc=JobsAppeal.find({
            jobId:jobId
        }).count();
        return cc;
    },

    /**
     * 统计userId未阅读的jobId的申诉事件
     * @param data
     * @returns {*|number}
     */
    newAppeal:function (data) {
        check(data.jobId, String);
        check(data.userId, String);

        let cc;
        cc = JobsAppeal.find({
            jobId: data.jobId,
            readTime: {$exists: false},
            createdUserId: {$ne: data.userId}
        }).count();
        return cc;
    },

    createAppeal:function(data) {
        check(data.jobId,String);
        check(data.createdUserId,String);
        check(data.title,String);
        check(data.content,String);
        check(data.partyAId,String);
        check(data.partyBId,String);
        Meteor.call('JobsAppeal.newAppeal', data);
    },

    loadAppealsByJobId:function (data) {
        check(data.jobId,String);

        const appeals=JobsAppeal.find({
            jobId:data.jobId
        }, {
            sort: {
                createdTime: -1
            }
        }).fetch();
        return appeals;
    },

    loadAppealByAppealId:function (data) {
        check(data.appealId, String);

        const appeal=JobsAppeal.findOne({
            _id:data.appealId
        });
        return appeal;
    },

    loadAppealsToBoard:function () {
        const appeals=JobsAppeal.find({
            repeal:{$ne:true}
        }).fetch();
        return appeals;
    },

    loadCurrentAppealByJobId:function (data) {
        check(data.jobId,String);
        const appeal=JobsAppeal.findOne({
            jobId:data.jobId,
            repeal:{$ne:true}
        });
        return appeal;
    },

    setReadTime:function(data) {
        check(data.jobId, String);
        check(data.userId, String);
        Meteor.call('JobsAppeal.setReadTime', data);
    },

    viewAppeal:function(data) {
        check(data.appealId, String);
        check(data.view, Number);
        Meteor.call('JobsAppeal.view', data);
    }
};