import {check} from "meteor/check";
import {Settings} from "../../lib/data";

Meteor.methods({
    'Settings.saveMatchDays'(data){
        check(data.matchDays,Number);
        const sets=Settings.find({
        }).fetch();
        if(sets.length>0){
            const set=sets[0];
            Settings.update({
                _id:set._id
            },{
                $set:{
                    matchDays:data.matchDays
                }
            });
        }else {
            Settings.insert({
                matchDays:data.matchDays
            });
        }
    }
});