import {Tasks} from "./data";
import {rpgUserRole_uia} from "./moduls/ui_adapter/user/rpgUserRole_uia";

/**
 * main layout template
 * navbar
 */
Router.configure({
    layoutTemplate: 'layoutTpl'
});

Router.route('home', function () {
    this.render('home');
});

Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.redirect('/login');
    } else {
        this.next();
    }
}, {
    except: ['job.mainPage', '/', '/rpg','rpg2', 'login', 'home2',
        'publishedTask.page','settingsPage', 'api', 'sHZrOy2fNd', 'dashboard']
});

/**
 * login template
 * accounts-ui
 */
Router.route('/login', function () {
    this.render('loginTpl');
});

/**
 * root router
 * display published tasks
 */
Router.route('/', {
    name:'home2',
    action:function () {
        // this.render('home');
        navigator.geolocation.getCurrentPosition((position) => {
            const data={
                longitude:position.coords.longitude,
                latitude:position.coords.latitude
            };
            console.log(data);
            Meteor.call('GPS.addNew',data);
        }, function (error) {
            console.log(error);
        });
        this.redirect('rpg2');
    }
});

Router.route('/dashboard', function () {
    this.render('dashboard');
});

Router.route('rpg', {
    name:'rpg2',
    action:function () {
        this.render('publicJobsTpl');
    }
});

/**
 * published tasks
 */
Router.route('publishedTaskList', function () {
    this.render('publishedTaskListTpl');
});

/**
 * My RPG router
 * main page after signed in, all related route here
 */
// Router.route('/myTasks', {controller:'rControl'});
Router.route('/myProject', function () {
    this.render('myProjectListTpl');
});

rControl = RouteController.extend({
    waitOn: function () {
        return Meteor.subscribe('tasksMap');
    },
    template: function () {
        var count = Tasks.find({createdUserId: Meteor.userId()}).count();
        if (count > 0) {
            return 'myCreatedTaskListTpl';
        } else {
            return 'myTasksPageTpl';
        }
    }
});

/**
 * My profile page
 */
Router.route('/myProfile', function () {
    this.render('myProfileTpl');
});

/**
 * Real name authenticate page
 */
Router.route('realNamePage', function () {
    this.render('realNamePageTpl');
});

/**
 * Create new task
 */
Router.route('/newTask', function () {
    this.render('newTaskTpl');
});

/**
 * my created task list page
 */
Router.route('/myCreatedTaskList', function () {
    this.render('myCreatedTaskListTpl');
});

/**
 * task detail page
 */
Router.route('/taskDetail/:_id', function () {
    var taskId = this.params._id;
    var data = {
        taskId: taskId
    };
    this.render('taskDetailTpl', {
        data: data
    });
}, {
    name: 'task.detail'
});

/**
 * job page
 */
Router.route('/job/:_taskId/jobId/:_jobId', function () {
    var taskId;
    if (this.params._taskId === 'null') {
        taskId = null;
    } else {
        taskId = this.params._taskId;
    }
    var jobId;
    if (this.params._jobId === 'null') {
        jobId = null;
    } else {
        jobId = this.params._jobId;
    }
    var data = {
        taskId: taskId,
        jobId: jobId
    };
    this.render('jobTpl', {data})
}, {
    name: 'job.mainPage'
});

/**
 * new publish the task
 */
Router.route('/newJob/:_taskId', function () {
    var data = {
        taskId: this.params._taskId
    };
    this.render('newJobTpl', {data});
}, {
    name: 'job.newJob'
});

/**
 * update task page
 */
Router.route('/taskUpdatePage/:_id', function () {
    var taskId = this.params._id;
    var data = {taskId: taskId};
    this.render('taskUpdatePageTpl', {data});
}, {
    name: 'taskUpdatePage'
});

/**
 * Task log list page
 */
Router.route('/taskLogPage/:_taskId', function () {
    var data = {
        taskId: this.params._taskId
    };
    this.render('taskLogPageTpl', {data});
}, {
    name: 'task.logPage'
});

/**
 * Create a new task log
 */
Router.route('/newTaskLog/:_taskId', function () {
    var data = {
        taskId: this.params._taskId
    };
    this.render('newTaskLogTpl', {data});
}, {
    name: 'task.newLogPage'
});

/**
 * go to sub task page
 */
Router.route('/subTaskPage/:_id', function () {
    var taskId = this.params._id;
    var data = {taskId: taskId};
    this.render('subTaskPageTpl', {data});
}, {
    name: 'subTaskPage'
});

/**
 * go to create new sub task page
 */
Router.route('/newSubTask', function () {
    this.render('newSubTaskTpl');
});

/**
 * go to my party A task lists
 */
Router.route('myPartyATaskList', function () {
    this.render('myPartyATaskListTpl');
});

/**
 * go to my party B task lists
 */
Router.route('myPartyBTaskList', function () {
    this.render('myPartyBTaskListTpl');
});

/**
 * go to my completed task lists
 */
