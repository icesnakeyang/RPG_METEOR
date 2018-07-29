import {rpgUserProfile_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserProfile_uia";
import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.subTaskPagePanelTpl.onCreated(function () {
    //add your statement here
});

Template.subTaskPagePanelTpl.helpers({
    userInfo:function () {
        return rpgUserProfile_uia.userInfo(this.createdUserId);
    },

    createdTime:function () {
        return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
    },

    subTasks:function () {
        var subs=rpgTasks_uia.totalSubTasks(this._id);
        return subs;
    }

});

Template.subTaskPagePanelTpl.events({
    'click #taskDetail':function (e, tpl) {
        e.preventDefault();

        Router.go('task.detail',{_id:this._id});
    }
});

