import {check} from "meteor/check";
import {Tasks, TasksLog} from "../../lib/data.js";

Meteor.methods({
    /**
     * 新增一条私有任务记录
     */
    'Tasks.insert'(task) {
        check(task.title, String);
        check(task.days, Number);
        check(task.content, String);
        check(task.createdUserId, String);

        Tasks.insert({
            title: task.title,
            days: task.days,
            content: task.content,
            createdTime: new Date(),
            createdUserId: task.createdUserId
        });
    },

    'Tasks.update'(task) {
        check(task.taskId, String);
        check(task.title, String);
        check(task.content, String);
        check(task.days, Number);
        check(task.updatedUserId, String);

        Tasks.update({
            _id: task.taskId
        }, {
            $set: {
                title: task.title,
                content: task.content,
                days: task.days,
                updatedTime: new Date(),
                updatedUserId: task.updatedUserId
            }
        });
    },

    'Tasks.createNewSubTask'(data) {
        check(data.pid, String);
        check(data.title, String);
        check(data.createdUserId, String);

        Tasks.insert({
            title: data.title,
            pid: data.pid,
            createdTime: new Date(),
            createdUserId: data.createdUserId
        })
    },

    'TaskLogs.insert'(log) {
        check(log.taskId, String);
        check(log.content, String);
        check(log.createdUserId, String);

        TasksLog.insert({
            taskId: log.taskId,
            content: log.content,
            createdTime: new Date(),
            createdUserId: log.createdUserId
        });
    },

    'Tasks.remove'(data) {
        check(data.taskId, String);

        //delete sub tasks
        Tasks.remove({
            pid: data.taskId
        });

        //delete task
        Tasks.remove({
            _id: data.taskId
        });
    },

    'Tasks.uncomplete'(data) {
        check(data.taskId, String);

        Tasks.update({
            _id: data.taskId
        }, {
            $set: {
                complete: false,
                UncompletedTime: new Date()
            }
        })
    },

    'Tasks.complete'(data) {
        check(data.taskId, String);

        Tasks.update({
            _id: data.taskId
        }, {
            $set: {
                complete: true,
                completedTime: new Date()
            }
        })
    },

    'Tasks.setJobId'(data) {
        check(data.taskId, String);
        check(data.jobId, String);

        Tasks.update({
            _id: data.taskId
        }, {
            $set: {
                publish: true,
                jobId: data.jobId
            }
        });
    }
});