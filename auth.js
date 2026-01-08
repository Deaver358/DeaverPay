document.addEventListener("DOMContentLoaded", function () {
  // ==============================
  // LOGIN FUNCTIONALITY
  // ==============================
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;

      const savedUser = JSON.parse(localStorage.getItem("deaverpayUser"));

      if (!savedUser) {
        alert("No account found. Please register.");
        return;
      }

      if (
        username === savedUser.username &&
        password === savedUser.password
      ) {
        alert("Login successful");
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html"; // dashboard/home
      } else {
        alert("Invalid username or password");
      }
    });
  }

});

document.addEventListener("DOMContentLoaded", function () {
  // ==============================
  // REGISTER FUNCTIONALITY
  // ==============================
  const registerBtn = document.getElementById("registerBtn");

  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      const username = document.getElementById("regUsername").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirm").value;

      if (!username || !email || !password || !confirm) {
        alert("All fields are required");
        return;
      }

      if (password !== confirm) {
        alert("Passwords do not match");
        return;
      }

      const user = { username, email, password };
      localStorage.setItem("deaverpayUser", JSON.stringify(user));

      alert("Account created successfully");
      window.location.href = "login.html";
    });
  }

});