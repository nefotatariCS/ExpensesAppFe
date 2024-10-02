describe('template spec', () => {
  it('passes', () => {
    cy.intercept('POST', '**/api/auth/signIn').as('login');
    cy.visit('/');
    cy.login('KGici2', 'Test1234');
    cy.wait('@login').its('response.statusCode').should('eq', 200);

    cy.logOut();
  });
});
