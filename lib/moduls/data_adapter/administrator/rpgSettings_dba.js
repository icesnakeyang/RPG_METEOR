import {Settings} from "../../../data";
import {check} from "meteor/check";

export const rpgSettings_dba = {
    getMatchDays: function () {
        let matchDays = 7;
        const row = Settings.findOne({
            matchDays: {$exists: true}
        });
        if (row) {
            if (row.matchDays) {
                matchDays = row.matchDays*1;
            }
        }
        return matchDays;
    },

    saveMatchDays:function (data) {
        check(data.matchDays, Number);
        Meteor.call('Settings.saveMatchDays', data);
    }
};