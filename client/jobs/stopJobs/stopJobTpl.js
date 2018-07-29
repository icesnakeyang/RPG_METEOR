import {rpgJobsStop_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsStop_uia";
import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {ReactiveDict} from "meteor/reactive-dict";

Template.stopJobTpl.onCreated(function () {
    this.state = new ReactiveDict();
});

Template.stopJobTpl.helpers({
    logs: function () {
        if (!Meteor.userId()) {
            return;
        }
        if (!this.jobId) {
            return;
        }
        const logs = rpgJobsStop_uia.loadStop(this.jobId);
        const instance = Template.instance();
        instance.state.set('stops', logs);
        return logs;
    },

    /**
     * before create stop log, it must check
     * if this job has accept or stop already
     */
    isStopped: function () {
        if (!this.jobId) {
            return;
        }
        const job = rpgJobs_uia.loadById(this.jobId);
        if (job) {
            if (job.stop === true) {
                return true;
            }
            // 如果任务已经验收，也返回true
            if (job.accept === true) {
                return true;
            }
        }
        return false;
    },

    isEdit: function () {
        const instance = Template.instance();
        const logs = instance.state.get('stops');
        if (!logs) {
            return false;
        }
        for (let row of logs) {
            if (!('processResult' in row)) {
                if (row.createdUserId === Meteor.userId()) {
                    return true;
                }
            }
        }
        return false;
    },

    isApprove: function () {
        const instance = Template.instance();
        const logs = instance.state.get('stops');
        if (!logs) {
            return false;
        }
        for (let row of logs) {
            if (!('processResult' in row)) {
                if (row.processUserId === Meteor.userId()) {
                    return true;
                }
            }
        }
        return false;
    },

    isNew: function () {
        const job=rpgJobs_uia.loadById(this.jobId);
        if(job){
            if(job.stop===true){
                return false;
            }
        }
        const instance = Template.instance();
        const logs = instance.state.get('stops');
        if (!logs) {
            return true;
        }
        for (let row of logs) {
            if (!('processResult' in row)) {
                return false;
            }
        }
        return true;
    }

});

Template.stopJobTpl.events({
    'click #linkNew': function (e) {
        e.preventDefault();

        Router.go('job.stop.new', {
            _jobId: this.jobId
        });
    },

    'click #linkEdit': function (e) {
        e.preventDefault();

        Router.go('job.stop.new', {
            _jobId: this.jobId
        })
    },

    'click #linkApprove': function (e) {
        e.preventDefault();
        Router.go('job.stop.approve', {
            _jobId: this.jobId
        });
    }
});
