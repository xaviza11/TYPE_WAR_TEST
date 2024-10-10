describe('Server Down Page', () => {
    beforeEach(() => {
      cy.visit('/Server500', { timeout: 60000 });
    });
  
    it('should navigate back to the home page when clicking the link', () => {
      cy.get('.server-down-content a').click();
  
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  
    const languages = ['es-ES', 'en-UK', 'en-US', 'fr-FR', 'de-DE', 'it-IT'];
  
    languages.forEach((language) => {
      it(`should display correct translated title and text for ${language}`, () => {
        cy.setCookie('language', language);
        cy.get('.server-down-content h2').should('not.contain', 'Missing translation');
        cy.get('.server-down-content p').should('not.contain', 'Missing translation');
        cy.get('.server-down-content a').should('not.contain', 'Missing translation');
      });
    });
  });
  