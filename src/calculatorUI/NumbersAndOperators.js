import { bigTextField, smallTextField } from "./dom.js";
import {
  assignOperands,
  getAnswer,
  firstNumber,
  secondNumber,
  operatorSign,
  assignOperator,
  evaluatePairs,
} from "../calculatorLogic/calculator.js";
import { convertOperatorSign } from "../utils/helper.js";

let newInput = false,
  resetCalculator = false;

export function displayNumbers(number) {
  // After user clicks equals to button and selects a number right after
  if (resetCalculator) {
    resetCalculator = false;
    smallTextField.textContent = "";
  }

  // Replace bigTextField with zero and decimal if user clicks on decimal after selecting an operator
  if (number === "." && newInput) {
    bigTextField.textContent = `0${number}`;
    newInput = false;
  }

  // Do not let decimal appear more than once
  if (number === "." && bigTextField.textContent.includes(".")) return assignOperands(bigTextField.textContent);

  // Replace initial zero with clicked number except when user clicks on decimal button or zero
  if (bigTextField.textContent === "0" && number !== ".") {
    bigTextField.textContent = number;
    newInput = false;
  } else {
    // Replace bigTextField values with new input values if user clicks on any number buttons except decimal after selecting an operator
    if (newInput) {
      bigTextField.textContent = number;
      newInput = false;
    } else bigTextField.textContent += number;
  }

  assignOperands(bigTextField.textContent);
}

export function displayOperators(operator) {
  newInput = true;
  if (evaluatePairs) bigTextField.textContent = getAnswer();
  smallTextField.textContent = `${parseFloat(bigTextField.textContent)} ${operator}`;
  bigTextField.textContent = `${parseFloat(bigTextField.textContent)}`;

  assignOperator(operator);
}

export function displayAnswer() {
  bigTextField.textContent = parseFloat(getAnswer());
  // Check if user clicks equals to sign without providing an operator
  // If there is no operator, just return the number on screen as answer
  if (operatorSign === "" || operatorSign === "No operator") smallTextField.textContent = `${parseFloat(getAnswer())} =`;
  else {
    smallTextField.textContent = `${parseFloat(firstNumber)} ${convertOperatorSign(operatorSign, "DOM")} ${parseFloat(
      secondNumber
    )} =`;
    // If user clicks equals to sign continuously.
    assignOperands(bigTextField.textContent);
  }
  resetCalculator = true;
  newInput = true;
}
