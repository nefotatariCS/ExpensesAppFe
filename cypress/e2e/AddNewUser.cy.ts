describe('Add New User', () => {
  it('should fail when trying to create a new user', () => {
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

    cy.get('.error-message').should('have.text','Failed! UserName is actually used!')
    cy.logOut();
  });
});
