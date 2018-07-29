import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.publicJobsTpl.onCreated(function () {
    this.subscribe('publishedTasks');
});

Template.publicJobsTpl.helpers({
    // 获取已发布任务集合，未签约的任务
    publicJobs: function () {
        const jobs=rpgJobs_uia.loadAllMatchJobs();
        return jobs;
    }
});
