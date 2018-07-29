import {ReactiveDict} from "meteor/reactive-dict";
import {rpgUserData_uia} from "../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgUserRole_uia} from "../../lib/moduls/ui_adapter/user/rpgUserRole_uia";

Template.addNewAdminTpl.onCreated(function () {
    this.state = new ReactiveDict();
});

Template.addNewAdminTpl.helpers({
    unAdmins: function () {

        if (!Meteor.userId()) {
            return;
        }
        let userList = [];
        const instance = Template.instance();
        if (instance.state.get('userId')) {
            // 有搜索条件，搜索用户
            const theUser = rpgUserData_uia.loadUserDataByUserId(instance.state.get('userId'));
            if (theUser) {
                // 检查这些用户是否已经是管理员，如果不是就加到候选人名单里
                if (!rpgUserRole_uia.isAdmin(theUser.userId)) {
                    userList.push(theUser);
                    return userList;
                }
            }
        } else {
            // 没有搜索条件，显示最近注册的用户
            const users = rpgUserRole_uia.loadUnAdmins();
            return users;
        }
    }
});

Template.addNewAdminTpl.events({
    'click #bt_search': function (e, tpl) {
        e.preventDefault();

        let userId = tpl.$('#user_id').val();

        if (userId) {
            const instance = Template.instance();
            instance.state.set('userId', userId);
        } else {
            const instance = Template.instance();
            instance.state.set('userId', null);
        }

    },

    'click #bt_Set': function (e, tpl) {
        e.preventDefault();

        if (!this.userId) {
            return;
        }
        if (!Meteor.userId()) {
            return;
        }

        var data = {
            userId: this.userId,
            createdUserId: Meteor.userId()
        };

        rpgUserRole_uia.setAdmin(data);

        Router.go('adminPage');
    }
});
