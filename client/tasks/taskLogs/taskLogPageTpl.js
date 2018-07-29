import {rpgTasksLog_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasksLog_uia";

Template.taskLogPageTpl.onCreated(function () {

});

Template.taskLogPageTpl.helpers({
    taskLogs: function () {
        if(this) {
            const taskLogs = rpgTasksLog_uia.loadLogsByTaskId(this.taskId);
            return taskLogs;
        }
    }
});

Template.taskLogPageTpl.events({
    'click #btNewLog':function (e) {
        e.preventDefault();

        Router.go('task.newLogPage',{_taskId:this.taskId});
    }
});
