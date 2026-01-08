

/* =========================
   DEPOSIT
========================= */
function deposit() {
  let method;

  if (currency === "$") {
    method = prompt("Deposit via: USDT");
  } else {
    method = prompt("Deposit via: Bank Transfer or Card");
  }

  if (!method) return;

  const input = prompt(`Enter amount (${currency})`);

  // Cancel pressed → silent
  if (input === null) return;

  // Empty input
  if (input.trim() === "") {
    alert("Please enter an amount");
    return;
  }

  const amount = Number(input);

  // Invalid input
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount");
    return;
  }

  balanceUSD += currency === "$"
    ? amount
    : amount / EXCHANGE_RATE;

  updateBalance();
  addTransaction("deposit", amount);
}

/* =========================
   WITHDRAW
========================= */
function withdraw() {
  let method;

  if (currency === "$") {
    method = prompt("Withdraw to: USDT Wallet Address");
  } else {
    method = prompt("Withdraw via: Paystack");
  }

  if (!method) return;

  const input = prompt(`Enter amount (${currency})`);

  // Cancel pressed → silent
  if (input === null) return;

  // Empty input
  if (input.trim() === "") {
    alert("Please enter an amount");
    return;
  }

  const amount = Number(input);

  // Invalid input
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount");
    return;
  }

  const usdAmount =
    currency === "$"
      ? amount
      : amount / EXCHANGE_RATE;

  if (usdAmount > balanceUSD) {
    alert("Insufficient balance");
    return;
  }

  balanceUSD -= usdAmount;
  updateBalance();
  addTransaction("withdraw", amount);
}

/* =========================
   INITIAL LOAD
========================= */
updateBalance();
showNotification("Task posted successfully!", "success");
const dot = document.getElementById("notifyDot");

if (dot) {
  const hasUnread = localStorage.getItem("hasUnread");
  dot.style.display = hasUnread === "yes" ? "block" : "none";
}