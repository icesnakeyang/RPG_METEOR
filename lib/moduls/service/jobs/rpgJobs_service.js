import {check} from "meteor/check";
import {rpgJobs_dba} from "../../data_adapter/jobs/rpgJobs_dba";
import {rpgJobsLog_dba} from "../../data_adapter/jobs/rpgJobsLog_dba";
import {rpgJobsComplete_dba} from "../../data_adapter/jobs/rpgJobsComplete_dba";
import {rpgJobsStop_dba} from "../../data_adapter/jobs/rpgJobsStop_dba";
import {rpgJobsAppeal_dba} from "../../data_adapter/jobs/rpgJobsAppeal_dba";
import {rpgUserData_service} from "../user/rpgUserData_service";
import {rpgJobsMatch_dba} from "../../data_adapter/jobs/rpgJobsMatch_dba";
import {rpgJobsRepeal_dba} from "../../data_adapter/jobs/rpgJobsRepeal_dba";
import {rpgJobsAppeal_service} from "./rpgJobsAppeal_service";
import {rpgSettings_service} from "../administrator/rpgSettings_service";
import {rpgJobsMatch_service} from "./rpgJobsMatch_service";

export const rpgJobs_service = {
    /**
     * 增删改查///////////////////////////////////////////////////////////////////////////////////
     */
    loadById: function (jobId) {
        check(jobId, String);
        const data = {
            jobId: jobId
        };
        let job = rpgJobs_dba.loadById(data);
        if (job) {
            job = rpgJobs_service.fillJob(job);
            return job;
        }
    },

    loadByTitle: function (title) {
        check(title, String);
        const jobs = rpgJobs_dba.loadByTitle(title);
        return jobs;
    },

    loadByCodeName: function (keyName) {
        check(keyName, String);
        const jobs = rpgJobs_dba.loadByCodeName(keyName);
        return jobs;
    },

    loadByTaskId: function (taskId) {
        check(taskId, String);
        const data = {
            taskId: taskId
        };
        const job = rpgJobs_dba.loadByTaskId(data);
        return job;
    },

    loadAllMatchJobs: function () {
        const jobs = rpgJobs_dba.loadAllMatchJobs();
        return jobs;
    },

    loadOverdueJobs: function () {
        const jobs = rpgJobs_dba.loadOverdueJobs();
        return jobs;
    },

    /**
     * total 统计///////////////////////////////////////////////////////////////////////////////////
     */
    totalJobs: function (data) {
        check(data.userId, String);
        check(data.status, String);
        check(data.party, String);
        const jobs = rpgJobs_dba.loadJobs(data);
        return jobs.length;
    },

    /**
     * new 新信息///////////////////////////////////////////////////////////////////////////////////
     */

    newPartyA: function (data) {
        check(data.userId, String);
        data.status = 'all';
        data.party = 'partyA';
        let cc = 0;
        cc += rpgJobs_service.newJobs(data);
        return cc;
    },

    newPartyB: function (data) {
        check(data.userId, String);
        data.status = 'all';
        data.party = 'partyB';
        let cc = 0;
        cc += rpgJobs_service.newJobs(data);
        return cc;
    },

    newJobs: function (data) {
        check(data.userId, String);
        check(data.status, String);
        check(data.party, String);
        const jobs = rpgJobs_dba.loadJobs(data);
        let cc = 0;
        for (let row of jobs) {
            data.jobId = row._id;
            cc += rpgJobs_service.newAJob(data);
        }
        if (data.party) {
            if ((data.party === 'partyB') && (data.status === 'all' || data.status === 'match')) {
                cc += rpgJobsMatch_dba.newMatchMe(data.userId);
            }
        }
        return cc;
    },

    /**
     * 统计jobId、userId的未读的日志、终止、完成、申诉总数
     * @param data
     * @returns {number}
     */
    newAJob: function (data) {
        check(data.jobId, String);
        check(data.userId, String);
        let cc = 0;
        cc += rpgJobsLog_dba.newLog(data);
        cc += rpgJobsComplete_dba.newComplete(data);
        cc += rpgJobsStop_dba.newStop(data);
        cc += rpgJobsAppeal_dba.newAppeal(data);
        const appeal = rpgJobsAppeal_service.loadCurrentAppealByJobId(data);
        if (appeal) {
            data.appealId = appeal._id;
            cc += rpgJobsRepeal_dba.newRepeal(data);
        }
        cc += rpgJobsRepeal_dba.newProcessRepeal(data);

        // 任务发布后在有效时间内没有匹配成功，被系统处理过期，但未被甲方阅读
        cc += rpgJobs_dba.newOverdueJobs(data);
        return cc;
    },

    /**
     * 业务逻辑 business logical/////////////////////////////////////////////////////////////////////////
     */
    /**
     * 把Job的各种详细信息组装完善
     * @param job
     * @returns {*}
     */
    fillJob: function (job) {
        job.partyA = rpgUserData_service.loadUserDataByUserId(job.partyAId);
        if (job.partyBId) {
            job.partyB = rpgUserData_service.loadUserDataByUserId(job.partyBId);
        }

        return job;
    },

    /**
     * 发布一个新的工作任务
     * @param data
     */
    createNewJob: function (data) {
        check(data.userId, String);
        check(data.reward, Number);
        check(data.title, String);
        check(data.codeName, String);
        check(data.content, String);
        check(data.days, Number);
        check(data.taskId, String);
        check(data.createdUserId, String);

        /**
         * 逻辑思路
         是谁创建的 createdUserId
         任务数据：
         reward：多少钱
         title：标题
         codeName：项目代号
         content：内容
         days：工作量（天）
         taskId：源私有任务的Id

         首先通过createdUserId把创建用户的balance余额读出来
         如果余额小于任务金额reward，则返回失败
         在Jobs集合里新增任务
         把自动生成的JobId读出来
         把reward金额存入到UserCash集合里
         刷新UserData的balance
         */

            //检查用户账户余额是否小于任务金额，如果小于则返回错误
        const balance = rpgUserData_service.loadUserDataByUserId(data.userId);
        if (balance < data.reward) {
            const result = {
                result: "101",
                messsage: "Not enough balance"
            };
            return result;
        }

        //发布任务
        rpgJobs_dba.createNewJob(data);
    },

    loadJobs: function (data) {
        check(data.userId, String);
        check(data.status, String);
        check(data.party, String);
        const jobs = rpgJobs_dba.loadJobs(data);
        return jobs;
    },

    setJobOverdue: function () {
        /**
         * 先读取所有等待分配的任务
         * 再读取所有分配日志
         * 如果没有未处理的分配日志
         * 计算任务是否过期，过期则处理
         * @type {*|Mongo.Cursor}
         */
        const jobs = rpgJobs_dba.loadAllMatchJobs();
        let cc = 0;
        for (let row of jobs) {
            // 读取match
            const matches = rpgJobsMatch_service.loadJobsMatchList(row._id);
            if (matches.length === 0) {
                const day1 = moment(new Date()).diff(row.createdTime, 'days');
                if (day1) {
                    const matchDays = rpgSettings_service.getMatchDays();
                    if (matchDays) {
                        if (day1 > matchDays) {
                            rpgJobs_dba.setOverdueJobs({jobId: row._id});
                            cc++;
                        }
                    }
                }
            }
        }
        const result = {
            applied: cc
        };
        return result;
    },

    setReadOverdue:function (data) {
        check(data.jobId,String);
        check(data.userId,String);
        rpgJobs_dba.setReadOverdue(data);
    }
};