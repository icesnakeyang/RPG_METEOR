import {check} from "meteor/check";
import {rpgTasksLog_dba} from "../../data_adapter/tasks/rpgTasksLog_dba";

export const rpgTasksLog_service={
    createNewTasksLog:function (data) {
        check(data.taskId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        rpgTasksLog_dba.createNewTasksLog(data);
    },

    loadLogsByTaskId:function (taskId) {
        check(taskId, String);

        const logs=rpgTasksLog_dba.loadLogsByTaskId(taskId);
        return logs;
    },

    totalLogsByTaskId:function (taskId) {
        check(taskId, String);

        const cc=rpgTasksLog_dba.totalLogsByTaskId(taskId);
        return cc;
    }
};