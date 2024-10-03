describe('Add and Edit Expense', () => {
  it('should add a new expense and then edit it', () => {
    cy.visit('/');
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.get('button').contains('Edit').first().click();

    cy.get('#description').clear().type('Updated Description');
    cy.get('#currency').clear().type('ALL');
    cy.get('#amount').clear().type('180');

    cy.get('#transactionDate').click();
    cy.get('button span').contains('Today').click();

    cy.contains('button', 'Save').click();

    cy.contains('Updated Description').should('exist');
    cy.contains('ALL').should('exist');
    cy.contains('180').should('exist');

    cy.logOut();
  });
});
