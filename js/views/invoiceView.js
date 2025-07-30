// js/views/invoiceView.js

// Store current invoice data in a global variable for invoiceView to access
window.currentInvoiceData = null;

// Function to render the invoice page content
export function renderInvoiceView(targetElement) {
    const invoiceData = window.currentInvoiceData || {}; // Get data from global variable

    // Safely parse all numeric values just before using them in the HTML
    const electricity_bill = parseFloat(invoiceData.electricity_bill) || 0;
    const motor_bill = parseFloat(invoiceData.motor_bill) || 0;
    const gas_bill = parseFloat(invoiceData.gas_bill) || 0;
    const bkash_charge = parseFloat(invoiceData.bkash_charge) || 0;
    const total_bill = parseFloat(invoiceData.total_bill) || 0;
    const total_paid = parseFloat(invoiceData.total_paid) || 0;
    const balance = parseFloat(invoiceData.balance) || 0;

    // These shares are calculated in billFormView.js already, but ensuring safe defaults
    const motor_bill_mridul = parseFloat(invoiceData.motor_bill_mridul) || 0;
    const motor_bill_rita = parseFloat(invoiceData.motor_bill_rita) || 0;
    const gas_bill_mridul = parseFloat(invoiceData.gas_bill_mridul) || 0;
    const gas_bill_pappu = parseFloat(invoiceData.gas_bill_pappu) || 0;
    const gas_bill_rita = parseFloat(invoiceData.gas_bill_rita) || 0;
    const gas_bill_pijush = parseFloat(invoiceData.gas_bill_pijush) || 0;


    if (!invoiceData.name) {
        targetElement.innerHTML = `
            <h1>Invoice Data Missing</h1>
            <p>Please generate an invoice from the <a href="#bill_form">Generate Invoice</a> page.</p>
        `;
        return;
    }

    const invoiceHtml = `
        <h1>Invoice for ${invoiceData.name}</h1>
        <p><strong>Consumer ID:</strong> ${invoiceData.consumer_id || 'N/A'}</p>
        <p><strong>Meter Number:</strong> ${invoiceData.meter_number || 'N/A'}</p>
        <p><strong>Billing Month:</strong> ${invoiceData.billing_month || 'N/A'}</p>
        <p><strong>Billing Date:</strong> ${invoiceData.billing_date || 'N/A'}</p>
        <p><strong>Billing Time:</strong> ${invoiceData.billing_time || 'N/A'}</p>

        <h2>Bill Breakdown:</h2>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Bill Type</th>
                    <th class="numeric">Amount (৳)</th>
                </tr>
            </thead>
            <tbody>
                ${electricity_bill > 0 ? `
                <tr>
                    <td>Electricity Bill (Total):</td>
                    <td class="numeric">৳${electricity_bill.toFixed(2)}</td>
                </tr>` : ''}

                ${motor_bill > 0 ? `
                <tr>
                    <td>Motor Bill (Total):</td>
                    <td class="numeric">৳${motor_bill.toFixed(2)}</td>
                </tr>` : ''}

                ${invoiceData.name === "Motor Bill" && motor_bill > 0 ? `
                <tr>
                    <td>Mridul's Share (Motor Bill):</td>
                    <td class="numeric">৳${motor_bill_mridul.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Rita's Share (Motor Bill):</td>
                    <td class="numeric">৳${motor_bill_rita.toFixed(2)}</td>
                </tr>` : ''}

                ${gas_bill > 0 ? `
                <tr>
                    <td>Gas Bill (Total):</td>
                    <td class="numeric">৳${gas_bill.toFixed(2)}</td>
                </tr>` : ''}

                ${invoiceData.name === "Gas Bill" ? `
                <tr>
                    <td>Mridul's Share (Gas Bill):</td>
                    <td class="numeric">৳${gas_bill_mridul.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Pappu's Share (Gas Bill):</td>
                    <td class="numeric">৳${gas_bill_pappu.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Rita's Share (Gas Bill):</td>
                    <td class="numeric">৳${gas_bill_rita.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Pijush's Share (Gas Bill):</td>
                    <td class="numeric">৳${gas_bill_pijush.toFixed(2)}</td>
                </tr>` : ''}

                ${bkash_charge > 0 ? `
                <tr>
                    <td>Bkash Charge:</td>
                    <td class="numeric">৳${bkash_charge.toFixed(2)}</td>
                </tr>` : ''}
            </tbody>
        </table>

        ${invoiceData.combined_transactions && invoiceData.combined_transactions.length > 0 ? `
        <h3>Transaction Details:</h3>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Transaction Type</th>
                    <th>Transaction ID</th>
                </tr>
            </thead>
            <tbody>
                ${invoiceData.combined_transactions.map(trans => `
                <tr>
                    <td>${trans.type}:</td>
                    <td>${trans.id}</td>
                </tr>`).join('')}
            </tbody>
        </table>` : ''}

        <h3>Total Bill: ৳${total_bill.toFixed(2)}</h3>
        <p><strong>Amount Paid:</strong> ৳${total_paid.toFixed(2)}</p>

        ${balance < 0 ? `
        <p><strong>Balance Due:</strong> ৳${Math.abs(balance).toFixed(2)}</p>` : balance > 0 ? `
        <p><strong>Balance Returned:</strong> ৳${balance.toFixed(2)}</p>` : `
        <p><strong>Balance:</strong> ৳${balance.toFixed(2)}</p>`}

        <p>This is a computer programming generated invoice, does not require any signature.</p>

        <div class="button-container">
            <button onclick="window.invoiceFunctions.downloadPDF()">Download PDF</button>
            <button onclick="window.print()">Print Invoice</button>
        </div>
    `;
    targetElement.innerHTML = invoiceHtml;

    // Expose functions to the global scope for onclick attributes
    window.invoiceFunctions = {
        downloadPDF: downloadPDF // Assign the actual function
    };
    console.log('invoiceView.js: Invoice page rendered.'); // Debugging
}

// PDF download function (now part of the module, exposed globally via window.invoiceFunctions)
function downloadPDF() {
    console.log("Download PDF button clicked!");
    // --- CRITICAL FIX: Target the main app-content element ---
    const element = document.getElementById('app-content'); 
    if (!element) {
        console.error("Error: '#app-content' element not found for PDF generation.");
        alert("Could not generate PDF: content missing."); // Use alert for critical user feedback
        return;
    }

    var opt = {
        margin:       [0.1, 0.1, 0.1, 0.1], // Very small margins (top, right, bottom, left)
        filename:     'invoice.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        // Adjust scale to fit more content. Lower scale means smaller image, more fits.
        // If 1.0 is too small, try 1.2 or 1.3. If content is still cut, go lower (e.g., 0.8).
        html2canvas:  { scale: 1.0, logging: false }, 
        // Increase PDF height significantly to accommodate long content
        jsPDF:        { unit: 'in', format: [8.5, 30], orientation: 'portrait' } // Increased height from 20 to 30 inches
    };

    try {
        html2pdf().from(element).set(opt).save();
        console.log("PDF generation initiated successfully.");
    } catch (error) {
        console.error("Error during PDF generation:", error);
        alert("Failed to generate PDF. Check console for details.");
    }
}