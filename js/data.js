// js/data.js

// Predefined fixed data for users
export const FIXED_DATA = { // <<< ADDED 'export'
    "Motor Bill": { "consumer_id": "41771313", "meter_number": "10501785" },
    "Mridul Kanti Dey": { "consumer_id": "41793600", "meter_number": "250145" },
    "Rita Dey": { "consumer_id": "41569338", "meter_number": "094222" },
    "Pijush Kanti Dey": { "consumer_id": "41019683", "meter_number": "27023" },
    "Angshu Debray": { "consumer_id": "41569323", "meter_number": "094221" },
    "Gas Bill": { "consumer_id": "240101995", "meter_number": "N/A" }
};

// Function to calculate total bill and balance (replicated from Python)
export function calculateInvoiceTotals(gas, electricity, motor, bkash_charge, paid) { // <<< ADDED 'export'
    const total_bill = gas + electricity + motor + bkash_charge;
    const balance = paid - total_bill;
    return { total_bill, balance };
}