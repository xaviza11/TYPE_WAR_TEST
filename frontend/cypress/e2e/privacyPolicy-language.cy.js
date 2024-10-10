describe('Privacy Policy Page', () => {
    const sectionIndexes = [0, 1, 2, 3, 4, 5, 6]
  
    beforeEach(() => {
      cy.visit('/privacyPolicy', { timeout: 60000 });
    });
  
    sectionIndexes.forEach((index) => {
      it(`should display section ${index + 1} without missing translation`, () => {
        cy.get('h2').eq(index).should('not.contain', 'Missing translation');
      });
    });
  });
