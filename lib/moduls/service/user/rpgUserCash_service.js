import {check} from "meteor/check";
import {rpgUserCash_dba} from "../../data_adapter/user/rpgUserCash_dba";
import {rpgUserData_dba} from "../../data_adapter/user/rpgUserData_dba";
import {UserCash} from "../../../data";

export const rpgUserCash_service = {
    /**
     * 刷新用户的账户余额balance
     * 用户余额存储在UserData的Account数组里，
     * @param data
     * @constructor
     */
    refreshBalance: function (userId) {
        check(userId, String);
        var data = {
            userId: userId
        };

        /**
         * 重新统计balance
         * 1、首先计算所有的充值总额
         * 2、扣除发布任务的金额
         * 3、加上接受任务的金额
         *
         */

        let total = 0.0;

        //查找用户的所有充值记录
        let topups = rpgUserCash_dba.loadAllTopUp(data);
        // 把所有的充值金额都累计起来
        topups.forEach(function (row) {
            total = total + row.topUp.amount * 1;
        });
        //查找所有发布任务记录，累计发布任务扣除的任务金额
        let publishRows = rpgUserCash_dba.loadAllPublishList(data);
        publishRows.forEach(function (row) {
            total = total - row.publishOut.amount * 1;
        });
        //查找用户所有接受的任务，累计接任务增加的金额
        let agreeTaskRows = rpgUserCash_dba.loadAllAgreeJobs(data);
        agreeTaskRows.forEach(function (row) {
            total = total + row.agreeJob.amount * 1;
        });
        // 先查询用户的UserData，如果有就修改，没有就新增一个
        let userData = rpgUserData_dba.loadUserDataByUserId(data);
        if (!userData) {
            rpgUserData_dba.addNewUserData(data);
        }
        //修改UserData的balance
        data.balance = total;
        rpgUserData_dba.updateBalance(data);
    },

    loadUserCashLedger: function (data) {
        check(data.userId, String);

        let ledgerList = [];
        let ledgerRows;
        ledgerRows = rpgUserCash_dba.loadAllCash(data);

        return ledgerRows;
        for (let row of ledgerRows) {
            let aLedger = {};
            if (row.publishOut) {
                aLedger = {
                    createdTime: row.publishOut.createdTime,
                    amount: row.publishOut.amount,
                    type: 'publishOut',
                    income: false
                }
            }

            if (row.agreeJob) {
                aLedger = {
                    createdTime: row.agreeJob.createdTime,
                    amount: row.agreeJob.amount,
                    type: 'agreeJob',
                    income: true
                }
            }

            if (row.topUp) {
                aLedger = {
                    createdTime: row.topUp.createdTime,
                    amount: row.topUp.amount,
                    type: 'topUp',
                    income: true
                }
            }

            if (row.matchOverDue) {
                aLedger = {
                    createdTime: row.matchOverDue.createdTime,
                    amount: row.matchOverDue.amount,
                    type: 'matchOverDue',
                    income: true
                }
            }

            ledgerList.push(aLedger);
        }

        return ledgerList;
    },

    /**
     * 获取一个用户的所有收入总和
     * @param data
     * @returns {number}
     */
    getIncome: function (data) {
        check(data.userId, String);
        const agreeJobs = UserCash.find({
            userId: data.userId,
            agreeJob: {$exists: true}
        });
        let amount = 0.0;
        for (let row of agreeJobs) {
            amount = amount + row.agreeJob.amount * 1;
        }
        return amount;
    },

    getCost: function (data) {
        check(data.userId, String);
        /**
         * 首先读取所有发布的记录
         * 然后逐条检查是否已经匹配过期
         * 如果没有匹配过期就进行累加
         * @type {number}
         */
        let total = 0.0;
        const costs = rpgUserCash_dba.loadAllPublishList(data);
        for (let row of costs) {
            const data2 = {
                matchId: row._id
            };
            let log = rpgUserCash_dba.loadMatchOverdue(data2);
            if (!log) {
                total = total + row.publishOut.amount * 1;
            }
        }
        return total;
    },

    getTopUp:function (data) {
        check(data.userId, String);
        const topUps=rpgUserCash_dba.loadAllTopUp(data);
        let total = 0.0;
        for(let row of topUps){
            total = total + row.topUp.amount * 1;
        }
        return total;
    },

    //新增一个充值记录
    addNewTopUp: function (data) {
        check(data.userId, String);
        check(data.topUpAmount, Number);
        check(data.createdUserId, String);
        const param={
            userId:data.userId,
            cashBook:{
                amount:data.topUpAmount,
                type:'TopUp'
            },
            createdUserId:data.createdUserId
        };
        rpgUserCash_dba.addNewTopUp(param);
    }
};