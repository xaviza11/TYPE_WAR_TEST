const assert = require('assert');
const signIn = require('../utils/generateSessionToken');
const BASE_URL = 'http://localhost:4000';

describe('POST /completedExercises', () => {
  let adminToken;

  before(async () => {
    adminToken = await signIn();
  });

  it('should create a completed exercise successfully with valid data', async () => {
    try {
      const createExerciseDto = {
        user_name: 'admin',
        text_id: '66d23635f46de3ef5b01b0a0', 
        pps: 120,
        exerciseMode: 'normal',
        durationInSeconds: 300,
        numberErrors: 5,
      };

      const response = await fetch(`${BASE_URL}/completedExercises`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createExerciseDto),
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 201, `Expected status 201 but got ${response.status}`);

      assert.ok(responseBody._id, 'Response should contain the ID of the created exercise');

      console.log('Test passed: Completed exercise created successfully.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should fail to create a completed exercise for a non-existent user', async () => {
    try {
      const createExerciseDto = {
        user_name: 'non_existent_user', 
        text_id: '66d23635f46de3ef5b01b0a1',
        pps: 120,
        exerciseMode: 'normal',
        durationInSeconds: 300,
        numberErrors: 5,
      };

      const response = await fetch(`${BASE_URL}/completedExercises`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createExerciseDto),
      });

      const responseBody = await response.json();
      assert.strictEqual(response.status, 500, `Expected status 500 but got ${response.status}`);

      console.log('Test passed: Returned 500 for non-existent user.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
