import {rpgJobs_uia} from "./moduls/ui_adapter/jobs/rpgJobs_uia";
import {rpgTasks_uia} from "./moduls/ui_adapter/tasks/rpgTasks_uia";
import {rpgUserData_uia} from "./moduls/ui_adapter/user/rpgUserData_uia";
import {gogoTool} from "./gogoTool";
import {rpgJobsLog_uia} from "./moduls/ui_adapter/jobs/rpgJobsLog_uia";
import {rpgJobsComplete_uia} from "./moduls/ui_adapter/jobs/rpgJobsComplete_uia";
import {rpgJobsStop_uia} from "./moduls/ui_adapter/jobs/rpgJobsStop_uia";
import {rpgJobsAppeal_uia} from "./moduls/ui_adapter/jobs/rpgJobsAppeal_uia";

if (Meteor.isServer) {
    var Api = new Restivus({
        apiPath: 'api',
        defaultHeaders: {
            'Content-Type': 'application/json;encoding="UTF-8"'
        },
        useDefaultAuth: true,
        prettyJson: true
    });

    Api.addRoute('public2', {authRequired: false}, {
        get: function () {
            var jobs;
            jobs = rpgJobs_uia.loadAllMatchJobs();
            
            return jobs;
        }
    });

    Api.addRoute('publicTask/:_taskId', {authRequired: false}, {
        get: function () {
            var job;
            job = rpgJobs_uia.loadById(this.urlParams._taskId);
            return job;
        }
    });

    /**
     * 所有与我相关的任务，我的私有任务，我是甲方，我是乙方，分配给我的新任务
     */
    Api.addRoute('myTasks/:_userId', {authRequired: false}, {
        get: function () {
            let myTaskList = [];
            const userId = this.urlParams._userId;
            const tasks = rpgTasks_uia.loadUncompleteTask(userId);
            for (let row of tasks) {
                myTaskList.push(row);
            }
            return myTaskList;
        }
    });

    Api.addRoute('myJobs/:_userId', {authRequired:false}, {
        get: function () {
            const userId = this.urlParams._userId;
            const jobs = rpgJobs_uia.loadJobs(userId, 'progress', 'all');
            let jobList=[];
            for(let row of jobs){
                row.partyA=rpgUserData_uia.loadUserDataByUserId(row.partyAId);
                if(row.partyBId){
                    row.partyB=rpgUserData_uia.loadUserDataByUserId(row.partyBId);
                }
                jobList.push(row);
            }
            return jobList;
        }
    });


    /**
     * 读取一个交易任务的详细信息
     */
    Api.addRoute('myTaskDetail/:_userId/:_publishedTaskId', {authRequired: false}, {
        get: function () {
            const publishedTaskId = this.urlParams._publishedTaskId;
            const userId = this.urlParams._userId;

            var theTask;
            theTask = rpgPublish.loadPublishByPublishId(publishedTaskId);
            if (theTask) {
                theTask.type='PARTYA';
                /**
                 * 获取乙方名称
                 */
                theTask.partyB = rpgUser.userB(theTask._id).fullName;

                //获取任务已经进行的时间
                theTask.elapsedDays = rpgCommon.getElapsedDays(theTask._id);

                //获取任务剩余的天数
                theTask.leftDays = rpgCommon.getLeftDays(theTask._id);
                if (theTask.leftDays < 0) {
                    theTask.overDays = theTask.leftDays * -1;
                    theTask.leftDays = 0;
                } else {
                    theTask.overDays = 0;
                }

                //获取日志总数
                theTask.totalLog = rpgCounter.countLogsByPub(publishedTaskId);
                //获取新日志总数
                theTask.newLog = rpgCounter.newLogsPub(userId, publishedTaskId);

                //获取完成任务的日志总数
                theTask.totalComplete = rpgCounter.countCompleteByPub(publishedTaskId);
                //获取新的完成任务日志总数
                theTask.newComplete = rpgCounter.newCompleteLogsPub(userId, publishedTaskId);

                //获取终止任务的日志总数
                theTask.totalStop = rpgCounter.countStopsByPub(publishedTaskId);
                //获取新的终止任务日志总数
                theTask.newStop = rpgCounter.newStopLogsPub(userId, publishedTaskId);

                //获取任务的申诉日志总数
                theTask.totalAppeal = rpgCounter.countAppealByPub(publishedTaskId);
                //获取任务新的申诉日志总数
                theTask.newAppeal = rpgCounter.newAppealPub(userId, publishedTaskId);

                //获取任务的状态
                if (rpgStatus.isAccept(publishedTaskId)) {
                    theTask.isAccept = true;
                }
                if (rpgStatus.isComplete(publishedTaskId)) {
                    theTask.isComplete = true;
                }
                if (rpgStatus.isContract(publishedTaskId)) {
                    theTask.isContract = true;
                }
                if (rpgStatus.isPending(publishedTaskId)) {
                    theTask.isPending = true;
                }
                if (rpgStatus.isProgress(publishedTaskId)) {
                    theTask.isProgress = true;
                }
            }
            if (!theTask) {
                theTask = rpgPrivateTask_uidap.loadById(publishedTaskId);
                if(theTask){
                    theTask.type='PRIVATE';
                }
            }

            return theTask;
        }
    });

    Api.addRoute('jobDetail/:_jobId/:_userId', {authRequired: false}, {
        get: function () {
            const jobId = this.urlParams._jobId;
            const userId = this.urlParams._userId;

            const job=rpgJobs_uia.loadById(jobId);
            if (job) {
                //获取任务已经进行的时间
                if(job.contractTime) {
                    job.elapsedDays = gogoTool.diffDays(job.contractTime, new Date());

                    //获取任务剩余的天数
                    job.leftDays = job.days - job.elapsedDays;
                    if(job.leftDays<0) {
                        job.overDays = job.leftDays * -1;
                    }else {
                        job.overDays=0;
                    }
                }
                //获取日志总数
                job.totalLog=rpgJobsLog_uia.totalLog(jobId);
                //获取新日志总数
                job.newLog=rpgJobsLog_uia.newLog(userId,jobId);
                //获取完成任务的日志总数
                job.totalComplete=rpgJobsComplete_uia.totalComplete(jobId);
                //获取新的完成任务日志总数
                job.newComplete=rpgJobsComplete_uia.newComplete(jobId, userId);
                //获取终止任务的日志总数
                job.totalStop=rpgJobsStop_uia.totalStop(jobId);
                //获取新的终止任务日志总数
                job.newStop=rpgJobsStop_uia.newStop(jobId,userId);
                //获取任务的申诉日志总数
                job.totalAppeal=rpgJobsAppeal_uia.totalAppeal(jobId);
                //获取任务新的申诉日志总数
                job.newAppeal=rpgJobsAppeal_uia.newAppeal(jobId, userId);


                //获取任务的状态

            }


            return job;
        }
    });

    /**
     * 读取一个交易任务的所有日志信息
     */
    Api.addRoute('jobLog/:_jobId', {authRequired: false}, {
        get: function () {
            const logs=rpgJobsLog_uia.loadLogsByJobId(this.urlParams._jobId);
            for (let row of logs) {
                row.createUser=rpgUserData_uia.loadUserDataByUserId(row.createdUserId);
            }
            return logs;
        }
    });

    /**
     * 读取一个交易任务的所有终止日志信息
     */
    Api.addRoute('publishedTaskStops/:_publishedTaskId', {authRequired: false}, {
        get: function () {
            var stops;
            stops = rpgStop.loadStopsByPublishedId(this.urlParams._publishedTaskId).fetch();

            for (var row of stops) {
                row.createUser = rpgUser.userInfo(row.createdUserId).fullName;
            }

            return stops;
        }
    });

    Api.addRoute('publishedTaskCompleteLogs/:_publishedTaskId', {authRequired: false}, {
        get: function () {
            var completeLogs;
            completeLogs = rpgComplete.loadCompleteLogsByPublishId(this.urlParams._publishedTaskId).fetch();

            for (var row of completeLogs) {
                row.createUser = rpgUser.userInfo(row.createdUserId).fullName;
                row.publishUser = rpgUser.userInfo(row.publishUserId).fullName;
                if (row.readUserId) {
                    row.readUser = rpgUser.userInfo(row.readUserId).fullName;
                }
            }
            return completeLogs;
        }
    });

    Api.addRoute('setPublishedTaskStopReadTime/:_publishedTaskId/:_readUserId', {authRequired: false}, {
        get: function () {
            var publishedTaskId = this.urlParams._publishedTaskId;
            var userId = this.urlParams._readUserId;

            rpgStop.setReadTime(publishedTaskId, userId);

            var result = {
                result: 200
            };

            return result;
        }
    });

    Api.addRoute('setPublishedTaskLogReadTime/:_publishedTaskId/:_readUserId', {authRequired: false}, {
        get: function () {
            var publishedTaskId = this.urlParams._publishedTaskId;
            var userId = this.urlParams._readUserId;

            rpgLog.setReadTime(publishedTaskId, userId);

            var result = {
                result: 200
            };

            return result;
        }
    });

    Api.addRoute('setPublishedTaskCompleteReadTime/:_publishedTaskId/:_readUserId', {authRequired: false}, {
        get: function () {
            var publishedTaskId = this.urlParams._publishedTaskId;
            var userId = this.urlParams._readUserId;

            rpgComplete.setReadTime(publishedTaskId, userId);

            var result = {
                result: 200
            };

            return result;
        }
    });

    Api.addRoute('testp',{authRequired:false},{
        post:{
            action(){

                console.log(this.urlParams);
                const result={
                result:'200'
                };
                return result;
            }
        }
    });

    Api.addRoute('createNewPrivateTask/:_title/:_detail/:_days/:_userId', {authRequired: false}, {
        get: {
            action: function () {
                var data = {
                    title: this.urlParams._title,
                    detail: this.urlParams._detail,
                    days: this.urlParams._days,
                    userId: this.urlParams._userId
                };

                rpgPrivateTask_uidap.createNewPrivateTask(data);
                var result = {result: 200};
                return result;
            }
        },
        post: {
            action: function () {
                // var data=this.urlParams.data;
                //     console.log(this.urlParams._xxx);
                // console.log(data);
                var result = {
                    result: '200'
                };
                return result;
            }
        }
    });
}