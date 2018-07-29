import {rpgJobsComplete_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsComplete_uia";

Template.newJobCompleteTpl.events({
    'click #bt_submit':function (e, tpl) {
        e.preventDefault();
        if(!this.jobId){
            return;
        }
        var data={
            jobId:this.jobId,
            createdUserId:Meteor.userId(),
            remark:tpl.$('#txtDesc').val()
        };
        rpgJobsComplete_uia.setComplete(data);
        Router.go('job.complete',{
            _jobId:this.jobId
        });
    }
});