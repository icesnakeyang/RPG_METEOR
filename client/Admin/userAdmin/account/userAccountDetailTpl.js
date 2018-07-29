import {rpgUserCash_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserCash_uia";
import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.userAccountDetailTpl.helpers({
    income: function () {
        if(this.userId) {
            const income=rpgUserCash_uia.getIncome(this.userId);
            return income;
        }
    },

    cost: function () {
        if(this.userId){
            const cost=rpgUserCash_uia.getCost(this.userId);
            return cost;
        }
    },

    topUp: function () {
        if(this.userId){
            const topUp=rpgUserCash_uia.getTopUp(this.userId);
            return topUp;
        }
    },

    balance: function () {
        if(this.userId){
            const user=rpgUserData_uia.loadUserDataByUserId(this.userId);
            if(user){
                if(user.account){
                    if(user.account.balance){
                        return user.account.balance;
                    }
                }
            }
        }
    },

    ledgers: function () {
        if (this.userId) {
            const data={
                userId:this.userId
            };
            var ledgerRows = rpgUserCash_uia.loadUserCashLedger(data);
            return ledgerRows;
        }
    }
});