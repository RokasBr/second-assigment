document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;
        const errorElement = document.getElementById('error');

        errorElement.textContent = '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            errorElement.textContent = 'Invalid email format.';
            return;
        }

        if (password1.length < 4 || password1.length > 20) {
            errorElement.textContent = 'Password must be 4-20 characters.';
            return;
        }

        if (password1 !== password2) {
            errorElement.textContent = 'Passwords do not match.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({
            email,
            password: password1,
            profileImage: 'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png',
        });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful!');
        document.getElementById('registerForm').reset();
    });
});
