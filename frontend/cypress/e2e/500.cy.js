describe('Server Down Page', () => {
  beforeEach(() => {
    cy.visit('/Server500', { timeout: 60000 });
  });

  it('should display a 500 error message', () => {
    cy.get('.server-down').should('exist');
    cy.get('.server-down-content h2').first().should('have.text', '500');
  });
});
