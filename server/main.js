import { Meteor } from 'meteor/meteor';
import '../lib/data.js';
import {rpgTimer_server} from "./timer";

Meteor.startup(() => {
  // code to run on server at startup
  //   SSLProxy({
  //       port: 443, //or 443 (normal port/requires sudo)
  //       ssl : {
  //           key: Assets.getText("1525459563392.key"),
  //           cert: Assets.getText("1525459563392.pem"),
  //
  //           //Optional CA
  //           //Assets.getText("ca.pem")
  //       }
  //   });
    rpgTimer_server.startTimer(60*60*1000);
    console.log('Timer started');
});