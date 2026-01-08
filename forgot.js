document.addEventListener("DOMContentLoaded", function () {
  const resetBtn = document.getElementById("resetBtn");
  const emailInput = document.getElementById("resetEmail");

  resetBtn.addEventListener("click", function () {
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    alert("Password reset link sent to " + email);

    emailInput.value = "";
  });
});