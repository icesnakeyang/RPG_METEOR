import {check} from "meteor/check";
import {TasksLog} from "../../../data";

export const rpgTasksLog_dba={
    createNewTasksLog:function (data) {
        check(data.taskId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        Meteor.call('TasksLog.insert', (data));
    },

    loadLogsByTaskId:function (taskId) {
        check(taskId, String);

        const logs=TasksLog.find({
            taskId:taskId
        }).fetch();
        return logs;
    },

    totalLogsByTaskId:function (taskId) {
        check(taskId, String);

        const cc=TasksLog.find({
            taskId:taskId
        }).count();
        return cc;
    }
};