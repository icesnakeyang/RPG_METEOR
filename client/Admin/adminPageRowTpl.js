import {rpgUserData_uia} from "../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgUserRole_uia} from "../../lib/moduls/ui_adapter/user/rpgUserRole_uia";

Template.adminPageRowTpl.helpers({
    userInfo:function () {
        if(this.userId) {
            const user= rpgUserData_uia.loadUserDataByUserId(this.userId);
            return user;
        }
    }
});

Template.adminPageRowTpl.events({
    'click #bt_disable':function (e) {
        e.preventDefault();
        var data = {
            userId:this.userId,
            processUserId: Meteor.userId()
        };
        rpgUserRole_uia.unsetAdmin(data);
    }
});
