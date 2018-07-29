import {check} from "meteor/check";
import {rpgSettings_dba} from "../../data_adapter/administrator/rpgSettings_dba";

export const rpgSettings_service={
    getMatchDays: function () {
        const matchDays=rpgSettings_dba.getMatchDays();
        return matchDays;
    },

    saveMatchDays:function (data) {
        check(data.matchDays, Number);
        rpgSettings_dba.saveMatchDays(data);
    }
};