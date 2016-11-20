# checkedMailButton
## Lambda Handler for IoT Dash checkedMailButton

![IoT Button](http://iotbutton.kylemunz.com/images/image00.jpg "IoT Button")
I wanted to play with the AWS IoT Button and racked my brain to think of how to use it. In our house whoever gets home first checks the mail and then texts the other person to let them know. Believe it or not texting two words “checked mail” every day can get tedious. Even using “Ok google, send message to…” gets tiresome. So I’ve configured my button so a SINGLE click texts my phone with the message “Cathy checked the mail.” A DOUBLE click texts my wife’s phone with “Kyle checked the mail.” And a LONG click texts my phone with the button’s remaining battery voltage.

___
## Step 1: Setting up the IoT Button
##### You will need a laptop or computer with WiFi in order to connect with and configure your IoT Button. This comes in handy later when you find yourself copying/pasting information. This step assumes that you have already created and logged in to your AWS account.
1. Go to [https://aws.amazon.com/iot/button/](https://aws.amazon.com/iot/button/)
2. Click on **[Go to Configuration Wizard]**.
3. Select **"IoT Button"** from the IoT Type drop-down menu.
4. Enter your device serial number found on the back of Button.
5. Follow the steps in the Wizard to connect to your Button and configure it to connect to WiFi and register it with AWS IoT.
6. Continue the steps to create the Lambda function using the provided sample code. We will update that in the Step 3 but for now update the sample code using your email address.
7. At this point click your button and it will email you the test message. The sample Lambda function will create the SNS topic that you will configure in Step 2.

___
## Step 2: Subscribe Cellular Numbers to SNS
##### The sample Lambda function creates an SNS topic named ‘aws-iot-button-sns-topic’ the first time it is executed. In this step we will add our cellular numbers to that topic to allow sending SMS messages.
1. Go to the Amazon SNS Console.
2. Click on **Topics** from the left hand menu.
3. Locate the **‘aws-iot-button-sns-topic’** Topic and click on its ARN.
4. Click on **[Create Subscription]**.
5. Select **‘SMS’** for **Protocol**.
6. For **Endpoint** enter your cellular number in the *1-138-867-5309* format.
7. Click on **[Create Subscription]**.
8. Repeat substeps 4-7 for an additional cellular number.

___
## Step 3: Update Lambda Function
##### After the sample code has created the SNS Topic updated in Step 2 it has served its purpose. Overwrite the sample code with the code below updating ‘+1PHONENUMBER’ with your actual cellular numbers and appropriate messages.
```javascript
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
```

1. Go to the Amazon Lambda Console.
2. Copy and paste the contents of [index.js](https://github.com/kyle138/checkedMailButton/blob/master/index.js) into your Lambda function.
3. Update the '+1PHONENUMBER' entries below with your actual cellular numbers and appropriate messages.
4. Click on **[Save]** and click your Button again to test.

___
## Credits:
##### As usual, I haven't come up with all of this myself. Inspiration was found from the links below:
* [https://aws.amazon.com/iot/button/](https://aws.amazon.com/iot/button/) (The wizard is refreshingly thorough.)
* [https://www.socialcustomer.com/2016/05/how-to-set-up-an-aws-iot-button.html](https://www.socialcustomer.com/2016/05/how-to-set-up-an-aws-iot-button.html) (Some configuration differences but great screenshots, something I've left out of this walkthrough.)
