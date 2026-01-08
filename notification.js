// ===============================
// GLOBAL STORAGE
// ===============================
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

// ===============================
// POPUP NOTIFICATION (ALL PAGES)
// ===============================
function showNotification(message, type = "info") {
  const container = document.getElementById("notificationContainer");
  if (!container) return;

  const div = document.createElement("div");
  div.className = `popup ${type}`;
  div.textContent = message;
  container.appendChild(div);

  setTimeout(() => div.remove(), 3500);

  notifications.unshift({
    title: type === "success" ? "Success" : type === "error" ? "Error" : "Notification",
    message,
    type,
    read: false,
    time: Date.now()
  });

  localStorage.setItem("notifications", JSON.stringify(notifications));
  updateNotificationDot();
}

// ===============================
// RENDER NOTIFICATIONS PAGE
// ===============================
function renderNotifications() {
  const list = document.getElementById("notificationList");
  if (!list) return;

  list.innerHTML = "";

  if (notifications.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No notifications yet";
    list.appendChild(empty);
    updateNotificationDot();
    return;
  }

  notifications.forEach((n, index) => {
    const li = document.createElement("li");
    li.className = `notification ${n.read ? "read" : "unread"}`;

    li.innerHTML = `
      <strong>${n.title}</strong>
      <p>${n.message}</p>
      <small>${new Date(n.time).toLocaleString()}</small>
    `;

    li.onclick = () => markAsRead(index);
    list.appendChild(li);
  });

  updateNotificationDot();
}

// ===============================
// MARK AS READ
// ===============================
function markAsRead(index) {
  notifications[index].read = true;
  localStorage.setItem("notifications", JSON.stringify(notifications));
  renderNotifications();
}

// ===============================
// RED DOT LOGIC
// ===============================
function updateNotificationDot() {
  const dot = document.getElementById("notificationDot");
  if (!dot) return;

  const hasUnread = notifications.some(n => !n.read);
  dot.style.display = hasUnread ? "block" : "none";
}

// ===============================
// AUTO INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  renderNotifications();
  updateNotificationDot();
});