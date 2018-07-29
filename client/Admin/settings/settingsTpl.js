import {rpgSettings_uia} from "../../../lib/moduls/ui_adapter/administrator/rpgSettings_uia";

Template.settingsTpl.helpers({
    matchDays:function () {
        const matchDays=rpgSettings_uia.getMatchDays();
        return matchDays;
    }
});

Template.settingsTpl.events({
    'click #bt_saveMatchDays': function (e, tpl) {
        e.preventDefault();

        var days = tpl.$('#txtDays').val();
        days = days * 1;
        if (days.toString() === 'NaN') {
            alert('Please input number');
            return;
        }
        if (days < 0) {
            alert('Please input number');
            return;
        }

        var data = {
            matchDays: days
        };

        rpgSettings_uia.saveMatchDays(data);
    }
});