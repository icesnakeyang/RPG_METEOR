import {check} from "meteor/check";
import {Jobs, JobsAppeal, JobsRepeal} from "../../lib/data";

Meteor.methods({
    'JobsRepeal.insertRepeal'(data) {
        check(data.jobId,String);
        check(data.appealId,String);
        check(data.createdUserId,String);
        check(data.title,String);
        check(data.content,String);
        check(data.processUserId,String);

        JobsRepeal.insert({
            jobId: data.jobId,
            appealId: data.appealId,
            createdUserId: data.createdUserId,
            createdTime: new Date(),
            title:data.title,
            content: data.content,
            processUserId: data.processUserId
        });
    },

    'JobsRepeal.setReadTime'(data){
        check(data.repealId,String);
        check(data.userId,String);
        /**
         * readTime分两种情况
         * 1、processUserId阅读没有readTime的repeal
         * 2、createdUserId阅读有processTime，但没有processReadTime的repeal
         * 但是，用户每次只能阅读一条repeal记录，所以，要用RepealId条件。
         */
        JobsRepeal.update({
            _id:data.repealId,
            processUserId:data.userId,
            readTime:{$exists:false}
        },{
            $set:{
                readTime:new Date(),
                readUserId:data.userId
            }
        });

        JobsRepeal.update({
            _id:data.repealId,
            createdUserId:data.userId,
            processReadTime:{$exists:false}
        },{
            $set:{
                processReadTime:new Date(),
                processReadUserId:data.userId
            }
        });
    },

    'JobsRepeal.reject'(data) {
        check(data.repealId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        /**
         * 设置processResult=false
         * 设置processUserId
         * 设置processTime
         */
        JobsRepeal.update({
            _id: data.repealId
        }, {
            $set: {
                processTime: new Date(),
                processUserId: data.processUserId,
                processResult: false,
                processRemark: data.processRemark
            }
        });
    },

    'JobsRepeal.agree'(data){
        check(data.repealId, String);
        check(data.appealId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        check(data.jobId, String);

        JobsRepeal.update({
            _id:data.repealId
        },{
            $set:{
                processResult:true,
                processUserId:data.processUserId,
                processRemark:data.processRemark,
                processTime:new Date()
            }
        });

        JobsAppeal.update({
            _id:data.appealId
        },{
            $set:{
                repeal:true,
                repealTime:new Date()
            }
        });

        Jobs.update({
            _id:data.jobId
        },{
            $unset:{
                appeal:''
            }
        });
    }
});