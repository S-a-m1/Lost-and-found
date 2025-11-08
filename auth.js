// Authentication and user management
class AuthManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.initializeUsers();
    }

    initializeUsers() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
    }

    getCurrentUser() {
        const userJson = localStorage.getItem('currentUser');
        return userJson ? JSON.parse(userJson) : null;
    }

    setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
        this.updateNavbar();
    }

    clearCurrentUser() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.updateNavbar();
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    saveUser(user) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    updateUser(email, updates) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.email === email);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            localStorage.setItem('users', JSON.stringify(users));
            if (this.currentUser && this.currentUser.email === email) {
                this.setCurrentUser(users[index]);
            }
        }
    }

    findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email);
    }

    signup(name, email, phone, password) {
        // Validate inputs
        if (!name || !email || !phone || !password) {
            return { success: false, message: 'All fields are required' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        // Check if user already exists
        if (this.findUserByEmail(email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const user = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };

        this.saveUser(user);
        this.setCurrentUser(user);

        return { success: true, message: 'Account created successfully!' };
    }

    login(email, password) {
        if (!email || !password) {
            return { success: false, message: 'Email and password are required' };
        }

        const user = this.findUserByEmail(email);

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Invalid email or password' };
        }

        this.setCurrentUser(user);
        return { success: true, message: 'Login successful!' };
    }

    logout() {
        this.clearCurrentUser();
        window.location.href = 'index.html';
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    updateNavbar() {
        const loginLink = document.getElementById('loginLink');
        const profileLink = document.getElementById('profileLink');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.isLoggedIn()) {
            if (loginLink) loginLink.style.display = 'none';
            if (profileLink) {
                profileLink.style.display = 'block';
                profileLink.textContent = this.currentUser.name;
            }
            if (logoutBtn) {
                logoutBtn.style.display = 'block';
                logoutBtn.onclick = () => this.logout();
            }
        } else {
            if (loginLink) loginLink.style.display = 'block';
            if (profileLink) profileLink.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }
}

// Initialize auth manager
const auth = new AuthManager();

// Update navbar on page load
document.addEventListener('DOMContentLoaded', () => {
    auth.updateNavbar();
});
