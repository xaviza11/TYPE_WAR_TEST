const generateGuestToken = require('./generateGuestToken')

async function signIn() {
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
    return responseBody
}

module.exports = signIn
