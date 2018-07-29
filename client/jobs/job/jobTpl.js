import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.jobTpl.helpers({
    job: function () {
        let job;
        if (this.jobId) {
            console.log(this.jobId);
            Meteor.subscribe('JobDetail', this.jobId);
            job = rpgJobs_uia.loadById(this.jobId);
            console.log(job.content);
            if(Meteor.userId()) {
                rpgJobs_uia.setReadOverdue(this.jobId, Meteor.userId());
            }
        } else {
            if (this.taskId) {
                Meteor.subscribe('TaskDetail', this.taskId);
                job =rpgTasks_uia.loadById(this.taskId);
            }
        }
        if(job) {
            Session.set('content', job.content);
        }
        return job;
    }
});
