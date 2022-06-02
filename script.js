const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  if (num2 === 0) return "😒⁉";
  return (num1 / num2).toFixed(5);
};

const operate = (operator, num1, num2) => {
  if (operator === "+") return add(num1, num2);
  if (operator === "-") return subtract(num1, num2);
  if (operator === "*") return multiply(num1, num2);
  if (operator === "/") return divide(num1, num2);
};

let num1 = null;
let num2 = null;
let operation = null;
let result = null;
let stage = "firstNumber";
const num1Display = document.getElementById("num1");
const num2Display = document.getElementById("num2");
const operatorDisplay = document.getElementById("operator");
const resultDisplay = document.getElementById("result");

const updateDisplay = () => {
  num1Display.textContent = num1;
  operatorDisplay.textContent = operation;
  num2Display.textContent = num2;
  resultDisplay.textContent = result;
};

const numberClicked = (num) => {
  if (stage === "secondNumber") {
    num2 = num2 * 10 + num;
    num2Display.textContent = num2;
  } else if (stage === "firstNumber") {
    num1 = num1 * 10 + num;
    num1Display.textContent = num1;
  }
};

const operatorClicked = (operator) => {
  if (operation === null) {
    operation = operator;
    operatorDisplay.textContent = operation;
  } else {
    num1 = operate(operation, num1, num2);
    operation = operator;
    num2 = null;
    result = null;
    updateDisplay();
  }
  stage = "secondNumber";
};

const clearClicked = () => {
  num1 = null;
  num2 = null;
  operation = null;
  result = null;
  stage = "firstNumber";
  updateDisplay();
};

const equalsClicked = () => {
  if (operation !== null && num1 !== null && num2 !== null) {
    result = operate(operation, num1, num2);
    stage = "finalResult";
    resultDisplay.textContent = result;
  }
};
