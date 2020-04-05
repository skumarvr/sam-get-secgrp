'use strict';

const app = require('../../app.js');
const chai = require('chai');

const expect = chai.expect;
var event, context, callback;

// Callback
var callback = function(err, result) {
    console.log('Inside callback!!!');
    if (err) {
        var resp = {
            "principalId": "user",
            "policyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                    {
                    "Action": "execute-api:Invoke",
                    "Effect": "Allow",
                    "Resource": "arn:aws:execute-api:ap-southeast-2:123456789012:example/prod/POST/{proxy+}"
                    }
                ]
            }
        }
        console.log(typeof(resp));
        return resp;
    }
    if (result) {
        var resp = {
            "principalId": "user",
            "policyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                    {
                    "Action": "execute-api:Invoke",
                    "Effect": "Allow",
                    "Resource": "arn:aws:execute-api:ap-southeast-2:123456789012:example/prod/POST/{proxy+}"
                    }
                ]
            }
        }
        console.log(typeof(resp));
        return resp;
    }
}

describe('Tests index', function () {
    it('verifies ALLOW response', function () {
        event = {
            "type": "TOKEN",
            "authorizationToken": "allow",
            "methodArn": "arn:aws:execute-api:ap-southeast-2:123456789012:example/prod/POST/{proxy+}"
        }

        app.lambdaHandler(event, context, (err, result) => {
            console.log('err : ', err);
            console.log('result : ', result);
            var statement = result.policyDocument.Statement[0];
            console.log('statement : ', statement);
            expect( err ).to.not.exist;  
            expect( result ).to.exist;
            expect( result.principalId ).to.equal('user');
            expect( statement.Action ).to.equal('execute-api:Invoke');
            expect( statement.Effect ).to.equal('Allow');
        });
    });

    it('verifies DENY response', async () => {
        event = {
            "type": "TOKEN",
            "authorizationToken": "deny",
            "methodArn": "arn:aws:execute-api:ap-southeast-2:123456789012:example/prod/POST/{proxy+}"
        };

        app.lambdaHandler(event, context, (err, result) => {
            console.log('err : ', err);
            console.log('result : ', result);
            var statement = result.policyDocument.Statement[0];
            console.log('statement : ', statement);
            expect( err ).to.not.exist;  
            expect( result ).to.exist;
            expect( result.principalId ).to.equal('user');
            expect( statement.Action ).to.equal('execute-api:Invoke');
            expect( statement.Effect ).to.equal('Deny');
        });
    });

    it('verifies UNAUTHORISED response', async () => {
        event = {
            "type": "TOKEN",
            "authorizationToken": "unauthorized",
            "methodArn": "arn:aws:execute-api:ap-southeast-2:123456789012:example/prod/POST/{proxy+}"
        }

        app.lambdaHandler(event, context, (err, result) => {
            console.log('err : ', err);
            console.log('result : ', result);
            expect( err ).to.exist;  
            expect( result ).to.not.exist;
            expect( err ).to.equal('Unauthorized');
        });
    });

    it('verifies INVALID TOKEN response', async () => {
        event = {
            "type": "TOKEN",
            "authorizationToken": "hello-world",
            "methodArn": "arn:aws:execute-api:ap-southeast-2:123456789012:example/prod/POST/{proxy+}"
        }

        app.lambdaHandler(event, context, (err, result) => {
            console.log('err : ', err);
            console.log('result : ', result);
            expect( err ).to.exist;  
            expect( result ).to.not.exist;
            expect( err ).to.equal('Error: Invalid token');
        });
    });
});
