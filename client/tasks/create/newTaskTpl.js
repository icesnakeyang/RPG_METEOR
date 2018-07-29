import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.newTaskTpl.events({
    'click #bt_save': function (e, tpl) {
        e.preventDefault();

        if (!Meteor.userId()) {
            return;
        }

        let task = {};
        task.title = tpl.$('#newtask_title').val();
        task.days = tpl.$('#newtask_days').val();
        task.content = tpl.$('#newtask_content').val();
        task.createdUserId = Meteor.userId();

        rpgTasks_uia.createNewTask(task);

        Router.go('/myProject');
    }
});