// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('app.js: DOMContentLoaded - Initializing router and adding routes.');

    initializeRouter('app-content');

    // --- CRUCIAL FIX: Reference globally exposed view functions ---
    addRoute('home', window.renderHomeView);
    addRoute('calculator', window.renderCalculatorView);
    addRoute('bill_form', window.renderBillFormView);
    addRoute('invoice', window.renderInvoiceView);

    console.log('app.js: Router initialized and routes added.');
});