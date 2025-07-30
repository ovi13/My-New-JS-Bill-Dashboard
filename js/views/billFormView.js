// js/views/billFormView.js
import { FIXED_DATA, calculateInvoiceTotals } from '../data.js'; // <<< IMPORT FIXED_DATA and calculateInvoiceTotals

// Store current invoice data in a global variable for invoiceView to access
// This is still needed because invoiceView is a separate module that needs this data.
window.currentInvoiceData = null;

// Function to render the bill form page content
export function renderBillFormView(targetElement) { // <<< REMOVED 'window.' and ADDED 'export'
    const billFormHtml = `
        <h1>Utility Bill Generator</h1>
        <form id="invoiceForm">
            <label for="user">Select Bill Type or User:</label>
            <select id="user" name="user" onchange="window.billFormFunctions.showBillFields()" required>
                <option value="">--Select Bill Type or User--</option>
                <option value="Motor Bill">Motor Bill</option>
                <option value="Gas Bill">Gas Bill</option>
                <option value="Mridul Kanti Dey">Mridul Kanti Dey</soption>
                <option value="Rita Dey">Rita Dey</option>
                <option value="Angshu Debray">Angshu Debray</option>
                <option value="Pijush Kanti Dey">Pijush Kanti Dey</option>
                <option value="Enter Custom Data">Enter Custom Data</option>
            </select><br><br>

            <!-- Display for Predefined User's Consumer ID & Meter No -->
            <div id="selectedUserDetailsDisplay" style="display: none;">
                <p><strong>Consumer ID:</strong> <span id="displayConsumerId"></span></p>
                <p><strong>Meter Number:</strong> <span id="displayMeterNumber"></span></p>
            </div>

            <!-- Custom User Input Fields (hidden by default) -->
            <div id="customUserDetailsInput" style="display: none;">
                <label for="name_custom">Enter your name:</label>
                <input type="text" id="name_custom" name="name_custom"><br><br>
                <label for="consumer_id_custom">Enter your Consumer ID:</label>
                <input type="text" id="consumer_id_custom" name="consumer_id_custom"><br><br>
                <label for="meter_number_custom">Enter your Meter Number:</label>
                <input type="text" id="meter_number_custom" name="meter_number_custom"><br><br>
            </div>


            <!-- Billing Month -->
            <label for="billing_month">Enter Billing Month:</label>
            <input type="text" id="billing_month" name="billing_month" required><br><br>

            <!-- Motor Bill Fields (hidden by default) -->
            <div id="motorBillFields" style="display: none;">
                <h3>Motor Bill Details</h3>
                <label for="motor_bill_motor">Enter Motor Bill (Total):</label>
                <input type="number" id="motor_bill_motor" name="motor_bill_motor" min="0" step="0.01"><br><br>
                <label for="bkash_charge_motor">Enter Bkash Charge (৳):</label>
                <input type="number" id="bkash_charge_motor" name="bkash_charge_motor" min="0" step="0.01"><br><br>
                <label for="total_paid_motor">Enter Total Paid (৳):</label>
                <input type="number" id="total_paid_motor" name="total_paid_motor" min="0" step="0.01"><br><br>
                
                <h4>Transaction Details</h4>
                <div id="transactionFieldsContainer_motor">
                    <!-- Initial transaction fields will be added here by JavaScript -->
                </div>
                <button type="button" onclick="window.billFormFunctions.addTransactionField('motor')">Add Another Transaction</button><br><br>
            </div>

            <!-- Gas Bill Fields (hidden by default) -->
            <div id="gasBillFields" style="display: none;">
                <h3>Gas Bill Details</h3>
                <label for="gas_bill_gas">Enter Gas Bill (Total):</label>
                <input type="number" id="gas_bill_gas" name="gas_bill_gas" value="6480" readonly><br><br>
                <label for="bkash_charge_gas">Enter Bkash Charge (৳):</label>
                <input type="number" id="bkash_charge_gas" name="bkash_charge_gas" min="0" step="0.01"><br><br>
                <label for="total_paid_gas">Enter Total Paid (৳):</label>
                <input type="number" id="total_paid_gas" name="total_paid_gas" min="0" step="0.01"><br><br>
                
                <h4>Transaction Details</h4>
                <div id="transactionFieldsContainer_gas">
                    <!-- Initial transaction fields will be added here by JavaScript -->
                </div>
                <button type="button" onclick="window.billFormFunctions.addTransactionField('gas')">Add Another Transaction</button><br><br>
            </div>

            <!-- Custom User Fields (This section will now only contain specific bill inputs, name/id/meter are above) -->
            <div id="customUserFields" style="display: none;">
                <h3>Bill Details (for Custom User)</h3>
                <label for="electricity_bill_custom">Enter Electricity Bill (Total):</label>
                <input type="number" id="electricity_bill_custom" name="electricity_bill_custom" min="0" step="0.01"><br><br>
                <label for="motor_bill_custom">Enter Motor Bill (Total):</label>
                <input type="number" id="motor_bill_custom" name="motor_bill_custom" min="0" step="0.01"><br><br>
                <label for="bkash_charge_custom">Enter Bkash Charge (৳):</label>
                <input type="number" id="bkash_charge_custom" name="bkash_charge_custom" min="0" step="0.01"><br><br>
                <label for="total_paid_custom">Enter Total Paid (৳):</label>
                <input type="number" id="total_paid_custom" name="total_paid_custom" min="0" step="0.01"><br><br>
                
                <h4>Transaction Details</h4>
                <div id="transactionFieldsContainer_custom">
                    <!-- Initial transaction fields will be added here by JavaScript -->
                </div>
                <button type="button" onclick="window.billFormFunctions.addTransactionField('custom')">Add Another Transaction</button><br><br>
            </div>

            <!-- Individual Predefined User Fields -->
            <div id="individualUserFields" style="display: none;">
                <h3>Individual User Bill Details</h3>
                <label for="electricity_bill_individual">Enter Electricity Bill (Total):</label>
                <input type="number" id="electricity_bill_individual" name="electricity_bill_individual" min="0" step="0.01"><br><br>
                <label for="motor_bill_individual">Enter Motor Bill (Total):</label>
                <input type="number" id="motor_bill_individual" name="motor_bill_individual" min="0" step="0.01"><br><br>
                <label for="gas_bill_individual">Enter Gas Bill (Total):</label>
                <input type="number" id="gas_bill_individual" name="gas_bill_individual" min="0" step="0.01"><br><br>
                <label for="bkash_charge_individual">Enter Bkash Charge (৳):</label>
                <input type="number" id="bkash_charge_individual" name="bkash_charge_individual" min="0" step="0.01"><br><br>
                <label for="total_paid_individual">Enter Total Paid (৳):</label>
                <input type="number" id="total_paid_individual" name="total_paid_individual" min="0" step="0.01"><br><br>
                
                <h4>Transaction Details</h4>
                <div id="transactionFieldsContainer_individual">
                    <!-- Initial transaction fields will be added here by JavaScript -->
                </div>
                <button type="button" onclick="window.billFormFunctions.addTransactionField('individual')">Add Another Transaction</button><br><br>
            </div>

            <button type="submit">Generate Invoice</button>
        </form>
    `;
    targetElement.innerHTML = billFormHtml;

    // Attach event listeners after HTML is rendered
    const userSelectElement = document.getElementById('user');
    if (userSelectElement) {
        userSelectElement.addEventListener('change', window.billFormFunctions.showBillFields);
    }
    
    const invoiceForm = document.getElementById('invoiceForm');
    if (invoiceForm) {
        invoiceForm.addEventListener('submit', window.billFormFunctions.handleFormSubmission);
    }

    // Initial call to set up fields based on default selection
    // Use a small timeout to ensure DOM elements are fully available after innerHTML
    setTimeout(() => window.billFormFunctions.showBillFields(), 0); 

    // Expose functions to the global scope for onclick/onchange attributes
    window.billFormFunctions = {
        createTransactionFieldHtml, // Needed by addTransactionField
        showBillFields,
        addTransactionField,
        resetTransactionFields,
        resetRequiredAttributes,
        handleFormSubmission
    };
    console.log('billFormView.js: Bill Form page rendered and functions exposed.'); // Debugging
}

