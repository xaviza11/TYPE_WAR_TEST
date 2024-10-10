const assert = require('assert');
const BASE_URL = 'http://localhost:4000';
const signIn = require('../utils/generateSessionToken');

describe('GET /users/:id - Fetch User by ID', () => {
  let adminToken;

  before(async () => {
    adminToken = await signIn(); 
  });

  it('should return user data successfully for a valid ID', async () => {
    try {
      const validUserId = 'TestUser'; 

      const response = await fetch(`${BASE_URL}/users/${validUserId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken.access_token}`,
        },
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 200, `Expected status 200 but got ${response.status}`);

      assert.ok(responseBody.name, 'Response should contain user name');
      assert.strictEqual(responseBody.name, validUserId, `Expected name to be ${validUserId} but got ${responseBody.name}`);
      
      console.log('Test passed: User data fetched successfully.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 500 if there is a server error', async () => {
    try {
      const invalidUserId = '123'; 

      const response = await fetch(`${BASE_URL}/users/${invalidUserId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken.access_token}`, 
        },
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 500, `Expected status 500 but got ${response.status}`);
      assert.ok(responseBody.message.includes('Error fetching user'), `Expected error message but got ${responseBody.message}`);

      console.log('Test passed: Server error handled correctly.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
