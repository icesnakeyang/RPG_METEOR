import {ReactiveDict} from 'meteor/reactive-dict';

Template.jobMatchDetailPanelTpl.onCreated(function () {
    this.state=new ReactiveDict();
    if(this.data) {
        const instance = Template.instance();
        instance.state.set('content', this.data.content);
    }
});

Template.jobMatchDetailPanelTpl.onRendered(function () {
    const instance=Template.instance();
    $('#summer_content').html(instance.state.get('content'));
});

Template.jobMatchDetailPanelTpl.helpers({
    publishedTime:function () {
        if (this.createdTime) {
            const instance=Template.instance();
            instance.state.set('content', this.content);
            return moment(this.createdTime).format('YYYY-MM-DD HH:mm:ss');
        }
    }
});