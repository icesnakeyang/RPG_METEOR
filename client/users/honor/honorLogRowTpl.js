Template.honorLogRowTpl.helpers({
   date1:function () {
       return moment(this.createdTime).format('YYYY-MM-DD');
   }
});