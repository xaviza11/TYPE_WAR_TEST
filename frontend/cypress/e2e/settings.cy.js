describe('Update User Page', () => {
    beforeEach(() => {
      cy.setCookie('cookiesAccepted', 'true')
      cy.setCookie('language', 'en-UK')
      cy.setCookie('userToken', 'Abc');
      cy.setCookie('guestToken', 'adf')
      cy.setCookie('expirationDate', '2025-09-17T14:36:03.584Z')
      cy.setCookie('sessionExpirationDate', '2024-09-17T14:36:03.584Z')
      cy.setCookie('userType', 'user')
      cy.setCookie('userName', 'robert')


      cy.intercept('PUT', 'http://localhost:4000/users/update', {
        fixture: 'updateUser.json'
      })

      cy.intercept('DELETE', 'http://localhost:4000/completedExercises/deleteCompletedExercises', {
        fixture: 'resetStats.json'
      })

      cy.visit('/settings'); 
    });
  
    it('should display all input fields and buttons', () => {
      cy.get('#newName').should('exist');
      cy.get('#newEmail').should('exist');
      cy.get('#newPassword').should('exist');
      cy.get('#repeatNewPassword').should('exist');
      cy.get('#updatePassword').should('exist');
      cy.get('.update-button').should('exist');
      cy.get('.delete-button').should('exist');
      cy.get('.reset-button').should('exist');
    });

    it('should successfully submit the update user form', () => {
      cy.get('#newPassword').type('newPassword123');
      cy.get('#repeatNewPassword').type('newPassword123');
      cy.get('#updatePassword').type('currentPassword123');
      cy.get('#newName').type('John Doe');
      cy.get('#newEmail').type('john.doe@example.com');
      cy.get('.update-button').click();
    
     cy.get('.alert').should('contain', 'User updated successfully');
    });

    it('should successfully reset the user stats', () => {
      cy.get('#resetStatsPassword').type('currentPassword123');
      cy.get('.reset-button').click();
      cy.get('.alert').should('contain', 'Stats reset successfully');
    });

  });