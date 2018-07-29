import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgJobs_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.publicAppealBoardRowTpl.helpers({
    createUser: function () {
        if (!this.createdUserId) {
            return;
        }
        const user = rpgUserData_uia.loadUserDataByUserId(this.createdUserId);
        return user;
    },

    createdTime: function () {
        if(this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    codeName:function () {
        if(!this.jobId){
            return;
        }
        const job=rpgJobs_uia.loadById(this.jobId);
        if(job){
            if(job.codeName) {
                return job.codeName;
            }
        }
    },

    jobTitle:function () {
        if(!this.jobId){
            return;
        }
        const job=rpgJobs_uia.loadById(this.jobId);
        if(job){
            return job.title;
        }
    }
});

Template.publicAppealBoardRowTpl.events({
    'click #linkTitle': function (e) {
        e.preventDefault();

        Router.go('job.appeal.detail', {
            _appealId:this._id,
            _jobId:null
        })
    }
});