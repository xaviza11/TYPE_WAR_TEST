const assert = require('assert');
const BASE_URL = 'http://localhost:4000';
const generateGuestToken = require('../utils/generateGuestToken'); 

describe('POST /users - Create User', () => {
  let guestToken;

  before(async () => {
    guestToken = await generateGuestToken();
  });

  it('should create a new user successfully', async () => {
    try {
      const createUserDto = {
        email: 'testuser@example.com',
        password: 'TestPassword123!',
        name: 'TestUser',
      };

      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
        body: JSON.stringify(createUserDto),
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 201, `Expected status 201 but got ${response.status}`);

      assert.ok(responseBody.access_token, 'Response should contain access_token');
      assert.strictEqual(responseBody.name, createUserDto.name, `Expected name to be ${createUserDto.name} but got ${responseBody.name}`);
      assert.strictEqual(responseBody.type, 'user', 'Default user type should be "user"');
      assert.ok(new Date(responseBody.expirationDate) > new Date(), 'Expiration date should be a future date');

      console.log('Test passed: User created successfully.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should fail to create a user with an existing name', async () => {
    try {
      const duplicateUserDto = {
        email: 'duplicateuser@example.com',
        password: 'AnotherPassword123!',
        name: 'TestUser', 
      };

      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
        body: JSON.stringify(duplicateUserDto),
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 409, `Expected status 409 but got ${response.status}`);
      assert.strictEqual(responseBody.message, 'User with this name already exists', 'Expected conflict error message for duplicate user');

      console.log('Test passed: Duplicate user error handled correctly.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 400 when àsword is invalid', async () => {
    try {
      const invalidUserDto = {
        email: 'invaliduserexample.com',
        password: '123', 
      };

      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
        body: JSON.stringify(invalidUserDto),
      });

      const responseBody = await response.json();
      assert.strictEqual(response.status, 400, `Expected status 500 but got ${response.status}`);
      assert.ok(responseBody.message.includes('Invalid password format'), `Expected error message but got ${responseBody.message}`);

      console.log('Test passed: Server error handled correctly.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
