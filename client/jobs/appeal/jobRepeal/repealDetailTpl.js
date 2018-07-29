import {ReactiveDict} from 'meteor/reactive-dict';
import {Repeals} from "../../../../lib/data";
import {rpgJobsRepeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsRepeal_uia";

Template.repealDetailTpl.onCreated(function () {
    this.subscribe('repeals');
});

Template.repealDetailTpl.helpers({
    repeal:function () {
        const repeal=rpgJobsRepeal_uia.loadRepealByRepealId(this.repealId);
        return repeal;
    },

});
