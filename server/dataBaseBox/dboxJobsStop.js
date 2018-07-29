import {check} from "meteor/check";
import {CashBook, Jobs, JobsStop, PublishedTaskAssignLog, PublishedTasks, StopLogs} from "../../lib/data";

Meteor.methods({
    'JobsStop.insertNew'(data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.remark, String);
        check(data.refund, Number);
        check(data.processUserId, String);

        JobsStop.insert({
            jobId: data.jobId,
            createdTime: new Date(),
            createdUserId: data.createdUserId,
            remark: data.remark,
            refund: data.refund,
            processUserId: data.processUserId
        });
    },

    'JobsStop.edit'(data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.remark, String);
        check(data.refund, Number);
        JobsStop.update({
            jobId: data.jobId,
            processResult: {$exists: false},
            createdUserId: data.userId
        }, {
            $set: {
                remark: data.remark,
                refund: data.refund
            }
        });
    },

    'JobsStop.setReject'(data) {
        check(data.jobId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);

        JobsStop.update({
            jobId: data.jobId,
            processResult: {$exists: false}
        }, {
            $set: {
                processResult: false,
                processTime: new Date(),
                processUserId: data.processUserId,
                processRemark: data.processRemark
            }
        }, {multi: true});
    },

    'JobsStop.setAgree'(data) {
        check(data.jobId, String);
        check(data.partyAId, String);
        check(data.partyBId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        check(data.refund, Number);

        // 保存stop的agree处理结果
        JobsStop.update({
            jobId: data.jobId,
            processResult: {$exists: false}
        }, {
            $set: {
                processResult: true,
                processTime: new Date(),
                processUserId: data.processUserId,
                processRemark: data.processRemark,
                refund:data.refund
            }
        });

        // 给job添加stop=true状态
        // 把progress, complete, 都改成false
        Jobs.update({
            _id: data.jobId
        }, {
            $set: {
                stop: true
            },
            $unset:{
                progress:'',
                complete:''
            }
        });

        // 给甲方用户的UserCash增加退回的金额
        // addAmount方法会自动刷新UserData的balance
        const param = {
            userId: data.partyAId,
            cashBook: {
                amount: data.refund,
                type: 'StopRefund',
                jobId: data.jobId
            },
            createdUserId: data.processUserId
        };
        Meteor.call('UserCash.addAmount', param);

        // 在乙方用户的UserCash里，扣除退回的amount，同时刷新乙方用户的UserData
        param.userId=data.partyBId;
        param.cashBook.amount=-data.refund;
        Meteor.call('UserCash.addAmount', param);
    },

    'JobsStop.setReadTime'(data) {
        check(data.jobId, String);
        check(data.userId, String);

        /**
         * 当前用户是processUserId，记录readTime
         */
        JobsStop.update({
            jobId: data.jobId,
            processUserId: data.userId,
            readTime: {$exists: false}
        }, {
            $set: {
                readTime: new Date()
            }
        }, {multi: true});

        /**
         * 当前用户是createdUserId，记录processReadTime
         */
        JobsStop.update({
            jobId: data.jobId,
            createdUserId: data.userId,
            processResult: {$exists: true},
            processReadTime: {$exists: false}
        }, {
            $set: {
                processReadTime: new Date()
            }
        }, {multi: true});
    },
});