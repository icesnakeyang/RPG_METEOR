import {check} from "meteor/check";
import {rpgTasks_service} from "../../service/tasks/rpgTasks_service";
import {rpgJobs_service} from "../../service/jobs/rpgJobs_service";

export const rpgTasks_uia = {
    /**
     * 增删改查/////////////////////////////////////////////////////////////////////////////////////////////////
     * @param data
     */
    createNewTask: function (data) {
        check(data.title, String);
        check(data.days, String);
        check(data.content, String);
        check(data.createdUserId, String);
        data.days = data.days * 1;
        rpgTasks_service.createNewTask(data);
    },

    updateTask: function (data) {
        check(data.taskId, String);
        check(data.title, String);
        check(data.content, String);
        check(data.days, String);
        check(data.updatedUserId, String);

        data.days=data.days*1;

        rpgTasks_service.updateTask(data);
    },

    createNewSubTask: function (data) {
        check(data.pid, String);
        check(data.title, String);
        check(data.createdUserId, String);

        rpgTasks_service.createNewSubTask(data);
    },

    createNewTasksLog: function (data) {
        check(data.taskId, String);
        check(data.content, String);
        check(data.createdUserId, String);

        rpgTasks_service.createNewTasksLog(data);
    },

    deleteTask: function (data) {
        check(data.taskId, String);

        rpgTasks_service.deleteTask(data);
    },

    setCompleteTask: function (data) {
        check(data.taskId, String);

        rpgTasks_service.setCompleteTask(data);
    },

    setUncompleteTask: function (data) {
        check(data.taskId, String);

        rpgTasks_service.setUncompleteTask(data);
    },

    loadById: function (taskId) {
        check(taskId, String);

        let task = rpgTasks_service.loadById(taskId);
        return task;
    },

    loadUncompleteTask: function (userId) {
        check(userId, String);
        return rpgTasks_service.loadUncompleteTask(userId);
    },

    loadCompleteTask: function (userId) {
        check(userId, String);
        return rpgTasks_service.loadCompleteTask(userId);
    },

    loadSubTasksByParentId:function (pid) {
        check(pid, String);
        const tasks=rpgTasks_service.loadSubTasksByParentId(pid);
        return tasks;
    },

    loadNewTaskId:function (userId) {
        check(userId,String);
        const data={
            userId:userId
        };
        const task=rpgTasks_service.loadNewTaskId(data);
        return task;
    },

    /**
     * total 统计/////////////////////////////////////////////////////////////////////////////////////////////////
     */
    totalSubTasks: function (taskId) {
        check(taskId, String);
        return rpgTasks_service.totalSubTasks(taskId);
    },

    totalRootTasksByUserId: function (userId) {
        check(userId, String);
        const cc = rpgTasks_service.totalRootTasksByUserId(userId);
        return cc;
    },
    totalProgressRootTasksByUserId:function (userId) {
        check(userId, String);
        return rpgTasks_service.totalProgressRootTasksByUserId(userId);
    },

    totalCompleteRootTasksByUserId:function (userId) {
        check(userId, String);
        return rpgTasks_service.totalCompleteRootTasksByUserId(userId);
    },

    /**
     * new 新信息/////////////////////////////////////////////////////////////////////////////////////////////////
     */
};