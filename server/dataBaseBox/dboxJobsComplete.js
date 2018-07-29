import {check} from "meteor/check";
import {Jobs, JobsComplete, UserData, UserHonor} from "../../lib/data";

Meteor.methods({
    'JobsComplete.setComplete'(data) {
        check(data.jobId,String);
        check(data.createdUserId, String);
        check(data.remark, String);

        JobsComplete.insert({
            jobId: data.jobId,
            createdTime: new Date(),
            createdUserId: data.createdUserId,
            remark: data.remark,
            complete: true
        });

        Jobs.update({
            _id:data.jobId
        },{
            $set:{
                complete:true,
                progress:false
            }
        });
    },

    'JobsComplete.setReadTime'(data){
        check(data.jobId,String);
        check(data.userId, String);
        JobsComplete.update({
            jobId: data.jobId,
            createdUserId: {$ne: data.userId},
            readTime: {$exists: false}
        }, {
            $set: {
                readTime: new Date(),
                readUserId:data.userId
            }
        },{multi:true});

        JobsComplete.update({
            jobId:data.jobId,
            processResult:{$exists:true},
            processUserId:{$ne:data.userId},
            processReadTime:{$exists:false}
        },{
            $set:{
                processReadTime:new Date()
            }
        },{multi:true});
    },

    'JobsComplete.setAccept'(data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.remark, String);
        /**
         * 甲方创建JobsComplete，accept=true
         * 在job增加accept=true状态。
         * 增加UserHonor记录，把任务佣金添加到乙方的荣誉值上。
         * 刷新乙方UserData的荣誉值
         */
        JobsComplete.insert({
            jobId: data.jobId,
            createdUserId: data.createdUserId,
            remark: data.remark,
            createdTime: new Date(),
            accept: true
        });

        Jobs.update({
            _id:data.jobId
        }, {
            $set:{
                complete:true,
                accept:true
            }
        });

        // 读取job，把任务的佣金作为荣誉值给乙方
        const job = Jobs.findOne({
            _id: data.jobId
        });

        UserHonor.insert({
            userId: job.partyBId,
            createdUserId: data.createdUserId,
            createdTime: new Date(),
            point: job.reward,
            mark: 'Acceptance',
            jobId: job._id
        });

        // 刷新UserData
        const userData=UserData.findOne({
            userId:job.partyBId,
            'userHonor.point':{$exists:true}
        });
        let hPoint=job.reward*1;
        if(userData) {
            hPoint += userData.userHonor.point * 1;
        }
        UserData.update({
            userId:job.partyBId
        },{
            $set:{
                'userHonor.point':hPoint
            }
        });
    },

    'JobsComplete.setReject'(data) {
        check(data.jobId,String);
        check(data.processUserId,String);
        check(data.processRemark,String);
        /**
         * 查询所有没有处理的JobsComplete，增加processResult=false，processTime，processUserId， processRemark
         * 修改job的complete=false
         */
        JobsComplete.update({
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

        Jobs.update({
            _id: data.jobId
        }, {
            $set: {
                complete: false,
                progress:true
            }
        });
    }
});