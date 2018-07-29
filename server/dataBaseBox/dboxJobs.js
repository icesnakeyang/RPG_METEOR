import {check} from "meteor/check";
import {Jobs, Tasks, UserCash} from "../../lib/data";

Meteor.methods({
    'Jobs.insert'(data) {
        check(data.userId, String);
        check(data.reward, Number);
        check(data.title, String);
        check(data.codeName, String);
        check(data.content, String);
        check(data.days, Number);
        check(data.taskId, String);
        check(data.createdUserId, String);

        Jobs.insert({
            taskId: data.taskId,
            partyAId: data.userId,
            title: data.title,
            codeName: data.codeName,
            reward: data.reward,
            days: data.days,
            content: data.content,
            createdUserId: data.createdUserId,
            createdTime: new Date()
        });
        //获取新的jobId
        let newJob = Jobs.findOne({
            taskId: data.taskId
        });
        if (!newJob) {
            return;
        }
        const newId = newJob._id;


        //在UserCash账户保存本次发布的任务金额
        const param = {
            userId: data.userId,
            cashBook: {
                amount: -data.reward,
                type: 'PublishOut',
                jobId: newId
            },
            createdUserId: data.createdUserId
        };
        Meteor.call('UserCash.addAmount', param);

        //设置taskId的jobId和已发布状态
        Tasks.update({
            _id: data.taskId
        }, {
            $set: {
                jobId: newId,
                publish: true
            }
        });
    },

    'Jobs.setOverdue'(data) {
        check(data.jobId, String);
        Jobs.update({
            _id: data.jobId
        }, {
            $set: {
                matchOverdue: true
            }
        });
    },

    'Jobs.setReadOverdue'(data) {
        check(data.jobId, String);
        check(data.userId, String);
        Jobs.update({
            _id: data.jobId,
            partyAId: data.userId,
            readOverdueTime: {$exists: false}
        }, {
            $set: {
                readOverdueTime: new Date()
            }
        });
    }
});
