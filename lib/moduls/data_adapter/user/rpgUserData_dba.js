import {Jobs, JobsMatch, UserData} from "../../../data";
import {check} from "meteor/check";

export const rpgUserData_dba={
    addNewUserData:function(data) {
        check(data.userId, String);
        Meteor.call('UserData.insertNewUserData', data);
    },

    updateBalance:function (data) {
        check(data.userId, String);
        check(data.balance, Number);

        Meteor.call('UserData.updateBalance', data);
    },

    loadUserDataByUserId: function (data) {
        check(data.userId, String);
        const user = UserData.findOne({
            userId: data.userId
        });
        return user;
    },

    loadUserData:function () {
        const userDatas=UserData.find().fetch();
        return userDatas;
    },

    /**
     * 查找所有可以被分配任务的威客
     */
    loadFreelancer:function (data) {
        /**
         * 1、查询所有的UserData，记录限制由publish发布时设置
         * 2、循环检查用户当前是否为可承接任务的威客。
         * 条件包括：用户是否设置为乙方，是否已充值，是否已否存在partyB任务，且任务未完成。
         * 或者其他申诉等情况。
         * 或者是否已经分配过该任务了。
         * 如果有，就不能接任务。
         * 3、将没有工作的用户加入数组，返回。
         */
        check(data.jobId, String);
        const users=UserData.find({
        }).fetch();
        var frees = [];
        for (var row of users) {
            var jobMatch = JobsMatch.find({
                jobId: data.jobId,
                matchUserId: row.userId,
                $or: [{processResult: {$exists: false}}, {processResult: true}]
            }).fetch();
            if (!jobMatch.length) {
                //检查是否甲方
                var job = Jobs.findOne({
                    _id: data.jobId,
                    partyAId:row.userId
                });
                if (!job) {
                    frees.push(row);
                }
            }
        }
        return frees;
    },
};