import {rpgJobsLog_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsLog_uia";

Template.jobLogsTpl.onRendered(function () {
    // $('#summer_content').html('1341');
});

Template.jobLogsTpl.helpers({
    logs: function () {
        if (this.jobId) {
            const logs = rpgJobsLog_uia.loadLogsByJobId(this.jobId);
            return logs;
        }
    },

    totalLog: function () {
        let cc = 0;
        if (this.jobId) {
            cc = rpgJobsLog_uia.totalLog(this.jobId);
        }
        return cc;
    }
});

Template.jobLogsTpl.events({
    'click #btNewLog': function (e, tpl) {
        e.preventDefault();

        Router.go('job.newLog', {
            _jobId: this.jobId
        });
    }
});