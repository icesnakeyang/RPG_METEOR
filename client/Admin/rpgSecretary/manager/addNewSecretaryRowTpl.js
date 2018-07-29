import {rpgUserRole_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserRole_uia";
import {check} from "meteor/check";

Template.addNewSecretaryRowTpl.helpers({
});

Template.addNewSecretaryRowTpl.events({
    'click #bt_Set':function (e) {
        e.preventDefault();

        var data={
            userId:this.userId,
            createdUserId:Meteor.userId()
        };

        rpgUserRole_uia.setSecretary(data);

        Router.go('manageSecretaryPage');
    }
});