import {check} from "meteor/check";
import {rpgJobsAppeal_dba} from "../../data_adapter/jobs/rpgJobsAppeal_dba";
import {rpgJobs_service} from "./rpgJobs_service";
import {rpgUserHonor_service} from "../user/rpgUserHonor_service";
import {JobsAppeal} from "../../../data";

export const rpgJobsAppeal_service = {
    totalAppeal: function (jobId) {
        check(jobId, String);
        const cc = rpgJobsAppeal_dba.totalAppeal(jobId);
        return cc;
    },

    newAppeal: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        const cc = rpgJobsAppeal_dba.newAppeal(data);
        return cc;
    },

    createAppeal: function (data) {
        check(data.jobId, String);
        check(data.createdUserId, String);
        check(data.title, String);
        check(data.content, String);

        /**
         * 1、检查job是否存在
         * 2、检查job match=true
         * 3、检查createdUserId是甲方或者乙方
         * 4、检查createdUserId是否为有荣誉值=job.reward
         * 5、检查job appeal=true，已经在申诉，不能重复申诉
         */

        const job = rpgJobs_service.loadById(data.jobId);
        if (!job) {
            return;
        }
        if (!(job.match === true)) {
            return;
        }
        if (!data.createdUserId === job.partyAId) {
            if (!data.createdUserId === job.partyBId) {
                return;
            }
        }
        const honor = rpgUserHonor_service.getTotalHonor({userId: data.createdUserId});
        if (honor < job.reward) {
            return;
        }
        if (job.appeal === true) {
            return;
        }
        data.partyAId = job.partyAId;
        data.partyBId = job.partyBId;
        rpgJobsAppeal_dba.createAppeal(data);
    },

    loadAppealsByJobId: function (data) {
        check(data.jobId, String);
        const appeals = rpgJobsAppeal_dba.loadAppealsByJobId(data);
        return appeals;
    },

    loadAppealByAppealId: function (data) {
        check(data.appealId, String);
        const appeal = rpgJobsAppeal_dba.loadAppealByAppealId(data);
        return appeal;
    },

    loadAppealsToBoard: function () {
        const appeals = rpgJobsAppeal_dba.loadAppealsToBoard();
        return appeals;
    },

    loadCurrentAppealByJobId: function (data) {
        check(data.jobId, String);
        const appeal = rpgJobsAppeal_dba.loadCurrentAppealByJobId(data);
        return appeal;
    },

    setReadTime: function (data) {
        check(data.jobId, String);
        check(data.userId, String);

        const appeal=rpgJobsAppeal_service.loadCurrentAppealByJobId(data);
        if(!appeal){
            return;
        }
        if(appeal.createdUserId===data.userId){
            return;
        }
        if(appeal.partyAId!==data.userId && appeal.partyBId!==data.userId){
            return;
        }
        rpgJobsAppeal_dba.setReadTime(data);
    },

    /**
     * 记录appeal被公共用户浏览的次数和用户记录
     * @param data
     */
    viewAppeal: function (data) {
        check(data.appealId, String);
        const appeal=JobsAppeal.findOne({
            _id:data.appealId
        });
        let view=0;
        if(!appeal){
            return;
        }
        if(appeal.view){
            view=appeal.view*1;
        }
        view++;
        data.view=view;
        rpgJobsAppeal_dba.viewAppeal(data);
    }
};