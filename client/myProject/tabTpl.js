import {rpgJobs_uia} from "../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.tabTpl.onCreated(function () {

});

Template.tabTpl.helpers({
    init: function () {

    },
    activeTask: function () {
        if (Session.get('tab')==='myTask') {
            return true;
        }
        return false;
    },
    activePartyA: function () {
        if (Session.get('tab')==='myPartyA') {
            return true;
        }
        return false;
    },
    activePartyB: function () {
        if (Session.get('tab')==='myPartyB') {
            return true;
        }
        return false;
    },

    myNewCountA:function () {
        if(!Meteor.userId()){
            return;
        }
        const newA=rpgJobs_uia.newMyPartyAUnread(Meteor.userId());
        return newA;
    },

    myNewCountB:function () {
        if(!Meteor.userId()){
            return;
        }
        const newB=rpgJobs_uia.newMyPartyBUnread(Meteor.userId());
        return newB;
    }
});

Template.tabTpl.events({
    'click #myTask': function (e) {
        Session.set('tab', 'myTask');
    },

    'click #myPartyA': function (e) {
        Session.set('tab', 'myPartyA');
    },

    'click #myPartyB': function (e) {
        Session.set('tab', 'myPartyB');
    }
});