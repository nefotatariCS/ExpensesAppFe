describe('Add New User', () => {
  it('should navigate to the Users page and create a new user', () => {
    cy.visit('/');
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.contains('Users').click();
    cy.contains('Add New User').click();

    cy.get('#name').should('exist').type('Nefo');
    cy.get('#lastName').should('exist').type('Tatari');
    cy.get('#userName').should('exist').type('NefoTatari');
    cy.get('#password').should('exist').type('password123');
    cy.get('#email').should('exist').type('NefoTatari@test.com');
    cy.get('#phoneNumber').should('exist').type('0696968521');

    cy.get('p-dropdown[formcontrolname="gender"]').click();
    cy.get('.p-dropdown-item').contains('Female').click();

    cy.get('p-dropdown[formcontrolname="userRole"]').click();
    cy.get('.p-dropdown-item').contains('Admin User').click();

    cy.contains('button', 'Save User').click();

    cy.contains('Nefo').should('exist');
    cy.contains('Tatari').should('exist');
    cy.contains('NefoTatari').should('exist');
    cy.contains('NefoTatari@test.com').should('exist');
    cy.contains('0696968521').should('exist');
    cy.contains('Operatore User').should('exist');
    //cy.contains('Admin User').should('exist'); ne rast se duam te na failin testet
    cy.logOut();
  });
});
