import {rpgJobs_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.jobMatchListTpl.onCreated(function () {
});

Template.jobMatchListTpl.helpers({
    jobs: function () {
        if (Meteor.userId()) {
            var jobs=rpgJobs_uia.loadAllMatchJobs();
            return jobs
        }
        return null;
    },
});



