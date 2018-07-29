import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgJobsRepeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsRepeal_uia";

Template.appealRowTpl.helpers({
    createUser: function () {
        if (!this) {
            return;
        }
        const user = rpgUserData_uia.loadUserDataByUserId(this.createdUserId);
        return user;
    },

    createdTime: function () {
        if (this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD');
        }
    },

    newRepeal: function () {
        if(!Meteor.userId()){
            return;
        }
        if (!this._id) {
            return;
        }
        let cc = rpgJobsRepeal_uia.newRepealByAppeal(this._id, Meteor.userId());
        cc+=rpgJobsRepeal_uia.newProcessRepeal(Meteor.userId(), this._id);
        return cc;
    }
});

Template.appealRowTpl.events({
    'click #linkTitle': function (e) {
        e.preventDefault();

        Router.go('job.appeal.detail', {
            _appealId: this._id,
            _jobId: null
        })
    }
});