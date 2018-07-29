import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.publicJobsRowTpl.helpers({
    partyA:function () {
        if(this.partyAId) {
            const partyA = rpgUserData_uia.loadUserDataByUserId(this.partyAId);
            return partyA;
        }
    },

    publishTime: function () {
        return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
    }

});

Template.publicJobsRowTpl.events({
    'click #click_Title': function (e, tpl) {
        e.preventDefault();
        if(!this.taskId){
            this.taskId=null;
        }
        Router.go('job.mainPage',{
            _taskId:this.taskId,
            _jobId:this._id
        });
    }
});

