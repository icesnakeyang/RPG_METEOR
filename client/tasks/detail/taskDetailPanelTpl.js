import {ReactiveDict} from "meteor/reactive-dict";

Template.taskDetailPanelTpl.onCreated(function () {
    this.state = new ReactiveDict();
});

Template.taskDetailPanelTpl.onRendered(function () {
    Deps.autorun(function () {
        var theContent = Session.get('content');
        this.$('#content').html(theContent);
    });
});

Template.taskDetailPanelTpl.helpers({
    createdTime: function () {
        if (this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
});

Template.taskDetailPanelTpl.events({
    'click #linkParent': function (e) {
        e.preventDefault();

        var taskId = this.pid;
        Router.go('task.detail', {_id: taskId});

    },
});