import {rpgUserRole_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserRole_uia";

Template.manageSecretaryPageTpl.helpers({
    //读取Secretary列表
    secretaries:function () {
        let sects=rpgUserRole_uia.loadSecretary();
        return sects;
    }
});

Template.manageSecretaryPageTpl.events({
    'click #bt_addNewSecretary':function (e) {
        e.preventDefault();

        Router.go('addNewSecretary');
    }
});