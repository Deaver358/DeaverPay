document.addEventListener("DOMContentLoaded", function () {
  const changeBtn = document.getElementById("changeBtn");

  changeBtn.addEventListener("click", function () {
    const current = document.getElementById("currentPassword").value.trim();
    const newPass = document.getElementById("newPassword").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();

    if (!current || !newPass || !confirm) {
      alert("All fields are required");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("deaverpayUser")) || {};

    if (current !== savedUser.password) {
      alert("Current password is incorrect");
      return;
    }

    if (newPass !== confirm) {
      alert("New passwords do not match");
      return;
    }

    // Save new password
    savedUser.password = newPass;
    localStorage.setItem("deaverpayUser", JSON.stringify(savedUser));

    alert("Password updated successfully");
    // Redirect to profile
    window.location.href = "profile.html";
  });
});