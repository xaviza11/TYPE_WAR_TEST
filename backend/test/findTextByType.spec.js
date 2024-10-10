const assert = require('assert');
const signIn = require('../utils/generateSessionToken');
const generateGuestToken = require('../utils/generateGuestToken');

describe('GET /texts/findByType', () => {
  const BASE_URL = 'http://localhost:4000';
  let guestToken;

  before(async () => {
    adminToken = await signIn();
    guestToken = await generateGuestToken();
  });

  it('should retrieve texts successfully for a valid type and language', async () => {
    try {
      const type = 'exercise';
      const language = 'all';

      const response = await fetch(`${BASE_URL}/texts/?type=${type}&language=${language}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${guestToken}`,
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 200, `Expected status 200 but got ${response.status}`);
      
      assert.ok(Array.isArray(responseBody), 'Response should be an array');
      responseBody.forEach((text) => {
        assert.ok(text._id, 'Text should contain _id');
        assert.ok(text.title, 'Text should contain a title');
      });
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 404 for non-existing texts with the given type and language', async () => {
    try {
      const type = 'exercise';
      const language = 'NonExistentLanguage';

      const response = await fetch(`${BASE_URL}/texts/?type=${type}&language=${language}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${guestToken}`,
          'Content-Type': 'application/json',
        },
      });

      assert.strictEqual(response.status, 404, `Expected status 404 but got ${response.status}`);
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should fail for invalid authorization (guest token)', async () => {
    try {
      const type = 'text';
      const language = 'English';

      const response = await fetch(`${BASE_URL}/texts/?type=${type}&language=${language}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${guestToken}`,
          'Content-Type': 'application/json',
        },
      });

      assert.strictEqual(response.status, 404, `Expected status 404 but got ${response.status}`);
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
