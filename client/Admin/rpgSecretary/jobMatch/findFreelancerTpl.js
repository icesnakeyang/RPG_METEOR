import {ReactiveDict} from 'meteor/reactive-dict';
import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";
import {rpgJobsMatch_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsMatch_uia";

Template.findFreelancerTpl.onCreated(function () {
    this.state = new ReactiveDict();
});

Template.findFreelancerTpl.helpers({

    wikis: function () {
        if(!this.jobId){
            return;
        }
        const instance = Template.instance();
        instance.state.set('jobId', this.jobId);
        var users=[];
        if (instance.state.get('search_userId')) {
            const user=rpgUserData_uia.loadUserDataByUserId(instance.state.get('search_userId'));
            users.push(user);
        } else {
            users=rpgUserData_uia.loadFreelancer(this.jobId);
        }
        return users;
    },
});

Template.findFreelancerTpl.events({
    'click #bt_search': function (e, tpl) {
        e.preventDefault();

        var uid = tpl.$('#user_id').val();
        const instance = Template.instance();
        instance.state.set('search_userId', uid);
    },

    'click #bt_assign': function (e) {
        e.preventDefault();
        if(!Meteor.userId()){
            return;
        }
        if(!this){
            return;
        }
        const instance=Template.instance();
        var data = {
            jobId: instance.state.get('jobId'),
            userId: this.userId,
            content:'system match',
            createdUserId:Meteor.userId()
        };
        rpgJobsMatch_uia.createNewJobMatch(data);

        Router.go('match.jobDetail',{
            _jobId:data.jobId
        });
    }
});