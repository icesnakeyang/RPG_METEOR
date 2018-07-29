import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.accountPageTpl.helpers({
    users:function () {
        const users=rpgUserData_uia.loadUserData();
        return users;
    }
});