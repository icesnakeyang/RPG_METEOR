import {ReactiveDict} from 'meteor/reactive-dict';
import {rpgUserCash_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserCash_uia";
import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.myAccountPageTpl.helpers({
    income: function () {
        if(!Meteor.userId()){
            return;
        }
        const income=rpgUserCash_uia.getIncome(Meteor.userId());
        return income;
    },

    cost: function () {
        if(!Meteor.userId()){
            return;
        }
        const cost=rpgUserCash_uia.getCost(Meteor.userId());
        return cost;
    },

    topUp: function () {
        if(!Meteor.userId()){
            return;
        }
        const topUp=rpgUserCash_uia.getTopUp(Meteor.userId());
        return topUp;
    },

    balance: function () {
        if(!Meteor.userId()){
            return;
        }
        const user=rpgUserData_uia.loadUserDataByUserId(Meteor.userId());
        if(user){
            if(user.account){
                if(user.account.balance){
                    return user.account.balance;
                }
            }
        }
    },

    ledgers: function () {
        if (Meteor.userId()) {
            const data={
                userId:Meteor.userId()
            };
            var ledgerRows = rpgUserCash_uia.loadUserCashLedger(data);
            return ledgerRows;
        }
    }
});

Template.myAccountPageTpl.onCreated(function () {
    this.state = new ReactiveDict();
});