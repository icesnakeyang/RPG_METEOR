import {ReactiveDict} from "meteor/reactive-dict";
import {rpgUserRole_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserRole_uia";
import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.addNewSecretaryTpl.onCreated(function () {
    this.state=new ReactiveDict();
    this.subscribe('Meteor.users');
});

Template.addNewSecretaryTpl.helpers({
    unSecretaries: function () {
        if (!Meteor.userId()) {
            return;
        }
        const instance=Template.instance();
        if(instance.state.get('userId')){
            const user=rpgUserData_uia.loadUserDataByUserId(instance.state.get('userId'));
            if(user) {
                let userList = [];
                userList.push(user);
                return userList;
            }
        }

        const users=rpgUserRole_uia.loadUnSecretary();
        return users;
    },
});

Template.addNewSecretaryTpl.events({
   'click #bt_search':function (e, tpl) {
       let userId = tpl.$('#user_id').val();

       if (userId) {
           const instance = Template.instance();
           instance.state.set('userId', userId);
       } else {
           const instance = Template.instance();
           instance.state.set('userId', null);
       }
   }
});

