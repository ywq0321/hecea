exports.handler = async function(event, context) {
  // Only allow POST requests for login
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, 
      body: JSON.stringify({ message: 'Method Not Allowed' }) 
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    // ==========================================
    // HOW TO ADD MORE USERS SECURELY
    // ==========================================
    // Option 1: Hardcode them here. (It's safe because this file NEVER goes to the browser)
    const validAdmins = [
      { username: 'admin', password: 'hecea2024' }
    ];

    // Option 2 (Better): Fetch from Netlify Environment Variables
    // (Configured in Netlify Dashboard: Site settings > Environment variables)
    // Example: ADMIN_USER_1=admin, ADMIN_PASS_1=hecea2024
    
    // Validate credentials
    const validUser = validAdmins.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (validUser) {
      // ✅ Success - DO NOT send the password back to the browser
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true, 
          user: { username: validUser.username } // Safe data to return
        })
      };
    } else {
      // ❌ Failed
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: 'Invalid username or password' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Server Error' })
    };
  }
};
