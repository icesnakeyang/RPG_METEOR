import {check} from "meteor/check";
import {UserCash, UserData} from "../../lib/data";

Meteor.methods({
    'UserData.updateBalance'(data) {
        check(data.userId, String);
        check(data.balance, Number);
        UserData.update({
            userId: data.userId
        }, {
            $set: {
                'account.balance': data.balance
            }
        });
    },

    /**
     * 增加一个UserData记录，但不填写任何数据
     * UserData里的数据由service层来修改
     * @param data
     * @constructor
     */
    'UserData.insertNewUserData'(data) {
        check(data.userId, String);
        UserData.insert({
            userId: data.userId
        });
    }
});