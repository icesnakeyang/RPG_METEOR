import {rpgJobsComplete_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsComplete_uia";

Template.newJobCompleteRejectTpl.events({
   'click #bt_Reject':function (e, tpl) {
       e.preventDefault();
       if(!this.jobId){
           return;
       }
       if(!Meteor.userId()){
           return;
       }
       if(tpl.$('#txtDesc').val()===''){
           return;
       }
       const data={
           jobId:this.jobId,
           processUserId:Meteor.userId(),
           processRemark:tpl.$('#txtDesc').val()
       };
       rpgJobsComplete_uia.setReject(data);
       Router.go('job.complete',{
           _jobId:this.jobId
       });
   }
});