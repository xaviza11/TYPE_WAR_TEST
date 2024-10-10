describe('create Text Page', () => {
  beforeEach(() => {
    cy.setCookie('cookiesAccepted', 'true');
    cy.setCookie('userName', 'Name');
    cy.setCookie('userToken', 'Abc');
    cy.setCookie('guestToken', 'abc');
    cy.setCookie('expirationDate', '2024-09-17T14:36:03.584Z');
    cy.setCookie('language', 'en-UK')
    cy.intercept('POST', 'http://localhost:4000/texts', {
      fixture: 'createTexts.json',
    });
    cy.visit('/createText', { timeout: 60000 });
  });

  it('should display the access denied message', () => {
    cy.get('.access-denied .message').should('not.contain', 'Missing translation');
  });

  it('should have a link to return to the home page', () => {
    cy.get('.access-denied .link')
      .should('not.contain', 'Missing translation')
      .and('have.attr', 'href', '/');
  });

  it('should display the collapsed navbar', () => {
    cy.setCookie('userType', 'admin');
    cy.get('.navbar').should('have.class', 'navbar-collapsed');
    cy.get('.collapse-button span').should('contain', '➤');
  });

  it('should display error if user not admin', () => {
    cy.setCookie('userType', 'user');
    cy.visit('/createText');
    cy.get('.access-denied .message').should('not.contain', 'Missing translation');
  });

  it('should display the create text form', () => {
    cy.setCookie('userType', 'admin');
    cy.get('.create-text-form').should('exist');
    cy.get('.create-text-form .title').should('not.contain', 'Missing translation')
  });

  it('should fill out and submit the form', () => {
    cy.setCookie('userType', 'admin');
    cy.setCookie('language', 'en');
    
    cy.get('#title').type('Text');
    cy.get('#text').type('Text content');
    cy.get('#type').select('text');
    cy.get('#language').type('es-ES');
    cy.get('.submit-button').click();
    
    cy.get('.alert')
      .should('exist')
      .and('contain', 'text created');
    
    cy.get('.alert button').should('exist').and('contain', 'OK');
  });
});
