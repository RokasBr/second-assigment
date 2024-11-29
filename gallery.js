document.addEventListener("DOMContentLoaded", async () => {
    const galleryContainer = document.getElementById("gallery");
    const userEmail = document.getElementById("user-email");

    // Check if the user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        userEmail.textContent = `Logged in as: ${loggedInUser.email}`;
    } else {
        // Redirect to login if not logged in
        window.location.href = "login.html";
    }

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser"); // Clear session
        window.location.href = "login.html";
    });

    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random/5");
        const data = await response.json();

        if (data.status === "success") {
            data.message.forEach((imageUrl) => {
                const imgElement = document.createElement("img");
                imgElement.src = imageUrl;
                imgElement.alt = "Dog";
                imgElement.className = "gallery-image";
                galleryContainer.appendChild(imgElement);
            });
        } else {
            throw new Error("Failed to fetch images");
        }
    } catch (error) {
        console.error("Error loading images:", error);
        galleryContainer.textContent = "Failed to load images. Please try again later.";
    }
});
