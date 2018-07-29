import {check} from "meteor/check";
import {JobsLog, PublishedTaskLogs} from "../../lib/data";

Meteor.methods({
    'JobsLog.setReadTime'(data) {
        check(data.jobId, String);
        check(data.userId, String);

        JobsLog.update({
            jobId: data.jobId,
            readTime: {$exists: false},
            createdUserId: {$ne: data.userId}
        }, {
            $set: {
                readTime: new Date(),
                readUserId: data.userId
            }
        }, {multi: true});
    },

    'JobsLog.insertNew'(data) {
        check(data.jobId, String);
        check(data.content, String);
        check(data.createdUserId, String);

        JobsLog.insert({
            content: data.content,
            jobId: data.jobId,
            createdTime: new Date(),
            createdUserId: data.createdUserId
        });
    },
});