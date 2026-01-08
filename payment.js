/* =========================
   BALANCE & TRANSACTION
========================= */
let balanceUSD = Number(localStorage.getItem("balanceUSD")) || 0;
let currency = "$";        // default
let balanceVisible = true;
const EXCHANGE_RATE = 1500;

const balanceEl = document.getElementById("balance");
const toggleBalanceBtn = document.getElementById("toggleBalance");
const historyBody = document.getElementById("history-body");

/* =========================
   BALANCE FORMAT
========================= */
function formatBalance() {
  if (!balanceVisible) return "******";
  return currency === "$" 
    ? `$${balanceUSD.toFixed(2)}` 
    : `₦${(balanceUSD * EXCHANGE_RATE).toFixed(2)}`;
}

function updateBalance() {
  if (balanceEl) balanceEl.textContent = formatBalance();
}

/* =========================
   TRANSACTION HISTORY
========================= */
function addTransaction(type, amount) {
  const noHistory = document.getElementById("no-history");
  if (noHistory) noHistory.remove();

  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="${type === "deposit" ? "tx-deposit" : "tx-withdraw"}">
      ${type.toUpperCase()}
    </td>
    <td>${currency}${amount.toFixed(2)}</td>
    <td>${new Date().toLocaleString()}</td>
  `;
  historyBody.prepend(row);

  // Save to localStorage for persistence
  let history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
  history.unshift({ type, amount, currency, date: new Date().toISOString() });
  localStorage.setItem("transactionHistory", JSON.stringify(history));

  // Save balance
  localStorage.setItem("balanceUSD", balanceUSD);
}

/* =========================
   LOAD HISTORY ON PAGE
========================= */
function loadHistory() {
  let history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
  if (history.length === 0) return;
  historyBody.innerHTML = "";
  history.forEach(tx => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="${tx.type === "deposit" ? "tx-deposit" : "tx-withdraw"}">
        ${tx.type.toUpperCase()}
      </td>
      <td>${tx.currency}${tx.amount.toFixed(2)}</td>
      <td>${new Date(tx.date).toLocaleString()}</td>
    `;
    historyBody.appendChild(row);
  });
}

/* =========================
   CURRENCY SWITCH
========================= */
function setCurrency(newCurrency) {
  currency = newCurrency;
  updateBalance();
}

/* =========================
   TOGGLE BALANCE
========================= */
if (toggleBalanceBtn) {
  toggleBalanceBtn.addEventListener("click", () => {
    balanceVisible = !balanceVisible;
    updateBalance();
  });
}

/* =========================
   NAVIGATE TO DEPOSIT / WITHDRAW
========================= */
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");

if (depositBtn) depositBtn.addEventListener("click", () => window.location.href = "deposit.html");
if (withdrawBtn) withdrawBtn.addEventListener("click", () => window.location.href = "withdraw.html");

/* =========================
   INITIALIZE
========================= */
updateBalance();
loadHistory();

showNotification("Task posted successfully!", "success");

showNotification("Payment successful","success");