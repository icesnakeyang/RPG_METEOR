import {rpgJobsAppeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsAppeal_uia";
import {rpgJobs_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {rpgJobsRepeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsRepeal_uia";

Template.appealDetailTpl.onCreated(function () {
    if(this.data) {
        if(Meteor.userId()) {
            rpgJobsAppeal_uia.viewAppeal(this.data.appealId, Meteor.userId());
        }
    }
});

Template.appealDetailTpl.helpers({
    appeal:function () {
      if(this.appealId) {
          const appeal = rpgJobsAppeal_uia.loadAppealByAppealId(this.appealId);
          if(appeal) {
              Session.set('content', appeal.content);
              return appeal;
          }
      }
    },

    isParty:function () {
        if(!this.appealId){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        const appeal=rpgJobsAppeal_uia.loadAppealByAppealId(this.appealId);
        if(appeal){
            const job=rpgJobs_uia.loadById(appeal.jobId);
            if(job){
                if(job.partyAId===Meteor.userId()||job.partyBId===Meteor.userId()){
                    return true;
                }
            }
        }
        return false;
    },

    totalRepeal:function () {
        if(!this.appealId){
            return;
        }
        const repeals=rpgJobsRepeal_uia.totalRepealByAppeal(this.appealId);
        return repeals;
    },

    newRepeal:function () {
        if (!this.appealId) {
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        let cc = rpgJobsRepeal_uia.newRepealByAppeal(this.appealId, Meteor.userId());
        cc+=rpgJobsRepeal_uia.newProcessRepeal(Meteor.userId(), this.appealId);
        return cc;
    }
});

Template.appealDetailTpl.events({
   'click #btRepeal':function (e) {
       e.preventDefault();

       Router.go('job.repeal',{
           _appealId:this.appealId,
           _jobId:null
       });
   }
});