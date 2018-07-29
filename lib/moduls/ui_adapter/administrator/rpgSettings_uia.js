import {check} from "meteor/check";
import {rpgSettings_service} from "../../service/administrator/rpgSettings_service";

export const rpgSettings_uia={
    getMatchDays: function () {
        const matchDays=rpgSettings_service.getMatchDays();
        return matchDays;
    },

    saveMatchDays:function (data) {
        check(data.matchDays, Number);
        rpgSettings_service.saveMatchDays(data);
    }
};