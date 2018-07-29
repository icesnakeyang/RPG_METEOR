import {check} from "meteor/check";
import {rpgUserHonor_service} from "../../service/user/rpgUserHonor_service";

export const rpgUserHonor_uia={
    loadMyHonors:function (userId) {
        check(userId, String);
        const data = {
            userId: userId
        };
        const honors = rpgUserHonor_service.loadMyHonors(data);
        return honors;
    },

    getTotalHonor:function (userId) {
        check(userId, String);
        const data={
            userId:userId
        };
        const totalHonor=rpgUserHonor_service.getTotalHonor(data);
        return totalHonor;
    }
};