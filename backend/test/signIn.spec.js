const assert = require('assert');
const generateGuestToken = require('../utils/generateGuestToken');

describe('Authentication Tests', () => {
  const BASE_URL = 'http://localhost:4000';

  it('should authenticate successfully and return a valid access token', async () => {
    try {
      const guestToken = await generateGuestToken();

      const body = {
        email: 'admin@admin.com',
        password: 'admin1234A',
      };

      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
        body: JSON.stringify(body),
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 201, `Expected status 201 but got ${response.status}`);
      assert.ok(responseBody.access_token, 'access_token is missing');
      assert.strictEqual(responseBody.name, 'admin', 'Name does not match');
      assert.strictEqual(responseBody.type, 'admin', 'User type does not match');
      assert.ok(responseBody.expirationDate, 'expirationDate is missing');

      assert.ok(!responseBody.access_token.includes('.'), 'The token should be encrypted (not a plain JWT)');

      const expirationDate = new Date(responseBody.expirationDate);
      assert.ok(!isNaN(expirationDate.getTime()), 'expirationDate is not a valid date');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should fail when email does not exist', async () => {
    try {
      const guestToken = await generateGuestToken();

      const body = {
        email: 'nonexistent@domain.com',
        password: 'admin1234A',
      };

      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
        body: JSON.stringify(body),
      });

      assert.strictEqual(response.status, 404, `Expected status 404 but got ${response.status}`);
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should fail for invalid password', async () => {
    try {
      const guestToken = await generateGuestToken();

      const body = {
        email: 'admin@admin.com',
        password: 'wrongPassword123',
      };

      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
        body: JSON.stringify(body),
      });

      assert.strictEqual(response.status, 401, `Expected status 401 but got ${response.status}`);
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
