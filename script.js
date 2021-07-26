"use strict";
// variable assignment
const display = document.querySelector("#display");
const buttonNum = document.querySelectorAll(".num");
const buttonClear = document.querySelector("#btnClr"); //??
const buttonNegative = document.querySelector("#btnNegative");
const buttonPercent = document.querySelector("#btnPercent");
const buttonDivision = document.querySelector("#btnDivision");
const buttonMultiply = document.querySelector("#btnMultiply");
const buttonSubtract = document.querySelector("#btnSubtract");
const buttonAdd = document.querySelector("#btnAdd");
const buttonEqual = document.querySelector("#btnEqual");
const buttonDecimal = document.querySelector("#btnDecimal");
let tempCalculation = ["", "", ""];
let result;
let resetDisplay = false;

// math logic
const mathFunc = {
  "+": function (x, y) {
    return x + y;
  },
  "-": function (x, y) {
    return x - y;
  },
  "*": function (x, y) {
    return x * y;
  },
  "/": function (x, y) {
    return x / y;
  },
  "%": function (x) {
    return x / 100;
  },
};

// button event listener
buttonNum.forEach((button) => {
  button.addEventListener("click", () => {
    if (tempCalculation[0].length < 10) {
      if (button.textContent === "0" && display.textContent !== "0") {
        updateDisplay(button);
      } else if (button.textContent !== "0") {
        if (display.textContent === "0" && !display.textContent.includes("."))
          display.textContent = "";
        updateDisplay(button);
      }
    } else if (tempCalculation[2].length < 10 && tempCalculation[1] !== "") {
      if (button.textContent === "0" && display.textContent !== "0") {
        updateDisplay(button);
      } else if (button.textContent !== "0") {
        if (display.textContent === "0" && !display.textContent.includes("."))
          display.textContent = "";
        updateDisplay(button);
      }
    }
  });
});

buttonClear.addEventListener("click", () => {
  tempCalculation = ["", "", ""];
  display.textContent = "0";
});

buttonNegative.addEventListener("click", () => {
  if (tempCalculation[1] === "") {
    if (!display.textContent.includes("-")) {
      display.textContent = "-" + display.textContent;
      tempCalculation[0] = display.textContent;
    } else {
      display.textContent = display.textContent.replace("-", "");
      tempCalculation[0] = display.textContent;
    }
  } else {
    if (!display.textContent.includes("-")) {
      display.textContent = "-" + display.textContent;
      tempCalculation[2] = display.textContent;
    } else {
      display.textContent = display.textContent.replace("-", "");
      tempCalculation[2] = display.textContent;
    }
  }
});

buttonPercent.addEventListener("click", () => {
  tempCalculation[0] = display.textContent;
  tempCalculation[1] = "%";
  result = showResult(tempCalculation);
  display.textContent = result;
});

buttonDivision.addEventListener("click", () => {
  if (tempCalculation[0] !== "") calcLogic("/");
});

buttonMultiply.addEventListener("click", () => {
  if (tempCalculation[0] !== "") calcLogic("*");
});

buttonSubtract.addEventListener("click", () => {
  if (tempCalculation[0] !== "") calcLogic("-");
});

buttonAdd.addEventListener("click", () => {
  if (tempCalculation[0] !== "") calcLogic("+");
});

buttonEqual.addEventListener("click", () => {
  if (tempCalculation[1] !== "") {
    result = showResult(tempCalculation);
    if (result.toString().length > 8 && !result.toString().includes(".")) {
      result = result.toExponential();
    } else if (
      result.toString().includes(".") &&
      result.toString().length > 8
    ) {
      result = result.toFixed(8);
    }
    display.textContent = result;
    tempCalculation = [result.toString(), "", ""];
    resetDisplay = true;
  }
});

buttonDecimal.addEventListener("click", () => {
  if (!display.textContent.includes(".")) {
    if (tempCalculation[1] === "") {
      display.textContent += ".";
      tempCalculation[0] += ".";
    } else {
      display.textContent += ".";
      tempCalculation[2] += ".";
    }
  }
});

// function declaration
function updateDisplay(button) {
  if (resetDisplay) {
    tempCalculation = ["", "", ""];
    resetDisplay = false;
  }
  if (!tempCalculation[1]) {
    tempCalculation[0] += button.textContent;
    display.textContent = tempCalculation[0];
  } else {
    tempCalculation[2] += button.textContent;
    display.textContent = tempCalculation[2];
  }
}

function calcLogic(op) {
  resetDisplay = false;
  if (sequentialCalc()) {
    display.textContent = showResult(tempCalculation);
    tempCalculation = [display.textContent, op, ""];
  } else {
    tempCalculation[1] = op;
  }
}

function sequentialCalc() {
  return tempCalculation[0] && tempCalculation[1] && tempCalculation[2];
}

function showResult(arr) {
  return mathFunc[arr[1]](Number(arr[0]), Number(arr[2]));
}
