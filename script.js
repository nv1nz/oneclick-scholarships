let scholarships = [];

// Load scholarships from JSON
async function fetchScholarships() {
  try {
    const res = await fetch('scholarships.json');
    scholarships = await res.json();
    renderScholarships(scholarships);
  } catch (err) {
    console.error("Error loading scholarships:", err);
  }
}

// Render scholarship cards
function renderScholarships(data) {
  const container = document.querySelector('.md\\:w-3\\/4.grid');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<p class="text-gray-500 col-span-full text-center py-20">No scholarships found.</p>';
    return;
  }

  data.forEach(sch => {
    container.innerHTML += `
      <div class="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition duration-300 border-t-4 border-indigo-500">
        <h3 class="text-xl font-bold text-indigo-700 mb-2">📚 ${sch.name}</h3>
        <p class="text-sm text-gray-600 mb-1">💰 Amount: ${sch.amount}</p>
        <p class="text-sm text-gray-600 mb-1">📅 Deadline: ${sch.deadline}</p>
        <p class="text-sm text-gray-600 mb-4">✅ ${sch.eligibility}</p>
        <a href="${sch.link}" target="_blank">
          <button class="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">Apply Now</button>
        </a>
      </div>
    `;
  });
}

// Apply filters
function applyFilters() {
  const query = document.querySelector('input[type="text"]').value.toLowerCase();
  const selects = document.querySelectorAll("select");
  const filters = [...selects].map(s => s.value);

  const filtered = scholarships.filter(s => {
    return (
      s.name.toLowerCase().includes(query) &&
      (filters[0] === "🎓 Academic Level" || s.level === filters[0]) &&
      (filters[1] === "🏷️ Scholarship Type" || s.type === filters[1]) &&
      (filters[2] === "🚻 Gender" || s.gender === filters[2]) &&
      (filters[3] === "💸 Income Bracket" || s.income === filters[3]) &&
      (filters[4] === "📍 State" || s.state === filters[4])
    );
  });

  renderScholarships(filtered);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  fetchScholarships();

  document.querySelector('input[type="text"]').addEventListener("input", applyFilters);
  document.querySelectorAll("select").forEach(sel => sel.addEventListener("change", applyFilters));

  // AI Chat dummy response
  const aiInput = document.querySelector("#allenChat input");
  const aiBtn = document.querySelector("#allenChat button");
  const aiBox = document.querySelector("#allenChat .p-4.text-sm");

  aiBtn.addEventListener("click", () => {
    const question = aiInput.value.trim();
    if (question === "") return;

    let reply = "Sorry, I can't answer that yet!";
    if (question.includes("deadline")) reply = "Deadlines vary. Filter scholarships above to see current ones.";
    else if (question.includes("eligibility")) reply = "Eligibility depends on your class, income, and state.";
    else if (question.includes("top")) reply = "Check out merit-based scholarships for top opportunities.";

    aiBox.innerHTML += `<div class="mt-2 text-gray-600"><b>You:</b> ${question}<br><b>ALLEN AI:</b> ${reply}</div>`;
    aiInput.value = "";
  });
});
