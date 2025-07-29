document.addEventListener("DOMContentLoaded", () => {
  const allenToggle = document.getElementById("allenToggle");
  const allenChat = document.getElementById("allenChat");

  // Toggle ALLEN AI chat box
  allenToggle.addEventListener("click", () => {
    allenChat.classList.toggle("hidden");
    allenChat.classList.add("animate-fade-in");
  });

  // Simulate Allen AI response (optional for now)
  const inputBox = allenChat.querySelector("input");
  const sendBtn = allenChat.querySelector("button");

  sendBtn.addEventListener("click", () => {
    const query = inputBox.value.trim();
    if (query.length > 0) {
      alert("ALLEN AI is thinking... (feature coming soon!)");
      inputBox.value = "";
    }
  });

  // You can expand this with real AI backend or typed response later
});
