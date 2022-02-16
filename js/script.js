// DOM References

// Calculate Income
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
    setValue("food");
    setValue("rent");
    setValue("clothes");
    setValue("income");
  });

// Calculate Savings
document
  .getElementById("calculate-saving")
  .addEventListener("click", function () {
    // console.log("calculate savings");
  });

// get value of dom
function getValue(id, el = "input") {
  return document.getElementById(id)[el === "input" ? "value" : "innerText"];
}
// set value of dom
function setValue(id, value = "", action = "value") {
  document.getElementById(id)[action] = value;
}

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

// Number formatting to readable digit
function formatToReadableDigit(number, currency = "EUR") {
  const formattedNumber = number.toLocaleString(undefined, {
    style: "currency",
    currency: currency,
  });

  return formattedNumber;
}
