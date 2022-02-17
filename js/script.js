// Error check
function createNode(e) {
  e.target.focus();
  e.target.style.border = "2px solid red";
  // e.target.style.color = "red";

  if (e.target.parentElement.childElementCount < 2) {
    let errorNode = document.createElement("small");
    errorNode.setAttribute("class", "text-danger error-msg");
    e.target.parentNode.appendChild(errorNode);
    return errorNode;
  } else {
    return document.querySelector("#" + e.target.id + " + small");
  }
}

document.querySelector(".income-saving-container").addEventListener(
  "blur",
  function (e) {
    e.stopImmediatePropagation();

    if (e.target.className.includes("form-control")) {
      const { value } = e.target;

      switch (true) {
        case !Boolean(value):
          createNode(e).innerHTML = "Can not be empty";
          break;

        case isNaN(value):
          createNode(e).innerHTML = "Only number is allowed";
          break;

        case Number(value) < 1:
          createNode(e).innerHTML = "Only positive value. Please";
          break;

        default:
          if (e.target.parentNode.childElementCount > 1) {
            document.querySelector("#" + e.target.id + " + small").remove();
          }
          e.target.style.border = "2px solid green";
      }
    }
  },
  true
);

// ======== EventListener CLICK ===========

// Calculate button is clicked
document
  .getElementById("calculate-income")
  .addEventListener("click", function () {
    // Calculate Expenses
    const expense = calculateExpenses(
      getValue("food"),
      getValue("rent"),
      getValue("clothes")
    );

    // show in element
    setValue("total-expenses", formatToReadableDigit(expense), "innerText");

    // Update Balance
    const balance = calculateBalance(getValue("income"), expense);
    setValue("balance", balance, "innerText");

    // clear input field
    // setValue("food");
    // setValue("rent");
    // setValue("clothes");
    // setValue("income");
  });

// Saving Button Clicked
document
  .getElementById("calculate-saving")
  .addEventListener("click", function () {
    // get saving percentage
    const income = getValue("income");
    const percent = parseInt(getValue("saving-percent")) / 100;
    const savingAmount = Number(income) * percent;

    // set saving amount
    setValue("saving-amount", formatToReadableDigit(savingAmount), "innerText");

    // update balance
    const totalCost =
      Number(getValue("total-expenses", "innerText").slice(1)) + savingAmount;
    const remainingBalance = calculateBalance(income, totalCost);

    // Set remaining balance
    setValue(
      "remaining-balance",
      formatToReadableDigit(remainingBalance),
      "innerText"
    );
  });

// ============ Functions ==========

// Calculate Expenses
function calculateExpenses() {
  let total = 0;

  for (let item of arguments) {
    total += Number(item);
  }

  return total;
}

// Calculate Balance
function calculateBalance(income, expense) {
  const remaining = Number(income) - Number(expense);

  return formatToReadableDigit(remaining);
}

// =========== UTILITIES Functions =============

// 1. get value of dom
function getValue(id, action = "value") {
  return document.getElementById(id)[action];
}

// 2. set value of dom
function setValue(id, value = "", action = "value") {
  document.getElementById(id)[action] = value;
}

// 3. Number formatting to readable digit
function formatToReadableDigit(number, currency = "EUR") {
  const formattedNumber = number.toLocaleString(undefined, {
    style: "currency",
    currency: currency,
  });

  return formattedNumber;
}
