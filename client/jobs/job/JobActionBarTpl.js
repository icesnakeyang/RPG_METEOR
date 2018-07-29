import {rpgJobsLog_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsLog_uia";
import {rpgJobsComplete_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsComplete_uia";
import {rpgJobsStop_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsStop_uia";
import {rpgJobsAppeal_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsAppeal_uia";
import {rpgJobsMatch_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsMatch_uia";
import {rpgJobsRepeal_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsRepeal_uia";

Template.JobActionBarTpl.helpers({
    job: function () {
    },

    isPartyA: function () {
        if (Meteor.userId()) {
            if (this.partyAId) {
                if (Meteor.userId() === this.partyAId) {
                    return true;
                }
            }
        }
        return false;
    },

    isPartyB: function () {
        if (Meteor.userId()) {
            if (this.partyBId) {
                if (Meteor.userId() === this.partyBId) {
                    return true;
                }
            }
        }
        return false;
    },

    isGuest: function () {
        if (!Meteor.userId()) {
            return true;
        }
        if (this.partyAId) {
            if (Meteor.userId() === this.partyAId) {
                return false;
            }
        }
        if (this.partyBId) {
            if (Meteor.userId() === this.partyBId) {
                return false;
            }
        }
        return true;
    },

    totalLog: function () {
        var cc = 0;
        if (this._id) {
            cc = rpgJobsLog_uia.totalLog(this._id);
        }
        return cc;
    },

    newLog: function () {
        if (!Meteor.userId()) {
            return;
        }
        if (!this) {
            return;
        }
        var cc = 0;
        cc = rpgJobsLog_uia.newLog(Meteor.userId(),this._id);
        return cc;
    },

    totalComplete: function () {
        let cc = 0;
        if (this._id) {
            cc = rpgJobsComplete_uia.totalComplete(this._id)
        }
        return cc;
    },

    newComplete: function () {
        let cc = 0;
        if (!Meteor.userId()) {
            return;
        }
        if (this._id) {
            cc = rpgJobsComplete_uia.newComplete(this._id, Meteor.userId());
        }
        return cc;
    },

    totalStop: function () {
        let cc = 0;
        if (this._id) {
            cc = rpgJobsStop_uia.totalStop(this._id);
        }
        return cc;
    },

    newStop: function () {
        let cc = 0;
        if (Meteor.userId()) {
            if (this._id) {
                cc = rpgJobsStop_uia.newStop(this._id, Meteor.userId());
            }
        }
        return cc;
    },

    totalAppeal: function () {
        let cc = 0;
        if (this._id) {
            cc = rpgJobsAppeal_uia.totalAppeal(this._id);
        }
        return cc;
    },

    newAppeal: function () {
        let cc = 0;
        if (Meteor.userId()) {
            if (this._id) {
                cc = rpgJobsAppeal_uia.newAppeal(this._id, Meteor.userId());
                //new repeal
                const appeal = rpgJobsAppeal_uia.loadCurrentAppealByJobId(this._id);
                if (appeal) {
                    cc = rpgJobsRepeal_uia.newRepealByAppeal(appeal._id, Meteor.userId());
                }
                cc+=rpgJobsRepeal_uia.newProcessRepeal(Meteor.userId());
            }
        }
        return cc;
    },

    totalMatch: function () {
        let cc = 0;
        if (this._id) {
            cc = rpgJobsMatch_uia.totalMatch(this._id);
        }
        return cc;
    }
});

Template.JobActionBarTpl.events({
    'click #btMatch': function (e) {
        e.preventDefault();
        Router.go('match.logs', {
            _jobId: this._id
        });
    },

    'click #btLog': function (e) {
        e.preventDefault();
        if (!Meteor.userId()) {
            return;
        }
        if (!this) {
            return;
        }
        rpgJobsLog_uia.setReadTime(this._id, Meteor.userId());
        Router.go('job.logs', {
            _jobId: this._id
        });
    },

    'click #btComplete': function (e, tpl) {
        e.preventDefault();
        if (!Meteor.userId()) {
            return;
        }
        if (!this) {
            return;
        }
        rpgJobsComplete_uia.setReadTime(this._id, Meteor.userId());
        Router.go('job.complete', {
            _jobId:this._id
        });
    },

    'click #btStop': function (e, tpl) {
        e.preventDefault();
        if (!Meteor.userId()) {
            return;
        }
        if (!this) {
            return;
        }
        rpgJobsStop_uia.setReadTime(this._id, Meteor.userId());
        Router.go('job.stop', {
            _jobId:this._id
        });
    },

    'click #btAppeal': function (e, tpl) {
        e.preventDefault();
        if (!Meteor.userId()) {
            return;
        }
        if (!this) {
            return;
        }
        rpgJobsAppeal_uia.setReadTime(this._id, Meteor.userId());
        Router.go('job.appeal', {
            _jobId:this._id
        });
    },
});
