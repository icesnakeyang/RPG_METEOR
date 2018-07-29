import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.loginLogsRowTpl.helpers({
    userName:function () {
        if(this.userId) {
            const user=rpgUserData_uia.loadUserDataByUserId(this.userId);
            if(user){
                return user.userInfo.fullName;
            }
        }
    },

    createdTime:function () {
        if(this.createdTime){
            return moment(this.createdTime).format('YYYY-MM-DD HH:MM:ss');
        }
    }
});