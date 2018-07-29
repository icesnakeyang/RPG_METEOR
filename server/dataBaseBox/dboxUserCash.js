import {check} from "meteor/check";
import {UserCash, UserData} from "../../lib/data";

Meteor.methods({
    'UserCash.addAmount'(param) {
        check(param.userId, String);
        check(param.cashBook.amount, Number);
        check(param.cashBook.type, String);
        check(param.createdUserId, String);
        // 新增一条cash记录
        UserCash.insert({
            userId: param.userId,
            cashBook:param.cashBook,
            createdUserId: param.createdUserId,
            createdTime: new Date()
        });

        // 查找UserData，修改balance
        const userData = UserData.findOne({
            userId: param.userId,
            account: {$exists: true}
        });
        if (userData) {
            let amount = userData.account.balance * 1;
            amount = amount + param.cashBook.amount;
            UserData.update({
                userId: param.userId
            }, {
                $set: {
                    'account.balance': amount
                }
            });
        } else {
            const account = {
                balance: param.cashBook.amount
            };
            UserData.update({
                userId: param.userId
            }, {
                $set: {
                    account: account
                }
            });
        }
    }
});