describe('Test Suit - Auth API Booker', () => {
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
        url: '/booking/74',
        headres: { 'Content-Type': 'application/json'}
        }).then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body).to.have.a.property( "firstname");
        expect(response.body).to.have.a.property( "depositpaid", true);

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

})