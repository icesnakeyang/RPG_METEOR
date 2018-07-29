import {rpgUserRole_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserRole_uia";
import {check} from "meteor/check";

Template.manageSecretaryPageRowTpl.helpers({


});

Template.manageSecretaryPageRowTpl.events({
    'click #bt_disable':function (e) {
        e.preventDefault();

        if(!this){
            return;
        }
        if(!Meteor.userId()){
            return;
        }

        var data={
            userId:this.userId,
            processUserId:Meteor.userId()
        };

        rpgUserRole_uia.disableSecretary(data);
    }
});