describe('Test Suit - Auth API Booker', () => {
  it('1 - POST - Credentials to auth endpoint with success', () => {
    cy.request({
      url: "/auth",
      method: "POST",
      body:{
            "username": "admin",
            "password": "password123"
      },
      headers:{'Content-Type': 'application/json'},
      failOnStatusCode: false
    }
    ).then((response)=>{
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token').and.to.be.a('string');
      expect(response.body).not.to.be.empty;

    });

  });


  it('2- POST - Credentials to auth endpoint with success (Version two)', () => {

    let body = {
      "username": "admin",
      "password": "password123"}
    

      cy.postRequest(Cypress.env('auth_url'), {"Content-type": "application/json"}, body)
      .then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token').and.to.be.a('string');
      expect(response.body).not.to.be.empty;
    });



  })
})

