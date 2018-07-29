import {check} from "meteor/check";
import {UserInfo} from "../../../data";

export const rpgUserInfo_dba={
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
        Meteor.call('UserInfo.insert', data);
    },

    userInfo:function (data) {
        check(data.userId, String);
        const userInfo=UserInfo.findOne({
            userId:data.userId,
            disable:{$exists:false}
        });
        return userInfo;
    }
};