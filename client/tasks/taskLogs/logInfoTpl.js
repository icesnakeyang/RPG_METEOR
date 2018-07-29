import {TaskLogs} from "../../../lib/data";

Template.logInfoTpl.helpers({
   log:function () {
       if(Session.get('logId')) {
           return TaskLogs.findOne({_id: Session.get('logId')});
       }
   }
});

Template.logInfoTpl.onCreated(function () {
    this.subscribe('taskLogs');
});