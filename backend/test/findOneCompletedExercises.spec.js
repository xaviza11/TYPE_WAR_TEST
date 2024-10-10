const assert = require('assert');
const generateGuestToken = require('../utils/generateGuestToken'); 
const BASE_URL = 'http://localhost:4000';

const VALID_ID = '6707859e4a03a83b159eef18'; 
const INVALID_ID = '000000000000000000000000'; 

describe('GET /completedExercises/findOne/:id - Retrieve One Completed Exercise', () => {
  let guestToken;

  before(async () => {
    guestToken = await generateGuestToken();
  });

  it('should retrieve a completed exercise successfully with a valid ID', async () => {
    try {
      const response = await fetch(`${BASE_URL}/completedExercises/findOne/${VALID_ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
      });

      assert.strictEqual(response.status, 200, `Expected status 200 but got ${response.status}`);

      const responseBody = await response.json();

      // Validar que el ejercicio tenga las propiedades necesarias
      assert.ok(responseBody.user_id, 'Exercise should have a populated user_id');
      assert.ok(responseBody.user_id.name, 'user_id should have a name');

      assert.ok(responseBody.text_id, 'Exercise should have a populated text_id');
      assert.ok(responseBody.text_id.title, 'text_id should have a title');

      assert.ok(responseBody.pps, 'Exercise should have a pps property');
      assert.ok(responseBody.exerciseMode, 'Exercise should have an exerciseMode property');
      assert.ok(responseBody.durationInSeconds, 'Exercise should have a durationInSeconds property');
      assert.ok(responseBody.numberErrors, 'Exercise should have a numberErrors property');

      console.log('Test passed: Completed exercise retrieved successfully.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 404 when exercise with the given ID does not exist', async () => {
    try {
      const response = await fetch(`${BASE_URL}/completedExercises/findOne/${INVALID_ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
      });

      // Validar que el estado HTTP de la respuesta sea 404
      assert.strictEqual(response.status, 404, `Expected status 404 but got ${response.status}`);

      const responseBody = await response.json();

      // Validar el mensaje de error
      assert.strictEqual(
        responseBody.message,
        'Completed exercise not found',
        `Expected message 'Completed exercise not found' but got ${responseBody.message}`
      );

      console.log('Test passed: 404 error returned for non-existing exercise.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });

  it('should return 400 if not found documents', async () => {
    try {
      const invalidFormatId = 'invalid-id-format'; // Un ID que no es válido en MongoDB

      const response = await fetch(`${BASE_URL}/completedExercises/findOne/${invalidFormatId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${guestToken}`,
        },
      });

      // Validar que el estado HTTP de la respuesta sea 400 (Bad Request)

      const responseBody = await response.json();
      assert.strictEqual(response.status, 404, `Expected status 404 but got ${response.status}`);



      // Validar el mensaje de error específico
      assert.strictEqual(
        responseBody.message,
        'Completed exercise not found',
        `Expected message 'Completed exercise not foundt' but got ${responseBody.message}`
      );

      console.log('Test passed: 404 error returned for Completed exercise not found.');
    } catch (error) {
      assert.fail(`Test failed with error: ${error.message}`);
    }
  });
});
