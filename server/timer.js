import {rpgServerProcessMatch_service} from "../lib/moduls/service/administrator/rpgServerProcessMatch_service";

export const rpgTimer_server = {
    startTimer: function (interval) {
        var counter = 0;

        var myInterval = Meteor.setInterval(function () {
            counter++;
            // console.log("Interval called " + counter + " times...");
            const result=rpgServerProcessMatch_service.processOverdueMatch();
            const result2=rpgServerProcessMatch_service.processOverdueJob();
            console.log('Processed match overdue');
            console.log(result);
            console.log('Processed job overdue');
            console.log(result2);

        }, interval);
    }
};

        //
        // Template.myTemplate.events({
        //     'click button': function () {
        //         Meteor.clearInterval(myInterval);
        //         console.log('Interval cleared...')
        //     }
        // });