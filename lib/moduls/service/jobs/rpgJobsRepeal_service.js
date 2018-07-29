import {check} from "meteor/check";
import {rpgJobsRepeal_dba} from "../../data_adapter/jobs/rpgJobsRepeal_dba";
import {rpgJobs_service} from "./rpgJobs_service";
import {rpgJobsAppeal_service} from "./rpgJobsAppeal_service";

export const rpgJobsRepeal_service={
    createRepeal: function (data) {
        check(data.appealId, String);
        check(data.createdUserId, String);
        check(data.title, String);
        check(data.content, String);
        /**
         * 校验
         * 1、job是否存在
         * 2、任务是否在申诉中
         * 3、appeal记录是否有效
         * 4、createdUserId是否甲方，或者乙方
         * 5、把processUserId增加到data参数
         * 6、把appealId增加到data参数
         */
        //检查appeal是否有效
        const appeal=rpgJobsAppeal_service.loadAppealByAppealId(data);
        if(!appeal){
            return;
        }
        if(appeal.repeal===true){
            return;
        }
        data.jobId=appeal.jobId;
        //job是否有效
        const job=rpgJobs_service.loadById(data.jobId);
        if(!job){
            return;
        }
        if(!(job.appeal===true)){
            return;
        }
        // 是否甲方或者乙方
        let isParty=false;
        if(data.createdUserId===job.partyAId){
            isParty=true;
            data.processUserId=job.partyBId;
        }
        if(data.createdUserId===job.partyBId){
            isParty=true;
            data.processUserId=job.partyAId;
        }
        if(!isParty){
            return;
        }
        rpgJobsRepeal_dba.createRepeal(data);
    },

    loadRepealsByAppealId:function (data) {
        check(data.appealId, String);
        const repeals = rpgJobsRepeal_dba.loadRepealsByAppealId(data);
        return repeals;
    },

    loadRepealByRepealId:function (data) {
        check(data.repealId, String);
        const repeal = rpgJobsRepeal_dba.loadRepealByRepealId(data);
        return repeal;
    },

    totalRepealByAppeal:function (data) {
        check(data.appealId, String);
        const repeals=rpgJobsRepeal_service.loadRepealsByAppealId(data);
        return repeals.length;
    },

    newRepealByAppeal: function (data) {
        check(data.appealId, String);
        check(data.userId, String);
        const cc = rpgJobsRepeal_dba.newRepeal(data);
        return cc;
    },

    newRepealByRepeal:function (data) {
        check(data.repealId, String);
        check(data.userId, String);
        const cc = rpgJobsRepeal_dba.newRepealByRepeal(data);
        return cc;
    },

    newProcessRepeal:function (data) {
        check(data.userId, String);
        const cc = rpgJobsRepeal_dba.newProcessRepeal(data);
        return cc;
    },

    rejectRepeal:function (data) {
        check(data.repealId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        rpgJobsRepeal_dba.rejectRepeal(data);
    },

    setReadTime:function (data) {
        check(data.repealId,String);
        check(data.userId,String);
        const repeal=rpgJobsRepeal_service.loadRepealByRepealId(data);
        if(!repeal){
            return;
        }
        if(repeal.processUserId!==data.userId && repeal.createdUserId!==data.userId){
            return;
        }
        rpgJobsRepeal_dba.setReadTime(data);
    },

    agreeRepeal:function (data) {
        check(data.repealId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        /**
         * 校验
         * 1、job是否存在
         * 2、job的appeal=true
         * 3、当前是否有效的appeal
         * 4、repeal是否存在
         * 5、repeal未处理
         * 6、processUserId是partyB或者partyA
         * 7、processRemark不为空
         */
        const repeal=rpgJobsRepeal_service.loadRepealByRepealId(data);
        if(!repeal){
            return;
        }
        if(repeal.processTime){
            return;
        }
        data.jobId=repeal.jobId;
        const job=rpgJobs_service.loadById(data.jobId);
        if(!job){
            return;
        }
        if(job.partyAId!==data.processUserId && job.partyBId!==data.processUserId){
            return;
        }
        if(job.appeal!==true){
            return;
        }
        const appeal=rpgJobsAppeal_service.loadCurrentAppealByJobId(data);
        if(!appeal){
            return;
        }
        data.appealId=appeal._id;
        rpgJobsRepeal_dba.agreeRepeal(data);
    }
};