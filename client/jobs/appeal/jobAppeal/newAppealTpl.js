import {Appeals} from '../../../../lib/data.js';
import {check} from "meteor/check";
import {rpgJobsAppeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsAppeal_uia";


Template.newAppealTpl.onRendered(function () {
    $('.summernote').summernote({
        height: 300,
        // toolbar: false,
        placeholder: 'Describe the reason you are going to appeal',
        // airMode: false
    });
    this.$('.summernote').summernote();
});

Template.newAppealTpl.events({
    'click #btSubmit': function (e, tpl) {
        e.preventDefault();
        if(!this.jobId){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        if(tpl.$('#txtTitle').val()===''){
            return;
        }
        if(tpl.$('#txtContent').summernote('code')===''){
            return;
        }

        var data = {
            jobId: this.jobId,
            createdUserId:Meteor.userId(),
            title: tpl.$('#txtTitle').val(),
            content: tpl.$('#txtContent').summernote('code')
        };
        rpgJobsAppeal_uia.createAppeal(data);
        Router.go('job.appeal', {
            _jobId:this.jobId
        });
    }
});