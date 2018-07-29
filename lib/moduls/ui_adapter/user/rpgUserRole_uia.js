import {check} from "meteor/check";
import {rpgUserRole_service} from "../../service/user/rpgUserRole_service";

export const rpgUserRole_uia = {
    isAdmin: function (userId) {
        check(userId, String);
        return rpgUserRole_service.isAdmin(userId);
    },

    isSecretary: function (userId) {
        check(userId, String);
        return rpgUserRole_service.isSecretary(userId);
    },

    setAdmin: function (data) {
        check(data.userId, String);
        check(data.createdUserId, String);
        rpgUserRole_service.setAdmin(data);
    },

    setSecretary: function (data) {
        check(data.userId, String);
        check(data.createdUserId, String);
        rpgUserRole_service.setSecretary(data);
    },

    unsetAdmin: function (data) {
        check(data.userId, String);
        check(data.processUserId, String);
        rpgUserRole_service.unsetAdmin(data);
    },

    disableSecretary:function (data) {
        check(data.userId, String);
        check(data.processUserId, String);
        rpgUserRole_service.disableSecretary(data);
    },

    loadAdmins: function () {
        const admins = rpgUserRole_service.loadAdmins();
        return admins;
    },

    loadUnAdmins: function () {
        const users = rpgUserRole_service.loadUnAdmins();
        return users;
    },

    loadUnSecretary: function () {
        const users = rpgUserRole_service.loadUnSecretary();
        return users;
    },

    loadSecretary: function () {
        const users = rpgUserRole_service.loadSecretary();
        return users;
    }
};