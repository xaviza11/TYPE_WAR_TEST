const assert = require('assert');
const generateGuestToken = require('../utils/generateGuestToken'); 

describe('GET /completedExercises/findAll - Retrieve All Completed Exercises', () => {
  const BASE_URL = 'http://localhost:4000';

  it('should retrieve all completed exercises successfully', async () => {
    try {
      const guestToken = await generateGuestToken();

      const response = await fetch(`${BASE_URL}/completedExercises/findAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
      });

      const responseBody = await response.json();

      assert.strictEqual(response.status, 200, `Expected status 200 but got ${response.status}`);

      assert.ok(Array.isArray(responseBody), 'Response should be an array');

      if (responseBody.length > 0) {
        responseBody.forEach((exercise) => {
          assert.ok(exercise.user_id, 'Exercise should have a user_id');
          assert.ok(exercise.pps, 'Exercise should have pps');
          assert.ok(exercise.exerciseMode, 'Exercise should have an exerciseMode');
          assert.ok(exercise.durationInSeconds, 'Exercise should have durationInSeconds');
          assert.ok(exercise.numberErrors, 'Exercise should have numberErrors');

          assert.strictEqual(exercise._id, undefined, 'Exercise should not contain _id');

          assert.ok(exercise.user_id.name, 'user_id should have a name');
        });
      } else {
        console.log('No completed exercises found');
      }

    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
