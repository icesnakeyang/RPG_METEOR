Template.myAccountPageRowTpl.onRendered(function () {
    $('#table1').dataTable();
});

Template.myAccountPageRowTpl.helpers({
   date:function () {
       if(this.createdTime) {
           return moment(this.createdTime).format('YYYY-MM-DD');
       }
   },

    type:function () {
        if(this.type==='agreeJob'){
            return 'Agree Job'
        }
        if(this.type==='topUp'){
            return 'Top Up'
        }
        if(this.type==='publishOut'){
            return 'Publish Job'
        }
        if(this.type==='matchOverDue'){
            return 'Return Of Match Overdue'
        }
    }
});