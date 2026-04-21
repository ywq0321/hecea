// Authentication utility functions
const AuthUtils = {
  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  isValidPassword: (password) => {
    return password && password.length >= 6;
  },

  // Generate user ID
  generateUserId: () => {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Save user to localStorage
  saveUser: (userData) => {
    try {
      localStorage.setItem('nonprofit_user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  },

  // Get user from localStorage
  getUser: () => {
    try {
      const userData = localStorage.getItem('nonprofit_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  },

  // Remove user from localStorage
  removeUser: () => {
    try {
      localStorage.removeItem('nonprofit_user');
      return true;
    } catch (error) {
      console.error('Error removing user data:', error);
      return false;
    }
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return AuthUtils.getUser() !== null;
  },

  // Format user display name
  formatUserName: (user) => {
    if (!user) return 'Guest';
    return user.name || user.email?.split('@')[0] || 'Member';
  }
};