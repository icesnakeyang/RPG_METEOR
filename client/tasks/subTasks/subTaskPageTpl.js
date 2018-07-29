import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.subTaskPageTpl.onCreated(function () {
});

Template.subTaskPageTpl.helpers({
    subTasks: function () {
        if(this.taskId) {
            var tasks = rpgTasks_uia.loadSubTasksByParentId(this.taskId);
            return tasks;
        }
    }
});

Template.subTaskPageTpl.events({
    'click #bt_newSub'(e, tpl) {
        e.preventDefault();

        if(!this){
            return;
        }
        if(!Meteor.userId()){
            return;
        }

        var title = tpl.$('#txtTitle').val();

        if (title === '') {
            return;
        }

        const data = {
            pid: this.taskId,
            title: title,
            createdUserId:Meteor.userId()
        };

        rpgTasks_uia.createNewSubTask(data);

        tpl.$('#txtTitle').val('');
    },

    'click #linkSubId': function (e) {
        e.preventDefault();

        var taskId = this._id;
        // Session.set('taskId', taskId);
        Router.go('task.detail', {_id: this._id});
    }
});
