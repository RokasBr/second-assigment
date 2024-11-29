document.addEventListener('DOMContentLoaded', async () => {
    const postContent = document.querySelector('.post-content');
    const postTitle = document.getElementById('postTitle');
    const postBody = document.getElementById('postBody');
    const userEmail = document.getElementById('userEmail');

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        userEmail.textContent = `Logged in as: ${loggedInUser.email}`;
    } else {
        window.location.href = 'login.html';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (!postId) {
        postContent.innerHTML = '<p>Post ID is missing. Please go back and select a post.</p>';
        return;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }

        const post = await response.json();

        postTitle.textContent = post.title;
        postBody.textContent = post.body;
    } catch (error) {
        console.error('Error fetching post:', error);
        postContent.innerHTML = '<p>Failed to load post. Please try again later.</p>';
    }

    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('loggedInUser'); // Clear session
        window.location.href = 'login.html';
    });
});
