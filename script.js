// script.js

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("allenToggle");
  const chatBox = document.getElementById("allenChat");

  toggleBtn.addEventListener("click", () => {
    chatBox.classList.toggle("hidden");
    chatBox.classList.toggle("animate-fade-in");
  });
});

// Optional animation class
const style = document.createElement("style");
style.innerHTML = `
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
`;
document.head.appendChild(style);
