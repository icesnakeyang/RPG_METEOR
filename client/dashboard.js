import {GPS} from "../lib/data";


Template.dashboard.helpers({
    gpsList:function () {
        const gList=GPS.find({},{sort:{createdTime:-1}}).fetch();
        return gList;
    }
});
