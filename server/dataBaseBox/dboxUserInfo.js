/**
 * 模块说明
 * UserInfo用于记录用户每次更新自己的个人信息，这是一个用户个人信息的变更日志。
 * 用户当前的最新信息需要保存到UserData集合里。
 * 更新UserInfo的动作是，先把所有记录设置为失效Disable
 * 然后insert新UserInfo
 * 最后更新UserData的UserInfo子集
 */
import {check} from "meteor/check";
import {UserData, UserInfo, UserInfos} from "../../lib/data";

Meteor.methods({
    "UserInfo.insert"(data) {
        check(data.userId, String);
        check(data.fullName, String);
        check(data.email, String);
        check(data.createdUserId, String);

        //1、把以前的UserInfo记录设置为失效
        UserInfo.update({
            userId: data.userId
        }, {
            $set: {
                //增加disable值就表示该条数据已经失效，
                // 没有disable值的数据就是当前有效数据
                disable: true,
                disableTime: new Date()
            }
        }, {multi: true});

        //2、新增一条UserInfo记录
        UserInfo.insert({
            userId: data.userId,
            fullName: data.fullName,
            email: data.email,
            createdTime: new Date(),
            createdUserId: data.createdUserId
        });

        //3、更新UserData集合里的UserInfo子集
        //如果没有UserData则新增一条。
        let userData=UserData.findOne({
            userId:data.userId
        });
        let userInfo = {
            fullName: data.fullName,
            email: data.email
        };
        if(userData) {
            UserData.update({
                userId: data.userId
            }, {
                $set: {
                    userInfo: userInfo
                }
            });
        }else {
            UserData.insert({
                userId:data.userId,
                userInfo:userInfo
            })
        }
    }
});