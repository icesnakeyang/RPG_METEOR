Template.layoutTpl.helpers({
    isLogin:function () {
        //是否登录
        if(Meteor.userId()){
            return true;
        }
        return false;
    }
});

Template.layoutTpl.events({
    'click #logout': function (event, template) {
        AccountsTemplates.logout();
    }
});