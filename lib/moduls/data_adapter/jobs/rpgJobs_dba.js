import {Jobs, JobsMatch, PublishedTasks, Tasks} from "../../../data";
import {check} from "meteor/check";

export const rpgJobs_dba = {

    /**
     * 增删改查////////////////////////////////////////////////////////////////////////////////////////////////////
     */
    loadById: function (data) {
        check(data.jobId, String);
        const job = Jobs.findOne({
            _id: data.jobId
        });
        return job;
    },

    loadByTitle: function (title) {
        check(title, String);
        const jobs = Jobs.find({
            title: {
                $regex: title,
                $options: 'i'
            },
        }).fetch();

        return jobs;
    },

    loadByCodeName: function (keyName) {
        check(keyName, String);
        const jobs = Jobs.find({
            codeName: {
                $regex: keyName,
                $options: 'i'
            },
        }).fetch();
        return jobs;
    },

    loadByTaskId: function (data) {
        check(data.taskId, String);
        const job = Tasks.findOne({
            taskId: data.taskId
        });
        return job;
    },

    getNewJobId: function (data) {
        check(data.userId, String);

        const job = Jobs.findOne({
            createdUserId: data.userId
        }, {
            sort: {createdTime: -1}
        });
        if (job) {
            return job._id;
        }
        return null;
    },

    createNewJob: function (data) {
        check(data.userId, String);
        check(data.reward, Number);
        check(data.title, String);
        check(data.codeName, String);
        check(data.content, String);
        check(data.days, Number);
        check(data.taskId, String);
        check(data.createdUserId, String);
        Meteor.call('Jobs.insert', data);
    },

    /**
     * total 统计////////////////////////////////////////////////////////////////////////////////////////////////
     */
    loadJobs: function (data) {
        check(data.userId, String);
        check(data.status, String);
        check(data.party, String);
        if (data.status === 'progress') {
            if (data.party === 'partyA') {
                const jobs = Jobs.find({
                    partyAId: data.userId,
                    progress: true
                }).fetch();
                return jobs;
            }
            if (data.party === 'partyB') {
                const jobs = Jobs.find({
                    partyBId: data.userId,
                    progress: true
                }).fetch();
                return jobs;
            }
            if(data.party==='all'){
                let jobList=[];
                const jobsA=Jobs.find({
                    partyAId:data.userId,
                    progress:true
                }).fetch();
                for(let row of jobsA) {
                    jobList.push(row);
                }
                const jobsB=Jobs.find({
                    partyBId:data.userId,
                    progress:true
                }).fetch();
                for(let row of jobsB) {
                    jobList.push(row);
                }
                return jobList;
            }
        }

        if (data.status === 'complete') {
            if (data.party === 'partyA') {
                const jobs = Jobs.find({
                    partyAId: data.userId,
                    complete: true,
                    accept:{$ne:true}
                }).fetch();
                return jobs;
            }
            if (data.party === 'partyB') {
                const jobs = Jobs.find({
                    partyBId: data.userId,
                    complete: true,
                    accept:{$ne:true}
                }).fetch();
                return jobs;
            }
        }

        if (data.status === 'accept') {
            if (data.party === 'partyA') {
                const jobs = Jobs.find({
                    partyAId: data.userId,
                    accept: true
                }).fetch();
                return jobs;
            }
            if (data.party === 'partyB') {
                const jobs = Jobs.find({
                    partyBId: data.userId,
                    accept: true
                }).fetch();
                return jobs;
            }
        }

        if (data.status === 'stop') {
            if (data.party === 'partyA') {
                const jobs = Jobs.find({
                    partyAId: data.userId,
                    stop: true
                }).fetch();
                return jobs;
            }
            if (data.party === 'partyB') {
                const jobs = Jobs.find({
                    partyBId: data.userId,
                    stop: true
                }).fetch();
                return jobs;
            }
        }

        if (data.status === 'appeal') {
            if (data.party === 'partyA') {
                const jobs = Jobs.find({
                    partyAId: data.userId,
                    appeal: true
                }).fetch();
                return jobs;
            }
            if (data.party === 'partyB') {
                const jobs = Jobs.find({
                    partyBId: data.userId,
                    appeal: true
                }).fetch();
                return jobs;
            }
        }

        if (data.status === 'match') {
            if (data.party === 'partyA') {
                const jobs = Jobs.find({
                    partyAId: data.userId,
                    partyBId: {$exists: false},
                    matchOverdue:{$exists:false}
                }).fetch();
                return jobs;
            }
            if (data.party === 'partyB') {
                const jobsMatch = JobsMatch.find({
                    matchUserId: data.userId,
                    processResult: {$exists: false}
                }).fetch();
                let jobList = [];
                for (let row of jobsMatch) {
                    let job = Jobs.findOne({
                        _id: row.jobId
                    });
                    if (job) {
                        jobList.push(job);
                    }
                }
                return jobList;
            }
        }

        if (data.status === 'overdue') {
            if (data.party === 'partyA') {
                const jobs = Jobs.find({
                    partyAId: data.userId,
                    matchOverdue:true
                }).fetch();
                return jobs;
            }
        }

        if (data.status === 'all') {
            if (data.party === 'partyA' || data.party==='all') {
                const jobs = Jobs.find({
                    partyAId: data.userId
                }).fetch();
                return jobs;
            }
            if (data.party === 'partyB' || data.party==='all') {
                let jobList = [];
                const jobs = Jobs.find({
                    partyBId: data.userId
                }).fetch();
                for (let row of jobs) {
                    jobList.push(row);
                }
                const matches = JobsMatch.find({
                    matchUserId: data.userId,
                    processResult: {$exists: false}
                }).fetch();
                for (let row of matches) {
                    const job = Jobs.findOne({
                        _id: row.jobId
                    });
                    if (job) {
                        jobList.push(job);
                    }
                }
                return jobList;
            }
        }
    },

    /**
     * new 未读///////////////////////////////////////////////////////////////////////////////////////////////////////
     */
    newOverdueJobs:function (data) {
        check(data.userId,String);
        const cc=Jobs.find({
            partyAId:data.userId,
            matchOverdue:true,
            readOverdueTime:{$exists:false}
        }).count();
        return cc;
    },

    /**
     * 获取所有等待分配的任务
     * @returns {Mongo.Cursor}
     */
    loadAllMatchJobs: function () {
        var jobs = Jobs.find({
            contractTime: {$exists: false},
            matchOverdue:{$exists:false}
        }, {
            sort: {createdTime: -1}
        }).fetch();
        return jobs;
    },

    setOverdueJobs:function (data) {
        check(data.jobId, String);
        Meteor.call('Jobs.setOverdue', {jobId: data.jobId});
    },

    loadOverdueJobs:function (data) {
        check(data.userId);
        const jobs=Jobs.find({
            partyAId:data.userId,
            matchOverdue:true
        }).fetch();
        return jobs;
    },

    setReadOverdue:function (data) {
        check(data.jobId,String);
        check(data.userId,String);
        Meteor.call('Jobs.setReadOverdue', data);
    }
};