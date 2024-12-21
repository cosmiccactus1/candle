document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.querySelector('.form-message');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.querySelector('i').classList.toggle('fa-eye');
            togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                email: this.email.value,
                password: this.password.value,
                remember: this.remember.checked
            };

            try {
                // Here we would normally make an API call
                // For now, we'll simulate a login
                const user = simulateLogin(formData);
                
                if (user) {
                    // Store user info
                    localStorage.setItem('user', JSON.stringify(user));
                    
                    // Show success message
                    showMessage('Uspješna prijava! Preusmjeravanje...', 'success');
                    
                    // Check if we came from checkout
                    const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
                    
                    // Redirect after short delay
                    setTimeout(() => {
                        window.location.href = returnUrl || 'index.html';
                    }, 1500);
                }
            } catch (error) {
                showMessage(error.message, 'error');
            }
        });
    }

    // Show message function
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
    }

    // Simulate login function (replace with actual API call)
    function simulateLogin(formData) {
        // This is just for demonstration
        if (formData.email === 'test@example.com' && formData.password === 'password') {
            return {
                id: 1,
                email: formData.email,
                name: 'Test User'
            };
        }
        throw new Error('Neispravni podaci za prijavu');
    }

    // Check if user is already logged in
    function checkLoginStatus() {
        const user = localStorage.getItem('user');
        if (user) {
            // Update UI for logged in user
            const userIcon = document.querySelector('.nav-right .fa-user');
            if (userIcon) {
                userIcon.parentElement.setAttribute('title', 'Moj račun');
            }
        }
    }

    // Call on page load
    checkLoginStatus();
});
