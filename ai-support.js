document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendMsg");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    appendMessage("user", msg);
    chatInput.value = "";

    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(msg);
      appendMessage("ai", response);
    }, 700);
  }

  function appendMessage(sender, text) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getAIResponse(msg) {
    // Simple keyword matching for now
    const m = msg.toLowerCase();
    if (m.includes("deposit")) return "To deposit, click the Deposit button and follow instructions.";
    if (m.includes("withdraw")) return "To withdraw, click the Withdraw button and choose your method.";
    if (m.includes("balance")) return "Your current balance is displayed at the top of your dashboard.";
    return "Hi there! I’m Deaver 👋. My AI live service isn’t available at the moment, but don’t worry! You can reach out to our support team anytime at deaveroctafx358@gmail.com, and we’ll be happy to help.";
  }
});

