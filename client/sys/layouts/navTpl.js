import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgUserRole_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserRole_uia";
import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {rpgActLog_uia} from "../../../lib/moduls/ui_adapter/administrator/rpgActLog_uia";
import {rpgServerProcessMatch_service} from "../../../lib/moduls/service/administrator/rpgServerProcessMatch_service";

Template.navTpl.onCreated(function () {
    this.subscribe('Tasks');
    // this.subscribe('UserData', Meteor.userId());
    this.subscribe('UserData');
    this.subscribe('TasksLog');
    this.subscribe('UserInfo');
    this.subscribe('Jobs');
    this.subscribe('UserCash');
    this.subscribe('UserRole');
    this.subscribe('JobsMatch');
    this.subscribe('JobsLog');
    this.subscribe('JobsComplete');
    this.subscribe('UserHonor');
    this.subscribe('JobsStop');
    this.subscribe('JobsAppeal');
    this.subscribe('JobsAppealPost');
    this.subscribe('JobsRepeal');
    this.subscribe('ActLog');
    this.subscribe('Settings');
    this.subscribe('gps');
});

Template.navTpl.helpers({
    loginUser:function(){
        if(!Meteor.userId()){
            return;
        }
        const user=rpgUserData_uia.loadUserDataByUserId(Meteor.userId());
        return user;
    },

    isLogin: function () {
        if (Meteor.userId()) {
            // if(Session.get('init')){
            //     return true;
            // }
            // rpgInits.doPendingPartyA(Meteor.userId());
            // rpgInits.doUpdateAssignedUser();
            // rpgInits.refreshAssignOverdue();

            // Session.set('init', true);
            // const result=rpgServerProcessMatch_service.processOverdueMatch();
            // const result2=rpgServerProcessMatch_service.processOverdueJob();
            // console.log('Processed match overdue');
            // console.log(result);
            // console.log('Processed job overdue');
            // console.log(result2);

            return true;
        } else {
            return false;
        }
    },

    email:function () {
        if(!Meteor.userId()){
            return;
        }
        const user=rpgUserData_uia.loadUserDataByUserId(Meteor.userId());
        let email;
        if(user){
            email=user.userInfo.email;
        }else {
            if(Meteor.user()) {
                email = Meteor.user().emails[0].address;
            }
        }
        return email;
    },

    // userInfo: function () {
    //     if (Meteor.userId()) {
    //         return rpgUserData_uia.loadUserDataById(Meteor.userId());
    //     }
    // },
    //
    isAdmin: function () {
        if (Meteor.user()) {
            return rpgUserRole_uia.isAdmin(Meteor.userId());
        }
        return false;
    },
    //
    rpgSecretary: function () {
        if (Meteor.user()) {
            return rpgUserRole_uia.isSecretary(Meteor.userId());
        }
        return false;
    },

    newLogs: function () {
        let cc = 0;
        if(Meteor.userId()) {
            cc=rpgJobs_uia.newMyPartyAUnread(Meteor.userId());
            cc+=rpgJobs_uia.newMyPartyBUnread(Meteor.userId());
        }
        return cc;
    }
});

Template.navTpl.events({
   'click #linkMyProject':function (e) {
       e.preventDefault();
       if(!Meteor.userId()){
           return;
       }
       const action={
           userId:Meteor.userId(),
           action:'CheckProject'
       };
       rpgActLog_uia.createActLog(action);
       Router.go('myProject');
   }
});