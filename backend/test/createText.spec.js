const assert = require('assert');
const signIn = require('../utils/generateSessionToken'); 
const generateGuestToken = require('../utils/generateGuestToken');

describe('POST /texts - Create Texts', () => {
  const BASE_URL = 'http://localhost:4000';
  let adminToken;
  let guestToken;

  before(async () => {
    adminToken = await signIn();

    guestToken = await generateGuestToken();
  });

  it('should create a text successfully for admin user', async () => {
    try {
      const createTextDto = {
        name: 'admin',
        text: 'This is a test text for creation',
        title: 'Unique Title',
        type: 'Article',
        language: 'English',
      };

      const response = await fetch(`${BASE_URL}/texts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken.access_token}`,
        },
        body: JSON.stringify(createTextDto),
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 201, `Expected status 201 but got ${response.status}`);
      assert.strictEqual(responseBody.title, createTextDto.title, `Title does not match. Expected: ${createTextDto.title}, Got: ${responseBody.title}`);
      
      console.log('Test passed: Text created successfully.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should fail to create a text for non-admin user', async () => {
    try {
      const createTextDto = {
        name: 'guest',
        text: 'Attempt by guest',
        title: 'Guest Attempt Title',
        type: 'Article',
        language: 'Spanish',
      };

      const response = await fetch(`${BASE_URL}/texts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
        body: JSON.stringify(createTextDto),
      });

      assert.strictEqual(response.status, 401, `Expected status 401 but got ${response.status}`);

    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

});
