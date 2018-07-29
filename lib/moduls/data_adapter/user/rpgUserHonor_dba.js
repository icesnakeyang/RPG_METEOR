import {check} from "meteor/check";
import {UserData, UserHonor} from "../../../data";

export const rpgUserHonor_dba={
  loadMyHonors:function (data) {
      check(data.userId, String);
      const honors=UserHonor.find({
          userId:data.userId
      }).fetch();
      return honors;
  },

    getTotalHonor:function (data) {
        check(data.userId, String);
        Meteor.call('UserHonor.refreshUserData', data);
        const userData=UserData.findOne({
            userId:data.userId,
            userHonor:{$exists:true}
        });
        if(userData) {
            return {
                income: userData.userHonor.income,
                out: userData.userHonor.out,
                balance: userData.userHonor.balance
            };
        }
    }
};