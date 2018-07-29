import {GPS} from "../../lib/data";

Meteor.methods({
    'GPS.addNew'(data){
        GPS.insert({
            longitude:data.longitude,
            latitude:data.latitude,
            createdTime:new Date()
        })
    }
});