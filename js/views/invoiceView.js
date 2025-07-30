// js/views/invoiceView.js
import { FIXED_DATA } from '../data.js';

// Initialize currentInvoiceData from FIXED_DATA (based on URL hash or default)
;(function initInvoiceData() {
  const existing = window.currentInvoiceData;
  if (existing && existing.name) return;

  const hashKey    = window.location.hash.replace(/^#/, '');
  const defaultKey = FIXED_DATA[hashKey] ? hashKey : 'Gas Bill';
  const now        = new Date();

  window.currentInvoiceData = {
    name:                  defaultKey,
    consumer_id:           FIXED_DATA[defaultKey].consumer_id,
    meter_number:          FIXED_DATA[defaultKey].meter_number,
    billing_month:         now.toLocaleString('default', { month: 'long' }),
    billing_date:          now.toISOString().slice(0, 10),
    billing_time:          now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    electricity_bill:      FIXED_DATA[defaultKey].electricity_bill  || 0,
    motor_bill:            FIXED_DATA[defaultKey].motor_bill        || 0,
    gas_bill:              FIXED_DATA[defaultKey].gas_bill          || 0,
    bkash_charge:          FIXED_DATA[defaultKey].bkash_charge      || 0,
    total_bill:            FIXED_DATA[defaultKey].total_bill        || 0,
    total_paid:            FIXED_DATA[defaultKey].total_paid        || 0,
    balance:               FIXED_DATA[defaultKey].balance           || 0,
    combined_transactions: FIXED_DATA[defaultKey].combined_transactions || []
  };
})();

// Function to render the invoice page content
export function renderInvoiceView(targetElement) {
  const invoiceData = window.currentInvoiceData || {};

  // Parse numeric fields
  const electricity_bill = parseFloat(invoiceData.electricity_bill)  || 0;
  const motor_bill       = parseFloat(invoiceData.motor_bill)        || 0;
  const gas_bill         = parseFloat(invoiceData.gas_bill)          || 0;
  const bkash_charge     = parseFloat(invoiceData.bkash_charge)      || 0;
  const total_bill       = parseFloat(invoiceData.total_bill)        || 0;
  const total_paid       = parseFloat(invoiceData.total_paid)        || 0;
  const balance          = parseFloat(invoiceData.balance)           || 0;

  // Participants for equal shares
  const participants = ['Mridul', 'Pappu', 'Rita', 'Pijush'];
  const n = participants.length;

  // Equal‑share calculations for electricity and bkash
  const electricityShare = electricity_bill > 0 ? electricity_bill / n : 0;
  const bkashShare       = bkash_charge > 0   ? bkash_charge / n   : 0;

  // Gas‑bill shares: weights 2 (Mridul, Pappu), 1 (Rita, Pijush)
  let gas_bill_mridul = 0, gas_bill_pappu = 0, gas_bill_rita = 0, gas_bill_pijush = 0;
  if (invoiceData.name === "Gas Bill" && gas_bill > 0) {
    const unit = gas_bill / 6;    // total weight = 2+2+1+1 = 6
    gas_bill_mridul = unit * 2;
    gas_bill_pappu  = unit * 2;
    gas_bill_rita   = unit * 1;
    gas_bill_pijush = unit * 1;
  }

  // Motor‑bill shares: equally split between Mridul and Rita
  let motor_bill_mridul = 0, motor_bill_rita = 0;
  if (invoiceData.name === "Motor Bill" && motor_bill > 0) {
    const share = motor_bill / 2;
    motor_bill_mridul = share;
    motor_bill_rita   = share;
  }

  if (!invoiceData.name) {
    targetElement.innerHTML = `
      <h1>Invoice Data Missing</h1>
      <p>Please generate an invoice from the <a href="#bill_form">Generate Invoice</a> page.</p>
    `;
    return;
  }

  const invoiceHtml = `
    <h1>Invoice for ${invoiceData.name}</h1>
    <p><strong>Consumer ID:</strong> ${invoiceData.consumer_id}</p>
    <p><strong>Meter Number:</strong> ${invoiceData.meter_number}</p>
    <p><strong>Billing Month:</strong> ${invoiceData.billing_month}</p>
    <p><strong>Billing Date:</strong> ${invoiceData.billing_date}</p>
    <p><strong>Billing Time:</strong> ${invoiceData.billing_time}</p>

    <div class="invoice-section-box">
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
          </tr>
          ${invoiceData.name === "Electricity Bill" ? participants.map(p => `
            <tr>
              <td>${p}'s Share (Electricity):</td>
              <td class="numeric">৳${electricityShare.toFixed(2)}</td>
            </tr>
          `).join('') : ''}
          ` : ''}

          ${motor_bill > 0 ? `
          <tr>
            <td>Motor Bill (Total):</td>
            <td class="numeric">৳${motor_bill.toFixed(2)}</td>
          </tr>
          ${invoiceData.name === "Motor Bill" ? `
            <tr>
              <td>Mridul's Share (Motor):</td>
              <td class="numeric">৳${motor_bill_mridul.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Rita's Share (Motor):</td>
              <td class="numeric">৳${motor_bill_rita.toFixed(2)}</td>
            </tr>
          ` : ''}
          ` : ''}

          ${gas_bill > 0 ? `
          <tr>
            <td>Gas Bill (Total):</td>
            <td class="numeric">৳${gas_bill.toFixed(2)}</td>
          </tr>
          ${invoiceData.name === "Gas Bill" ? `
            <tr>
              <td>Mridul's Share (Gas):</td>
              <td class="numeric">৳${gas_bill_mridul.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Pappu's Share (Gas):</td>
              <td class="numeric">৳${gas_bill_pappu.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Rita's Share (Gas):</td>
              <td class="numeric">৳${gas_bill_rita.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Pijush's Share (Gas):</td>
              <td class="numeric">৳${gas_bill_pijush.toFixed(2)}</td>
            </tr>
          ` : ''}
          ` : ''}

          ${bkash_charge > 0 ? `
          <tr>
            <td>Bkash Charge (Total):</td>
            <td class="numeric">৳${bkash_charge.toFixed(2)}</td>
          </tr>
          ${invoiceData.name === "Bkash Charge" ? participants.map(p => `
            <tr>
              <td>${p}'s Share (Bkash):</td>
              <td class="numeric">৳${bkashShare.toFixed(2)}</td>
            </tr>
          `).join('') : ''}
          ` : ''}
        </tbody>
      </table>
    </div>

    <div class="invoice-section-box invoice-summary-box">
      <h3>Total Bill: ৳${total_bill.toFixed(2)}</h3>
      <p><strong>Amount Paid:</strong> ৳${total_paid.toFixed(2)}</p>
      ${balance < 0
        ? `<p><strong>Balance Due:</strong> ৳${Math.abs(balance).toFixed(2)}</p>`
        : balance > 0
          ? `<p><strong>Balance Returned:</strong> ৳${balance.toFixed(2)}</p>`
          : `<p><strong>Balance:</strong> ৳${balance.toFixed(2)}</p>`
      }
    </div>

    ${invoiceData.combined_transactions?.length ? `
    <div class="invoice-section-box">
      <h3>Transaction Details:</h3>
      <table class="invoice-table">
        <thead>
          <tr><th>Transaction Type</th><th>Transaction ID</th></tr>
        </thead>
        <tbody>
          ${invoiceData.combined_transactions.map(t => `
            <tr><td>${t.type}:</td><td>${t.id}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}

    <p>This is a computer-generated invoice and does not require a signature.</p>

    <div class="button-container">
      <button onclick="window.invoiceFunctions.downloadPDF()">Download PDF</button>
      <button onclick="window.print()">Print Invoice</button>
    </div>
  `;

  targetElement.innerHTML = invoiceHtml;
  window.invoiceFunctions = { downloadPDF };
  console.log('invoiceView.js: Invoice page rendered.');
}

// PDF download function
function downloadPDF() {
  console.log("Download PDF button clicked!");
  const element = document.getElementById('app-content');
  if (!element) {
    console.error("Error: '#app-content' element not found for PDF generation.");
    alert("Could not generate PDF: content missing.");
    return;
  }

  const origMargin  = element.style.margin;
  const origPadding = element.style.padding;
  element.style.margin  = '0';
  element.style.padding = '0';

  const opt = {
    margin:      [0, 10, 10, 10],
    filename:    'invoice.pdf',
    image:       { type: 'png', quality: 1 },
    html2canvas: { scale: window.devicePixelRatio || 2, useCORS: true },
    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:   { mode: ['css', 'legacy'] }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      element.style.margin  = origMargin;
      element.style.padding = origPadding;
    });
}
