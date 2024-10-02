describe('Add and Edit Expense', () => {
  it('should add a new expense and then edit it', () => {
    cy.visit('/');
    cy.login('KGici2', 'Test1234');
    cy.get('button').contains('Edit').first().click();

    cy.get('#description').clear().type('Updated Description');
    cy.get('#currency').clear().type('ALL');
    cy.get('#amount').clear().type('180');

    cy.get('#transactionDate').click();
    cy.get('[ng-reflect-label="Today"]').click();

    cy.contains('button', 'Save').click();

    cy.contains('Updated Description').should('exist');
    cy.contains('ALL').should('exist');
    cy.contains('180').should('exist');

    cy.logOut();
  });
});
