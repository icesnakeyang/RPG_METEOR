import {rpgJobsAppeal_uia} from "../../../../lib/moduls/ui_adapter/jobs/rpgJobsAppeal_uia";

Template.publicAppealBoardTpl.onCreated(function () {
    this.subscribe('appeals');
});

Template.publicAppealBoardTpl.helpers({
    appeals: function () {
        const appeals=rpgJobsAppeal_uia.loadAppealsToBoard();
        return appeals;
    }
});