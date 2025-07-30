// js/app.js
import { FIXED_DATA, calculateInvoiceTotals } from './data.js';
import { renderHomeView } from './views/homeView.js';          // Ensure 'homeView.js' matches file name casing
import { renderCalculatorView } from './views/calculatorView.js';
import { renderBillFormView } from './views/billFormView.js';
import { renderInvoiceView } from './views/invoiceView.js';

// Router logic consolidated here
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
    console.log(`Router: Added route for #${path}`); // Debugging: Confirm routes are added
}

function handleRouteChange() {
    const path = window.location.hash.slice(1) || 'home'; // Get path after #, default to 'home'
    const render = routes[path];
    console.log(`Router: Navigating to #${path}`); // Debugging: Confirm navigation attempt

    if (render) {
        appContentElement.innerHTML = ''; // Clear previous content
        render(appContentElement);
    } else {
        appContentElement.innerHTML = '<h1>404 - Page Not Found</h1><p>The requested page does not exist.</p>';
        console.warn(`Router: No render function found for #${path}`); // Debugging: Report missing route
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('app.js: DOMContentLoaded - Initializing router and adding routes.');

    initializeRouter('app-content');

    // Register routes with the imported functions
    addRoute('home', renderHomeView);
    addRoute('calculator', renderCalculatorView);
    addRoute('bill_form', renderBillFormView);
    addRoute('invoice', renderInvoiceView);

    console.log('app.js: Router initialized and routes added.');
});