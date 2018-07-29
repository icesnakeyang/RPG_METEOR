import {rpgUserData_uia} from "../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgJobs_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";
import {ReactiveDict} from "meteor/reactive-dict";

Template.stopJobRowTpl.onCreated(function () {
    this.state=new ReactiveDict();
});

Template.stopJobRowTpl.helpers({
    creator:function () {
        if(!this.createdUserId){
            return;
        }
        const creator=rpgUserData_uia.loadUserDataByUserId(this.createdUserId);
        return creator;
    },

    createdTime:function () {
        if(this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    processTime:function () {
        if(this.processTime){
            return moment(this.processTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    processReadTime:function () {
        if(this.processReadTime){
            return moment(this.processReadTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    readTime:function () {
        if(this.readTime){
            return moment(this.readTime).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    isMe:function () {
        if (this.createdUserId === Meteor.userId()) {
            return true;
        }
    },

    isPartyAB:function () {
        if(!this.jobId){
            return;
        }
        if(!Meteor.userId()){
            return;
        }
        const job=rpgJobs_uia.loadById(this.jobId);
        if(job){
            if(job.partyAId===Meteor.userId()){
                return true;
            }
            if(job.partyBId===Meteor.userId()){
                return true;
            }
        }
        return false;
    },

    isProcessed:function () {
        if('processResult' in this){
            return true;
        }else {
            return false;
        }
    },

    clickReject:function () {
        const instance=Template.instance();
        if(instance.state.get('clickReject')){
            return true;
        }
        return false;
    },


});