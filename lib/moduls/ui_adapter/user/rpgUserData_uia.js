import {check} from "meteor/check";
import {rpgUserData_service} from "../../service/user/rpgUserData_service";

export const rpgUserData_uia={
    loadUserDataByUserId:function (userId) {
        check(userId, String);
        const user=rpgUserData_service.loadUserDataByUserId(userId);
        return user;
    },

    loadUserData:function () {
        const userDatas=rpgUserData_service.loadUserData();
        return userDatas;
    },

    loadFreelancer:function (jobId) {
        check(jobId, String);
        const users=rpgUserData_service.loadFreelancer(jobId);
        return users;
    }
};