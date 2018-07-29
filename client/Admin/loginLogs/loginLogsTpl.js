import {rpgActLog_uia} from "../../../lib/moduls/ui_adapter/administrator/rpgActLog_uia";

Template.loginLogsTpl.onCreated(function () {
});

Template.loginLogsTpl.onRendered(function () {
    $('.table').dataTable({
        // order: [ 1, 'desc' ]
    });
});

Template.loginLogsTpl.helpers({
    loginLogs:function () {
        const logs=rpgActLog_uia.loadActLogs();
        return logs;
    }
});