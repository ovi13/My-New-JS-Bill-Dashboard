// js/router.js

const routes = {};
let appContentElement;

function initializeRouter(contentElementId) {
    appContentElement = document.getElementById(contentElementId);
    if (!appContentElement) {
        console.error(`Router: Content element with ID '${contentElementId}' not found.`);
        return;
    }

    // Listen for hash changes (e.g., #home, #calculator)
    window.addEventListener('hashchange', handleRouteChange);
    // Handle initial route on page load
    handleRouteChange();
}

function addRoute(path, renderFunction) {
    routes[path] = renderFunction;
}

function handleRouteChange() {
    const path = window.location.hash.slice(1) || 'home'; // Get path after #, default to 'home'
    const render = routes[path];

    if (render) {
        // Clear previous content and render new view
        appContentElement.innerHTML = ''; // Clear previous content
        render(appContentElement);
    } else {
        appContentElement.innerHTML = '<h1>404 - Page Not Found</h1><p>The requested page does not exist.</p>';
    }
}