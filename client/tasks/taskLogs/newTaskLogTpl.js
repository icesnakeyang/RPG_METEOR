import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.newTaskLogTpl.helpers({});

Template.newTaskLogTpl.events({
    'click #btn_newlog': function (e, tpl) {
        e.preventDefault();

        if(!this.taskId){
            return;
        }
        if(!Meteor.userId()){
            return;
        }

        var taskLog = tpl.$('#task_log').val();
        var taskId = this.taskId;

        var log = {
            taskId: this.taskId,
            content: taskLog,
            createdUserId:Meteor.userId()
        };

        rpgTasks_uia.createNewTasksLog(log);

        Router.go('task.logPage', {_taskId: this.taskId});
    }
});