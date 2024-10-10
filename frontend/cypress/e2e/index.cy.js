describe('Web Scraping with Cypress', () => {
  beforeEach(() => {
    cy.setCookie('cookiesAccepted', 'true')
    cy.setCookie('language', 'en-UK')
    cy.setCookie('guestToken', 'adv'),
    cy.setCookie('expirationDate', '2024-09-17T14:36:03.584Z')
    cy.visit('/', { timeout: 60000 });

    cy.intercept('GET', 'http://localhost:4000/completedExercises/getRanking?exerciseMode=undefined', {
      fixture: 'usersRanking.json'
    }).as('usersRanking')
  });

  const checkNotContainMissingTranslation = (selector) => {
    cy.get(selector)
      .should('exist')
      .should('not.contain', 'Missing translation:');
  };

  describe('Cookie Consent Acceptance', () => {
    it('should correctly display seconds, pulsations and errors', () => {
      checkNotContainMissingTranslation('.stats-table');

      cy.get('.seconds').invoke('text').then((text) => {
        const seconds = parseInt(text.trim());
        expect(seconds).to.be.at.least(0);
      });

      cy.get('.pulsations').invoke('text').then((text) => {
        const pulsations = parseInt(text.trim());
        expect(pulsations).to.be.at.least(0);
      });

      cy.get('.error').invoke('text').then((text) => {
        const errors = parseInt(text.trim());
        expect(errors).to.be.at.least(0);
      });

      cy.get('.pps').invoke('text').then((text) => {
        const pps = parseFloat(text.trim());
        expect(pps).to.be.at.least(0);
      });
    });

    it('should display animated text', () => {
      checkNotContainMissingTranslation('div.auto-typing');

      cy.get('.auto-typing h2')
        .should('exist')
        .invoke('text')
        .then((initialText) => {
          cy.wait(1000);
          cy.get('.auto-typing h2')
            .invoke('text')
            .should((newText) => {
              expect(newText).to.not.equal(initialText);
            });
        });
    });

    it('should display the ranking table with correct headers', () => {
      cy.get('.ranking-table').should('exist');
  
      cy.get('.ranking-table thead tr th').eq(0).should('exist');
      cy.get('.ranking-table thead tr th').eq(1).should('exist');
      cy.get('.ranking-table thead tr th').eq(2).should('exist');
      cy.get('.ranking-table thead tr th').eq(3).should('exist');
      cy.get('.ranking-table thead tr th').eq(4).should('exist');
    });

    it('should display correct data for users', () => {
      cy.get('.ranking-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(0).should('contain.text', '1');
        cy.get('td').eq(1).should('contain.text', 'juancito');
        cy.get('td').eq(2).should('contain.text', '2.9');
        cy.get('td').eq(3).should('contain.text', '0');
        cy.get('td').eq(4).should('contain.text', '6.4');
      });
  
      cy.get('.ranking-table tbody tr').eq(1).within(() => {
        cy.get('td').eq(0).should('contain.text', '2');
        cy.get('td').eq(1).should('contain.text', 'pepito');
        cy.get('td').eq(2).should('contain.text', '2.3');
        cy.get('td').eq(3).should('contain.text', '0');
        cy.get('td').eq(4).should('contain.text', '6.439024390243903');
      });
    });

    it('should have pagination controls', () => {
      cy.get('.pagination-controls').within(() => {
        cy.get('.prev-page').should('be.disabled'); 
        cy.get('.page-info').should('exist');
        cy.get('.next-page').should('be.disabled'); 
      });
    });
  });
});
