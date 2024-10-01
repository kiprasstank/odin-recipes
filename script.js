// script.js

// Variables to store calculator state
let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let isSecondNumber = false;

// Function to perform addition
function add(a, b) {
    return a + b;
}

// Function to perform subtraction
function subtract(a, b) {
    return a - b;
}

// Function to perform multiplication
function multiply(a, b) {
    return a * b;
}

// Function to perform division
function divide(a, b) {
    if (b === 0) {
        return null; // Avoid division by zero
    }
    return a / b;
}

// Function to operate based on the operator and two numbers
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

// Function to update display
function updateDisplay(value) {
    const display = document.getElementById('display');
    display.value = value;
}

// Clear the calculator
function clearCalculator() {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    isSecondNumber = false;
    updateDisplay('0');  // Reset display to '0'
}

// Backspace functionality
function backspace() {
    if (isSecondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        updateDisplay(secondNumber === '' ? '0' : secondNumber);
    } else {
        firstNumber = firstNumber.slice(0, -1);
        updateDisplay(firstNumber === '' ? '0' : firstNumber);
    }
}

// Function to handle button clicks
function handleButtonClick(value) {
    if (value >= '0' && value <= '9' || value === '.') {
        if (isSecondNumber) {
            // Allow only one decimal point in secondNumber
            if (value === '.' && secondNumber.includes('.')) return;
            secondNumber += value;
            updateDisplay(secondNumber || '0');
        } else {
            // Allow only one decimal point in firstNumber
            if (value === '.' && firstNumber.includes('.')) return;
            firstNumber += value;
            updateDisplay(firstNumber || '0');
        }
    } else if (value === '=') {
        if (firstNumber && secondNumber && currentOperator) {
            const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            if (result !== null) {
                updateDisplay(result.toFixed(2)); // Show result rounded to 2 decimal places
                // Prepare for the next operation
                firstNumber = result.toString();
                secondNumber = '';
                currentOperator = '';
                isSecondNumber = false;
            } else {
                updateDisplay("Can't divide by 0"); // Error handling
            }
        }
    } else if (value === 'C') {
        clearCalculator();
    } else if (value === '←') {
        backspace();
    } else {
        // Only change the operator if first number is set
        if (firstNumber) {
            if (isSecondNumber) {
                const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
                if (result !== null) {
                    updateDisplay(result.toFixed(2)); // Update display with result
                    firstNumber = result.toString(); // Store result as first number
                    secondNumber = ''; // Clear second number
                }
            }
            currentOperator = value; // Set current operator
            isSecondNumber = true; // Move to second number input
        }
    }
}

// Button click event listener
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.getAttribute('data-value'));
    });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const operators = ['+', '-', '*', '/'];
    const numberKeys = '0123456789';
    const operatorMapping = {
        '/': '/',
        '*': '*',
        '-': '-',
        '+': '+',
        '=': '='
    };

    // Handle number keys
    if (numberKeys.includes(key) || key === '.') {
        handleButtonClick(key);
    } 
    // Handle operator keys
    else if (operators.includes(key)) {
        handleButtonClick(key);
    } 
    // Handle the Enter key
    else if (key === 'Enter') {
        handleButtonClick('=');
    } 
    // Handle the Escape key
    else if (key === 'Escape') {
        handleButtonClick('C');
    } 
    // Handle the Backspace key
    else if (key === 'Backspace') {
        handleButtonClick('←');
    }
});

// Initialize calculator
clearCalculator();
