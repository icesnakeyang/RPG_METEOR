import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.jobLogsRowTpl.helpers({
    time1:function () {
        if(this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    
    createUser:function () {
        if(this.createdUserId){
            const user= rpgUserData_uia.loadUserDataByUserId(this.createdUserId);
            return user;
        }
    },

    readTime:function () {
        if(this.readTime){
            return moment(this.readTime).format('YYYY-MM-DD HH:mm:ss');
        }
        return null;
    }
});

