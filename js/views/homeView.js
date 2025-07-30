// js/views/homeView.js

// Function to render the home page content
function renderHomeView(targetElement) {
    const homeHtml = `
        <h1>Welcome to the Utility Bill Section</h1>
        <p class="tagline">Simplifying bill management for everyone</p>
        <p class="credit">Created by Prothom Dey Ovi</p>
    `;
    targetElement.innerHTML = homeHtml;
}