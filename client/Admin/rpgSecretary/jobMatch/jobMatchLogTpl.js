import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.jobMatchLogTpl.helpers({
    user:function () {
        if(this) {
            const user = rpgUserData_uia.loadUserDataByUserId(this.matchUserId);
            return user;
        }
    },

    matchTime:function () {
        if(this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    readTime:function () {
        if(this.readTime){
            return moment(this.readTime).format('YYYY-MM-DD HH:mm:ss');
        }
        return false;
    },

    processTime:function () {
        if(this.processTime){
            return moment(this.processTime).format('YYYY-MM-DD HH:mm:ss');
        }
        return false;
    },

    processResult:function () {
        if(this.processResult){
            return this.processResult;
        }
        return false;
    }
});