describe('Access Denied Page', () => {
    const languages = ['es-ES', 'en-UK', 'en-US', 'fr-FR', 'de-DE', 'it-IT'];
  
    beforeEach(() => {
      cy.setCookie('cookiesAccepted', 'true');
      cy.setCookie('userName', 'Name');
      cy.setCookie('userToken', 'Abc');
      cy.setCookie('guestToken', 'abc');
      cy.setCookie('expirationDate', '2024-09-17T14:36:03.584Z');
      cy.intercept('POST', 'http://localhost:4000/texts', {
        fixture: 'createTexts.json',
      });
      cy.visit('/createText', { timeout: 60000 });
    });
    
    languages.forEach((lang) => {
      it(`should display correct translated title and text for ${lang}`, () => {
        cy.setCookie('language', lang);
        cy.get('.access-denied .message').should('not.contain', 'Missing translation');
        cy.get('.access-denied .link').should('not.contain', 'Missing translation').and('have.attr', 'href', '/');
      });
    });
  
    languages.forEach((lang) => {
      it(`should display the create text form with no missing translation for fields in ${lang}`, () => {
        cy.setCookie('userType', 'admin');
        cy.setCookie('language', lang);
  
        cy.get('#title').should('not.contain', 'Missing translation');
        cy.get('#text').should('not.contain', 'Missing translation');
        cy.get('#type').should('not.contain', 'Missing translation');
        cy.get('#language').should('not.contain', 'Missing translation');
      });
    });
  });
  