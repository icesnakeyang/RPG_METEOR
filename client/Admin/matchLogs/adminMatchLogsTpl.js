import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.adminMatchLogsTpl.onCreated(function () {
});

Template.adminMatchLogsTpl.onRendered(function () {
    $('.table').dataTable({
        order: [ 1, 'desc' ]
    });
});

Template.adminMatchLogsTpl.helpers({
    matchJobs:function () {
        const jobs=rpgJobs_uia.loadAllMatchJobs();
        return jobs;
    }
});