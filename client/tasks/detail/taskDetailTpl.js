import {ReactiveDict} from "meteor/reactive-dict";
import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.taskDetailTpl.onCreated(function () {
    this.state=new ReactiveDict();
});

Template.taskDetailTpl.helpers({
    task: function () {
        if(!this.taskId){
            return;
        }
        console.log('subscribe task');
        Meteor.subscribe('TaskDetail', this.taskId);
        var task =rpgTasks_uia.loadById(this.taskId);
        console.log(task);
        if(task) {
            Session.set('content', task.content);
            const instance=Template.instance();
            instance.state.set('complete', task.complete);
            return task;
        }
    }
});

Template.taskDetailTpl.events({
    'click #btFreelancer': function (e, tpl) {
        e.preventDefault();
        /**
         * 1、判断是否已经发布，如果已经发布就跳转到Job页面
         * 2、如果没有发布，就进入新发布页面
         */
        const task=rpgTasks_uia.loadById(this.taskId);

        if(task.publish){
            Router.go('job.mainPage',{
                _taskId:task._id,
                _jobId:null
            });
        }else {
            Router.go('job.newJob', {
                _taskId: this.taskId
            });
        }
    },

    'click #btLog': function (e, tpl) {
        e.preventDefault();

        var taskId = this.taskId;

        Router.go('task.logPage', {_taskId: this.taskId});
    },

    'click #btSubTask': function (e, tpl) {
        e.preventDefault();

        Router.go('subTaskPage', {_id: this.taskId});
    },

    'click #btComplete': function (e, tpl) {
        e.preventDefault();
        if(!this.taskId){
            return;
        }
        var data={
            taskId:this.taskId
        };
        rpgTasks_uia.setCompleteTask(data);
    },

    'click #btUnComplete': function (e) {
        e.preventDefault();
        if(!this.taskId){
            return;
        }
        data={
            taskId:this.taskId
        };
        rpgTasks_uia.setUncompleteTask(data);
    },

    'click #btDelete': function (e, tpl) {
        e.preventDefault();
        /**
         * 1、查询子任务
         * 2、如果有子任务，询问用户是否整体删除
         * 3、用户选择no，return
         * 4、用户选择yes，删除所有子任务，然后删除该任务
         * 5、跳转到我的任务页面
         */

        if (!this.taskId) {
            return;
        }
        let currentTaskId = this.taskId;

        let totalSubs = rpgTasks_uia.totalSubTasks(currentTaskId);

        if (totalSubs > 0) {
            if (!confirm('You have sub tasks, confirm to delete all?')) {
                return;
            }
        } else {
            if (!confirm('Confirm to delete?')) {
                return;
            }
        }

        //先把父ID读出来，删除后可以跳转到父任务的详细页面
        var task = rpgTasks_uia.loadById(currentTaskId);
        var pid;
        if (task) {
            if (task.pid) {
                pid = task.pid;
            }
        }

        let data = {
            taskId: currentTaskId
        };
        rpgTasks_uia.deleteTask(data);

        if (pid) {
            Router.go('task.detail', {_id: pid});
        } else {
            Router.go('myCreatedTaskList');
        }
    },

    'click #bt_Update': function (e, tpl) {
        e.preventDefault();
        if(!this.taskId){
            return;
        }
        Router.go('taskUpdatePage', {_id: this.taskId});
    }
});