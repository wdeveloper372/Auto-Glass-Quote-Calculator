document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('calculatorForm');

    // --- DOM Element Caching ---
    // Store references to elements to avoid repeated lookups in the DOM.
    const elements = {
        partsAmount: document.getElementById('partsAmount'),
        needsKit: document.getElementById('needsKit'),
        labor: document.getElementById('labor'),
        calibration: document.getElementById('calibration'),
        displayParts: document.getElementById('displayParts'),
        displayPartTax: document.getElementById('displayPartTax'),
        displayKitCost: document.getElementById('displayKitCost'),
        displayLabor: document.getElementById('displayLabor'),
        displayCalibration: document.getElementById('displayCalibration'),
        displayTotal: document.getElementById('displayTotal'),
    };

    // --- Configuration ---
    // These values can be adjusted to match business requirements.
    const PROFIT_MARGIN_MULTIPLIER = 1.30; // Represents a 30% profit margin
    const TAX_RATE = 0.0825;               // 8.25% sales tax
    const KIT_BASE_COST = 25.00;           // $25.00 base cost for a kit

    /**
     * Formats a number into a US dollar currency string.
     * @param {number} amount - The number to format.
     * @returns {string} - The formatted currency string (e.g., "$1,234.56").
     */
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    /**
     * Handles the form submission to calculate and display the totals.
     * @param {Event} event - The form submission event.
     */
    const handleCalculate = (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        // 1. Get values from the form inputs
        const partsAmount = parseFloat(elements.partsAmount.value) || 0;
        const needsKit = elements.needsKit.value === 'y';
        const labor = parseFloat(elements.labor.value) || 0;
        const calibration = parseFloat(elements.calibration.value) || 0;

        // 2. Perform calculations
        const partsWithProfit = partsAmount * PROFIT_MARGIN_MULTIPLIER;
        const partTax = partsWithProfit * TAX_RATE;
        
        const kitTax = KIT_BASE_COST * TAX_RATE;
        const kitCostWithTax = needsKit ? (KIT_BASE_COST + kitTax) : 0;

        const total = partsWithProfit + partTax + kitCostWithTax + labor + calibration;

        // 3. Display the results in the HTML
        elements.displayParts.textContent = formatCurrency(partsWithProfit);
        elements.displayPartTax.textContent = formatCurrency(partTax);
        elements.displayKitCost.textContent = formatCurrency(kitCostWithTax);
        elements.displayLabor.textContent = formatCurrency(labor);
        elements.displayCalibration.textContent = formatCurrency(calibration);
        elements.displayTotal.textContent = formatCurrency(total);
    };

    /**
     * Resets the form and the displayed results to their initial state.
     */
    const handleReset = () => {
        // The native form reset clears inputs; we just need to clear the results.
        Object.values(elements)
            .filter(el => el.id.startsWith('display'))
            .forEach(el => el.textContent = formatCurrency(0));
    };

    // Attach event listeners to the form
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', handleCalculate);
        calculatorForm.addEventListener('reset', handleReset);
    } else {
        console.error('Calculator form not found!');
    }
});