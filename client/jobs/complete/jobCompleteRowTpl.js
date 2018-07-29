import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.jobCompleteRowTpl.helpers({
   createdUser:function () {
       if(this.createdUserId) {
           var user = rpgUserData_uia.loadUserDataByUserId(this.createdUserId);
           return user;
       }
   },

    createdTime:function () {
       if(this.createdTime) {
           return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
       }
    },

    readTime:function () {
       if(this.readTime) {
           const time = moment(this.readTime).format('YYYY-MM-DD HH:mm:ss');
           return time;
       }
       return null;
    },

    processTime:function () {
        if(this.processTime){
            const time=moment(this.processTime).format('YYYY-MM-DD HH:mm:ss');
            return time;
        }
    },

    processReadTime:function () {
        if(this.processReadTime){
            const time=moment(this.processReadTime).format('YYYY-MM-DD HH:mm:ss');
            return time;
        }
    },

    isReject:function () {
        if(this.processResult===false){
            return true;
        }
        return false;
    }
});