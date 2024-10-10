describe('Update User Page', () => {
    const languages = ['es-ES', 'en-UK', 'en-US', 'fr-FR', 'de-DE', 'it-IT'];
    
    beforeEach(() => {
      cy.setCookie('cookiesAccepted', 'true');
      cy.setCookie('userToken', 'Abc');
      cy.setCookie('guestToken', 'adf');
      cy.setCookie('expirationDate', '2025-09-17T14:36:03.584Z');
      cy.setCookie('sessionExpirationDate', '2024-09-17T14:36:03.584Z');
      cy.setCookie('userType', 'user');
      cy.setCookie('userName', 'robert');
      cy.intercept('PUT', 'http://localhost:4000/users/update', {
        fixture: 'updateUser.json',
      });
      cy.visit('/settings');
    });
  
    languages.forEach((lang) => {
      it(`should display all input fields and buttons in ${lang}`, () => {
        cy.setCookie('language', lang);
        cy.visit('/settings');
  
        cy.get('#newName').should('exist');
        cy.get('#newEmail').should('exist');
        cy.get('#newPassword').should('exist');
        cy.get('#repeatNewPassword').should('exist');
        cy.get('#updatePassword').should('exist');
        cy.get('.update-button').should('exist');
        cy.get('.delete-button').should('exist');
        cy.get('.reset-button').should('exist');
      });
    });
  });
  