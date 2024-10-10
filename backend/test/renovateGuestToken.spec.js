const assert = require('assert');
const generateGuestToken = require('../utils/generateGuestToken')

describe('Guest Token Renovation', () => {
  const BASE_URL = 'http://localhost:4000';

  it('should renovate the guest token and return a new access_token and expirationDate', async () => {
    try {
      const guestToken = await generateGuestToken();

      const response = await fetch(`${BASE_URL}/auth/renovateGuestToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 201, `Expected status 201 but got ${response.status}`);

      assert.ok(responseBody.access_token, 'access_token is missing');
      assert.ok(responseBody.expirationDate, 'expirationDate is missing');

      assert.ok(!responseBody.access_token.includes('.'), 'The token should be encrypted (not a plain JWT)');

      const expirationDate = new Date(responseBody.expirationDate);
      assert.ok(!isNaN(expirationDate.getTime()), 'expirationDate is not a valid date');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 401 for invalid or missing guest token', async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/renovateGuestToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer invalidtoken',
        },
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 401, `Expected status 401 but got ${response.status}`);

      assert.strictEqual(responseBody.message, 'Token invalid or malformed');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 401 if authorization header is missing', async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/renovateGuestToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await response.json();
      assert.strictEqual(response.status, 401, `Expected status 401 but got ${response.status}`);
      assert.strictEqual(responseBody.message, 'No token provided');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
