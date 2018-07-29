import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgJobs_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {rpgJobsMatch_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsMatch_uia";

Template.myPartyBJobsRowTpl.helpers({
    newLogs:function(){
        let cc=0;
        if(!Meteor.userId()){
            return;
        }
        if(this._id){
            cc=rpgJobs_uia.newUnreadJob(this._id, Meteor.userId());
        }
        return cc;
    },

    partyA:function () {
        if(this.partyAId){
            const partyA=rpgUserData_uia.loadUserDataByUserId(this.partyAId);
            return partyA;
        }
    },

    partyB:function () {
        if(this.partyBId){
            const partyB=rpgUserData_uia.loadUserDataByUserId(this.partyBId);
            return partyB;
        }
    },

    contractTime:function () {
        if(this.contractTime){
            return moment(this.contractTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
});

Template.myPartyBJobsRowTpl.events({
    'click #task_title': function (e, tpl) {
        e.preventDefault();
        if(!this._id){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        rpgJobsMatch_uia.setReadTime(this._id, Meteor.userId());
        Router.go('job.mainPage', {
            _taskId:this.taskId,
            _jobId:this._id
        });
    }
});