Router.route('myCompletedTaskList', function () {
    this.render('myCompletedTaskListTpl');
});

/**
 * go to published task logs page
 */
Router.route('jobLogs/:_jobId', function () {
    var data = {
        jobId: this.params._jobId
    };
    this.render('jobLogsTpl', {data});
}, {
    name: 'job.logs'
});

/**
 * go to new published task log
 */
Router.route('newJobLog/:_jobId', function () {
    var data = {
        jobId: this.params._jobId
    };
    this.render('newJobLogTpl', {data});
}, {
    name: 'job.newLog'
});

/**
 * go to email settings page
 */
Router.route('emailPage', function () {
    this.render('emailPageTpl');
});

/**
 * 进入Admin板块
 * 需要检测当前用户是否有Admin权限
 */
Router.route('adminPage', {
    waitOn: function () {
        return Meteor.subscribe('UserRole');
    },
    template: function () {
        if(!Meteor.userId()){
            return;
        }
        if(rpgUserRole_uia.isAdmin(Meteor.userId())){
            return 'adminPageTpl';
        }
    }
});

/**
 * 进入Admin板块
 * 需要检测当前用户是否有Admin权限
 */
Router.route('adminPageTest', function () {
    this.render('adminPageTpl');
});

/**
 * 进入添加Admin用户页面
 */
Router.route('addNewAdmin', function () {
    this.render('addNewAdminTpl');
});

/**
 * 进入等待分配任务页面
 * 需要验证当前用户是否是rpg秘书
 */
Router.route('jobMatchList', {
    waitOn: function () {
        return this.subscribe('UserData');
    },
    template: function () {
        if(!Meteor.userId()){
            return;
        }
        if(rpgUserRole_uia.isSecretary(Meteor.userId())){
            return 'jobMatchListTpl';
        }
    }
});

/**
 * 进入等待分配任务的处理页面
 */
Router.route('jobMatchDetail/:_jobId', function () {
    var jobId;
    if(this.params._jobId==='null'){
        jobId=null;
    }else{
        jobId=this.params._jobId;
    }
    var data={
        jobId:jobId
    };
    this.render('jobMatchDetailTpl', {data});
}, {
    name:'match.jobDetail'
});

/**
 * 进入 寻找威客页面
 */
Router.route('findFreelancer/:_jobId', function () {
    var jobId;
    if(this.params._jobId==='null'){
        jobId=null;
    }else{
        jobId=this.params._jobId;
    }
    var data={
        jobId:jobId
    };
    this.render('findFreelancerTpl',{data});
},{
    name:'match.findFreelancer'
});

/**
 * 已分配给我，等待我确认的任务
 */
Router.route('myPendingTaskList', function () {
    this.render('myPendingTaskListTpl');
});

/**
 * 等待分配任务的详细处理页面
 */
Router.route('pendingTaskDetail/:_assignTaskId', function () {
    var assignTaskId;
    if(this.params._assignTaskId==='null'){
        assignTaskId=null;
    }else{
        assignTaskId=this.params._assignTaskId
    }
    var data={
        assignTaskId:assignTaskId
    };
    this.render('pendingTaskDetailTpl', {data});
},{
    name:'pending.pendingTaskDetail'
});

/**
 * RPG秘书的管理主页面
 */
Router.route('manageSecretaryPage', function () {
    this.render('manageSecretaryPageTpl');
});

/**
 * 进入添加RPG秘书页面
 */
Router.route('addNewSecretary', function () {
    this.render('addNewSecretaryTpl');
});

Router.route('topUpPage', function () {
    this.render('topUpPageTpl');
});

/**
 * 查看我的账户主页面
 */
Router.route('myAccountPage', function () {
    this.render('myAccountPageTpl');
});

Router.route('logInfo', function () {
    this.render('logInfoTpl');
});

/**
 * 进入完成签约任务页面
 */
Router.route('jobComplete/:_jobId', function () {
    var jobId;
    if(this.params._jobId==='null'){
        jobId=null;
    }else{
        jobId=this.params._jobId;
    }
    var data = {
        jobId: jobId
    };
    this.render('jobCompleteTpl', {data});
}, {
    name: 'job.complete'
});

/**
 * 甲方验收通过任务的页面
 */
Router.route('newJobCompleteAccept/:_jobId', function () {
    var jobId;
    if(this.params._jobId==='null'){
        jobId=null;
    }else{
        jobId=this.params._jobId;
    }
    var data={
        jobId:jobId
    };
    this.render('newJobCompleteAcceptTpl', {data});
},{
    name:"job.complete.accept"
});

/**
 * 乙方提交验收任务Log的页面
 */
Router.route('newJobComplete/:_jobId', function () {
    var data = {
        jobId: this.params._jobId
    };
    this.render('newJobCompleteTpl', {data});
}, {
    name: 'job.complete.newComplete'
});

/**
 * 甲方拒绝乙方提交的完成任务log，将任务重新重置为未完成
 */
