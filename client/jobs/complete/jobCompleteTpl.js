import {rpgJobsComplete_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsComplete_uia";
import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.jobCompleteTpl.helpers({
    logs: function () {
        if (this.jobId) {
            const logs = rpgJobsComplete_uia.loadCompleteByJobId(this.jobId);
            return logs
        }
    },

    /**
     * isCompleted 指仅乙方提交了完成log，但未进行荣誉值转账，甲方还可修改
     */
    isComplete: function () {
        if (this.jobId) {
            const job = rpgJobs_uia.loadById(this.jobId);
            if (job) {
                if (job.complete) {
                    return true;
                }
            }
        }
    },

    /**
     * isAccept 指已经完成荣誉值转账，任务不可修改了
     */
    isAccept: function () {
        if (this.jobId) {
            const job = rpgJobs_uia.loadById(this.jobId);
            if (job) {
                if (job.accept) {
                    return true;
                }
            }
            return false;
        }
    },

    isPartyA: function () {
        if (!Meteor.userId()) {
            return;
        }
        if (!this.jobId) {
            return;
        }
        const job = rpgJobs_uia.loadById(this.jobId);
        if (!job) {
            return;
        }
        if (Meteor.userId() === job.partyAId) {
            return true;
        }
        return false;
    },

    isPartyB: function () {
        if (!Meteor.userId()) {
            return;
        }
        if (!this.jobId) {
            return;
        }
        const job = rpgJobs_uia.loadById(this.jobId);
        if (!job) {
            return;
        }
        if (Meteor.userId() === job.partyBId) {
            return true;
        }
        return false;
    }
});

Template.jobCompleteTpl.events({
    // 甲方修改为未完成状态，查找complete:true，改为false;
    'click #linkSubmit': function (e) {
        e.preventDefault();
        if (!this.jobId) {
            return;
        }
        Router.go('job.complete.newComplete', {
            _jobId: this.jobId
        });
    },

    'click #linkAccept': function (e) {
        e.preventDefault();

        if (!this.jobId) {
            return;
        }
        Router.go('job.complete.accept', {
            _jobId: this.jobId
        });
    },

    'click #linkReject': function (e) {
        e.preventDefault();
        if (!this.jobId) {
            return;
        }
        Router.go('job.complete.reject', {
            _jobId: this.jobId
        });
    }

});
