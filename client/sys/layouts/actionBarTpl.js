import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.actionBarTpl.helpers({});

Template.actionBarTpl.events({
    'click #bt_search': function (e, tpl) {
        e.preventDefault();

        var keyName = tpl.$('#txt_content').val();

        if (!keyName) {
            return;
        }
        Router.go('search.result', {
            _keyName: keyName
        });
    }
});