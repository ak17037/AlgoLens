const STORAGE_KEYS = {
  USERS: 'algolens_users',
  SESSION: 'algolens_session'
};

export function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function findUserByEmail(email) {
  const users = getStoredUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function registerUser({ name, email, password }) {

  if (!name || !email || !password) {
    return { success: false, message: 'All fields are required.' };
  }

  if (name.trim().length < 2) {
    return { success: false, message: 'Name must be at least 2 characters.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters.' };
  }

  if (findUserByEmail(email)) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const newUser = {
    id: 'user_' + Date.now(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: password,
    createdAt: new Date().toISOString(),
    avatar: name.trim().charAt(0).toUpperCase()
  };

  const users = getStoredUsers();
  users.push(newUser);
  saveUsers(users);

  return { success: true, message: 'Account created successfully!', user: newUser };
}

export function loginUser(email, password) {
  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  const user = findUserByEmail(email);

  if (!user) {
    return { success: false, message: 'No account found with this email.' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }

  const session = {
    userId: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    loginAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
  };

  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));

  return { success: true, message: 'Login successful!', user: session };
}

export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return null;

    const session = JSON.parse(raw);

    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function isLoggedIn() {
  return getSession() !== null;
}
