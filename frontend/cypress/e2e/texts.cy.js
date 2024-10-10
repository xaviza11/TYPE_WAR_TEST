describe('Texts Page', () => {
    beforeEach(() => {
      cy.setCookie('cookiesAccepted', 'true')
      cy.setCookie('guestToken', 'adb'),

      cy.setCookie('expirationDate', '2024-09-17T14:36:03.584Z')
      cy.visit('/texts',  { timeout: 60000 }); 

      cy.intercept('GET', 'http://localhost:4000/texts/?type=text&language=all',{
          fixture: 'texts.json'
        }).as('getExercises')
    });
  
    it('should display the exercise list when data is available', () => {  
      cy.wait('@getExercises');
      
      cy.get('ul').find('li').should('have.length', 2); 
      
      cy.get('li').eq(0).find('p').contains('1. text one').should('exist');
      cy.get('li').eq(1).find('p').contains('2. text two').should('exist');
    });
    
  
    it('should navigate to the correct page when an exercise is clicked', () => {
      cy.wait('@getExercises');

      cy.get('li').first().click();
  
      cy.url().should('include', '/typePage');
    });
  });
  