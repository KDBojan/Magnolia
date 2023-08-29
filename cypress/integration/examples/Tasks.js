describe('Magnolia Test Suite', function()
{
    //Precondition: The login should be further used implemented as a precondition for every test.
    //When you are not logged in, no test can be run.
    beforeEach(() => {
        cy.visit(Cypress.env('login_url'), {failOnStatusCode: false})
        cy.get('#username').type(Cypress.env('username_password'))  
        cy.get('#password').type(Cypress.env('username_password'))  
        cy.get("button").click()
    })

    //Postconditon: The browser should be closed after every test or at least after test suite has run.
    //There is no need to write postcondition since tasks are divided into separated test cases and browser will close after every execution.

    //1. Verify successful login - idea is to fetch some element that is seen only if user is logged in.
    it('Test case 1', function()
    {
        cy.get('[href="/travel/members/login.html?mgnlLogout=true"]').should('exist')
    })

    //2. Verify that the website was successfully loaded/opened - idea is to check if DOM elements are present. 
    //It could be done as well with verification that the loader does not exist or adding some timeout. 
    //This could go into more details by verifying that everything is properly rendered on the landing page.
    it('Test case 2', function()
    {
        cy.get('#navbar').should('exist')
        cy.get('.carousel-inner > .active').should('exist')
        cy.get('.category-card-row > .row').should('exist') 
        cy.get('.footer-1').should('exist')   
        cy.get('.cc-window').should('exist')
    })
  
    //3. Verify that the navigation element (Members - as marked within task picture) work and lead to the expected page
    it('Test case 3', function()
    {
        cy.get('ul.nav.navbar-nav').find('li').contains(Cypress.env('nav_option')).click()
        cy.url().should('include', Cypress.env('nav_url_data'))
    })

    //3a. Verify that the navigation element from dropdown (Tours - as marked under task picture) works and lead to the expected page 
    //(make sure the method is extensible, to cover more subpage if necessary)
    it('Test case 3a', function()
    {
        cy.get(':nth-child(1) > .dropdown-toggle').click()
        cy.get('.open > .dropdown-menu').find('li').eq(1).click()
          cy.location().then((location) => {
            cy.wrap(location.href).should(
              "contain",
              Cypress.env('tours_location'))
         })
    })

    //4. Verify that the language can be switched between English and German
    it('Test case 4', function()
    {
        cy.get('#language-link > ul > :nth-child(2) > a').click()
        cy.get('.active > .container > .carousel-link > .carousel-caption > h1').should('contain.text','Von Hütte zu Hütte in den Schweizer Alpen')
    })

    //5. Verify that a search for the term Europe should raise at least 3 hits
    //5a. Open one of the search results and verify that the user is redirected to the expected page
    it('Test case 5/5a', function()
    {
        //5.
        cy.get('#nav-search').type('Europe{enter}')
        cy.get('.excerpt-fragment').should('contain', 'Europe').should('have.lengthOf.at.least', 3)
        //5a.
        cy.get(':nth-child(5) > .list-group-item').click()
        cy.url().should('include', 'Ammouliani-Island.html')
    })

    //6. Verify that the tour Active -> "Hut to Hut in the Swiss Alps" contains the following tour properties:
    // a. Start city = Zurich, Switzerland
    // b. Duration = 7 days
    // c. Tour operator = Magnolia travel
    it('Test case 6', function()
    {
        cy.get(':nth-child(1) > .dropdown-toggle').click()
        cy.get('.open > .dropdown-menu').find('li').eq(0).click() 
        cy.get(':nth-child(1) > .tour-card-anchor > .tour-card-content > h3').click()
        //a.
        cy.get(':nth-child(1) > .property-label').should('have.text', 'start city')
        cy.get(':nth-child(1) > .property-value').should('have.text', Cypress.env('location'))
        //b.
        cy.get(':nth-child(2) > .property-label').should('have.text', 'duration')
        cy.get(':nth-child(2) > .property-value').should('have.text', Cypress.env('duration'))
        //c.
        cy.get(':nth-child(3) > .property-label').should('have.text', 'tour operator')
        cy.get(':nth-child(3) > .property-value').should('have.text', Cypress.env('tourOperator'))
    })

    //7. Book the tour (or any other)
    //a. Hint: The last step "Review" cannot be finished due to an error in the test system: "Internal error, form could not be sent".
    //Assume this is an unexpected error
    //b. Use any meaningful data. Fill every field, do not skip optional entries.
    it('Test case 7', function()
    {
        cy.get(':nth-child(1) > .dropdown-toggle').click()
        cy.get('.open > .dropdown-menu').find('li').eq(0).click() 
        cy.get(':nth-child(1) > .tour-card-anchor > .tour-card-content > h3').click()
        cy.get('form > .btn').click()   
        //Book your tour
        cy.get('input[type="checkbox"]').first().check().should('be.checked')
        cy.get('select').select('Yes').should('have.value','yes')
        cy.get('#adults').type(Cypress.env('adults')).should('contain.value', Cypress.env('adults'))   
        cy.get('#youth').type('1{enter}').should('contain.value', Cypress.env('youth'))
        //Meal
        cy.get('[value="vegeterian"]').check().should('be.checked')
        cy.get('#additionalMealNotes').type('Lot of vegetables, no meat.').should('have.value','Lot of vegetables, no meat.')
        cy.get('[value="Next step"]').click()
        //Personal details
        cy.get('#title').type(Cypress.env('title')).should('have.value', Cypress.env('title'))
        cy.get('#firstName').type(Cypress.env('firstName')).should('have.value', Cypress.env('firstName'))
        cy.get('#lastName').type(Cypress.env('lastName')).should('have.value', Cypress.env('lastName'))
        cy.get('#email').type(Cypress.env('email')).should('have.value', Cypress.env('email'))
        cy.get('#phone').type(Cypress.env('phone')).should('have.value', Cypress.env('phone'))
        cy.get('#city').type(Cypress.env('city')).should('have.value', Cypress.env('city'))
        cy.get('#country').type(Cypress.env('country')).should('have.value', Cypress.env('country'))
        cy.get('#postalOrZip').type(Cypress.env('ZIP')).should('have.value', Cypress.env('ZIP'))
        cy.get('#province').type(Cypress.env('province')).should('have.value', Cypress.env('province'))
        cy.get('[value="Next step"]').click()
        //Review
        cy.get('[value="Confirm Booking"]').click()
        cy.get('.text > ul > li').should('not.contain', 'Internal error')
    })
})