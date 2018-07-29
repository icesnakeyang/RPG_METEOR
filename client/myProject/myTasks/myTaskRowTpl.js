import {rpgTasks_uia} from "../../../lib/moduls/ui_adapter/tasks/rpgTasks_uia";

Template.myTaskRowTpl.helpers({
    createdTime: function () {
        if (this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD');
        }
    },

    elapsedDays: function () {
        let days = 0;
        if (this.createdTime) {
            days = moment(new Date()).diff(this.createdTime, 'days');
        }
        return days;
    },

    leftDays: function () {
        let leftdays = 0;
        if (!this.days) {
            return;
        }
        if (!this.createdTime) {
            return;
        }
        leftdays = moment(new Date()).diff(this.createdTime, 'days');
        leftdays = this.days - leftdays;
        return leftdays;
    },

    subTasks: function () {
        let subTasks = 0;
        if (this._id) {
            subTasks = rpgTasks_uia.totalSubTasks(this._id);
        }
        return subTasks;
    }
});

Template.myTaskRowTpl.events({
    'click #task_title': function (e) {
        e.preventDefault();

        if(!this._id){
            return;
        }

        Router.go('task.detail', {
            _id: this._id
        });
    }
});
