import {check} from "meteor/check";
import {Jobs, JobsMatch, UserCash} from "../../lib/data";

Meteor.methods({
    'JobsMatch.insert'(data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        /**
         * 分配一个新任务时，需要检查该任务是否已经分配给该用户
         * 如果已经分配过，就把原来的记录失效，然后再分配一次
         */
        JobsMatch.update({
            jobId: data.jobId,
            matchUserId: data.userId,
            processResult: {$exists: false}
        }, {
            $set: {
                processResult: false,
                processTime: new Date(),
                processRemark: 'SYSTEM RELOCATION'
            }
        }, {multi: true});

        JobsMatch.insert({
            jobId: data.jobId,
            matchUserId: data.userId,
            content: data.content,
            createdTime: new Date(),
            createdUserId: data.createdUserId
        });
    },

    'JobsMatch.setRead'(data) {
        check(data.jobId, String);
        check(data.userId, String);

        JobsMatch.update({
            jobId: data.jobId,
            matchUserId: data.userId,
            readTime: {$exists: false},
            processResult: {$exists: false}
        }, {
            $set: {
                readTime: new Date()
            }
        });
    },

    'JobsMatch.agree'(data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processUserId, String);

        var result = {};
        /**
         * 思路
         * 1、检查任务是否已成交
         * 2、设置match成交
         * 3、把match Id添加到job
         * 4、把其他用户的match设置为失效
         * 5、乙方usercash增加任务金额
         * 6、重新计算乙方的balance
         */

        let match = JobsMatch.findOne({
            jobId: data.jobId,
            processResult: {$exists: false},
            matchUserId: data.userId
        });
        if (!match) {
            result.status = 400;
            result.message = 'Database verify error 2018020601';
            return result;
        }
        data.matchId = match._id;

        // 修改前再次检查任务状态，看是否已被别的用户承接
        var log = JobsMatch.findOne({
            jobId: data.jobId,
            processResult: true
        });
        if (log) {
            result.status = 400;
            result.message = 'This job has been matched to other user';
            return;
        }

        // 修改match状态为处理成功
        JobsMatch.update({
            _id: data.matchId
        }, {
            $set: {
                processResult: true,
                processTime: new Date(),
                processUserId: data.processUserId
            }
        });

        // 把assign id添加到publishTask上去
        Jobs.update({
            _id: data.jobId
        }, {
            $set: {
                match: true,
                matchId: data.matchId,
                partyBId: data.userId,
                contractTime: new Date(),
                progress: true
            }
        });

        // 查询分配给其他用户的match log，修改失效
        JobsMatch.update({
            JobId: data.jobId,
            processResult: {$exists: false},
            matchUserId: {$ne: data.userId}
        }, {
            $set: {
                processResult: false,
                processTime: new Date(),
                processUserId: data.processUserId,
                processRemark: 'Bid failed'
            }
        }, {multi: true});

        // 给乙方的usercash增加任务金额
        const job=Jobs.findOne({
            _id:data.jobId
        });
        const param={
            userId:data.userId,
            cashBook:{
                amount: job.reward,
                type:'AgreeJob',
                jobId: data.jobId
            },
            createdUserId: data.processUserId
        };
        Meteor.call('UserCash.addAmount', param);
    },

    'JobsMatch.reject'(data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        /**
         * 对于一个任务，RPG秘书只能分配一次给乙方，除非乙方拒绝或过期，RPG秘书不能重复进行分配。
         * 所以，乙方每次拒绝，都只是拒绝一个唯一的任务分配。
         * 本函数直接修改match数据集里的一条分配记录。
         * 数据完整性检测：
         * 1、remark为拒绝理由说明，必填，不能为空
         *
         */
        if (data.processRemark === "") {
            return;
        }
        JobsMatch.update({
            jobId:data.jobId,
            matchUserId:data.userId,
            processResult:{$exists:false}
        }, {
            $set: {
                processResult: false,
                processTime: new Date(),
                processUserId: data.processUserId,
                processRemark: data.processRemark
            }
        });
    },

    'JobsMatch.setOverdue'(data) {
        check(data.matchId, String);
        /**
         * service检测到本次匹配已经过期，自动改成false
         *
         */
        JobsMatch.update({
            _id:data.matchId,
            processResult:{$exists:false}
        }, {
            $set: {
                processResult: false,
                processTime: new Date(),
                processRemark: 'MATCH_OVERDUE'
            }
        });
    },
});