Router.route('newJobCompleteReject/:_jobId', function () {
    var jobId;
    if(this.params._jobId==='null'){
        jobId=null;
    }else {
        jobId=this.params._jobId;
    }
    var data={
        jobId:jobId
    };
    this.render('newJobCompleteRejectTpl', {data});
},{
    name:'job.complete.reject'
});

/**
 * 进入用户的荣誉值页面
 */
Router.route('honorPage', function () {
    this.render('honorPageTpl');
});

/**
 * 终止任务页面
 */
Router.route('stopJob/:_jobId', function () {
    var jobId;
    if(this.params._jobId==='null'){
        jobId=null;
    }else {
        jobId=this.params._jobId;
    }
    var data = {
        jobId: jobId
    };
    this.render('stopJobTpl', {data});
}, {
    name: 'job.stop'
});

/**
 * 进入创建新stoplog页面
 */
Router.route('newStopJob/:_jobId', function () {
    var data = {
        jobId: this.params._jobId
    };
    this.render('newStopJobTpl', {data});
}, {
    name: 'job.stop.new'
});

Router.route('approveStop/:_jobId',function () {
    var data={
        jobId:this.params._jobId
    };
    this.render('approveStopTpl', {data});
},{
    name:'job.stop.approve'
});

/**
 * public appeal page 公开的申诉广场主页
 */
Router.route('publicAppealBoard', function () {
    this.render('publicAppealBoardTpl');
});

/**
 * 任务的申诉主页
 */
Router.route('jobAppeal/:_jobId', function () {
    var data={
        jobId:this.params._jobId
    };
    this.render('appealTpl', {data});
}, {
    name:'job.appeal'
});

/**
 * 某一个申诉事件的主页面
 */
Router.route('appealDetailTpl/:_appealId/jobId/:_jobId', function () {
    var appealId;
    if(this.params._appealId==='null'){
        appealId=null;
    }else{
        appealId=this.params._appealId;
    }
    var jobId;
    if(this.params._jobId==='null'){
        jobId=null;
    }else{
        jobId=this.params._jobId;
    }
    var data = {
        appealId: appealId,
        jobId: jobId
    };
    this.render('appealDetailTpl', {data});
}, {
    name: 'job.appeal.detail'
});

Router.route('newAppeal/:_jobId', function () {
    var data = {
        jobId: this.params._jobId
    };
    this.render('newAppealTpl', {data});
}, {
    name: 'job.appeal.new'
});

/**
 * 进入撤诉页面
 */
Router.route('repeal/:_appealId/jobId/:_jobId', function () {
    let appealId;
    let jobId;
    if(this.params._appealId==='null'){
        return;
    }else {
        appealId=this.params._appealId;
    }
    if(this.params._jobId==='null'){
        jobId=null;
    }else{
        jobId=this.params._jobId
    }
    var data={
        appealId:appealId,
        jobId:jobId
    };
    this.render('repealTpl', {data});
}, {
    name:'job.repeal'
});

/**
 * 进入新增撤诉申请页面
 */
Router.route('newRepeal/:_appealId', function () {
    var appealId;
    if(this.params._appealId==='null'){
        appealId=null;
    }else{
        appealId=this.params._appealId
    }
    var data={
        appealId:appealId
    };
    this.render('newRepealTpl', {data});
},{
    name:'job.repeal.new'
});

Router.route('repealDetail/:_repealId', function () {
    var repealId;
    if(this.params._repealId==='null'){
        repealId=null;
    }else{
        repealId=this.params._repealId;
    }
    var data={
        repealId:repealId
    };
    this.render('repealDetailTpl', {data});
}, {
    name:'job.repeal.detail'
});

/**
 * 进入设置页面
 */
Router.route('settingsPage', function () {
    this.render('settingsPageTpl');
});

/**
 * 进入查看用户登录情况页面
 */
Router.route('loginLogs', function () {
    this.render('loginLogsTpl');
});

Router.route('accountPage', function () {
    this.render('accountPageTpl');
});

Router.route('userAccountDetail/:_userId', function () {
    var userId;
    if(this.params._userId==='null'){
        userId=null;
    }else{
        userId=this.params._userId;
    }
    var data={
        userId:userId
    };
    this.render('userAccountDetailTpl', {data});
}, {
    name: 'admin.AccountDetail'
});

Router.route('searchResultTpl/:_keyName', function () {
    var keyName;
    if(this.params._keyName==='null'){
        keyName=null;
    }else {
        keyName=this.params._keyName;
    }
    var data={
        keyName:keyName
    };
    this.render('searchResultTpl', {data});
}, {
    name:'search.result'
});

Router.route('partyAMatchLogs/:_jobId', function () {
    var jobId;
    if(this.params._jobId==='null'){
        jobId=null;
    }else{
        jobId=this.params._jobId;
    }
    var data={
        jobId:jobId
    };
    this.render('matchLogTpl', {data});
}, {
    name:'match.logs'
});

Router.route('settings', function () {
    this.render('settingsTpl');
});

Router.route('adminMatchLogs', function () {
    this.render('adminMatchLogsTpl');
});
