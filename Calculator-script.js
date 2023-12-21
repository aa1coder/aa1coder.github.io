let currentInput = "";
let currentOperator = "";
let firstOperand = "";

function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if (isNumber(buttonValue)) {
        handleNumberClick(buttonValue);
    } else if (isOperator(buttonValue)) {
        handleOperatorClick(buttonValue);
    } else if (buttonValue === "=") {
        calculateResult();
    } else if (buttonValue === "C") {
        clearCalculator();
    }
}

function isNumber(value) {
    return /^\d+$/.test(value);
}

function isOperator(value) {
    return ["+", "-", "*", "/", "sqrt", "^"].includes(value);
}

function handleNumberClick(number) {
    currentInput += number;
    updateDisplay();
}

function handleOperatorClick(operator) {
    if (operator === "sqrt") {
        calculateSquareRoot();
    } else if (operator === "^") {
        if (currentOperator !== "") {
            calculateResult();
        }
        setOperator(operator);
        firstOperand = parseFloat(currentInput); // Ensure firstOperand is a number
        currentInput = "";
    } else {
        if (currentOperator !== "") {
            calculateResult();
        }
        setOperator(operator);
        firstOperand = parseFloat(currentInput); // Ensure firstOperand is a number
        currentInput = "";
    }
    updateDisplay();
}


function setOperator(operator) {
    currentOperator = operator;
}

function calculateResult() {
    if (currentInput !== "") {
        switch (currentOperator) {
            case "+":
                currentInput = (parseFloat(firstOperand) + parseFloat(currentInput)).toString();
                break;
            case "-":
                currentInput = (parseFloat(firstOperand) - parseFloat(currentInput)).toString();
                break;
            case "*":
                currentInput = (parseFloat(firstOperand) * parseFloat(currentInput)).toString();
                break;
            case "/":
                currentInput = (parseFloat(firstOperand) / parseFloat(currentInput)).toString();
                break;
            case "^":
                currentInput = Math.pow(parseFloat(firstOperand), parseFloat(currentInput)).toString();
                break;
        }
        currentOperator = "";
        firstOperand = "";
        updateDisplay();
    }
}

function calculateSquareRoot() {
    if (currentInput !== "") {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay();
    }
}

function clearCalculator() {
    currentInput = "";
    currentOperator = "";
    firstOperand = "";
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("result").value = currentInput;
}
