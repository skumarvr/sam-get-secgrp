'use strict';

const app = require('../../app.js');
const chai = require('chai');

const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('array');
        expect(response).to.have.lengthOf.at.least(1);

        // Get all security Group names
        let grpNameArray = response.map(x => ({GroupName: x.GroupName}));
        // Check for 'default' securtiy group
        expect(grpNameArray).to.deep.include({GroupName: 'default'});
    });
});
