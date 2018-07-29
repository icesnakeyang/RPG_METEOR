import {check} from "meteor/check";
import {TasksLog} from "../../lib/data";

Meteor.methods({
   //1、创建一个私有任务日志
    "TasksLog.insert"(data){
        check(data.taskId, String);
        check(data.content, String);
        check(data.createdUserId, String);

        TasksLog.insert({
            taskId:data.taskId,
            content:data.content,
            createdUserId:data.createdUserId,
            createdTime:new Date()
        });
    }
});