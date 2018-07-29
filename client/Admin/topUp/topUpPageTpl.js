import {ReactiveDict} from "meteor/reactive-dict";
import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.topUpPageTpl.onCreated(function () {
    this.state=new ReactiveDict();
});

Template.topUpPageTpl.helpers({
    user: function () {
        if (Meteor.userId()) {
            const instance=Template.instance();
            if (instance.state.get('userId')) {
                const user=rpgUserData_uia.loadUserDataByUserId(instance.state.get('userId'));
                return user;
            }
        }
    }
});

Template.topUpPageTpl.events({
    'click #bt_search': function (e, tpl) {
        e.preventDefault();

        var uid=tpl.$('#user_id').val();
        const instance=Template.instance();
        instance.state.set('userId', uid);
    }
});