// Get all users from localStorage
const getUsers = () => {
  const users = localStorage.getItem('lms_users');
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('lms_users', JSON.stringify(users));
};

// Register new user
export const registerUser = (name, email, password) => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.find((u) => u.email === email)) {
    return { success: false, message: 'Email already registered' };
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    enrolledCourses: [],
    completedLessons: [],
    quizScores: {},
    assignmentScores: {},
    totalPoints: 0,
    streak: 0,
    lastLoginDate: new Date().toISOString()
  };

  users.push({ ...newUser, password });
  saveUsers(users);

  return { success: true, user: newUser };
};

// Login user
export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  // Update last login date and streak
  const lastLogin = new Date(user.lastLoginDate);
  const today = new Date();
  const daysDiff = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 1) {
    user.streak += 1;
  } else if (daysDiff > 1) {
    user.streak = 1;
  }
  
  user.lastLoginDate = today.toISOString();
  saveUsers(users);

  const { password: _, ...userWithoutPassword } = user;
  return { success: true, user: userWithoutPassword };
};

// Reset password
export const resetPassword = (email, newPassword) => {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex === -1) {
    return { success: false, message: 'Email not found' };
  }

  users[userIndex].password = newPassword;
  saveUsers(users);

  return { success: true, message: 'Password reset successful' };
};

// Update user data
export const updateUser = (updatedUser) => {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.id === updatedUser.id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    saveUsers(users);
  }
};

// Get current user from session
export const getCurrentUser = () => {
  const currentUser = localStorage.getItem('lms_current_user');
  return currentUser ? JSON.parse(currentUser) : null;
};

// Set current user session
export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem('lms_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('lms_current_user');
  }
};

// Logout user
export const logoutUser = () => {
  setCurrentUser(null);
};
