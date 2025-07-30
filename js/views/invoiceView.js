// js/views/invoiceView.js

// Function to render the invoice page content
function renderInvoiceView(targetElement) {
    const invoiceData = window.currentInvoiceData || {}; // Get data from global variable

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
        <p><strong>Billing Month:</strong> ${invoiceData.billing_month}</p>
        <p><strong>Billing Date:</strong> ${invoiceData.billing_date}</p>
        <p><strong>Billing Time:</strong> ${invoiceData.billing_time}</p>

        <h2>Bill Breakdown:</h2>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Bill Type</th>
                    <th class="numeric">Amount (৳)</th>
                </tr>
            </thead>
            <tbody>
                ${invoiceData.electricity_bill > 0 ? `
                <tr>
                    <td>Electricity Bill (Total):</td>
                    <td class="numeric">৳${invoiceData.electricity_bill.toFixed(2)}</td>
                </tr>` : ''}

                ${invoiceData.motor_bill > 0 ? `
                <tr>
                    <td>Motor Bill (Total):</td>
                    <td class="numeric">৳${invoiceData.motor_bill.toFixed(2)}</td>
                </tr>` : ''}

                ${invoiceData.name === "Motor Bill" && invoiceData.motor_bill > 0 ? `
                <tr>
                    <td>Mridul's Share (Motor Bill):</td>
                    <td class="numeric">৳${(invoiceData.motor_bill / 2).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Rita's Share (Motor Bill):</td>
                    <td class="numeric">৳${(invoiceData.motor_bill / 2).toFixed(2)}</td>
                </tr>` : ''}

                ${invoiceData.gas_bill > 0 ? `
                <tr>
                    <td>Gas Bill (Total):</td>
                    <td class="numeric">৳${invoiceData.gas_bill.toFixed(2)}</td>
                </tr>` : ''}

                ${invoiceData.name === "Gas Bill" ? `
                <tr>
                    <td>Mridul's Share (Gas Bill):</td>
                    <td class="numeric">৳${(2160).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Pappu's Share (Gas Bill):</td>
                    <td class="numeric">৳${(2160).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Rita's Share (Gas Bill):</td>
                    <td class="numeric">৳${(1080).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Pijush's Share (Gas Bill):</td>
                    <td class="numeric">৳${(1080).toFixed(2)}</td>
                </tr>` : ''}

                ${invoiceData.bkash_charge > 0 ? `
                <tr>
                    <td>Bkash Charge:</td>
                    <td class="numeric">৳${invoiceData.bkash_charge.toFixed(2)}</td>
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

        <h3>Total Bill: ৳${invoiceData.total_bill.toFixed(2)}</h3>
        <p><strong>Amount Paid:</strong> ৳${invoiceData.total_paid.toFixed(2)}</p>

        ${invoiceData.balance < 0 ? `
        <p><strong>Balance Due:</strong> ৳${Math.abs(invoiceData.balance).toFixed(2)}</p>` : invoiceData.balance > 0 ? `
        <p><strong>Balance Returned:</strong> ৳${invoiceData.balance.toFixed(2)}</p>` : `
        <p><strong>Balance:</strong> ৳${invoiceData.balance.toFixed(2)}</p>`}

        <p>This is a computer programming generated invoice, does not require any signature.</p>

        <div class="button-container">
            <button onclick="invoiceFunctions.downloadPDF()">Download PDF</button>
            <button onclick="window.print()">Print Invoice</button>
        </div>
    `;
    targetElement.innerHTML = invoiceHtml;

    // Expose functions to the global scope for onclick attributes
    window.invoiceFunctions = {
        downloadPDF
    };
}

// PDF download function (moved from Flask template script)
function downloadPDF() {
    console.log("Download PDF button clicked!");
    const element = document.querySelector('#app-content .container'); // Target the dynamically loaded container
    if (!element) {
        console.error("Error: '.container' element not found for PDF generation.");
        alert("Could not generate PDF: content missing.");
        return;
    }

    var opt = {
        margin: [0.1, 0.1, 0.1, 0.1], // Very small margins (top, right, bottom, left)
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1.5, logging: false }, // Reduced scale from 2 to 1.5, disable logging
        jsPDF: { unit: 'in', format: [8.5, 20], orientation: 'portrait' } // Very generous height for single page
    };

    try {
        html2pdf().from(element).set(opt).save();
        console.log("PDF generation initiated successfully.");
    } catch (error) {
        console.error("Error during PDF generation:", error);
        alert("Failed to generate PDF. Check console for details.");
    }
}