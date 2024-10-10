describe('Type Page', () => {
    beforeEach(() => {
        cy.setCookie('cookiesAccepted', 'true');
        cy.setCookie('guestToken', 'adb');
        cy.setCookie('language', 'en-UK');
        cy.setCookie('expirationDate', '2024-09-17T14:36:03.584Z');

        cy.intercept('GET', 'http://localhost:4000/texts/findOne/undefined', {
            fixture: 'findOne.json',
        }).as('getExercises');

        cy.visit('/typePage', { timeout: 60000 });
    });

    it('should display the correct text and title', () => {
        cy.wait('@getExercises');
        cy.get('h2').contains('text one').should('exist');
        cy.get('.stats-container').contains('this is the text').should('exist');
    });
});
