describe('Exercises Page', () => {
    beforeEach(() => {
      cy.setCookie('cookiesAccepted', 'true')
      cy.setCookie('language', 'en-UK')
      cy.setCookie('guestToken', 'adv'),
      cy.setCookie('expirationDate', '2024-09-17T14:36:03.584Z')
      cy.visit('/exercises',  { timeout: 60000 }); 

      cy.intercept('GET', 'http://localhost:4000/texts/?type=exercise&language=all', {
          fixture: 'exercises.json'
        }).as('getExercises')
    });
  
    it('should display the exercise list when data is available', () => {  
      cy.wait('@getExercises');
      
      cy.get('ul').find('li').should('have.length', 2); 
      
      cy.get('li').eq(0).contains('J-F').should('exist');  
      cy.get('li').eq(1).contains('D-K').should('exist'); 
    });
    
  
    it('should navigate to the correct page when an exercise is clicked', () => {
      cy.wait('@getExercises');

      cy.get('li').first().click();
  
      cy.url().should('include', '/typePage');
    });
  });
  