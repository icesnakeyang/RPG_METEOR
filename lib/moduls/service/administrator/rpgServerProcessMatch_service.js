import {rpgJobsMatch_service} from "../jobs/rpgJobsMatch_service";
import {rpgJobs_service} from "../jobs/rpgJobs_service";

if(Meteor.isServer) {
    export const rpgServerProcessMatch_service = {
        /**
         * 读取所有未匹配成功的match，把过期的设置为false
         */
        processOverdueMatch: function () {
            const result = rpgJobsMatch_service.setMatchOverdue();
            return result;
        },

        /**
         * 读取所有未处于分配状态的job，且没有分配成功，且已过期的任务，设置为overdue
         */
        processOverdueJob: function () {
            const result = rpgJobs_service.setJobOverdue();
            return result;
        }

    };
}