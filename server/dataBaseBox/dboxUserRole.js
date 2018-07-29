import {check} from "meteor/check";
import {UserData, UserRole, UserTypes} from "../../lib/data";

Meteor.methods({
    'UserRole.setAdmin':function (data) {
        /**
         * 设置一个用户的权限角色
         * 1、把之前的Admin记录全部disable
         * 2、新增一个userRole记录
         * 3、修改UserData集合里的administrator字段
         */
        check(data.userId, String);
        check(data.createdUserId, String);
        UserRole.update({
            userId:data.userId,
            administrator:true
        }, {
            $set:{
                administrator:false,
                disabledTime:new Date(),
                disabledUserId:data.createdUserId
            }
        });
        UserRole.insert({
            userId:data.userId,
            createdUserId:data.createdUserId,
            createdTime:new Date(),
            administrator:true
        });
        //修改UserData
        UserData.update({
            userId:data.userId
        }, {
            $set:{
                'userRole.administrator':true
            }
        });
    },

    'UserRole.setSecretary':function (data) {
        /**
         * 设置一个用户的权限角色
         * 1、把之前的Secretary记录全部disable
         * 2、新增一个userRole记录
         * 3、修改UserData集合里的secretary字段
         */
        check(data.userId, String);
        check(data.createdUserId, String);
        UserRole.update({
            userId:data.userId,
            secretary:true
        }, {
            $set:{
                secretary:false,
                disabledTime:new Date(),
                disabledUserId:data.createdUserId
            }
        });
        UserRole.insert({
            userId:data.userId,
            createdUserId:data.createdUserId,
            createdTime:new Date(),
            secretary:true
        });
        //修改UserData
        UserData.update({
            userId:data.userId
        }, {
            $set:{
                'userRole.secretary':true
            }
        });
    },

    'UserRole.disableAdmin'(data) {
        check(data.userId, String);
        check(data.processUserId, String);

        /**
         * 1、修改UserRole
         * 2、修改UserData
         */
        UserRole.update({
            userId:data.userId,
            administrator:true
        }, {
            $set: {
                administrator: false,
                disabledTime: new Date(),
                disabledUserId: data.processUserId
            }
        }, function (err) {
            if(err){
                console.log(err);
            }
        });
        UserData.update({
            userId:data.userId
        },{
            $unset:{
                'userRole.administrator':""
            }
        })
    },

    'UserRole.disableSecretary'(data) {
        check(data.userId, String);
        check(data.processUserId, String);

        /**
         * 1、修改UserRole
         * 2、修改UserData
         */
        UserRole.update({
            userId:data.userId,
            secretary:true
        }, {
            $set: {
                secretary: false,
                disabledTime: new Date(),
                disabledUserId: data.processUserId
            }
        }, function (err) {
            if(err){
                console.log(err);
            }
        });
        UserData.update({
            userId:data.userId
        },{
            $unset:{
                'userRole.secretary':""
            }
        })
    },
});