describe('Add New Expense', () => {
  it('should add a new expense', () => {
    cy.visit('/');
    cy.login('KGici2', 'Test1234');
    cy.contains('Add New Expense').click();

    cy.get('#description').should('exist').type('Shpenzim Random');
    cy.get('#currency').should('exist').type('USD');
    cy.get('#amount').should('exist').type('100.00');

    cy.get('#transactionDate').click();
    cy.get('.p-datepicker-calendar .p-datepicker-today').click();

    cy.contains('button', 'Save').click();

    cy.contains('Shpenzim Random').should('exist');
    cy.contains('USD').should('exist');
    cy.contains('100.00').should('exist');

    cy.logOut();
  });
});
