/// <reference types = "cypress" />

const requestBody = require('./Booking.json');

// Practise API testing with Cypress
// Will use the Restful Booker API
// https://restful-booker.herokuapp.com/

describe("Testing Restful Booker API", () => {
    it("Check health of API", () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/ping',
            method: 'GET'
        }).should((response) => {
            cy.log(JSON.stringify(response.body))
        });

    });
    it("Retrieve All Booking ids", () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/booking',
            method: 'GET'
        }).should((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    it("Retrieve a specific Booking id", () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/booking/4',
            method: 'GET'
        }).should((response) => {
            cy.log(JSON.stringify(response.body))
        });
    })
    it("Create a new booking", () => {
            cy.request({
                url: 'https://restful-booker.herokuapp.com/booking',
                method: 'POST',
                body: {
                    "firstname": requestBody.firstname,
                    "lastname": requestBody.lastname,
                    "totalprice": requestBody.totalprice,
                    "depositpaid": requestBody.depositpaid,
                    "bookingdates": {
                        "checkin": requestBody.bookingdates.checkin,
                        "checkout": requestBody.bookingdates.checkout
                    },
                    "additionalneeds": requestBody.additionalneeds
                }
            }).should((response) => {
                cy.log(JSON.stringify(response.body))
            })
        
    })


    let token; // hold authorization token

    it("Create a new authoriztion token for Update and delete", () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/auth',
            method: 'POST',
            body: {
                "username": "admin",
                "password": "password123"
            }
        }).should((response) => {
            cy.log(JSON.stringify(response.body))
            token = response.body.token // to be used for updates and deletes of bookings
        })


    })
    it("Update an existing booking", () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/booking/1',
            method: 'PUT',
            headers: {
                "Cookie": `token = ${token}` // Retrieved from previous API auth request
            },
            body: {
                "firstname": "Susan",
                "lastname": "Ericsson",
                "totalprice": 706,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2018-09-20",
                    "checkout": "2021-05-30"
                }
            }
        }).should((response) => {

            cy.log(JSON.stringify(response.body))
        })
    })
    it("Delete a booking", () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/booking/6',
            method: 'DELETE',
            headers: {
                "Cookie": `token = ${token}` // Retrieved from previous API auth request
            }

        }).should((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })
    it("Partial update of a booking", () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/booking/5',
            method: 'PATCH',
            body: {
                "firstname" : "Tim",
                "lastname": "Smith"
            },
            headers: {
                "Cookie": `token = ${token}`
            }
        }).should((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

})