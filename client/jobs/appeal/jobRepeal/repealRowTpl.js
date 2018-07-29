import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgJobsRepeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsRepeal_uia";


Template.repealRowTpl.helpers({
    createUser: function () {
        if(this.createdUserId){
            const user=rpgUserData_uia.loadUserDataByUserId(this.createdUserId);
            return user;
        }
    },

    createdTime: function () {
        if(this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    readTime: function () {
        if (this.readTime) {
            return moment(this.readTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    result:function () {
        var status = {};
        if(this.processResult===true){
            status.repealed=[true];
            return status;
        }
        if(this.processResult===false){
            status.rejected=[true];
            return status;
        }
        status.unProcess=true;
        return status;
    },

    processTime:function () {
        if(this.processTime){
            return moment(this.processTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    newRepeal:function () {
        if(!Meteor.userId()){
            return;
        }
        if(!this._id){
            return;
        }
        let cc;
        cc=rpgJobsRepeal_uia.newRepealByRepeal(Meteor.userId(),this._id);
        return cc;
    }
});

Template.repealRowTpl.events({
    'click #linkTitle': function (e) {
        e.preventDefault();
        if(!this._id){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        rpgJobsRepeal_uia.setReadTime(this._id, Meteor.userId());
        Router.go('job.repeal.detail', {
            _repealId: this._id
        });
    }
});