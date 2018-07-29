import {rpgJobsRepeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsRepeal_uia";
import {rpgJobsAppeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsAppeal_uia";
import {rpgJobs_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";


Template.repealTpl.helpers({
    repeals: function () {
        const repeals = rpgJobsRepeal_uia.loadRepealsByAppealId(this.appealId);
        return repeals;
    },

    isNewRepeal: function () {
        /**
         * 当前环境是否可以撤诉
         * 1、登录用户是甲方或者乙方
         * 2、当前appealId未撤诉
         */
        if(!this.appealId){
            return;
        }
        const appeal=rpgJobsAppeal_uia.loadAppealByAppealId(this.appealId);
        if(!appeal){
            return;
        }
        if(appeal.repeal===true){
            return;
        }
        const job=rpgJobs_uia.loadById(appeal.jobId);
        if(job.partyAId!==Meteor.userId() && job.partyBId!==Meteor.userId()){
            return;
        }
        return true;
    }
});

Template.repealTpl.events({
    'click #btNewRepeal': function (e) {
        e.preventDefault();

        Router.go('job.repeal.new', {
            _appealId: this.appealId
        });
    }
});