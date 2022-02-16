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
