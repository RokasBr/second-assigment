document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const logoutButton = document.getElementById('logout');
    const userEmailElement = document.getElementById('user-email');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const userEmail = JSON.parse(localStorage.getItem('loggedInUser')).email;
    console.log(userEmail);
    if (!userEmail) {
        window.location.href = 'login.html';
    } else {
        userEmailElement.textContent = `Logged in as: ${userEmail}`;
    }

    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    const renderMessages = () => {
        chatWindow.innerHTML = '';
        messages.forEach((message) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.innerHTML = `
                <span>${message.text}</span>
                <span class="time">${message.time}</span>
            `;
            chatWindow.appendChild(messageDiv);
        });
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    const saveMessage = (text) => {
        const time = new Date().toLocaleTimeString();
        const newMessage = { text, time };
        messages.push(newMessage);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        renderMessages();
    };

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        if (messageText) {
            saveMessage(messageText);
            messageInput.value = ''; // Clear input
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); // Remove logged-in user
        window.location.href = 'login.html'; // Redirect to login page
    });

    renderMessages();
});
