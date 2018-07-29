import {rpgUserHonor_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserHonor_uia";

Template.honorPageTpl.helpers({
   honorLogs:function () {
       if(!Meteor.userId()){
           return;
       }
       const logs=rpgUserHonor_uia.loadMyHonors(Meteor.userId());
       return logs;
   },

    totalHonor:function () {
       if(!Meteor.userId()){
           return;
       }
       const totalHonor=rpgUserHonor_uia.getTotalHonor(Meteor.userId());
       return totalHonor;
    }
});