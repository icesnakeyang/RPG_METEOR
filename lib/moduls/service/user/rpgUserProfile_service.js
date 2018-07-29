import {check} from "meteor/check";
import {rpgUserInfo_dba} from "../../data_adapter/user/rpgUserInfo_dba";

export const rpgUserProfile_service={
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
        rpgUserInfo_dba.setRealName(data);
    },

    userInfo:function (data) {
        check(data.userId, String);
        const userInfo=rpgUserInfo_dba.userInfo(data);
        return userInfo;
    }
};