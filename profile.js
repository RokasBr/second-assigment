document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(loggedInUser.email)
    if (!loggedInUser) {
        window.location.href = 'login.html';
    }

    const userEmailElement = document.getElementById('user-email');
    userEmailElement.textContent = `Logged in as: ${loggedInUser.email}`;
    // console.log(loggedInUser.email)

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }

    document.getElementById('emailDisplay').textContent = loggedInUser.email;
    const profileImage = localStorage.getItem('profileImage') || 'default-profile.png';
    document.getElementById('profileImage').src = profileImage;
});

function updateProfileImage() {
    const fileInput = document.getElementById('changeImage').files[0];
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profileImage').src = e.target.result;
            localStorage.setItem('profileImage', e.target.result); // Save in localStorage
        };
        reader.readAsDataURL(fileInput);
    }
}

function updatePassword() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword.length >= 4 && newPassword.length <= 20) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        const userIndex = users.findIndex(user => user.email === loggedInUser.email);
        if (userIndex > -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Password updated successfully!');
        }
    } else {
        alert('Password must be between 4 and 20 characters.');
    }
}
