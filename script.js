document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        clearErrors(); // Clear previous error messages
        let isValid = true;

        // Validate registration form fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const age = document.getElementById('age').value;
        const terms = document.getElementById('terms').checked;

        if (!name) {
            showError('nameError', 'Name is required');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError('emailError', 'Invalid email format (e.g., user@example.com)');
            isValid = false;
        }

        if (password.length < 8) {
            showError('passwordError', 'Password must be at least 8 characters long');
            isValid = false;
        }

        if (password !== confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }

        if (!validateAge(age)) {
            showError('ageError', 'Age must be a number between 18 and 100');
            isValid = false;
        }

        if (!terms) {
            showError('termsError', 'You must agree to the terms and conditions');
            isValid = false;
        }

        if (isValid) {
            // If valid, submit the form (you can replace this with your own submission logic)
            alert('Registration successful!');
            registrationForm.reset();
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        clearErrors(); // Clear previous error messages
        let isValid = true;

        // Validate login form fields
        const loginEmail = document.getElementById('loginEmail').value.trim();
        const loginPassword = document.getElementById('loginPassword').value;

        if (!validateEmail(loginEmail)) {
            showError('loginEmailError', 'Invalid email format (e.g., user@example.com)');
            isValid = false;
        }

        if (!loginPassword) {
            showError('loginPasswordError', 'Password is required');
            isValid = false;
        }

        if (isValid) {
            // If valid, submit the form (you can replace this with your own submission logic)
            alert('Login successful!');
            loginForm.reset();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateAge(age) {
        const ageNum = Number(age);
        return ageNum >= 18 && ageNum <= 100 && !isNaN(ageNum);
    }

    function showError(elementId, message) {
        const errorSpan = document.getElementById(elementId);
        errorSpan.textContent = message;
        errorSpan.style.color = 'red';
    }

    function clearErrors() {
        const errorSpans = document.querySelectorAll('.error');
        errorSpans.forEach(span => {
            span.textContent = '';
        });
    }
});
