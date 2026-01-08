const depositMethod = document.getElementById("depositMethod");
const depositAmount = document.getElementById("depositAmount");
const depositSubmit = document.getElementById("depositSubmit");

depositSubmit.addEventListener("click", () => {
  const method = depositMethod.value;
  let amount = Number(depositAmount.value);

  if (!amount || isNaN(amount)) {
    alert("Please enter a valid amount");
    return;
  }

  let balanceUSD = Number(localStorage.getItem("balanceUSD")) || 0;

  // Convert Naira to USD if needed
  if (method === "bank" || method === "card") {
    amount = amount / 1500;
  }

  balanceUSD += amount;
  localStorage.setItem("balanceUSD", balanceUSD);

  // Add to transaction history
  let txHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
  txHistory.unshift({
    type: "deposit",
    amount: method === "bank" || method === "card" ? amount * 1500 : amount,
    currency: (method === "bank" || method === "card") ? "₦" : "$",
    date: new Date().toISOString()
  });
  localStorage.setItem("transactionHistory", JSON.stringify(txHistory));

  alert(`Deposit successful via ${method.toUpperCase()}`);
  window.location.href = "payment.html";
});