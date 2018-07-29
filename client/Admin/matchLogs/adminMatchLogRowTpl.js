import {rpgJobsMatch_uia} from "../../../lib/moduls/ui_adapter/jobs/rpgJobsMatch_uia";

Template.adminMatchLogRowTpl.helpers({
    createdTime: function () {
        if (this.createdTime) {
            return moment(this.createdTime).format('YYYY-MM-DD');
        }
    },

    expiredTime: function () {
        const expDate = rpgJobsMatch_uia.getMatchExpireDate(this._id);
        return expDate;
    }
});