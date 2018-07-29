import {check} from "meteor/check";
import {rpgUserProfile_service} from "../../service/user/rpgUserProfile_service";

export const rpgUserProfile_uia={
    /**
     * 将用户姓名保存到UserInfo
     * 同时更新UserData的UserInfo
     * @param data
     */
    setRealName: function (data) {
        check(data.userId, String);
        check(data.fullName, String);
        check(data.createdUserId, String);
        check(data.email, String);
        rpgUserProfile_service.setRealName(data);
    },

    userInfo:function (userId) {
        check(userId, String);
        let data={
            userId:userId
        };
        const userInfo=rpgUserProfile_service.userInfo(data);
        return userInfo;
    }
};