let initial = {
  balance: 0,
  expenses: 0,
};

//  ========== Error check ======
// Checking validity of input element
document.getElementById("income").focus();
document
  .querySelector(".income-saving-container")
  .addEventListener("blur", validateInput, true);

// ======== EventListener CLICK ===========
// Calculate button is clicked
document
  .getElementById("calculate-income")
  .addEventListener("click", function (e) {
    // Calculate Expenses
    const expense = calculateExpenses(
      getValue("food"),
      getValue("rent"),
      getValue("clothes")
    );

    // check amount to save
    if (isAmountAvailable(e, Number(getValue("income")), expense)) {
      // set total expenses
      initial.expenses = expense;
      setValue("total-expenses", formatToReadableDigit(expense), "innerText");

      // Update Balance
      const balance = calculateBalance(getValue("income"), expense);
      initial.balance = balance;
      setValue("balance", formatToReadableDigit(initial.balance), "innerText");
    }
  });

// Saving Button Clicked
document
  .getElementById("calculate-saving")
  .addEventListener("click", function (e) {
    // get saving percentage
    const income = getValue("income");
    const percent = parseInt(Number(getValue("saving-percent"))) / 100;
    const savingAmount = Number(income) * percent;

    // check amount to save
    if (isAmountAvailable(e, Number(initial.balance), savingAmount)) {
      // set saving amount
      setValue(
        "saving-amount",
        formatToReadableDigit(savingAmount),
        "innerText"
      );

      // update balance
      const remainingBalance = calculateBalance(
        Number(initial.balance),
        savingAmount
      );

      // Set remaining balance
      setValue(
        "remaining-balance",
        formatToReadableDigit(remainingBalance),
        "innerText"
      );
    }
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

  return remaining;
}

// isAmountAvailable - check amount to save
function isAmountAvailable(e, principal, cost) {
  let errorNode = document.querySelector("#" + e.target.id + " ~ .error-text");

  if (principal >= cost) {
    errorNode.innerText = "";
    return true;
  } else {
    errorNode.innerText = `${
      e.target.id === "calculate-income" ? "Income" : "Balance"
    }, ${formatToReadableDigit(principal)} is low to ${
      e.target.id === "calculate-income" ? "Expense" : "Saving"
    }, ${formatToReadableDigit(cost)}`;
  }

  return false;
}

// Validate Input
function validateInput(e) {
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

      case Number(value) < 0:
        createNode(e).innerHTML = "Only non-negative value. Please";
        break;

      default:
        if (e.target.parentNode.childElementCount > 1) {
          document.querySelector("#" + e.target.id + " + small").remove();
        }
        e.target.style.border = "2px solid green";
    }
  }
}

// Creating error msg node or updating text content
function createNode(e) {
  e.target.focus();
  e.target.style.border = "2px solid red";

  if (e.target.parentElement.childElementCount < 2) {
    let errorNode = document.createElement("small");
    errorNode.setAttribute("class", "text-danger error-msg");
    e.target.parentNode.appendChild(errorNode);

    return errorNode;
  } else {
    return document.querySelector("#" + e.target.id + " + small");
  }
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
function formatToReadableDigit(number, currency = "USD") {
  const formattedNumber = number.toLocaleString(undefined, {
    style: "currency",
    currency: currency,
  });

  return formattedNumber;
}
