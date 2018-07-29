import {JobsAppeal, JobsRepeal} from "../../../data";
import {check} from "meteor/check";

export const rpgJobsRepeal_dba = {
    createRepeal: function (data) {
        check(data.jobId, String);
        check(data.appealId, String);
        check(data.createdUserId, String);
        check(data.title, String);
        check(data.content, String);
        check(data.processUserId, String);

        Meteor.call('JobsRepeal.insertRepeal', data);
    },

    loadRepealsByAppealId:function (data) {
        check(data.appealId,String);

        const repeals=JobsRepeal.find({
            appealId:data.appealId
        },{
            sort:{
                createdTime:-1
            }
        }).fetch();
        return repeals;
    },

    loadRepealByRepealId:function (data) {
        check(data.repealId,String);
        const repeal=JobsRepeal.findOne({
            _id:data.repealId
        });
        return repeal;
    },

    rejectRepeal:function (data) {
        check(data.repealId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        Meteor.call('JobsRepeal.reject', data);
    },

    /**
     * 统计userId未阅读的jobId的申诉事件
     * @param data
     * @returns {*|number}
     */
    newRepeal:function (data) {
        check(data.appealId, String);
        check(data.userId, String);
        let cc;
        cc = JobsRepeal.find({
            appealId: data.appealId,
            readTime: {$exists: false},
            createdUserId: {$ne: data.userId}
        }).count();
        return cc;
    },

    newRepealByRepeal:function (data) {
        check(data.repealId, String);
        check(data.userId, String);
        let cc=0;
        cc = JobsRepeal.find({
            _id: data.repealId,
            processUserId:data.userId,
            readTime: {$exists: false}
        }).count();
        cc+=JobsRepeal.find({
            _id:data.repealId,
            createdUserId:data.userId,
            processReadTime:{$exists:false}
        }).count();
        return cc
    },

    newProcessRepeal:function (data) {
        check(data.userId,String);
        let cc=0;
        if(data.appealId){
            cc=JobsRepeal.find({
                appealId:data.appealId,
                createdUserId:data.userId,
                processReadTime:{$exists:false},
                processTime:{$exists:true}
            }).count();
        }else {
            cc = JobsRepeal.find({
                createdUserId: data.userId,
                processReadTime: {$exists: false},
                processTime: {$exists: true}
            }).count();
        }
        return cc;
    },

    setReadTime:function (data) {
        check(data.repealId,String);
        check(data.userId,String);
        Meteor.call('JobsRepeal.setReadTime', data);
    },

    agreeRepeal:function (data) {
        check(data.repealId, String);
        check(data.appealId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        check(data.jobId, String);
        Meteor.call('JobsRepeal.agree', data);
    }
};