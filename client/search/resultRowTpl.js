Template.resultRowTpl.helpers({
});

Template.resultRowTpl.events({
    'click #bt_detail':function (e) {
        e.preventDefault();

        if(!this){
            return;
        }

        Router.go('job.mainPage',{
            _taskId:null,
            _jobId:this._id
        })
    }
});