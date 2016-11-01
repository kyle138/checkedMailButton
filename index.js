'use strict';

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
  //console.log('Received event:', event.clickType);    //DEBUG

  switch(event.clickType) {
    case "SINGLE":
      console.log("SINGLE Click");
      params.PhoneNumber = '+1PHONENUMBER';
      params.Message = 'Cathy checked the mail.';
      SNS.publish(params, function (err, data) {
        if (err) {
          console.error("SNS Publish failed: "+err);
        } else {
          console.log("SNS Publish successful! "+ JSON.stringify(data,null,2));
          callback(null, data.MessageId);
        }
      });
      break;
    case "DOUBLE":
      console.log("DOUBLE CLICK");
      params.PhoneNumber = '+1PHONENUMBER';
      params.Message = 'Kyle checked the mail.';
      SNS.publish(params, function (err, data) {
        if (err) {
          console.error("SNS Publish failed: "+err);
        } else {
          console.log("SNS Publish successful! "+ JSON.stringify(data,null,2));
          callback(null, data.MessageId);
        }
      });
      break;
    case "LONG":
      console.log("LONG CLICK");
      params.PhoneNumber = '+1PHONENUMBER';
      params.Message = 'Battery Voltage: '+event.batteryVoltage;
      SNS.publish(params, function (err, data) {
        if (err) {
          console.error("SNS Publish failed: "+err);
        } else {
          console.log("SNS Publish successful! "+ JSON.stringify(data,null,2));
          callback(null, data.MessageId);
        }
      });
      break;
    default:
      console.log("NO CLICKS GIVEN");
  }

};
