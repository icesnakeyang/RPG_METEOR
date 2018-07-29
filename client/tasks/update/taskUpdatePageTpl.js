import {ReactiveDict} from 'meteor/reactive-dict';
import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.taskUpdatePageTpl.onCreated(function () {
    this.state = new ReactiveDict();
    const instance = Template.instance();
    if (Session.get('contentp')) {
        instance.state.set('content', Session.get('contentp'));
    }
});

Template.taskUpdatePageTpl.onRendered(function () {
    const instance = Template.instance();
    if (instance.state.get('content')) {
        this.$('#txtContent').html(instance.state.get('content'));
    }

    $('#txtContent').summernote({focus: true});

});

Template.taskUpdatePageTpl.helpers({
    task: function () {
        if (!this.taskId) {
            return;
        }
        let task = rpgTasks_uia.loadById(this.taskId);
        if (task) {
            const instance = Template.instance();
            instance.state.set('content', task.content);
            Session.setPersistent('contentp', instance.state.get('content'));
            return task;
        }
    }
});

Template.taskUpdatePageTpl.events({
    'click #btn_update': function (e, tpl) {
        e.preventDefault();

        if (!this.taskId) {
            return;
        }
        if(!Meteor.userId()){
            return;
        }

        // 修改思路：把需要的参数值提交给后台就行了。

        var task={
            taskId:this.taskId,
            title:tpl.$('#newtask_title').val(),
            days:tpl.$('#newtask_days').val(),
            content : tpl.$('#txtContent').summernote('code'),
            updatedUserId:Meteor.userId()
        };

        rpgTasks_uia.updateTask(task);

        Router.go('task.detail', {_id: this.taskId});
    }
});