document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     LOAD USER DATA
  ========================= */
  const savedUser =
    JSON.parse(localStorage.getItem("deaverpayUser")) || {};
  const savedProfile =
    JSON.parse(localStorage.getItem("deaverpayProfile")) || {};

  const countrySelect = document.getElementById("countryCode");
  const phoneInput = document.getElementById("phone");

  if (savedProfile.phoneCode) countrySelect.value = savedProfile.phoneCode;

  countrySelect.addEventListener("change", () => {
    phoneInput.placeholder = `Phone Number (${countrySelect.value})`;
  });

  const usernameEl = document.getElementById("username");
  const emailEl = document.getElementById("email");
  const fullNameEl = document.getElementById("fullName");
  const countryEl = document.getElementById("country");
  const ageEl = document.getElementById("age");
  const phoneEl = document.getElementById("phone");

  if (usernameEl) usernameEl.value = savedUser.username || "";
  if (emailEl) emailEl.value = savedUser.email || "";
  if (fullNameEl) fullNameEl.value = savedProfile.fullName || "";
  if (countryEl) countryEl.value = savedProfile.country || "";
  if (ageEl) ageEl.value = savedProfile.age || "";
  if (phoneEl) phoneEl.value = savedProfile.phone || "";

  /* =========================
     AVATAR LOGIC (SINGLE SOURCE)
  ========================= */
  const avatarInput = document.getElementById("avatarInput");
  const avatarPreview = document.getElementById("avatarPreview");
  const DEFAULT_AVATAR = "avatar.jpeg";
  const AVATAR_KEY = "deaverpayAvatar";

  // Load avatar
  const savedAvatar = localStorage.getItem(AVATAR_KEY);
  avatarPreview.src = savedAvatar || DEFAULT_AVATAR;

  // Change avatar
  avatarInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      avatarPreview.src = reader.result;
      localStorage.setItem(AVATAR_KEY, reader.result);
    };
    reader.readAsDataURL(file);
  });
});

/* =========================
   REMOVE AVATAR
========================= */
function removeAvatar() {
  const avatarPreview = document.getElementById("avatarPreview");
  const DEFAULT_AVATAR = "avatar.jpeg";

  avatarPreview.src = DEFAULT_AVATAR;
  localStorage.removeItem("deaverpayAvatar");
}

/* =========================
   SAVE PROFILE
========================= */
function saveProfile() {
  const fullName = document.getElementById("fullName").value.trim();
  const country = document.getElementById("country").value.trim();
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const phoneCode = document.getElementById("countryCode").value;

  if (!fullName || !country || !age || !phone) {
    alert("All fields are required");
    return;
  }

  localStorage.setItem(
    "deaverpayProfile",
    JSON.stringify({ fullName, country, age, phone, phoneCode })
  );

  alert("Profile updated successfully");
}

/* =========================
   SETTINGS
========================= */
function changePassword() {
  alert("Change password feature will be available soon.");
}

function openSupport() {
  alert("AI Support is connecting...");
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "landing.html";
}