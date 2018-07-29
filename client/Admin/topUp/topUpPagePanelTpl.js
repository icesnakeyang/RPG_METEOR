import {rpgUserCash_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserCash_uia";

Template.topUpPagePanelTpl.helpers({
    balance:function () {
        if(this.account){
            return this.account.balance;
        }else {
            return 0;
        }
    }

});

Template.topUpPagePanelTpl.events({
    'click #bt_topUp':function (e, tpl) {
        e.preventDefault();
        if(!Meteor.userId()){
            return;
        }
        var data={
            userId:this.userId,
            topUpAmount:tpl.$('#txtAmount').val()*1,
            createdUserId:Meteor.userId()
        };
        rpgUserCash_uia.addNewTopUp(data);
        tpl.$('#txtAmount').val('');
    }
});