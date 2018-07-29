Template.emailPageTpl.helpers({
    emails: function () {
        if (Meteor.userId()) {
            if (Meteor.user()) {
                return Meteor.user().emails;
            }
        }
    }
});


Template.realNamePageTpl.onCreated(function () {

});

