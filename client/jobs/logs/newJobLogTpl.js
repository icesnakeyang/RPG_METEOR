import {rpgJobsLog_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsLog_uia";

Template.newJobLogTpl.events({
    'click #btSave':function (e, tpl) {
        e.preventDefault();
        if(!this){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        // var txtLog = tpl.$('#summer_content').summernote('code');
        var txtLog = tpl.$('#txtContent').val();
        if(!txtLog){
            return;
        }
        var data={
            jobId:this.jobId,
            createdUserId:Meteor.userId(),
            content:txtLog
        };
        rpgJobsLog_uia.createNewLog(data);

        Router.go('job.logs', {
            _jobId:this.jobId
        });
    }
});