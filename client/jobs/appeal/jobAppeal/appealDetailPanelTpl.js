import {ReactiveDict} from "meteor/reactive-dict";
import {rpgUserData_uia} from "../../../../lib/moduls/ui_adapter/user/rpgUserData_uia";

Template.appealDetailPanelTpl.onCreated(function () {
   this.state=new ReactiveDict();
});
Template.appealDetailPanelTpl.helpers({
    appealTime:function () {
        if(!this.createdTime){
            return;
        }
        const instance=Template.instance();
        instance.state.set('content', this.content);
        return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
    },

    createUser:function () {
       if(!this.createdUserId){
           return;
       }
       const user=rpgUserData_uia.loadUserDataByUserId(this.createdUserId);
       return user;
    }
});

Template.appealDetailPanelTpl.onRendered(function () {
    Deps.autorun(function () {
        var theContent = Session.get('content');
        this.$('#content').html(theContent);
    });
});