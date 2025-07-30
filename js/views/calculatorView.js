// js/views/calculatorView.js

export function renderCalculatorView(targetElement) { // <<< REMOVED 'window.' and ADDED 'export'
    const calculatorHtml = `
        <h1>Bill Calculator</h1>

        <div class="excel-header">
            <label for="sharedMotorBillTotal">Total Water Bill of Our and Mamoni (10501785):</label>
            <input type="number" id="sharedMotorBillTotal" value="994" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"> ৳
        </div>

        <div class="calculator-table">
            <div class="table-header">
                <div class="header-cell">Name & Meter No:</div>
                <div class="header-cell">Gas Bill:</div>
                <div class="header-cell">Electricity Bill:</div>
                <div class="header-cell">Motor Bill:</div>
                <div class="header-cell">Bkash Charge:</div>
                <div class="header-cell">Total Bill:</div>
                <div class="header-cell">Total Paid:</div>
                <div class="header-cell">Return:</div>
            </div>

            <!-- Mridul 1 (250145) -->
            <div class="table-row" id="mridul1Row">
                <div class="row-label">Mridul 1 (250145):</div>
                <div class="input-cell"><input type="number" class="gas-bill readonly-value" value="2160" readonly></div>
                <div class="input-cell"><input type="number" class="electricity-bill" value="2084" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="motor-bill" value="497" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="bkash-charge" value="25" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell total-bill">0</div>
                <div class="input-cell"><input type="number" class="total-paid" value="5000" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell return-amount">0</div>
            </div>

            <!-- Mridul 2 (094221) -->
            <div class="table-row" id="mridul2Row">
                <div class="row-label">Mridul 2 (094221):</div>
                <div class="input-cell"><input type="number" class="gas-bill" value="0" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="electricity-bill" value="1667" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="motor-bill" value="0" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="bkash-charge" value="15" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell total-bill">0</div>
                <div class="input-cell"><input type="number" class="total-paid" value="1700" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell return-amount">0</div>
            </div>

            <!-- Rita (Mamoni) (094222) -->
            <div class="table-row" id="ritaMamoniRow">
                <div class="row-label">Rita (Mamoni) (094222):</div>
                <div class="input-cell"><input type="number" class="gas-bill readonly-value" value="1080" readonly></div>
                <div class="input-cell"><input type="number" class="electricity-bill" value="2217" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="motor-bill" value="497" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="bkash-charge" value="15" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell total-bill">0</div>
                <div class="input-cell"><input type="number" class="total-paid" value="4000" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell return-amount">0</div>
            </div>

            <!-- Rita (Boumoni) (27023) -->
            <div class="table-row" id="ritaBoumoniRow">
                <div class="row-label">Rita (Boumoni) (27023):</div>
                <div class="input-cell"><input type="number" class="gas-bill readonly-value" value="1080" readonly></div>
                <div class="input-cell"><input type="number" class="electricity-bill" value="1106" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="motor-bill" value="0" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="bkash-charge" value="15" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell total-bill">0</div>
                <div class="input-cell"><input type="number" class="total-paid" value="2201" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell return-amount">0</div>
            </div>

            <!-- Borda -->
            <div class="table-row" id="bordaRow">
                <div class="row-label">Borda:</div>
                <div class="input-cell"><input type="number" class="gas-bill readonly-value" value="2160" readonly></div>
                <div class="input-cell"><input type="number" class="electricity-bill" value="0" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="motor-bill" value="0" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="input-cell"><input type="number" class="bkash-charge" value="10" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell total-bill">0</div>
                <div class="input-cell"><input type="number" class="total-paid" value="2170" min="0" step="0.01" oninput="window.calculatorFunctions.calculateAll()"></div>
                <div class="output-cell return-amount">0</div>
            </div>

            <!-- Net Total Row -->
            <div class="table-row net-total-row">
                <div class="row-label">Net Total:</div>
                <div class="output-cell net-gas-bill">0</div>
                <div class="output-cell net-electricity-bill">0</div>
                <div class="output-cell net-motor-bill">0</div>
                <div class="output-cell net-bkash-charge">0</div>
                <div class="output-cell net-total-bill">0</div>
                <div class="output-cell net-total-paid">0</div>
                <div class="output-cell net-return-amount">0</div>
            </div>

        </div> <!-- End calculator-table -->
    `;
    targetElement.innerHTML = calculatorHtml;

    // Expose functions to the global scope for oninput attributes
    window.calculatorFunctions = {
        calculateRow,
        calculateNetTotals,
        handleSharedMotorBill,
        calculateAll
    };
    // Initial calculation call when the view is loaded by the router
    setTimeout(window.calculatorFunctions.calculateAll, 0); 
    console.log('calculatorView.js: Calculator page rendered and calculations initialized.');
}

