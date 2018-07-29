import {ReactiveDict} from 'meteor/reactive-dict';
import {rpgUserRole_uia} from "../../lib/moduls/ui_adapter/user/rpgUserRole_uia";

Template.adminPageTpl.helpers({
    admins: function () {
        if (!Meteor.userId()) {
            return;
        }
        let admins = rpgUserRole_uia.loadAdmins();
        return admins;
    },
});

Template.adminPageTpl.events({
    'click #bt_progress': function (e, instance) {
        e.preventDefault();
        instance.state.set('completed', false);
    },

    'click #bt_completed': function (e, instance) {
        e.preventDefault();

        instance.state.set('completed', true);
    },

    'click #bt_addNewAdmin': function (e, tpl) {
        e.preventDefault();

        if (!Meteor.userId()) {
            return;
        }

        Router.go('addNewAdmin');
    }
});

Template.adminPageTpl.onCreated(function () {
    this.state = new ReactiveDict();
});

