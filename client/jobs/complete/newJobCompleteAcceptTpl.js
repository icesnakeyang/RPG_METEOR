import {rpgJobsComplete_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsComplete_uia";

Template.newJobCompleteAcceptTpl.events({
    'click #bt_Accept':function (e, tpl) {
        e.preventDefault();
        if(!this.jobId){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        if(!tpl.$('#txtDesc').val()===''){
            return;
        }
        var data={
            jobId:this.jobId,
            createdUserId:Meteor.userId(),
            remark:tpl.$('#txtDesc').val()
        };
        rpgJobsComplete_uia.setAccept(data);

        Router.go('job.complete',{
            _jobId:this.jobId
        });
    }
});