// --- JavaScript functions for Calculator Logic ---
// These are now regular functions within the module scope.
function calculateRow(rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;

    const gasBill = parseFloat(row.querySelector('.gas-bill').value) || 0;
    const electricityBill = parseFloat(row.querySelector('.electricity-bill').value) || 0;
    const motorBill = parseFloat(row.querySelector('.motor-bill').value) || 0;
    const bkashCharge = parseFloat(row.querySelector('.bkash-charge').value) || 0;
    const totalPaid = parseFloat(row.querySelector('.total-paid').value) || 0;

    const totalBill = gasBill + electricityBill + motorBill + bkashCharge;
    const returnAmount = totalPaid - totalBill;

    row.querySelector('.total-bill').textContent = totalBill.toFixed(2);
    row.querySelector('.return-amount').textContent = returnAmount.toFixed(2);

    const returnElement = row.querySelector('.return-amount');
    if (returnAmount < 0) {
        returnElement.style.color = 'red';
    } else {
        returnElement.style.color = '#4CAF50'; // Green
    }
}

function calculateNetTotals() {
    let netGas = 0;
    let netElectricity = 0;
    let netMotor = 0;
    let netBkash = 0;
    let netTotalBill = 0;
    let netTotalPaid = 0;
    let netReturn = 0;

    const rows = ['mridul1Row', 'mridul2Row', 'ritaMamoniRow', 'ritaBoumoniRow', 'bordaRow'];

    rows.forEach(rowId => {
        const row = document.getElementById(rowId);
        if (row) {
            netGas += parseFloat(row.querySelector('.gas-bill').value) || 0;
            netElectricity += parseFloat(row.querySelector('.electricity-bill').value) || 0;
            netMotor += parseFloat(row.querySelector('.motor-bill').value) || 0;
            netBkash += parseFloat(row.querySelector('.bkash-charge').value) || 0;
            netTotalBill += parseFloat(row.querySelector('.total-bill').textContent) || 0;
            netTotalPaid += parseFloat(row.querySelector('.total-paid').value) || 0;
            netReturn += parseFloat(row.querySelector('.return-amount').textContent) || 0;
        }
    });

    document.querySelector('.net-gas-bill').textContent = netGas.toFixed(2);
    document.querySelector('.net-electricity-bill').textContent = netElectricity.toFixed(2);
    document.querySelector('.net-motor-bill').textContent = netMotor.toFixed(2);
    document.querySelector('.net-bkash-charge').textContent = netBkash.toFixed(2);
    document.querySelector('.net-total-bill').textContent = netTotalBill.toFixed(2);
    document.querySelector('.net-total-paid').textContent = netTotalPaid.toFixed(2);
    document.querySelector('.net-return-amount').textContent = netReturn.toFixed(2);

    const netReturnElement = document.querySelector('.net-return-amount');
    if (netReturn < 0) {
        netReturnElement.style.color = 'red';
    } else {
        netReturnElement.style.color = '#4CAF50'; // Green
    }
}

function handleSharedMotorBill() {
    const sharedMotorBillInput = document.getElementById('sharedMotorBillTotal');
    const sharedTotal = parseFloat(sharedMotorBillInput.value) || 0;

    const mridul1Motor = document.querySelector('#mridul1Row .motor-bill');
    const ritaMamoniMotor = document.querySelector('#ritaMamoniRow .motor-bill');

    if (sharedTotal > 0) {
        const individualShare = sharedTotal / 2;
        mridul1Motor.value = individualShare.toFixed(2);
        ritaMamoniMotor.value = individualShare.toFixed(2);
    } else {
        mridul1Motor.value = "0.00";
        ritaMamoniMotor.value = "0.00";
    }
    calculateRow('mridul1Row');
    calculateRow('ritaMamoniRow');
}

function calculateAll() {
    handleSharedMotorBill();
    calculateRow('mridul1Row');
    calculateRow('mridul2Row');
    calculateRow('ritaMamoniRow');
    calculateRow('ritaBoumoniRow');
    calculateRow('bordaRow');
    calculateNetTotals();
}