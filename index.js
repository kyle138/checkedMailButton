'use strict';

/*
Written by Kyle Munz
https://github.com/kyle138/checkedMailButton
*/

const AWS = require('aws-sdk');
const SNS = new AWS.SNS( {apiVersion: '2010-03-31'} );

// Retreive environment variables
var phone1 = process.env.Number1;
var phone2 = process.env.Number2;
var message1 = process.env.Message1;
var message2 = process.env.Message2;

exports.handler = (event, context, callback) => {
  //console.log('Received event:', JSON.stringify(event,null,2));    //DEBUG

  function sendMsg(number, message, cb) {
    if(number && message) {
      var params = {};
      params.PhoneNumber = number;
      params.Message = message;
      SNS.publish(params, function(err, data) {
        if (err) {
          console.error("SNS Publish Failed: "+err);
        } else {
          console.log("SNS Publish successful! "+JSON.stringify(data,null,2));
          callback(null, data.MessageId);
        }
      });
    } else {
      console.log("sendMsg: Number and Message are required fields.");
      callback("sendMsg failed", null);
    }
  };

  switch(event.clickType) {
    case "SINGLE":
      console.log("SINGLE Click");
      sendMsg(phone1,message1);
      break;
    case "DOUBLE":
      console.log("DOUBLE CLICK");
      sendMsg(phone2,message2);
      break;
    case "LONG":
      console.log("LONG CLICK");
      sendMsg(phone1,'Battery voltage: '+event.batteryVoltage);
      break;
    default:
      console.log("NO CLICKS GIVEN");
      context.done();
  }

};
