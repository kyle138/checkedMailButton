'use strict';

/*
Written by Kyle Munz
https://github.com/kyle138/checkedMailButton
*/

const AWS = require('aws-sdk');
const SNS = new AWS.SNS( {apiVersion: '2010-03-31'} );

var params = {};
/**
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */

exports.handler = (event, context, callback) => {
  //console.log('Received event:', JSON.stringify(event,null,2));    //DEBUG

  function sendMsg(number, message, cb) {
    if(number && message) {
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
      sendMsg('+1PHONENUMBER','Cathy checked the mail.');
      break;
    case "DOUBLE":
      console.log("DOUBLE CLICK");
      sendMsg('+1PHONENUMBER','Kyle checked the mail.');
      break;
    case "LONG":
      console.log("LONG CLICK");
      sendMsg('+1PHONENUMBER','Battery voltage: '+event.batteryVoltage);
      break;
    default:
      console.log("NO CLICKS GIVEN");
      context.done();
  }

};
