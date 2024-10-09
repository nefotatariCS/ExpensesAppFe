describe('template spec', () => {
  it('should pass', () => {
    cy.intercept('POST', '**/api/auth/signIn').as('login');
    cy.visit('/');
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.logOut();
  });
});
