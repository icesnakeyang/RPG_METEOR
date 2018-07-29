import {rpgUserProfile_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserProfile_uia";
import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.myProfileTpl.onCreated(function () {
});

Template.myProfileTpl.helpers({
    profile:function(){
        if(Meteor.userId()) {
            const profile = rpgUserData_uia.loadUserDataByUserId(Meteor.userId());
            return profile;
        }
    },

    registerTime: function () {
        if (Meteor.user()) {
            return moment(Meteor.user().createdAt).format('YYYY-MM-DD HH:mm:ss');
        }
    }
});

Template.myProfileTpl.events({
    'click #bt_authPerson': function (e, tpl) {
        e.preventDefault();

        Router.go('realNamePage');
    },

    'click #bt_authEmail':function (e, tpl) {
        e.preventDefault();

        Router.go('emailPage');
    }
});
