import {ReactiveDict} from "meteor/reactive-dict";
import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.myTasksTpl.onCreated(function () {
    this.state = new ReactiveDict();
    // this.subscribe('Tasks');
});

Template.myTasksTpl.helpers({
    myTasks: function () {
        if (Meteor.userId()) {
            const instance = Template.instance();
            let tasks;
            if (instance.state.get('complete')) {
                tasks = rpgTasks_uia.loadCompleteTask(Meteor.userId());
            } else {
                tasks = rpgTasks_uia.loadUncompleteTask(Meteor.userId());
            }
            return tasks;
        }
    },

    isComplete: function () {
        const instance = Template.instance();
        if (instance.state.get('complete')) {
            return true;
        }
        return false;
    },

    isProgress: function () {
        const instance = Template.instance();
        if (instance.state.get('progress')) {
            return true;
        }
        return false;
    },

    totalProgressTask: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgTasks_uia.totalProgressRootTasksByUserId(Meteor.userId());
        }
        return cc;
    },

    totalCompleteTask: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgTasks_uia.totalCompleteRootTasksByUserId(Meteor.userId());
        }
        return cc;
    },
});

Template.myTasksTpl.events({
    'click #bt_progress': function () {
        const instance = Template.instance();
        instance.state.set('complete', false);
        instance.state.set('progress', true);
    },

    'click #bt_completed': function () {
        const instance = Template.instance();
        instance.state.set('complete', true);
        instance.state.set('progress', false);
    }
});

Template.myTasksTpl.onRendered(function () {
    // this.$('.table').dataTable({
    //     // order: [4, 'dese']
    //     order: [4,'asc']
    // });
});