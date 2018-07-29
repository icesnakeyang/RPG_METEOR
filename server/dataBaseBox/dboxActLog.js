import {check} from "meteor/check";
import {ActLog} from "../../lib/data";

Meteor.methods({
    'ActLog.insertLog'(data) {
        check(data.userId, String);
        check(data.action, String);

        ActLog.insert({
            userId: data.userId,
            createdTime: new Date(),
            action:data.action
        });
    },
});