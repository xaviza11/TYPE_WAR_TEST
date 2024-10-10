async function generateGuestToken() {
    const response = await fetch('http://localhost:4000/auth/generateGuestToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate guest token');
    }
  
    const responseBody = await response.json();
    return responseBody.access_token;
  }

  module.exports = generateGuestToken
  