describe('Privacy Policy Page', () => {
    beforeEach(() => {
      cy.visit('/privacyPolicy', { timeout: 60000 });
    });
  
    it('should display the correct title and last updated date', () => {
      cy.get('h1').should('not.contain', 'Missing translation'); 
      cy.get('p strong').first().should('not.contain', 'Missing translation'); 
    });
  });
  