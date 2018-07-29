import {check} from "meteor/check";
import {rpgUserCash_service} from "../../service/user/rpgUserCash_service";
import {rpgUserCash_dba} from "../../data_adapter/user/rpgUserCash_dba";

export const rpgUserCash_uia={
    //新增一个充值记录
    addNewTopUp: function (data) {
        check(data.userId, String);
        check(data.topUpAmount, Number);
        check(data.createdUserId, String);
        rpgUserCash_service.addNewTopUp(data);
    },

    refreshBalance:function (userId) {
        rpgUserCash_service.refreshBalance(userId);
    },

    loadUserCashLedger:function(data){
        check(data.userId, String);
        const ledger=rpgUserCash_service.loadUserCashLedger(data);
        return ledger;
    },

    getIncome:function (userId) {
        check(userId, String);
        const data={
            userId:userId
        };
        const income=rpgUserCash_service.getIncome(data);
        return income;
    },

    getCost:function (userId) {
        check(userId,String);
        const data={
            userId:userId
        };
        const cost=rpgUserCash_service.getCost(data);
        return cost;
    },

    getTopUp:function (userId) {
        check(userId, String);
        const data={
            userId:userId
        };
        const topUp=rpgUserCash_service.getTopUp(data);
        return topUp;
    }
};