import {check} from "meteor/check";
import {UserCash} from "../../../data";

export const rpgUserCash_dba = {
    //查找用户的所有充值记录
    loadAllTopUp:function(data) {
        check(data.userId, String);
        let topUps = UserCash.find({
            userId: data.userId,
            topUp: {$exists: true}
        }).fetch();
        return topUps;
    },

    loadAllPublishList:function (data) {
        check(data.userId, String);
        const publishList = UserCash.find({
            userId: data.userId,
            publishOut: {$exists: true}
        }).fetch();
        return publishList
    },

    loadAllAgreeJobs:function (data) {
        check(data.userId, String);
        const agreeJobs=UserCash.find({
            userId:data.userId,
            agreeJob:{$exists:true}
        }).fetch();
        return agreeJobs;
    },

    /**
     * 读取某条Match记录的过期日志信息
     */
    loadMatchOverdue:function (data) {
        check(data.matchId, String);
        const matchOver=UserCash.findOne({
            'matchOverDue.matchId':data.matchId
        });
        return matchOver;
    },

    loadAllCash:function(data) {
        check(data.userId, String);

        var cash_list = UserCash.find({
            userId: data.userId,
        }).fetch();
        return cash_list;
    },

    //新增一个充值记录
    addNewTopUp: function (data) {
        check(data.userId, String);
        check(data.cashBook.amount, Number);
        check(data.cashBook.type, String);
        check(data.createdUserId, String);
        Meteor.call('UserCash.addAmount', data);
    }
};