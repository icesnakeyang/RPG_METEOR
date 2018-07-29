import {UserData, UserRole, UserTypes} from "../../../data";
import {check} from "meteor/check";

export const rpgUserRole_dba = {
    isAdmin: function (userId) {
        check(userId, String);
        let cc = 0;
        cc = UserRole.find({
            userId: userId,
            administrator: true
        }).count();
        if (cc > 0) {
            return true;
        }
        return false;
    },

    isSecretary: function (userId) {
        check(userId, String);
        let cc = 0;
        cc = UserRole.find({
            userId: userId,
            secretary: true
        }).count();
        if (cc > 0) {
            return true;
        }
        return false;
    },

    setAdmin: function (data) {
        check(data.userId, String);
        check(data.createdUserId, String);

        Meteor.call('UserRole.setAdmin', data);
    },

    unsetAdmin:function (data) {
        check(data.userId, String);
        check(data.processUserId, String);
        Meteor.call('UserRole.disableAdmin', data);
    },

    loadAdmins: function () {
        var admins;
        admins = UserData.find({
            'userRole.administrator': true
        }, {
            sort: {createdTime: -1}
        }).fetch();
        return admins;
    },

    loadUnAdmins: function () {
        const users = UserData.find({
            administrator: {$exists: false}
        }).fetch();
        return users;
    },

    loadUnSecretary: function () {
        const users = UserData.find({
            'userRole.secretary': {$exists: false}
        }).fetch();
        return users;
    },

    loadSecretary:function () {
        const users=UserData.find({
            'userRole.secretary':true
        }).fetch();
        return users;
    },

    setSecretary:function (data) {
        check(data.userId, String);
        check(data.createdUserId, String);
        Meteor.call('UserRole.setSecretary', data);
    },

    disableSecretary:function (data) {
        check(data.userId, String);
        check(data.processUserId, String);
        Meteor.call('UserRole.disableSecretary', data);
    }
};