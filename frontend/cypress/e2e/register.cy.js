describe('Register Page', () => {
    beforeEach(() => {
      cy.setCookie('cookiesAccepted', 'true')
      cy.setCookie('language', 'en-UK')
      cy.setCookie('guestToken', 'adv'),
      cy.setCookie('expirationDate', '2024-09-17T14:36:03.584Z')
      cy.visit('/register', { timeout: 60000 });

      cy.intercept('POST', 'http://localhost:4000/users', {
        fixture: 'createUser.json'
      })
    });
  
    it('should display the registration form', () => {
      cy.get('.register-form').should('exist');
      cy.get('.register-form .title').should('contain', 'Registrarse');
    });
  
    it('should have all required fields', () => {
      cy.get('#name').should('exist').and('have.attr', 'required');
      cy.get('#email').should('exist').and('have.attr', 'required');
      cy.get('#password').should('exist').and('have.attr', 'required');
    });
  
    it('should show validation errors if fields are empty', () => {
      cy.get('.register-button').click();
  
      cy.get('#name:invalid').should('exist');
      cy.get('#email:invalid').should('exist');
      cy.get('#password:invalid').should('exist');
    });
  
    it('should successfully submit the form when all fields are filled', () => {

      cy.get('#password').type('securePassword123');
      
      cy.get('#email').type('john.doe@example.com');

      cy.get('#name').type('John Doe');

      cy.get('#password').type('securePassword123');

      cy.get('.register-button').click();

      cy.url().should('not.contain', '/register'); 
    });
  
    it('should have links to Home and Sign In', () => {
      cy.get('.links-container a').first().should('have.attr', 'href', '/');
      cy.get('.links-container a').last().should('have.attr', 'href', '/signin');
    });
  });
  