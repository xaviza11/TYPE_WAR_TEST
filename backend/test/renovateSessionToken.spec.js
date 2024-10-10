const assert = require('assert');
const singIn = require('../utils/generateSessionToken')

describe('Session Token Renovation', () => {
  const BASE_URL = 'http://localhost:4000';

  it('should renovate the session token and return a new access_token, name, type, and expirationDate', async () => {
    const name = 'admin';
    const type = 'admin'; 

    try {
      const sessionToken = await singIn();

      const response = await fetch(`${BASE_URL}/auth/renovateSessionToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken.access_token}`,
        },
        body: JSON.stringify({ name, type }),
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 201, `Expected status 201 but got ${response.status}`);

      assert.ok(responseBody.access_token, 'access_token is missing');
      assert.strictEqual(responseBody.name, name, 'name does not match');
      assert.strictEqual(responseBody.type, type, 'type does not match');
      assert.ok(responseBody.expirationDate, 'expirationDate is missing');

      assert.ok(!responseBody.access_token.includes('.'), 'The token should be encrypted (not a plain JWT)');

      const expirationDate = new Date(responseBody.expirationDate);
      assert.ok(!isNaN(expirationDate.getTime()), 'expirationDate is not a valid date');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 404 if user is not found', async () => {
    const name = 'nonexistentuser'; 
    const type = 'admin'; 
    try {

      const sessionToken = await singIn();

      const response = await fetch(`${BASE_URL}/auth/renovateSessionToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken.access_token}`,
        },
        body: JSON.stringify({ name, type }),
      });

      assert.strictEqual(response.status, 500, `Expected status 404 but got ${response.status}`);
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 401 for invalid user type', async () => {
    const name = 'admin'; 
    const type = 'invalidType';

    try {

      const sessionToken = await singIn();

      const response = await fetch(`${BASE_URL}/auth/renovateSessionToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken.access_token}`
        },
        body: JSON.stringify({ name, type }),
      });

      assert.strictEqual(response.status, 500, `Expected status 401 but got ${response.status}`);
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
