const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://restful-booker.herokuapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      hideCredentials: true,
      requestMode: true,
      auth_url: '/auth',
      body:{
        "username": "admin",
        "password": "password123"}
    }
  },
});
