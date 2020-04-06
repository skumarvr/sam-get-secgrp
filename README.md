# sam-get-secgrp
Serverless application - Lambda to list all EC2 security groups in an AWS Account.


A. API Gateway + Lambda

    Create a Serverless application.
    More info: https://serverless.com/framework/docs/providers/aws/events/apigateway#configuring-endpoint-types
    Create a Lambda to list all EC2 security groups in an AWS Account.
    Make the Lambda function available via an AWS API Gateway endpoint.
    Write unit tests for your code by mocking AWS EC2 API.
    Hint: You can use the aws-sdk-mock npm module
    Produce a code coverage report for your test suite.
    Secure the endpoint using a custom API Gateway Lambda Authoriser.
    More info: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html
    Write an end-to-end API test for the endpoint.
    Make response JSON:API 1.0 (https://jsonapi.org/format/1.0/) compatible.

# Code structure

e2e-tests : Contains the e2e testing code using cypress

get-secgrp-lambdaAuth : Lambda Token Authorizer code files

get-secgrp : Lambda function for the APIGateway endpoint



APIGateway endpoint to list all EC2 security groups : /secgrp

# Running E2E tests -
./e2e-tests$ npm run test

Note - Update the baseurl in the e2e-tests/config.json file.
