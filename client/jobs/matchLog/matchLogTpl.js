import {rpgJobsMatch_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsMatch_uia";

Template.matchLogTpl.helpers({
    logs:function () {
        if(this.jobId) {
            const logs=rpgJobsMatch_uia.loadJobsMatchList(this.jobId);
            return logs;
        }
    }
});
