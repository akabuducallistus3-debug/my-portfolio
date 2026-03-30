let calculation = localStorage.getItem("calculator") || "";

displayCalculation();

function calculate(number) {
  calculation += number;

  displayCalculation();

  Math.round(calculation);

  localStorage.setItem("calculator", calculation);
}

function displayCalculation() {
  document.querySelector(".display").innerHTML = ` ${calculation}`;
}
JSON.parse(localStorage.getItem("mess"));

localStorage.setItem("mess", JSON.stringify("boy"));
