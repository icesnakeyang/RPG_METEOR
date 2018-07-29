import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.jobMatchRowTpl.helpers({
    partyA:function () {
        if(this.partyAId) {
            const partyA=rpgUserData_uia.loadUserDataByUserId(this.partyAId);
            return partyA;
        }
    },
    pubTime:function () {
        if(this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
});

Template.jobMatchRowTpl.events({
   'click #title':function (e, tpl) {
       e.preventDefault();

       Router.go('match.jobDetail',
           {_jobId:this._id});
   }
});