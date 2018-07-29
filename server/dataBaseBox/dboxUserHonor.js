import {check} from "meteor/check";
import {UserData, UserHonor} from "../../lib/data";

Meteor.methods({
    /**
     * 重新计算userId的荣誉值，获得荣誉，损失荣誉，当前荣誉值
     * 修改UserData.userHonor
     * @param data
     * @constructor
     */
    'UserHonor.refreshUserData'(data) {
        check(data.userId, String);

        // 先读出大于0的honor
        let honors = UserHonor.find({
            userId: data.userId,
            point:{$gt:0}
        }).fetch();
        let income = 0.0;
        for (let row of honors) {
            income = income + row.point * 1;
        }
        // 再读出小于0的honor
        honors=UserHonor.find({
            userId:data.userId,
            point:{$lt:0}
        }).fetch();
        let out=0.0;
            for(let row of honors){
                out = out + row.point * 1;
            }
            // 计算balance
        const balance= income - out;

        /**
         * 把新计算的结果更新到UserData集合里。
         */
        const honor={
            income:income,
            out:out,
            balance:balance
        };
        UserData.update({
            userId: data.userId
        }, {
            $set: {
                userHonor: honor
            }
        });
    },

    'UserHonor.insertHonor'(data){
        check(data.userId, String);
        check(data.createdUserId, String);
        check(data.point, Number);
        check(data.type, String);
        check(data.jobId, String);

        UserHonor.insert({
            userId:data.userId,
            createdUserId:data.createdUserId,
            createdTime:new Date(),
            point:data.point,
            type:data.type,
            jobId:data.jobId
        });

        // 插入荣誉值后即时刷新UserData
        Meteor.call('UserHonor.refreshUserData', {userId:data.userId});
    }
});