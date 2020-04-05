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

# Running E2E tests -
./e2e-tests$ npm run test -- --env invoke_url=<<apigateway_invoke_url>>

Example : 
./e2e-tests$ npm run test -- --env invoke_url=https://bdwclcypp7.execute-api.ap-southeast-2.amazonaws.com/Stage/secgrp
