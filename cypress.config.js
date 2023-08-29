const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/examples/*.js'
  },
  env: {
    login_url: 'https://demoauthor.magnolia-cms.com/travel/',
    //Since username and password have the same value I put it under the same variable, 
    //but it should be separated.
    username_password: 'superuser',
    tours: 'BEACH',
    tours_location: 'beach~.html',
    nav_option: 'Members',
    nav_url_data: '/travel/members.html',
    title: 'Title',
    firstName: 'Bob',
    lastName: 'Dylan',
    email: 'bobdylan@gmail.com',
    phone: '063123456',
    city: 'Novi Sad',
    country: 'Serbia',
    ZIP: '21000',
    province: 'Vojvodina',
    adults: '2',
    youth: '1',
    location: 'Zurich, Switzerland',
    duration: '7 days',
    tourOperator: 'Magnolia Travels'
  }
});
