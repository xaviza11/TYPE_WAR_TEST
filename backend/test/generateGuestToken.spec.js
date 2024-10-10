const assert = require('assert');

describe('Guest Token Generation', () => {
  const BASE_URL = 'http://localhost:4000';

  it('should generate a guest token with access_token and expirationDate', async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/generateGuestToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 201);

      assert.ok(responseBody.access_token, 'access_token is missing');
      assert.ok(responseBody.expirationDate, 'expirationDate is missing');

      assert.ok(!responseBody.access_token.includes('.'), 'The token should be encrypted (not a plain JWT)');

      const expirationDate = new Date(responseBody.expirationDate);
      assert.ok(!isNaN(expirationDate.getTime()), 'expirationDate is not a valid date');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
