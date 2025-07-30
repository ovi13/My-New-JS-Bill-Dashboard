// js/app.js
import { FIXED_DATA, calculateInvoiceTotals } from './data.js';
import { renderHomeView } from './views/homeView.js';
import { renderCalculatorView } from './views/calculatorView.js';
import { renderBillFormView } from './views/billFormView.js';
import { renderInvoiceView } from './views/invoiceView.js';

console.log('app.js: Script started.'); // Log when the script begins execution

// Router logic consolidated here
const routes = {};
let appContentElement;

function initializeRouter(contentElementId) {
    appContentElement = document.getElementById(contentElementId);
    if (!appContentElement) {
        console.error(`Router: Content element with ID '${contentElementId}' not found. Cannot initialize router.`);
        return;
    }
    console.log(`Router: app-content element found. ID: ${contentElementId}`);

    // Listen for hash changes (e.g., #home, #calculator)
    window.addEventListener('hashchange', handleRouteChange);
    console.log('Router: Hashchange listener added.');

    // Handle initial route on page load
    handleRouteChange();
    console.log('Router: Initial route handling triggered.');
}

function addRoute(path, renderFunction) {
    if (typeof renderFunction !== 'function') {
        console.error(`Router: Attempted to add route #${path} with non-function renderFunction:`, renderFunction);
        // Do not add the route if renderFunction is not a function
        return;
    }
    routes[path] = renderFunction;
    console.log(`Router: Added route for #${path}. Render function type: ${typeof renderFunction}`);
}

function handleRouteChange() {
    const path = window.location.hash.slice(1) || 'home'; // Get path after #, default to 'home'
    const render = routes[path];
    console.log(`Router: Navigating to #${path}. Retrieved render function:`, render);

    if (render) {
        appContentElement.innerHTML = ''; // Clear previous content
        try {
            render(appContentElement);
            console.log(`Router: Successfully rendered #${path}.`);
        } catch (e) {
            console.error(`Router: Error rendering #${path}:`, e);
            appContentElement.innerHTML = `<h1>Error Rendering Page</h1><p>An error occurred while loading this page: ${e.message}</p>`;
        }
    } else {
        appContentElement.innerHTML = '<h1>404 - Page Not Found</h1><p>The requested page does not exist.</p>';
        console.warn(`Router: No render function found for #${path}. Routes registered:`, Object.keys(routes));
    }
}

// This runs when the DOM is fully loaded and all deferred scripts are executed
document.addEventListener('DOMContentLoaded', () => {
    console.log('app.js: DOMContentLoaded event fired. Starting application setup.');

    // Log the imported functions to see their type and value
    console.log('app.js: Type of renderHomeView:', typeof renderHomeView, renderHomeView);
    console.log('app.js: Type of renderCalculatorView:', typeof renderCalculatorView, renderCalculatorView);
    console.log('app.js: Type of renderBillFormView:', typeof renderBillFormView, renderBillFormView);
    console.log('app.js: Type of renderInvoiceView:', typeof renderInvoiceView, renderInvoiceView);

    initializeRouter('app-content');

    // Register routes with the imported functions
    addRoute('home', renderHomeView);
    addRoute('calculator', renderCalculatorView);
    addRoute('bill_form', renderBillFormView);
    addRoute('invoice', renderInvoiceView);

    console.log('app.js: Router initialization and route registration complete.');
});