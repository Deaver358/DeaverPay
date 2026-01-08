const withdrawMethod = document.getElementById("withdrawMethod");
const withdrawAmount = document.getElementById("withdrawAmount");
const withdrawSubmit = document.getElementById("withdrawSubmit");

withdrawSubmit.addEventListener("click", () => {
  const method = withdrawMethod.value;
  let amount = Number(withdrawAmount.value);

  if (!amount || isNaN(amount)) {
    alert("Please enter a valid amount");
    return;
  }

  let balanceUSD = Number(localStorage.getItem("balanceUSD")) || 0;

  // Convert Naira to USD if needed
  const amountInUSD = (method === "paystack") ? amount / 1500 : amount;

  if (amountInUSD > balanceUSD) {
    alert("Insufficient balance");
    return;
  }

  balanceUSD -= amountInUSD;
  localStorage.setItem("balanceUSD", balanceUSD);

  // Add to transaction history
  let txHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
  txHistory.unshift({
    type: "withdraw",
    amount: (method === "paystack") ? amount : amountInUSD,
    currency: (method === "paystack") ? "₦" : "$",
    date: new Date().toISOString()
  });
  localStorage.setItem("transactionHistory", JSON.stringify(txHistory));

  alert(`Withdrawal successful via ${method.toUpperCase()}`);
  window.location.href = "payment.html";
});