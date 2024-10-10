describe('Register Page', () => {
    const languages = ['es-ES', 'en-UK', 'en-US', 'fr-FR', 'de-DE', 'it-IT'];
    
    beforeEach(() => {
      cy.setCookie('cookiesAccepted', 'true');
      cy.setCookie('guestToken', 'adv');
      cy.setCookie('expirationDate', '2024-09-17T14:36:03.584Z');
      cy.intercept('POST', 'http://localhost:4000/users', {
        fixture: 'createUser.json',
      });
      cy.visit('/register', { timeout: 60000 });
    });
  
    languages.forEach((lang) => {
      it(`should display correct translated text for ${lang}`, () => {
        cy.setCookie('language', lang);
        cy.visit('/register');
  
        cy.get('.title').should('not.contain', 'Missing translation');
        cy.get('label[for="name"]').should('not.contain', 'Missing translation');
        cy.get('label[for="email"]').should('not.contain', 'Missing translation');
        cy.get('label[for="password"]').should('not.contain', 'Missing translation');
        cy.get('.register-button').should('not.contain', 'Missing translation');
        cy.get('.links-container .link').eq(0).should('not.contain', 'Missing translation');
        cy.get('.links-container .link').eq(1).should('not.contain', 'Missing translation');
      });
    });
  });
  