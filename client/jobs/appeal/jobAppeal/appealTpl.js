import {rpgJobsAppeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsAppeal_uia";
import {rpgJobs_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {rpgJobsRepeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsRepeal_uia";

Template.appealTpl.helpers({
    appeals: function () {
        if (!this.jobId) {
            return;
        }
        const appeals = rpgJobsAppeal_uia.loadAppealsByJobId(this.jobId);
        return appeals;
    },

    isNew: function () {
        /**
         * isNew指当前环境下是否可以新增一个申诉。
         * 1、任务存在，且处于未申诉状态
         * 2、当前用户是甲方或者乙方
         */
        if (!this.jobId) {
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        let isNew = true;
        const job = rpgJobs_uia.loadById(this.jobId);
        if (!job) {
            isNew = false;
        }else {
            if (job.appeal === true) {
                isNew = false;
            }
            if ((Meteor.userId() !== job.partyAId) && (Meteor.userId() !== job.partyBId)) {
                isNew = false;
            }
        }
        return isNew;
    },

    appealing: function () {
        if (!this.jobId) {
            return;
        }
        const job = rpgJobs_uia.loadById(this.jobId);
        if (job) {
            if (job.appeal === true) {
                return true;
            }
        }
        return false;
    },

    totalRepeal: function () {
        rpgJobsRepeal_uia.loadRepealsByAppealId()
    }
});

Template.appealTpl.events({
    'click #btNewAppeal': function (e, tpl) {
        e.preventDefault();

        Router.go('job.appeal.new', {
            _jobId: this.jobId
        })
    },

    'click #btRepeal': function (e) {
        e.preventDefault();
        if (!this.jobId) {
            return;
        }
        const appeal = rpgJobsAppeal_uia.loadCurrentAppealByJobId(this.jobId);
        if (appeal) {
            Router.go('job.repeal', {
                _appealId: appeal._id,
                _jobId: this.jobId
            })
        }
    }
});