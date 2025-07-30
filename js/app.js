// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the router, telling it where to render content
    initializeRouter('app-content');

    // Define routes
    addRoute('home', renderHomeView);
    addRoute('calculator', renderCalculatorView);
    addRoute('bill_form', renderBillFormView);
    addRoute('invoice', renderInvoiceView);

    // Initial route load (will be handled by initializeRouter)
});