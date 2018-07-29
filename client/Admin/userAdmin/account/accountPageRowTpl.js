Template.accountPageRowTpl.helpers({

});

Template.accountPageRowTpl.onRendered(function () {
    $('.table').dataTable();
});

Template.accountPageRowTpl.events({
    'click #bt_detail':function (e) {
        e.preventDefault();
        if(!this.userId){
            return;
        }
        Router.go('admin.AccountDetail', {
            _userId:this.userId
        })

    }
});