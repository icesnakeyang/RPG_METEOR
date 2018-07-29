import {check} from "meteor/check";
import {rpgJobsStop_dba} from "../../data_adapter/jobs/rpgJobsStop_dba";
import {rpgJobs_service} from "./rpgJobs_service";

export const rpgJobsStop_service={
    totalStop: function (jobId) {
        check(jobId, String);
        const cc = rpgJobsStop_dba.totalStop(jobId);
        return cc;
    },

    newStop:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        const cc=rpgJobsStop_dba.newStop(data);
        return cc;
    },

    loadStop(data) {
        check(data.jobId, String);
        const logs = rpgJobsStop_dba.loadStop(data);
        return logs;
    },

    loadCurrentStop:function(data) {
        check(data.jobId, String);
        const log = rpgJobsStop_dba.loadCurrentStop(data);
        return log;
    },

    saveStop:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.remark, String);
        check(data.refund, Number);
        /**
         * saveStop包括，新建stop，修改stop
         * 1、读取当前进行中的的stop，如果有，则调用修改方法。
         * 2、如果没有，则调用新增方法。
         */
        const job = rpgJobs_service.loadById(data.jobId);
        if (!job) {
            return;
        }
        const log = rpgJobsStop_dba.loadCurrentStop(data);
        if (log) {
            rpgJobsStop_dba.editStop(data);
        } else {
            data.createdUserId=data.userId;
            if (data.userId === job.partyAId) {
                data.processUserId = job.partyBId;
            }
            if (data.userId === job.partyBId) {
                data.processUserId = job.partyAId;
            }
            rpgJobsStop_dba.createNewStop(data);
        }
    },

    setReadTime:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        rpgJobsStop_dba.setReadTime(data);
    },

    rejectStop:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processRemark, String);
        const job=rpgJobs_service.loadById(data.jobId);
        if(!job){
            // 任务不存在，操作取消
            return;
        }
        if(data.userId===job.partyAId){
            data.processUserId=data.userId;
        }else {
            if(data.userId===job.partyBId){
                data.processUserId=data.userId;
            }else {
                // 既不是甲方，也不是乙方，不能操作
                return;
            }
        }
        rpgJobsStop_dba.rejectStop(data);
    },

    agreeStop:function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processRemark, String);

        const job=rpgJobs_service.loadById(data.jobId);
        if(!job){
            // 任务不存在，操作取消
            return;
        }
        data.partyAId=job.partyAId;
        data.partyBId=job.partyBId;
        if(data.userId===job.partyAId){
            data.processUserId=data.userId;
        }else {
            if(data.userId===job.partyBId){
                data.processUserId=data.userId;
            }else {
                // 既不是甲方，也不是乙方，不能操作
                return;
            }
        }
        const stop=rpgJobsStop_service.loadCurrentStop(data);
        if(!stop){
            // 当前终止任务的申请不存在，退出
            return;
        }
        data.refund=stop.refund*1;
        rpgJobsStop_dba.agreeStop(data);
    }
};