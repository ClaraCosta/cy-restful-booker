describe('Test Suit - Auth API Booker', () => {

    let token = null;

    before(() => {
        //Gerando um token antes de cada teste
        cy.request({
            method: 'POST',
            url: '/auth',
            headres: { 'Content-Type': 'application/json'},
            body: {
                username: "admin",
                password: "password123"
            }
        })
        .then((response)=>{
            token = response.body.token;
            cy.log(JSON.stringify(token));
            Cypress.env("token", token);
        });

    })



        it('1 - Get all booking ids', () => {
        cy.request({
            method: 'GET',
            url: '/booking',
            headres: { 'Content-Type': 'application/json'}
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.lengthOf.at.least(1);
            expect(response.body[0]).to.have.property('bookingid');
    
        });

        
        })

        it('2 - Get booking created by it "3 - Creating a new booking with success" ', () => {
            cy.request({
                method: 'GET',
                url: `/booking/`+ Math.floor(Math.random() * 10),
                headres: { 'Content-Type': 'application/json'}
                }).then((response)=>{
                expect(response.status).to.eq(200);
                expect(response.body).to.have.a.property( "firstname").to.be.an('string');

        });

        })
        

        it('3 - Creating a new booking with success', () => {
            cy.request({
            method: 'POST',
            url: '/booking',
            headres: { 'Content-Type': 'application/json'},
            body:{
                firstname: "Clara",
                lastname: "Costa",
                totalprice: 100,
                depositpaid: true,
                bookingdates: {
                    checkin: "2018-01-01",
                    checkout: "2019-01-01"
                },
                additionalneeds: 'Breakfast'
            },
            }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an( "object");
            expect(response.body).to.have.a.property( "bookingid").and.to.be.a("number");
            //Recuperando um teste através do alias
            cy.wrap(response).as('bookingCreated', {type: 'static'});

        }).then(function () {
            cy.request({
                method: 'GET',
                //Chamando id recuperado através do alias criado
                url: '/booking/'+ this.bookingCreated.body.bookingid ,
                headres: { 'Content-Type': 'application/json'},
            }).then((response) =>{
                expect(response.status).to.eq(200);
            })
            
        });
       

        })

        it('4 - Updating a booking with success', () => {
            
            cy.request({
                method: 'PUT',
                url: '/booking/30',
                headers: {
                    Accept: "application/json",
                    Cookie: `token=${token}`,
                  },
                body:{
                    firstname: "Another",
                    lastname: "User",
                    totalprice: 10,
                    depositpaid: false,
                    bookingdates: {
                        checkin: "2018-01-01",
                        checkout: "2019-01-01"
                    },
                    additionalneeds: 'Dinners'
                },

        }).then((response) =>{
            cy.log(JSON.stringify(response.body));
        })

        
                
            })

})


describe('Test Suit - Booking API Testing with custom commands', () => {

    it('1 - Get all booking ids', () => {
        cy.getRequest('/booking', { 'Content-Type': 'application/json'}).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.lengthOf.at.least(1);
            expect(response.body[0]).to.have.property('bookingid');
        })
    })

    it('2 - Get booking id by firstname', () => {

        let queryString = {'firstName': 'test'};

        cy.getRequest('/booking', { 'Content-Type': 'application/json'}, queryString).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.lengthOf.at.least(1);
            expect(response.body[0]).to.have.property('bookingid');
        })
    })

    it('3 - Creating new booking with success (Fixture)', () => {

        cy.fixture('bookingPost.json').then((newBooking) => {

            cy.postRequest('/booking', { 'Content-Type': 'application/json'}, newBooking).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.property('bookingid');
            })

        })

    })
    

})