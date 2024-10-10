const assert = require('assert');
const generateGuestToken = require('../utils/generateGuestToken');
const BASE_URL = 'http://localhost:4000';

describe('GET /completedExercises/getRanking - Retrieve User Ranking', () => {
  let guestToken;

  before(async () => {
    guestToken = await generateGuestToken();
  });

  it('should retrieve user ranking successfully for normal exercise mode', async () => {
    try {
      const response = await fetch(`${BASE_URL}/completedExercises/getRanking?exerciseMode=normal`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
      });

      assert.strictEqual(response.status, 200, `Expected status 200 but got ${response.status}`);

      const responseBody = await response.json();

      assert.ok(Array.isArray(responseBody), 'Response should be an array');

      if (responseBody.length > 0) {
        responseBody.forEach((rankingEntry) => {
          assert.ok(rankingEntry.name, 'Each ranking entry should have a name');
          assert.ok(typeof rankingEntry.ppsAvg === 'number', 'Each ranking entry should have a numerical ppsAvg');
          assert.ok(typeof rankingEntry.errorAvg === 'number', 'Each ranking entry should have a numerical errorAvg');
          assert.ok(typeof rankingEntry.durationAvg === 'number', 'Each ranking entry should have a numerical durationAvg');
        });
        console.log('Test passed: User ranking retrieved successfully for normal mode.');
      } else {
        console.log('No ranking data available for the given exercise mode.');
      }
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should retrieve user ranking successfully for master exercise mode', async () => {
    try {
      const response = await fetch(`${BASE_URL}/completedExercises/getRanking?exerciseMode=master`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
      });

      assert.strictEqual(response.status, 200, `Expected status 200 but got ${response.status}`);

      const responseBody = await response.json();

      assert.ok(Array.isArray(responseBody), 'Response should be an array');

      if (responseBody.length > 0) {
        responseBody.forEach((rankingEntry) => {
          assert.ok(rankingEntry.name, 'Each ranking entry should have a name');
          assert.ok(typeof rankingEntry.ppsAvg === 'number', 'Each ranking entry should have a numerical ppsAvg');
          assert.ok(typeof rankingEntry.errorAvg === 'number', 'Each ranking entry should have a numerical errorAvg');
          assert.ok(typeof rankingEntry.durationAvg === 'number', 'Each ranking entry should have a numerical durationAvg');
        });
        console.log('Test passed: User ranking retrieved successfully for master mode.');
      } else {
        console.log('No ranking data available for the given exercise mode.');
      }
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
