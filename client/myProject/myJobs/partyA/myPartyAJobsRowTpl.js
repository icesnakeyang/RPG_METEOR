import {rpgJobs_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.myPartyAJobsRowTpl.onCreated(function () {
    // this.subscribe('UserInfo', Meteor.userId());
    // this.subscribe('UserData', Meteor.userId());

});
Template.myPartyAJobsRowTpl.helpers({
    newLogs: function () {
        var cc = 0;
        if (!Meteor.userId()) {
            return;
        }
        if (this._id) {
            cc = rpgJobs_uia.newUnreadJob(this._id, Meteor.userId());
        }
        return cc;
    },

    userA: function () {
        if (this.partyAId) {
            const user = rpgUserData_uia.loadUserDataByUserId(this.partyAId);
            return user.userInfo.fullName;
        }
    },

    userB: function () {
        // Meteor.subscribe('UserData', this.partyBId);
        if (this.partyBId) {
            const user = rpgUserData_uia.loadUserDataByUserId(this.partyBId);
            if(user){
                return user.userInfo.fullName;
            }
        }
    },

    contractTime: function () {
        if (this.contractTime) {
            return moment(this.contractTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    leftDays: function () {
        let leftdays = moment(new Date()).diff(this.createdTime, 'days');
        leftdays = this.days - leftdays;
        return leftdays;
    },
});

Template.myPartyAJobsRowTpl.events({
    'click #task_title': function (e, tpl) {
        e.preventDefault();

        Router.go('job.mainPage', {
            _taskId: this.taskId,
            _jobId: this._id
        });
    }
});