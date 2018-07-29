import {check} from "meteor/check";
import {rpgTasksLog_service} from "../../service/tasks/rpgTasksLog_service";

export const rpgTasksLog_uia={
    createNewTasksLog:function (data) {
        check(data.taskId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        rpgTasksLog_service.createNewTasksLog(data);
    },

    loadLogsByTaskId:function (taskId) {
        check(taskId, String);

        const logs=rpgTasksLog_service.loadLogsByTaskId(taskId);
        return logs;
    },

    totalLogsByTaskId:function (taskId) {
        check(taskId, String);

        const cc=rpgTasksLog_service.totalLogsByTaskId(taskId);
        return cc;
    }
};