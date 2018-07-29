Template.emailRowTpl.helpers({
    verify:function () {
        if(this.verified){
            return 'Verified';
        }else{
            return 'Un-verified';
        }
    }
});