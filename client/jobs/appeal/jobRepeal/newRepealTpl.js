import {rpgJobsRepeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsRepeal_uia";

Template.newRepealTpl.onRendered(function () {
    $('.summernote').summernote({
        height: 300,
        // toolbar: false,
        placeholder: 'Describe the reason you are going to repeal',
        // airMode: false
    });
    this.$('.summernote').summernote();
});

Template.newRepealTpl.events({
    'click #btSubmit': function (e, tpl) {
        e.preventDefault();
        if(!this.appealId){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        const title=tpl.$('#txtTitle').val();
        if(title===''){
            return;
        }
        const content=tpl.$('#txtContent').summernote('code');
        if(content==='') {
            return;
        }
        var data = {
            appealId: this.appealId,
            createdUserId:Meteor.userId(),
            title:title,
            content: content
        };

        rpgJobsRepeal_uia.createRepeal(data);

        Router.go('job.repeal', {
            _appealId:this.appealId,
            _jobId:null
        });
    }
});