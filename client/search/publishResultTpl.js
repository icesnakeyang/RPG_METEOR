import {rpgJobs_uia} from "../../lib/moduls/ui_adapter/jobs/rpgJobs_uia";

Template.searchResultTpl.helpers({
    jobs:function () {
        /**
         * 搜索job
         * 关键字匹配title, codename
         */
        let jobList=[];
        const jobs=rpgJobs_uia.loadByTitle(this.keyName);
        const cods=rpgJobs_uia.loadByCodeName(this.keyName);
        if(jobs) {
            for (let row of jobs) {
                jobList.push(row);
            }
            for(let row2 of cods){
                let isSame=false;
                for(let row of jobs) {
                    if (row2._id === row._id) {
                        isSame=true;
                    }
                }
                if(!isSame){
                    jobList.push(row2);
                }
            }
        }else {
        }
        return jobList;
    }
});