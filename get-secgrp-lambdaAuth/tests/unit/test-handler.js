'use strict';

const app = require('../../app.js');
const chai = require('chai');

const expect = chai.expect;
var event, context, callback;

describe('Tests index', function () {
    it('verifies ALLOW response', function () {
        // allow token
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
        // deny token
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
        // unauthorised token
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
        // invalid token
        event = {
            "type": "TOKEN",
            "authorizationToken": "invalid-token",
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
});
