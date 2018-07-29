import {check} from "meteor/check";
import {Tasks} from "../../../data";

export const rpgTasks_dba = {
    /**
     * 增删改查/////////////////////////////////////////////////////////////////////////////////////////////////////
     * @param data
     */
    insertTask: function (data) {
        check(data.title, String);
        check(data.days, Number);
        check(data.content, String);
        check(data.createdUserId, String);

        Meteor.call('Tasks.insert', data);
    },

    updateTask: function (data) {
        check(data.taskId, String);
        check(data.title, String);
        check(data.content, String);
        check(data.days, Number);
        check(data.updatedUserId, String);

        Meteor.call('Tasks.update', data);
    },

    insertSubTask: function (data) {
        check(data.pid, String);
        check(data.title, String);
        check(data.createdUserId, String);

        Meteor.call('Tasks.createNewSubTask', data);
    },

    insertTasksLog: function (data) {
        check(data.taskId, String);
        check(data.content, String);
        check(data.createdUserId, String);

        Meteor.call('TaskLogs.insert', data);
    },

    removeTask: function (data) {
        check(data.taskId, String);

        Meteor.call('Tasks.remove', data);
    },

    completeTask: function (data) {
        check(data.taskId, String);

        Meteor.call('Tasks.complete', data);
    },

    uncompleteTask: function (data) {
        check(data.taskId, String);

        Meteor.call('Tasks.uncomplete', data);
    },

    loadById: function (taskId) {
        check(taskId, String);

        var task = Tasks.findOne({
            _id: taskId
        });

        return task;
    },

    loadUncompleteTask: function (userId) {
        check(userId, String);

        var rows = Tasks.find({
            createdUserId: userId,
            $or: [{complete: {$exists: false}}, {complete: {$ne: true}}],
            pid: {$exists: false}
        }).fetch();

        return rows;
    },

    loadCompleteTask: function (userId) {
        check(userId, String);

        var task = Tasks.find({
                createdUserId: userId,
                pid: {$exists: false},
                complete: true
            },
            {sort: {createdTime: -1}});
        return task;
    },

    loadSubTasksByParentId: function (pid) {
        check(pid, String);

        var tasks = Tasks.find({
            pid: pid
        }).fetch();

        return tasks;
    },

    loadNewTaskId:function (data) {
        check(data.userId,String);
        const task=Tasks.findOne({
            createdUserId:data.userId
        }, {
            sort:{
                createdTime:-1
            }
        });
        return task;
    },

    setJobId:function(data){
        check(data.taskId, String);
        check(data.jobId, String);
        Meteor.call('Tasks.setJobId', data);
    },

    /**
     * total/////////////////////////////////////////////////////////////////////////////////////////////////////
     * @param data
     */
    totalSubTasks: function (taskId) {
        check(taskId, String);

        var subs = Tasks.find({
            pid: taskId
        }).count();
        return subs;
    },
    totalRootTasksByUserId: function (userId) {
        check(userId, String);
        var cc = Tasks.find({
            createdUserId: userId,
            pid: {$exists: false}
        }).count();
        return cc;
    },
    totalProgressRootTasksByUserId: function (userId) {
        check(userId, String);

        var total = Tasks.find({
                createdUserId: userId,
                pid: {$exists: false},
                complete: {$ne: true}
            },
            {sort: {createdTime: -1}}).count();
        return total;
    },
    totalCompleteRootTasksByUserId: function (userId) {
        check(userId, String);

        var total = Tasks.find({
                createdUserId: userId,
                pid: {$exists: false},
                complete: true
            },
            {sort: {createdTime: -1}}).count();
        return total;
    },
    // new ///////////////////////////////////////////////////////////////////////////////////////////////////

};