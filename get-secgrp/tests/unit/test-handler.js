'use strict';

const AWS = require('aws-sdk-mock');
const app = require('../../app.js');
const chai = require('chai');

const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    before(() => {
        AWS.mock('EC2', 'describeSecurityGroups', (params, callback) => {
            var secGrp = {
                SecurityGroups: [
                    {
                        Description: 'default security group',
                        GroupName: 'default',
                        IpPermissions: [],
                        OwnerId: '282558604768',
                        GroupId: 'sg-00020be470ffd3643',
                        IpPermissionsEgress: [],
                        Tags: [],
                        VpcId: 'vpc-c3a8aea4'
                    },
                    {
                        Description: 'Security group1754',
                        GroupName: 'secGrp1754',
                        IpPermissions: [],
                        OwnerId: '282558604768',
                        GroupId: 'sg-000190444228c4caa',
                        IpPermissionsEgress: [],
                        Tags: [],
                        VpcId: 'vpc-c3a8aea4'
                    },
                    {
                        Description: 'Security group410',
                        GroupName: 'secGrp410',
                        IpPermissions: [],
                        OwnerId: '282558604768',
                        GroupId: 'sg-00020be470ffd3643',
                        IpPermissionsEgress: [],
                        Tags: [],
                        VpcId: 'vpc-c3a8aea4'
                    }
                ]
            };
            console.log("Mock EC2");
            
            return new Promise((resolve, reject) => {
                setTimeout( function() {
                  resolve(secGrp)
                }, 250);
            });
        });
    });
    
    after(() => {
        AWS.restore('EC2');
    });

    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)
        console.log(result);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
        expect(response).to.have.lengthOf(3);

        // Get all security Group names
        let grpNameArray = response.map(x => ({GroupName: x.GroupName}));
        // Check for 'default' securtiy group
        expect(grpNameArray).to.deep.include({GroupName: 'default'});
    });
});
