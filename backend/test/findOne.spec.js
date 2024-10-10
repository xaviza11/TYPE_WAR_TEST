const assert = require('assert');
const generateGuestToken = require('../utils/generateGuestToken');
const BASE_URL = 'http://localhost:4000';

describe('GET /texts/findOne/:id - Retrieve a Single Exercise by ID', () => {
  let guestToken;

  before(async () => {
    guestToken = await generateGuestToken();
  });

  it('should retrieve a completed exercise successfully using a valid ID', async () => {
    try {
      const exerciseId = '66d23635f46de3ef5b01b0a0';

      const response = await fetch(`${BASE_URL}/texts/findOne/${exerciseId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${guestToken}`,
          'Content-Type': 'application/json',
        },
      });

      const responseBody = await response.json();
      assert.strictEqual(response.status, 200, `Expected status 200 but got ${response.status}`);

      assert.strictEqual(responseBody._id, exerciseId, `ID does not match. Expected: ${exerciseId}, Got: ${responseBody._id}`);
      assert.ok(responseBody._id, 'Response should have a _id');
      assert.ok(responseBody.createdAt, 'Response should have a createdAt');
      assert.ok(responseBody.language, 'Response should have a language');
      assert.ok(responseBody.text, 'Response should have a text');
      assert.ok(responseBody.title, 'Response should have a title');
      assert.ok(responseBody.type, 'Response should have a type');

      console.log('Test passed: Retrieved completed exercise successfully.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 404 for a non-existing ID', async () => {
    try {
      const nonExistingId = '000000000000000000000000';

      const response = await fetch(`${BASE_URL}/texts/findOne/${nonExistingId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${guestToken}`,
          'Content-Type': 'application/json',
        },
      });

      assert.strictEqual(response.status, 404, `Expected status 404 but got ${response.status}`);

      const responseBody = await response.json();
      assert.strictEqual(responseBody.message, 'Error fetching text', `Expected message 'Error fetching text', but got: ${responseBody.message}`);

      console.log('Test passed: Returned 404 for non-existing ID.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