// --- JavaScript functions for Bill Form Logic ---
// These functions are now part of the billFormView.js module scope.
// They are exposed globally via window.billFormFunctions for inline HTML attributes.
function createTransactionFieldHtml(sectionId) {
    return `
        <div class="transaction-group">
            <label>Select Transaction ID Type:</label>
            <select name="transaction_types_${sectionId}[]" required>
                <option value="">Select Transaction ID Type</option>
                <option value="Motor Bill's Transaction ID">Motor Bill's Transaction ID</option>
                <option value="Gas Bill's Transaction ID">Gas Bill's Transaction ID</option>
                <option value="Electricity Bill's Transaction ID">Electricity Bill's Transaction ID</option>
                <option value="Other Transaction ID">Other Transaction ID</option>
            </select><br><br>
            <input type="text" name="transaction_ids_${sectionId}[]" placeholder="Enter Transaction ID" required><br><br>
        </div>
    `;
}

function showBillFields() {
    var userSelect = document.getElementById("user").value;
    console.log("showBillFields called. Selected user:", userSelect);

    document.getElementById("motorBillFields").style.display = "none";
    document.getElementById("gasBillFields").style.display = "none";
    document.getElementById("customUserFields").style.display = "none";
    document.getElementById("individualUserFields").style.display = "none";
    
    document.getElementById("selectedUserDetailsDisplay").style.display = "none";
    document.getElementById("customUserDetailsInput").style.display = "none";

    let activeSectionId = '';

    if (userSelect === "Enter Custom Data") {
        document.getElementById("customUserDetailsInput").style.display = "block";
        document.getElementById("customUserFields").style.display = "block";
        activeSectionId = 'custom';
    } else if (FIXED_DATA.hasOwnProperty(userSelect)) { // Use imported FIXED_DATA
        console.log("Predefined user selected:", userSelect);
        document.getElementById("selectedUserDetailsDisplay").style.display = "block";

        const selectedUserData = FIXED_DATA[userSelect];
        document.getElementById("displayConsumerId").textContent = selectedUserData.consumer_id || 'N/A';
        document.getElementById("displayMeterNumber").textContent = selectedUserData.meter_number || 'N/A';

        if (userSelect === "Motor Bill") {
            document.getElementById("motorBillFields").style.display = "block";
            activeSectionId = 'motor';
        } else if (userSelect === "Gas Bill") {
            document.getElementById("gasBillFields").style.display = "block";
            activeSectionId = 'gas';
        } else {
            document.getElementById("individualUserFields").style.display = "block";
            activeSectionId = 'individual';
        }
    } else {
        console.log("No specific user or custom data selected. Hiding all dynamic fields.");
    }
    
    if (activeSectionId) {
        console.log("Active section ID:", activeSectionId);
        resetTransactionFields(activeSectionId);
        resetRequiredAttributes(activeSectionId);
    } else {
         resetRequiredAttributes('');
    }
    console.log("showBillFields finished.");
}

