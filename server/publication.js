import {
    Tasks, TasksLog, Jobs, JobsMatch, JobsLog, JobsComplete, JobsStop, JobsAppeal, JobsRepeal,
    UserInfo, UserCash, UserHonor, UserRole, Settings
} from "../lib/data.js";
import {ActLog, GPS, JobsAppealPost, UserData} from "../lib/data";

// Meteor.publish('Tasks', function (createdUserId) {
//     return Tasks.find({
//         createdUserId: createdUserId
//     },{
//         fields:{content:false}
//     });
// });

Meteor.publish('Tasks', function () {
    return Tasks.find({}, {
        fields: {content: false}
    });
});

Meteor.publish('TaskDetail', function (taskId) {
    return Tasks.find({
        _id: taskId
    })
});

Meteor.publish('TasksLog', function () {
    return TasksLog.find();
});

Meteor.publish('Jobs', function () {
    return Jobs.find({}, {
        fields: {content: false}
    });
});

Meteor.publish('JobDetail', function (jobId) {
    return Jobs.find({
        _id: jobId
    })
});

Meteor.publish('JobsMatch', function () {
    return JobsMatch.find();
});

Meteor.publish('JobsLog', function () {
    return JobsLog.find();
});

Meteor.publish('JobsComplete', function () {
    return JobsComplete.find();
});

Meteor.publish('JobsStop', function () {
    return JobsStop.find();
});

Meteor.publish('JobsAppeal', function () {
    return JobsAppeal.find();
});

Meteor.publish('JobsAppealPost', function () {
    return JobsAppealPost.find();
});

Meteor.publish('JobsRepeal', function () {
    return JobsRepeal.find();
});

Meteor.publish('UserData', function () {
    return UserData.find();
});

Meteor.publish('UserInfo', function () {
    return UserInfo.find();
});

Meteor.publish('UserRole', function () {
    return UserRole.find();
});

Meteor.publish('UserCash', function () {
    return UserCash.find();
});

Meteor.publish('UserHonor', function () {
    return UserHonor.find();
});

Meteor.publish('ActLog', function () {
    return ActLog.find();
});

Meteor.publish('Settings', function () {
    return Settings.find();
});

Meteor.publish('gps', function () {
    return GPS.find();
});