document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        window.location.href = 'login.html';
    } else {
        const userEmailElement = document.getElementById('userEmail');
        userEmailElement.textContent = `Logged in as: ${loggedInUser.email}`;
    }


    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');

        window.location.href = 'login.html';
    });

    loadPosts();
});

async function loadPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    try {

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

        posts.slice(0, 7).forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.textContent = `POST ${post.id}: ${post.title}`;

            postElement.addEventListener('click', () => {
                window.location.href = `singlePost.html?postId=${post.id}`;
            });

            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading posts:', error);

        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to load posts. Please try again later.';
        errorMessage.style.color = 'red';
        postsContainer.appendChild(errorMessage);
    }
}
