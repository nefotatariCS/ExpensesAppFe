describe('template spec', () => {
  it('passes', () => {
    cy.intercept('POST', '**/api/auth/signIn').as('login');
    cy.visit('/');
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.wait('@login').its('response.statusCode').should('eq', 200);

    cy.logOut();
  });
  it('ensures that button color is orange', () => {
    cy.visit('/');
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.get('#loginButton')
      .should('have.css', 'background-color')
      .and('eq', '#2aa538'); //This should fail
    cy.logOut();
  });
});
