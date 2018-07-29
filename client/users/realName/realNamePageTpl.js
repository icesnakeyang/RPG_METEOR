import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgUserProfile_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserProfile_uia";

Template.realNamePageTpl.helpers({
    userData:function () {
        if(Meteor.userId()) {
            const userData=rpgUserData_uia.loadUserDataByUserId(Meteor.userId());
            return userData;
        }
    }
});

Template.realNamePageTpl.events({
    'click #bt_submit': function (e, tpl) {
        e.preventDefault();

        if(!Meteor.userId()){
            return;
        }

        var full_name = tpl.$('#fullName').val();


        if(full_name===''){
            return;
        }

        if(!Meteor.user()){
            return;
        }

        var updateUserInfo={
            fullName:full_name,
            userId:Meteor.userId(),
            createdUserId:Meteor.userId(),
            email:Meteor.user().emails[0].address
        };
        rpgUserProfile_uia.setRealName(updateUserInfo);

        Router.go('/myProfile');
    }
});
