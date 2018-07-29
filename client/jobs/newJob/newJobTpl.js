import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.newJobTpl.onCreated(function () {
});

Template.newJobTpl.helpers({
    task: function () {
        if (!this.taskId) {
            return;
        }
        var task = rpgTasks_uia.loadById(this.taskId);
        return task;
    }
});
