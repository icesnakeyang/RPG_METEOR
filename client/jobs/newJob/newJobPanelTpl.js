import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.newJobPanelTpl.onRendered(function () {
    this.$('#summer_content').html(this.data.content);
    this.$('#summer_content').summernote({focus: true});
});

Template.newJobPanelTpl.helpers({
    balance: function () {
        if (Meteor.userId()) {
            const userData = rpgUserData_uia.loadUserDataByUserId(Meteor.userId());
            return userData.account.balance;
        }
    }
});

Template.newJobPanelTpl.events({
    'click #btPublish': function (e, tpl) {
        e.preventDefault();

        if (!Meteor.userId()) {
            return;
        }

        if (!this._id) {
            return;
        }

        let data = {
            userId: Meteor.userId(),
            reward: tpl.$('#reward').val() * 1,
            title: tpl.$('#title').val(),
            codeName: tpl.$('#codeName').val(),
            content: tpl.$('#summer_content').summernote('code'),
            days: tpl.$('#days').val() * 1,
            taskId: this._id,
            createdUserId:Meteor.userId()
        };
        const result = rpgJobs_uia.createNewJob(data);
        Router.go('myProject');
    }
});
