import {check} from "meteor/check";
import {rpgJobsMatch_dba} from "../../data_adapter/jobs/rpgJobsMatch_dba";
import {rpgSettings_dba} from "../../data_adapter/administrator/rpgSettings_dba";
import {rpgJobs_dba} from "../../data_adapter/jobs/rpgJobs_dba";
import {JobsMatch} from "../../../data";
import {rpgSettings_service} from "../administrator/rpgSettings_service";

export const rpgJobsMatch_service = {
    totalMatch: function (jobId) {
        check(jobId, String);
        const cc = rpgJobsMatch_dba.totalMatch(jobId);
        return cc;
    },

    createNewJobMatch: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.content, String);
        check(data.createdUserId, String);
        rpgJobsMatch_dba.createNewJobMatch(data);
    },

    loadJobsMatchList: function (jobId) {
        check(jobId, String);
        const data = {
            jobId: jobId
        };
        const matches = rpgJobsMatch_dba.loadJobsMatchList(data);
        return matches;
    },

    setMatchOverdue:function () {
        const matches=rpgJobsMatch_dba.loadMatchUnprocess();
        let cc=0;
        for(let row of matches){
            const day1=moment(new Date()).diff(row.createdTime, 'days');
            if(day1){
                const matchDays=rpgSettings_service.getMatchDays();
                if(matchDays){
                    if(day1>matchDays){
                        rpgJobsMatch_dba.setMatchOverdue({matchId:row._id});
                        cc++;
                    }
                }
            }
        }
        const result={
            applied:cc
        };
        return result;
    },

    setReadTime: function (jobId, userId) {
        check(jobId, String);
        check(userId, String);
        const data = {
            jobId: jobId,
            userId: userId
        };
        rpgJobsMatch_dba.setReadTime(data);
    },

    isMatchMe: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        return rpgJobsMatch_dba.isMatchMe(data);
    },

    agreeMatch: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processUserId, String);
        rpgJobsMatch_dba.agreeMatch(data);
    },

    rejectMatch: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        check(data.processUserId, String);
        check(data.processRemark, String);
        rpgJobsMatch_dba.rejectMatch(data);
    },

    getMatchExpireDate: function (data) {
        check(data.jobId, String);

        /**
         * 读取系统设置的等待匹配的有效天数
         * 检查任务最新的匹配时间，从匹配时间开始计算过期日期
         * 若任务已经过期，返回过期时间
         * 返回日期
         */

        let expDate = null;
        let matchDays = rpgSettings_dba.getMatchDays();
        if (!matchDays) {
            matchDays = 7;
        }
        const job = rpgJobs_dba.loadById(data);
        if (!job) {
            return;
        }
        if(job.matchOverdue){
            const match=JobsMatch.findOne({
                jobId:data.jobId,
                processRemark:'MATCH_OVERDUE'
            }, {
                sort:{processTime:-1}
            });
            if(match){
                expDate=moment(match.processTime).format('YYYY-MM-DD');
                return expDate;
            }
        }
        const publishDate = job.createdTime;
        if (!publishDate) {
            return;
        }
        expDate = moment(publishDate).add(matchDays, 'days');
        expDate = moment(expDate).format('YYYY-MM-DD');
        return expDate;
    },
};