function addTransactionField(sectionId) {
    const container = document.getElementById("transactionFieldsContainer_" + sectionId);
    if (container) {
        const newFieldGroup = document.createElement("div");
        newFieldGroup.innerHTML = createTransactionFieldHtml(sectionId);
        container.appendChild(newFieldGroup);
    }
}

function resetTransactionFields(sectionId) {
    const container = document.getElementById("transactionFieldsContainer_" + sectionId);
    if (container) {
        container.innerHTML = '';
        const initialFieldGroup = document.createElement("div");
        initialFieldGroup.innerHTML = createTransactionFieldHtml(sectionId);
        container.appendChild(initialFieldGroup);
    }
}

function resetRequiredAttributes(activeSectionPrefix) {
    const allSections = ['motor', 'gas', 'custom', 'individual'];
    console.log("resetRequiredAttributes called with activeSectionPrefix:", activeSectionPrefix);

    allSections.forEach(sectionPrefix => {
        const sectionDivId = `${sectionPrefix}BillFields`;
        const sectionDiv = document.getElementById(sectionDivId);

        if (!sectionDiv) return;

        const inputsAndSelects = sectionDiv.querySelectorAll('input, select');
        
        inputsAndSelects.forEach(input => {
            if (sectionPrefix === activeSectionPrefix) {
                if (
                    (input.name.includes('bill') || input.name.includes('charge') || input.name.includes('paid') || 
                    (input.type === 'text' && (input.name.includes('name_custom') || input.name.includes('consumer_id_custom') || input.name.includes('meter_number_custom')))) &&
                    !input.name.startsWith('transaction_types_') && !input.name.startsWith('transaction_ids_')
                ) {
                    input.setAttribute('required', 'required');
                }
            } else {
                input.removeAttribute('required');
            }
        });
    });

    const billingMonthInput = document.getElementById("billing_month");
    if (billingMonthInput) {
        billingMonthInput.setAttribute('required', 'required');
    }
    console.log("resetRequiredAttributes finished.");
}

