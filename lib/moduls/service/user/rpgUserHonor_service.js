import {check} from "meteor/check";
import {rpgUserHonor_dba} from "../../data_adapter/user/rpgUserHonor_dba";

export const rpgUserHonor_service={
    loadMyHonors:function (data) {
        check(data.userId, String);
        const honors = rpgUserHonor_dba.loadMyHonors(data);
        return honors;
    },

    getTotalHonor:function (data) {
        check(data.userId, String);
        const totalHonor = rpgUserHonor_dba.getTotalHonor(data);
        return totalHonor;
    }
};