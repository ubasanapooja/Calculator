let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '0';
}

function updateDisplay() {
    display.value = currentInput || previousInput || '0';
}

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

document.querySelectorAll('.btn-number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.innerText));
});

document.querySelectorAll('.btn-operation').forEach(button => {
    button.addEventListener('click', () => chooseOperator(button.innerText));
});

document.getElementById('equal').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearDisplay);

document.getElementById('backspace').addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});