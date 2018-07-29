Template.addNewAdminRowTpl.onCreated(function () {
    this.subscribe('Meteor.users');
});

Template.addNewAdminRowTpl.helpers({
    email:function () {
        if(!this){
            return;
        }
        if(!this.emails){
            return;
        }
        return this.emails[0].address;
    }
});