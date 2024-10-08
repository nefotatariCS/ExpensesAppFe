describe('Smoke tests', () => {
  it('ensures that the application is opened correctly', () => {
    cy.visit('/');
    cy.get('.card-header').should('exist').and('have.text', 'Expenses App');
    cy.get('.btn').should('exist').and('contain', 'Log In');
  });
});
