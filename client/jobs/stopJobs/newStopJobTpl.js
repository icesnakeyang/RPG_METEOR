import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {rpgJobsStop_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsStop_uia";

Template.newStopJobTpl.helpers({
    stop:function () {
        if(!this.jobId){
            return;
        }
        let stop=rpgJobsStop_uia.loadCurrentStop(this.jobId);
        if(stop){
            return stop;
        }
        const job = rpgJobs_uia.loadById(this.jobId);
        if (job) {
            stop= {
                refund: job.reward
            }
        }
        return stop;
    }
});

Template.newStopJobTpl.events({
    'click #bt_save': function (e, tpl) {
        e.preventDefault();
        /**
         * 创建一个终止任务申请
         * jobId, createdUserId, remark, refund
         */
        if (!Meteor.userId()) {
            return;
        }
        if (!this.jobId) {
            return;
        }
        if (tpl.$('#txtContent').val() === '') {
            return;
        }
        let refund = 0;
        if (tpl.$('#refund').val() === '') {

        } else {
            refund = tpl.$('#refund').val() * 1;
        }

        var data = {
            jobId: this.jobId,
            userId: Meteor.userId(),
            remark: tpl.$('#txtContent').val(),
            refund: refund
        };
        rpgJobsStop_uia.saveStop(data);

        Router.go('job.stop', {_jobId: this.jobId});
    }

});
