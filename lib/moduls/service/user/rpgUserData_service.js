import {check} from "meteor/check";
import {rpgUserData_dba} from "../../data_adapter/user/rpgUserData_dba";

export const rpgUserData_service={
    loadUserDataByUserId:function (userId) {
        check(userId, String);
        const data={
            userId:userId
        };
        const user=rpgUserData_dba.loadUserDataByUserId(data);
        return user;
    },

    loadUserData:function () {
        const userDatas=rpgUserData_dba.loadUserData();
        return userDatas;
    },

    loadFreelancer:function (jobId) {
        check(jobId, String);
        const data={
            jobId:jobId
        };
        const users=rpgUserData_dba.loadFreelancer(data);
        return users;
    }
};