import {check} from "meteor/check";
import {rpgTasks_dba} from "../../data_adapter/tasks/rpgTasks_dba";
import {rpgUserData_service} from "../user/rpgUserData_service";
import {rpgTasksLog_service} from "./rpgTasksLog_service";
import {rpgJobs_service} from "../jobs/rpgJobs_service";

export const rpgTasks_service = {
    /**
     * 增删改查/////////////////////////////////////////////////////////////////////////////////////////////
     */
    createNewTask: function (data) {
        check(data.title, String);
        check(data.days, Number);
        check(data.content, String);
        check(data.createdUserId, String);

        rpgTasks_dba.insertTask(data);
    },

    updateTask: function (data) {
        check(data.taskId, String);
        check(data.title, String);
        check(data.content, String);
        check(data.days, Number);
        check(data.updatedUserId, String);

        rpgTasks_dba.updateTask(data);
    },

    createNewSubTask: function (data) {
        check(data.pid, String);
        check(data.title, String);
        check(data.createdUserId, String);

        rpgTasks_dba.insertSubTask(data);
    },

    createNewTasksLog: function (data) {
        check(data.taskId, String);
        check(data.content, String);
        check(data.createdUserId, String);

        rpgTasks_dba.insertTasksLog(data);
    },

    deleteTask: function (data) {
        check(data.taskId, String);

        rpgTasks_dba.removeTask(data);
    },

    setCompleteTask: function (data) {
        check(data.taskId, String);

        rpgTasks_dba.completeTask(data);
    },

    setUncompleteTask: function (data) {
        check(data.taskId, String);

        rpgTasks_dba.uncompleteTask(data);
    },

    loadById: function (taskId) {
        check(taskId, String);

        // 先把数据库里的数据读出来
        let task = rpgTasks_dba.loadById(taskId);

        if(!task){
            return;
        }

        task=rpgTasks_service.fillTask(task);

        return task;
    },

    loadUncompleteTask: function (userId) {
        check(userId, String);
        const tasks= rpgTasks_dba.loadUncompleteTask(userId);
        let taskList=[];
        for(var row of tasks){
            row=this.loadById(row._id);
            taskList.push(row);
        }
        return taskList;
    },

    loadCompleteTask: function (userId) {
        check(userId, String);
        const tasks=rpgTasks_dba.loadCompleteTask(userId);
        let taskList=[];
        for(var row of tasks){
            row=this.loadById(row._id);
            taskList.push(row);
        }
        return taskList;
    },

    loadSubTasksByParentId:function (pid) {
        check(pid, String);
        const tasks=rpgTasks_dba.loadSubTasksByParentId(pid);
        return tasks;
    },

    loadNewTaskId:function (data) {
        check(data.userId, String);
        const task=rpgTasks_dba.loadNewTaskId(data);
        return task;
    },

    setJobId:function(data){
        check(data.taskId, String);
        check(data.jobId, String);
        rpgTasks_dba.setJobId(data);
    },

    /**
     * 统计，总数，新状态等////////////////////////////////////////////////////////////////////////////////////
     * @param taskId
     * @returns {*}
     */
    totalSubTasks: function (taskId) {
        check(taskId, String);
        return rpgTasks_dba.totalSubTasks(taskId);
    },

    totalRootTasksByUserId: function (userId) {
        check(userId, String);
        const cc = rpgTasks_dba.totalRootTasksByUserId(userId);
        return cc;
    },

    totalProgressRootTasksByUserId: function (userId) {
        check(userId, String);
        return rpgTasks_dba.totalProgressRootTasksByUserId(userId);
    },

    totalCompleteRootTasksByUserId: function (userId) {
        check(userId, String);
        const cc= rpgTasks_dba.totalCompleteRootTasksByUserId(userId);
        return cc;
    },

    /**
     * business logic 业务逻辑////////////////////////////////////////////////////////////////////////////////////////
     */
    fillTask:function (task) {
        check(task._id, String);

        const taskId=task._id;

        // 再装配相关的信息数据
        task.totalSubTask = rpgTasks_service.totalSubTasks(taskId);
        task.createdUser = rpgUserData_service.loadUserDataByUserId(task.createdUserId);
        task.totalLogs = rpgTasksLog_service.totalLogsByTaskId(taskId);

        //isPublished 是否已经发布
        const job=rpgJobs_service.loadByTaskId(taskId);
        if(job) {
            task.publish = true;
        }
        return task;
    }


};