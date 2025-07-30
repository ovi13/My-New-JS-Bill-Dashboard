// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('app.js: DOMContentLoaded - Initializing router and adding routes.');

    initializeRouter('app-content');

    // --- CRUCIAL FIX: Directly pass the view functions as arguments ---
    // Ensure these functions are defined and accessible in the global scope
    // OR load them before app.js if they are in separate files.
    // By loading js/views/*.js files in index.html BEFORE app.js, they become global.
    // So, we can just reference them directly here.

    addRoute('home', renderHomeView);
    addRoute('calculator', renderCalculatorView);
    addRoute('bill_form', renderBillFormView);
    addRoute('invoice', renderInvoiceView); // Assuming invoiceView.js is also loaded

    // Initial route is handled by initializeRouter after routes are added
});