const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  if (num2 === 0) return `😒⁉♾`;
  return (num1 / num2).toFixed(5);
};

const operate = (operator, num1, num2) => {
  if (operator === "+") return add(num1, num2);
  if (operator === "-") return subtract(num1, num2);
  if (operator === "*") return multiply(num1, num2);
  if (operator === "/") return divide(num1, num2);
};

let num1 = "";
let num2 = "";
let operation = null;
let result = "";
let stage = "firstNumber";
let num1DecimalPosition = -1;
let num2DecimalPosition = -1;
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
    num2 += num;
    if (num2DecimalPosition >= 0) num2DecimalPosition++;
    num2Display.textContent = num2;
  } else if (stage === "firstNumber") {
    num1 += num;
    if (num1DecimalPosition >= 0) num1DecimalPosition++;
    num1Display.textContent = num1;
  }
};

const operatorClicked = (operator) => {
  if (operation === null) {
    operation = operator;
    operatorDisplay.textContent = operation;
  } else {
    num1 = operate(operation, +num1, +num2);
    operation = operator;
    num2 = "";
    result = "";
    updateDisplay();
  }
  stage = "secondNumber";
};

const decimalClicked = () => {
  if (stage === "secondNumber" && num2DecimalPosition === -1) {
    isNum2Decimal = 0;
    num2 += ".";
    num2Display.textContent = num2;
  } else if (stage === "firstNumber" && num1DecimalPosition === -1) {
    num1DecimalPosition = 0;
    num1 += ".";
    num1Display.textContent = num1;
  }
};

const deleteClicked = () => {
  if (stage === "secondNumber") {
    num2 = num2.length === 1 ? "" : num2.substring(0, num2.length - 1);
    if (num2DecimalPosition > -1) num2DecimalPosition--;
    num2Display.textContent = num2;
  } else if (stage === "firstNumber") {
    num1 = num1.length === 1 ? "" : num1.substring(0, num1.length - 1);
    if (num1DecimalPosition > -1) num1DecimalPosition--;
    num1Display.textContent = num1;
  }
};

const clearClicked = () => {
  num1 = "";
  num2 = "";
  num1DecimalPosition = -1;
  num2DecimalPosition = -1;
  operation = null;
  result = "";
  stage = "firstNumber";
  updateDisplay();
};

const equalsClicked = () => {
  if (operation !== null && num1 !== "" && num2 !== "") {
    result =
      num1DecimalPosition > -1 || num2DecimalPosition > -1
        ? operate(operation, +num1, +num2).toFixed(5)
        : operate(operation, +num1, +num2);
    stage = "finalResult";
    num1DecimalPosition = -1;
    num2DecimalPosition = -1;
    resultDisplay.textContent = result;
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key == "0") numberClicked(0);
  if (e.key == "1") numberClicked(1);
  if (e.key == "2") numberClicked(2);
  if (e.key == "3") numberClicked(3);
  if (e.key == "4") numberClicked(4);
  if (e.key == "5") numberClicked(5);
  if (e.key == "6") numberClicked(6);
  if (e.key == "7") numberClicked(7);
  if (e.key == "8") numberClicked(8);
  if (e.key == "9") numberClicked(9);
  if (e.key == "+") operatorClicked("+");
  if (e.key == "-") operatorClicked("-");
  if (e.key == "*") operatorClicked("*");
  if (e.key == "/") operatorClicked("/");
  if (e.key == ".") decimalClicked();
  if (e.key == "Backspace" || e.key == "Delete") deleteClicked();
  if (e.key == "Escape") clearClicked();
  if (e.key == "=" || e.key == "Enter") equalsClicked();
});
