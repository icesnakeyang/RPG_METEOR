import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgJobsRepeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsRepeal_uia";
import {ReactiveDict} from "meteor/reactive-dict";

Template.repealDetailPanelTpl.onCreated(function () {
    this.state = new ReactiveDict();
});

Template.repealDetailPanelTpl.helpers({
    createdUser: function () {
        if (!this.createdUserId) {
            return;
        }
        Session.set('content', this.content);
        const user = rpgUserData_uia.loadUserDataByUserId(this.createdUserId);
        return user;
    },

    createdTime: function () {
        if (this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    readTime: function () {
        if (this.readTime) {
            return moment(this.readTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    isProcess: function () {
        if (!this.processUserId) {
            return;
        }
        if (this.processTime) {
            return false;
        }
        if (this.processUserId === Meteor.userId()) {
            return true;
        }
        return false;
    },

    clickProcess: function () {

    }
});

Template.repealDetailPanelTpl.onRendered(function () {
    Deps.autorun(function () {
        var theContent = Session.get('content');
        this.$('#content').html(theContent);
    });
});

Template.repealDetailPanelTpl.events({
    'click #btReject': function (e) {
        e.preventDefault();
        if (!Meteor.userId()) {
            return;
        }
        if (!this._id) {
            return;
        }
        if ($('#txtProcessRemark').val() === '') {
            return;
        }

        var data = {
            repealId: this._id,
            processUserId: Meteor.userId(),
            processRemark: $('#txtProcessRemark').val()
        };

        rpgJobsRepeal_uia.rejectRepeal(data);


        Router.go('job.repeal', {
            _appealId: this.appealId,
            _jobId: null
        })
    },

    'click #btAgree': function (e) {
        e.preventDefault();
        if(!this._id){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        var data = {
            repealId: this._id,
            processUserId: Meteor.userId(),
            processRemark: $('#txtProcessRemark').val()
        };
        rpgJobsRepeal_uia.agreeRepeal(data);
        Router.go('job.repeal', {
            _appealId: this.appealId,
            _jobId:null
        })
    }


});