// Simple in-memory user storage
const users = JSON.parse(localStorage.getItem('users')) || {};

document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Check if username already exists
    if (users[username]) {
        alert('User  already exists! Please choose a different username.');
    } else {
        // Register the user
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        window.location.href = 'login.html';
    }
});

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Check if the user exists and the password matches
    if (users[username] && users[username] === password) {
        // Save user session
        localStorage.setItem('loggedInUser ', username);
        window.location.href = 'secure.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

// Check if user is logged in on the secure page
if (document.getElementById('logout')) {
    const loggedInUser  = localStorage.getItem('loggedInUser ');
    if (!loggedInUser ) {
        // Redirect to login if not logged in
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html';
    } else {
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('loggedInUser ');
            alert('You have been logged out.');
            window.location.href = 'login.html';
        });
    }
}