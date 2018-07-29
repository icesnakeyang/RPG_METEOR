import {ReactiveDict} from "meteor/reactive-dict";
import {rpgJobs_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
Template.myPartyBJobsTpl.onCreated(function () {
    this.state=new ReactiveDict();
});

Template.myPartyBJobsTpl.helpers({
    jobs: function () {
        if (!Meteor.userId()) {
            return;
        }
        const instance = Template.instance();
        let status;
        if (instance.state.get('complete')) {
            // 返回已完成任务
            status = "complete";
        }
        if (instance.state.get('accept')) {
            // 返回已验收任务
            status = "accept";
        }
        if (instance.state.get('match')) {
            // 返回未完成任务
            status = "match";
        }
        if (instance.state.get('stop')) {
            // 返回已经终止的任务
            status = "stop"
        }
        if (instance.state.get('progress')) {
            status = "progress"
        }
        if(!status){
            let tt=rpgJobs_uia.totalJobs(Meteor.userId(), 'progress', 'partyB');
            if(tt>0){
                instance.state.set('progress', true);
                status='progress';
            }else{
                tt=rpgJobs_uia.totalJobs(Meteor.userId(), 'complete','partyB');
                if(tt>0){
                    instance.state.set('complete', true);
                    status='complete';
                }else {
                    tt=rpgJobs_uia.totalJobs(Meteor.userId(), 'accept', 'partyB');
                    if(tt>0){
                        instance.state.set('accept', true);
                        status='accept';
                    }else{
                        tt=rpgJobs_uia.totalJobs(Meteor.userId(), 'stop', 'partyB');
                        if(tt>0){
                            instance.state.set('stop', true);
                            status='stop';
                        }else{
                            tt=rpgJobs_uia.totalJobs(Meteor.userId(), 'match', 'partyB');
                            if(tt>0){
                                instance.state.set('match', true);
                                status='match';
                            }
                        }
                    }
                }
            }
        }
        if(status) {
            const jobs = rpgJobs_uia.loadJobs(Meteor.userId(), status, 'partyB');
            return jobs;
        }
    },

    isProgress: function () {
        const instance = Template.instance();
        if(instance.state.get('progress')){
            return true;
        }
        if (!instance.state.get('complete')) {
            if (!instance.state.get('accept')) {
                if (!instance.state.get('match')) {
                    if(!instance.state.get('stop')) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    isComplete: function () {
        const instance = Template.instance();
        if (instance.state.get('complete')) {
            return true;
        }
        return false;

    },

    isAccept: function () {
        const instance = Template.instance();
        if (instance.state.get('accept')) {
            return true;
        }
        return false;
    },

    isMatch: function () {
        const instance = Template.instance();
        if (instance.state.get('match')) {
            return true;
        }
        return false;
    },

    isStop: function () {
        const instance = Template.instance();
        if (instance.state.get('stop')) {
            return true;
        }
        return false;
    },

    totalProgress: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.totalJobs(Meteor.userId(), 'progress', 'partyB');
        }
        return cc;
    },

    newProgress: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.newJobs(Meteor.userId(), 'progress', 'partyB');
        }
        return cc;
    },

    totalComplete: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.totalJobs(Meteor.userId(), 'complete', 'partyB');
        }
        return cc;
    },

    newComplete: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.newJobs(Meteor.userId(), 'complete', 'partyB');
        }
        return cc;
    },

    totalAccept: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.totalJobs(Meteor.userId(), 'accept', 'partyB');
        }
        return cc;
    },

    newAccept: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.newJobs(Meteor.userId(), 'accept', 'partyB');
        }
        return cc;
    },

    totalStop: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.totalJobs(Meteor.userId(), 'stop', 'partyB');
        }
        return cc;
    },

    newStop: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.newJobs(Meteor.userId(), 'stop', 'partyB');
        }
        return cc;
    },

    totalAppeal: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.totalJobs(Meteor.userId(), 'appeal', 'partyB');
        }
        return cc;
    },

    newAppeal: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.newJobs(Meteor.userId(), 'appeal', 'partyB');
        }
        return cc;
    },

    totalMatch: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.totalJobs(Meteor.userId(), 'match', 'partyB');
        }
        return cc;
    },

    newMatch: function () {
        let cc = 0;
        if (Meteor.userId()) {
            cc = rpgJobs_uia.newJobs(Meteor.userId(), 'match', 'partyB');
        }
        return cc;
    },
});

Template.myPartyBJobsTpl.events({
    'click #bt_progress': function (e, instance) {
        e.preventDefault();
        instance.state.set('complete', false);
        instance.state.set('accept', false);
        instance.state.set('match', false);
        instance.state.set('stop', false);
        instance.state.set('progress', true);
    },

    'click #bt_completed': function (e, instance) {
        e.preventDefault();
        instance.state.set('complete', true);
        instance.state.set('accept', false);
        instance.state.set('match', false);
        instance.state.set('stop', false);
        instance.state.set('progress', false);
    },

    'click #bt_accept': function (e, instance) {
        e.preventDefault();
        instance.state.set('complete', false);
        instance.state.set('accept', true);
        instance.state.set('match', false);
        instance.state.set('stop', false);
        instance.state.set('progress', false);
    },

    'click #bt_stop': function (e, instance) {
        e.preventDefault();
        instance.state.set('stop', true);
        instance.state.set('complete', false);
        instance.state.set('accept', false);
        instance.state.set('match', false);
        instance.state.set('progress', false);
    },

    'click #bt_match': function (e, instance) {
        e.preventDefault();
        instance.state.set('complete', false);
        instance.state.set('accept', false);
        instance.state.set('match', true);
        instance.state.set('stop', false);
        instance.state.set('progress', false);
    }
});