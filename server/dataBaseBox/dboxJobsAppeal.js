import {Jobs, JobsAppeal, UserData} from "../../lib/data";
import {check} from "meteor/check";

Meteor.methods({
    /**
     * 重新计算用户的申诉和撤诉日志，修改userData冻结乙方account
     * @param data
     * @constructor
     */
    'JobsAppeal.refreshUserData'(data) {
        check(data.userId, String);

        /**
         * 1、读取所有的appeal，repeal不等于true
         * 2、累计每个job的reward，和job数量
         * 3、保存userData.appeal
         */
        const appeals = JobsAppeal.find({
            $or:[{partyAId:data.partyAId},{partyBId:data.partyBId}],
            repeal: {$ne: true}
        }).fetch();
        let block = 0;
        let appealing = 0;
        for (let row of appeals) {
            const job = Jobs.findOne({
                _id: row.jobId
            });
            if (job) {
                block = block + job.reward;
                appealing++;
            }
        }
        const appeal = {
            block: block,
            appealing: appealing
        };
        UserData.update({
            userId: data.userId
        }, {
            $set: {
                appeal: appeal
            }
        });
    },

    'JobsAppeal.newAppeal'(data) {
        check(data.jobId,String);
        check(data.createdUserId,String);
        check(data.title,String);
        check(data.content,String);
        check(data.partyAId,String);
        check(data.partyBId,String);

        // 先插入appeal
        JobsAppeal.insert({
            jobId: data.jobId,
            partyAId:data.partyAId,
            partyBId:data.partyBId,
            createdUserId: data.createdUserId,
            title: data.title,
            content: data.content,
            createdTime: new Date()
        });

        // 修改job的appeal=true
        Jobs.update({
            _id: data.jobId
        }, {
            $set: {
                appeal: true
            }
        });

        // 扣除甲方和乙方的honor
        /**
         * 1、读出job
         * 2、获得partyA id
         * 3、插入一个honor日志
         * 4、更新partyB的honor
         */
        const job = Jobs.findOne({
            _id: data.jobId
        });
        let honor = {
            userId: job.partyAId,
            createdUserId: data.createdUserId,
            point: -job.reward,
            type: 'Appeal',
            jobId: job._id
        };
        // 扣除甲方的荣誉值
        Meteor.call('UserHonor.insertHonor', honor);
        // 扣除乙方的荣誉值
        honor.userId = job.partyBId;
        Meteor.call('UserHonor.insertHonor', honor);

        // 重新计算刷新乙方的冻结账户
        Meteor.call('JobsAppeal.refreshUserData', {userId: job.partyBId});
    },

    'JobsAppeal.setReadTime'(data){
        check(data.jobId,String);
        check(data.userId, String);

        JobsAppeal.update({
            jobId:data.jobId,
            createdUserId:{$ne:data.userId},
            readTime:{$exists:false}
        },{
            $set:{
                readTime:new Date(),
                readUserId:data.userId
            }
        },{multi:true});
    },

    'JobsAppeal.view'(data){
        check(data.appealId, String);
        check(data.view, Number);

        JobsAppeal.update({
            _id:data.appealId
        },{
            $set:{
                view:data.view,
                lastReadTime:new Date()
            }
        });
    }
});