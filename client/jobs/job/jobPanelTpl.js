import {ReactiveDict} from 'meteor/reactive-dict';
import {rpgJobsMatch_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsMatch_uia";
import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.jobPanelTpl.onCreated(function () {
    this.state = new ReactiveDict();
});

Template.jobPanelTpl.onRendered(function () {
    Deps.autorun(function () {
        var theContent = Session.get('content');
        this.$('#summer_content').html(theContent);
    });
});

Template.jobPanelTpl.helpers({
    userB: function () {
        if (this.partyBId) {
            const userB = rpgUserData_uia.loadUserDataByUserId(this.partyBId);
            return userB;
        }
    },

    publishedTime: function () {
        if (this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    contractedTime: function () {
        if (this.contractTime) {
            return moment(this.contreactTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    isComplete: function () {
        if (this.complete) {
            return true;
        }
        return false;
    },

    isAccept: function () {
        if (this.accept) {
            return true;
        }
        return false;
    },

    isProgress: function () {
        if (this.progress) {
            return true;
        }
        return false;
    },

    passedDays: function () {
        let days = 0;
        if (this.contractTime) {
            days = moment(new Date()).diff(this.contractTime, 'days');
        }
        return days;
    },

    leftDays: function () {
        let days = 0;
        if (this.contractTime) {
            days = moment(new Date()).diff(this.contractTime, 'days');
        }
        days = this.days - days;
        return days;
    },

    actualFinishDays: function () {
        if (this.finishDays) {
            return this.finishDays;
        }
    },

    isReject: function () {
        const instance = Template.instance();
        if (instance.state.get('reject')) {
            return true;
        } else {
            return false;
        }
    },

    isPending:function () {
        if(!Meteor.userId()){
            return false;
        }
        if(!this._id){
            return;
        }
        const data={
            jobId:this._id,
            userId:Meteor.userId()
        };
        const isPending=rpgJobsMatch_uia.isMatchMe(data);
        return isPending;
    }
});

Template.jobPanelTpl.events({
    'click #bt_agree': function (e, tpl) {
        e.preventDefault();
        let data = {
            jobId: this._id,
            userId: Meteor.userId(),
            processUserId: Meteor.userId()
        };
        rpgJobsMatch_uia.agreeMatch(data);
        // Router.go('')
    },

    'click #bt_reject': function (e, tpl) {
        e.preventDefault();
        $('#modal1').modal('show');
    },

    'click #confirmReject': function (e, tpl) {
        e.preventDefault();
        if (!this) {
            return;
        }
        if (!Meteor.userId()) {
            return;
        }
        let txtRejectContent = $('#txtRejectContent').val();
        if (txtRejectContent === '') {
            /**todo
             * alert改成modal框提示
             * 使用一个标准的modal提示控件
             */
            alert('Please describe why you reject this mission');
            return;
        }
        let data = {
            jobId: this._id,
            userId: Meteor.userId(),
            processUserId: Meteor.userId(),
            processRemark: txtRejectContent
        };
        rpgJobsMatch_uia.rejectMatch(data);
        $('#modal1').modal('hide');
    }

});

