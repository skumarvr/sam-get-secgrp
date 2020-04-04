// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-southeast-2'});

var EC2 = new AWS.EC2();

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    var params = {};
    let result = await EC2.describeSecurityGroups().promise().then(
        function(data) {
            return data.SecurityGroups;
        });
        
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
};