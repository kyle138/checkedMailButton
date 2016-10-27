'use strict';

var aws = require('aws-sdk');
aws.config.update({region:'us-west-2'});

exports.handler = (event, context, callback) => {
  var sns = new aws.SNS({params: {TopicArn: 'arn:aws:sns:us-west-2:304786516436:checkMailButton'}});

  sns.publish({Message: 'I checked the mail.'}, function (err, data) {
    if (err) {
      console.error("SNS Publish failed: "+err);
    } else {
      console.log("SNS Publish successful! "+ JSON.stringify(data,null,2));
      callback(null, data.MessageId);
    }
  });

};
