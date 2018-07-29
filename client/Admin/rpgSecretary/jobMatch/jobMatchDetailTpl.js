import {rpgJobs_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {rpgJobsMatch_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsMatch_uia";

Template.jobMatchDetailTpl.helpers({
    theJob: function () {
        if (this.jobId) {
            const job = rpgJobs_uia.loadById(this.jobId);
            return job;
        }
    },

    matchLogs: function () {
        if (!this.jobId) {
            return;
        }
        const matches = rpgJobsMatch_uia.loadJobsMatchList(this.jobId);
        return matches;
    }
});

Template.jobMatchDetailTpl.events({
    'click #btContract': function (e) {
        e.preventDefault();
        Router.go('match.findFreelancer', {
            _jobId: this.jobId
        });
    }
});