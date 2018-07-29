import {rpgTasks_uia} from "../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";
import {rpgJobs_uia} from "../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.myProjectListTpl.onCreated(function () {
    // this.subscribe('Tasks', Meteor.userId());
    this.subscribe('PartyAJobs', Meteor.userId());
});


Template.myProjectListTpl.helpers({
    initData: function () {
        if (!Meteor.userId()) {
            return;
        }

        let cc = rpgTasks_uia.totalRootTasksByUserId(Meteor.userId());
        if (cc > 0) {
            Session.set('tab', 'myTask');
            return;
        }
        cc = rpgJobs_uia.totalJobs(Meteor.userId(), 'all', 'partyA');
        if (cc > 0) {
            Session.set('tab', 'myPartyA');
            return;
        }
        cc = rpgJobs_uia.totalJobs(Meteor.userId(), 'all', 'partyB');
        if (cc > 0) {
            Session.set('tab', 'myPartyB');
            return;
        }
        Session.set('tab', null);
    },

    myTask: function () {
        if (Session.get('tab') === 'myTask') {
            return true;
        }
    },

    myPartyA: function () {
        if (Session.get('tab') === 'myPartyA') {
            return true;
        }
    },

    myPartyB: function () {
        if (Session.get('tab') === 'myPartyB') {
            return true;
        }
    }
});