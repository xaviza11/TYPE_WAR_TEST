const assert = require('assert');
const generateGuestToken = require('../utils/generateGuestToken')

describe('Authentication - signIn', () => {
  it('should return access_token, name, type, and expirationDate for valid credentials', async () => {

    const guestToken  = await generateGuestToken()
    
    const body = {
      email: 'admin@admin.com',
      password: 'admin1234A',
    };

    const response = await fetch('http://localhost:4000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${guestToken}`,
      },
      body: JSON.stringify(body),
    });

    const responseBody = await response.json();

    assert.strictEqual(response.status, 201);
    assert.ok(responseBody.access_token, 'access_token is missing');
    assert.ok(responseBody.name, 'name is missing');
    assert.ok(responseBody.type, 'type is missing');
    assert.ok(responseBody.expirationDate, 'expirationDate is missing');
  });

 it('should return 404 if email does not exist', async () => {

    const guestToken  = await generateGuestToken()

    const body = {
      email: 'nonexistentemail@example.com',
      password: 'somePassword123',
    };

    const response = await fetch('http://localhost:4000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${guestToken}`,
      },
      body: JSON.stringify(body),
    });

    const responseBody = await response.json();

    assert.strictEqual(response.status, 404);
    assert.strictEqual(responseBody.message, 'User with this email not exists');
  });

  it('should return 401 for invalid password', async () => {

    const guestToken  = await generateGuestToken()

    const body = {
      email: 'admin@admin.com',
      password: 'wrongPassword123',
    };

    const response = await fetch('http://localhost:4000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${guestToken}`,
      },
      body: JSON.stringify(body),
    });

    const responseBody = await response.json();

    assert.strictEqual(response.status, 401);
    assert.strictEqual(responseBody.message, 'Wrong password');
  });
});
