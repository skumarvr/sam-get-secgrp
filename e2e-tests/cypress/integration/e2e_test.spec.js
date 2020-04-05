/// <reference types="cypress" />
context('Network Requests', () => {
    // var invokeUrl = 'https://bdwclcypp7.execute-api.ap-southeast-2.amazonaws.com/Stage/secgrp'
    var invokeUrl = Cypress.env('invoke_url');

    it('cy.request() - make an XHR request', () => {
        cy.request({
            url: invokeUrl,
            failOnStatusCode: false,
        }) .should((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.eq('Unauthorized')
            expect(response).to.have.property('headers')
            expect(response.headers).to.have.property('content-type')
            expect(response.headers['content-type']).to.eq('application/json')
        })
    })

    it('cy.request() - make an XHR request', () => {
        cy.request({
            url: invokeUrl,
            headers: {
                'Authorization':'allow'
            }
        }) .should((response) => {
            expect(response.status).to.eq(200)
            expect(response).to.have.property('headers')
            expect(response.headers).to.have.property('content-type')
            expect(response.headers['content-type']).to.eq('application/json')

            console.log(response.body)
            let secGrp = response.body;

            expect(secGrp).to.be.an('array');
            expect(secGrp).to.have.lengthOf.at.least(1);
    
            // Get all security Group names
            let grpNameArray = secGrp.map(x => ({GroupName: x.GroupName}));
            // Check for 'default' securtiy group
            expect(grpNameArray).to.deep.include({GroupName: 'default'});
        })
    })

    it('cy.request() - make an XHR request', () => {
        cy.request({
            url: invokeUrl,
            headers: {
                'Authorization':'deny'
            },
            failOnStatusCode: false
        }) .should((response) => {
            expect(response.status).to.eq(403)
            expect(response.body.Message).to.eq('User is not authorized to access this resource with an explicit deny')
            expect(response).to.have.property('headers')
            expect(response.headers).to.have.property('content-type')
            expect(response.headers['content-type']).to.eq('application/json')
        })
    })

    it('cy.request() - make an XHR request', () => {
        cy.request({
            url: invokeUrl,
            headers: {
                'Authorization':'invalid-token'
            },
            failOnStatusCode: false
        }) .should((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.eq('Unauthorized')
            expect(response).to.have.property('headers')
            expect(response.headers).to.have.property('content-type')
            expect(response.headers['content-type']).to.eq('application/json')
        })
    })
})