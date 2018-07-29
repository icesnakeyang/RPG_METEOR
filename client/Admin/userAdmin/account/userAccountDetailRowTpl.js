Template.userAccountDetailRowTpl.onRendered(function () {
    $('.table').dataTable();
});

Template.userAccountDetailRowTpl.helpers({
    date:function () {
        if(this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD');
        }
    },

    type:function () {
        if(this.cashBook.type==='AgreeJob'){
            return 'Agree Job'
        }
        if(this.cashBook.type==='TopUp'){
            return 'Top Up'
        }
        if(this.cashBook.type==='PublishOut'){
            return 'Publish Job'
        }
        if(this.cashBook.type==='MatchOverDue'){
            return 'Return Of Match Overdue'
        }
        if(this.cashBook.type==='StopRefund'){
            return 'Return Of Stop Refund'
        }
    }
});