function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    const invoiceData = {};

    invoiceData.user = formData.get('user') || '';
    invoiceData.billing_month = formData.get('billing_month') || '';

    invoiceData.name = invoiceData.user;
    invoiceData.consumer_id = '';
    invoiceData.meter_number = '';
    invoiceData.electricity_bill = 0.0;
    invoiceData.motor_bill = 0.0;
    invoiceData.gas_bill = 0.0;
    invoiceData.bkash_charge = 0.0;
    invoiceData.total_paid = 0.0;
    invoiceData.combined_transactions = [];


    if (invoiceData.user === "Enter Custom Data") {
        invoiceData.name = formData.get('name_custom') || 'Custom User';
        invoiceData.consumer_id = formData.get('consumer_id_custom') || '';
        invoiceData.meter_number = formData.get('meter_number_custom') || '';
        
        invoiceData.electricity_bill = parseFloat(formData.get('electricity_bill_custom') || 0.0);
        invoiceData.motor_bill = parseFloat(formData.get('motor_bill_custom') || 0.0);
        invoiceData.bkash_charge = parseFloat(formData.get('bkash_charge_custom') || 0.0);
        invoiceData.total_paid = parseFloat(formData.get('total_paid_custom') || 0.0);

        const transactionTypes = formData.getAll('transaction_types_custom[]');
        const transactionIds = formData.getAll('transaction_ids_custom[]');
        for (let i = 0; i < transactionTypes.length; i++) {
            if (transactionTypes[i] && transactionIds[i]) {
                invoiceData.combined_transactions.push({ type: transactionTypes[i], id: transactionIds[i] });
            }
        }

    } else if (FIXED_DATA.hasOwnProperty(invoiceData.user)) { // Use imported FIXED_DATA
        const selectedUserData = FIXED_DATA[invoiceData.user];
        invoiceData.consumer_id = selectedUserData.consumer_id || '';
        invoiceData.meter_number = selectedUserData.meter_number || '';

        if (invoiceData.user === "Motor Bill") {
            invoiceData.motor_bill = parseFloat(formData.get('motor_bill_motor') || 0.0);
            invoiceData.bkash_charge = parseFloat(formData.get('bkash_charge_motor') || 0.0);
            invoiceData.total_paid = parseFloat(formData.get('total_paid_motor') || 0.0);
            
            const transactionTypes = formData.getAll('transaction_types_motor[]');
            const transactionIds = formData.getAll('transaction_ids_motor[]');
            for (let i = 0; i < transactionTypes.length; i++) {
                if (transactionTypes[i] && transactionIds[i]) {
                    invoiceData.combined_transactions.push({ type: transactionTypes[i], id: transactionIds[i] });
                }
            }

        } else if (invoiceData.user === "Gas Bill") {
            invoiceData.gas_bill = parseFloat(formData.get('gas_bill_gas') || 0.0); // Should be 6480 from readonly
            invoiceData.bkash_charge = parseFloat(formData.get('bkash_charge_gas') || 0.0);
            invoiceData.total_paid = parseFloat(formData.get('total_paid_gas') || 0.0);

            const transactionTypes = formData.getAll('transaction_types_gas[]');
            const transactionIds = formData.getAll('transaction_ids_gas[]');
            for (let i = 0; i < transactionTypes.length; i++) {
                if (transactionTypes[i] && transactionIds[i]) {
                    invoiceData.combined_transactions.push({ type: transactionTypes[i], id: transactionIds[i] });
                }
            }

        } else { // Predefined individual user (Mridul, Rita, etc.)
            invoiceData.electricity_bill = parseFloat(formData.get('electricity_bill_individual') || 0.0);
            invoiceData.motor_bill = parseFloat(formData.get('motor_bill_individual') || 0.0);
            invoiceData.gas_bill = parseFloat(formData.get('gas_bill_individual') || 0.0);
            invoiceData.bkash_charge = parseFloat(formData.get('bkash_charge_individual') || 0.0);
            invoiceData.total_paid = parseFloat(formData.get('total_paid_individual') || 0.0);

            const transactionTypes = formData.getAll('transaction_types_individual[]');
            const transactionIds = formData.getAll('transaction_ids_individual[]');
            for (let i = 0; i < transactionTypes.length; i++) {
                if (transactionTypes[i] && transactionIds[i]) {
                    invoiceData.combined_transactions.push({ type: transactionTypes[i], id: transactionIds[i] });
                }
            }
        }
    }

    // Use imported calculateInvoiceTotals
    const { total_bill, balance } = calculateInvoiceTotals(
        invoiceData.gas_bill,
        invoiceData.electricity_bill,
        invoiceData.motor_bill,
        invoiceData.bkash_charge,
        invoiceData.total_paid
    );
    invoiceData.total_bill = total_bill;
    invoiceData.balance = balance;

    const now = new Date();
    invoiceData.billing_date = now.toISOString().slice(0, 10);
    invoiceData.billing_time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    window.currentInvoiceData = invoiceData; // Store the prepared data globally

    window.location.hash = '#invoice'; // Navigate to the invoice page
}