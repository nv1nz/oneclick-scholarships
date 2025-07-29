document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("allenToggle");
  const chatBox = document.getElementById("allenChat");
  const scholarshipsContainer = document.querySelector(".md\\:w-3\\/4.grid");
  const loadingText = scholarshipsContainer.querySelector("p");

  // Toggle chat
  toggleBtn.addEventListener("click", () => {
    chatBox.classList.toggle("hidden");
    chatBox.classList.add("animate-fade-in");
  });

  // Load scholarships from JSON
  fetch("scholarships.json")
    .then(res => res.json())
    .then(data => {
      loadingText.classList.add("hidden");
      scholarshipsContainer.innerHTML = "";

      data.forEach(sch => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition duration-300 border-t-4 border-indigo-500";

        card.innerHTML = `
          <h3 class="text-xl font-bold text-indigo-700 mb-2">📚 ${sch.name}</h3>
          <p class="text-sm text-gray-600 mb-1">💰 Amount: ${sch.amount}</p>
          <p class="text-sm text-gray-600 mb-1">📅 Deadline: ${sch.deadline}</p>
          <p class="text-sm text-gray-600 mb-4">✅ ${sch.eligibility}</p>
          <a href="${sch.link}" target="_blank" class="block w-full text-center bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">Apply Now</a>
        `;

        scholarshipsContainer.appendChild(card);
      });
    })
    .catch(error => {
      loadingText.textContent = "❌ Failed to load scholarships.";
      console.error("Error loading scholarships:", error);
    });
});
