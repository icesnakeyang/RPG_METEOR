import {rpgJobsStop_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsStop_uia";

Template.approveStopTpl.helpers({
    stop:function () {
        if(!this.jobId){
            return;
        }
        const stop=rpgJobsStop_uia.loadCurrentStop(this.jobId);
        return stop;
    }
});

Template.approveStopTpl.events({
   'click #bt_reject':function (e,tpl) {
       e.preventDefault();
       if(!this.jobId){
           return;
       }
       if(!Meteor.userId()){
           return;
       }
       if(!$('#txtContent').val()===''){
           return;
       }
       const data={
           jobId:this.jobId,
           userId:Meteor.userId(),
           processRemark:$('#txtContent').val()
       };
       rpgJobsStop_uia.rejectStop(data);

       Router.go('job.stop',{
           _jobId:this.jobId
       });
    },

    'click #bt_agree':function (e, tpl) {
        e.preventDefault();
        if(!this.jobId){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        const data={
            jobId:this.jobId,
            userId:Meteor.userId(),
            processRemark:$('#txtContent').val()
        };

        rpgJobsStop_uia.agreeStop(data);

        Router.go('job.stop',{
            _jobId:this.jobId
        });
    }
});