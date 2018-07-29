import {check} from "meteor/check";
import {rpgUserRole_dba} from "../../data_adapter/user/rpgUserRole_dba";

export const rpgUserRole_service = {
    isAdmin: function (userId) {
        check(userId, String);
        return rpgUserRole_dba.isAdmin(userId);
    },

    isSecretary: function (userId) {
        check(userId, String);
        return rpgUserRole_dba.isSecretary(userId);
    },

    setAdmin: function (data) {
        check(data.userId, String);
        check(data.createdUserId, String);
        rpgUserRole_dba.setAdmin(data);
    },

    setSecretary: function (data) {
        check(data.userId, String);
        check(data.createdUserId, String);
        rpgUserRole_dba.setSecretary(data);
    },

    unsetAdmin:function (data) {
        check(data.userId, String);
        check(data.processUserId, String);
        rpgUserRole_dba.unsetAdmin(data);
    },

    disableSecretary:function (data) {
        check(data.userId, String);
        check(data.processUserId, String);
        rpgUserRole_dba.disableSecretary(data);
    },

    loadAdmins: function () {
        const admins = rpgUserRole_dba.loadAdmins();
        return admins;
    },

    loadUnAdmins:function () {
        const users = rpgUserRole_dba.loadUnAdmins();
        return users;
    },

    loadUnSecretary:function () {
        const users=rpgUserRole_dba.loadUnSecretary();
        return users;
    },

    loadSecretary:function () {
        const users=rpgUserRole_dba.loadSecretary();
        return users;
    }
};