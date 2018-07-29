import {rpgUserProfile_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserProfile_uia";

Template.taskLogPanelTpl.helpers({
    userInfo:function () {
        if(this.createdUserId) {
            const userInfo = rpgUserProfile_uia.userInfo(this.createdUserId);
            return userInfo;
        }
    },

    createdTime:function () {
        if(this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
});

Template.taskLogPanelTpl.events({
    'dblclick #txtLog':function (e) {
        e.preventDefault();

        Session.set('logId', this._id);
        Router.go('logInfo');
    }
});