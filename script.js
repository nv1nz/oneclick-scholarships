let scholarships = [];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".md\\:w-3\\/4 .grid");
  const searchInput = document.querySelector("input[type='text']");
  const filters = document.querySelectorAll("select");
  const allenInput = document.querySelector("#allenChat input");
  const allenBtn = document.querySelector("#allenChat button");

  // Load scholarships
  fetch("scholarships.json")
    .then(res => res.json())
    .then(data => {
      scholarships = data;
      displayScholarships(scholarships);
    });

  function displayScholarships(data) {
    grid.innerHTML = "";
    if (data.length === 0) {
      grid.innerHTML = `<p class="text-gray-500 col-span-full text-center py-20">No scholarships found.</p>`;
      return;
    }

    data.forEach(s => {
      const div = document.createElement("div");
      div.className = "bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition duration-300 border-t-4 border-indigo-500 animate-fade-in";
      div.innerHTML = `
        <h3 class="text-xl font-bold text-indigo-700 mb-2">📚 ${s.name}</h3>
        <p class="text-sm text-gray-600 mb-1">💰 Amount: ${s.amount}</p>
        <p class="text-sm text-gray-600 mb-1">📅 Deadline: ${s.deadline}</p>
        <p class="text-sm text-gray-600 mb-4">✅ ${s.eligibility}</p>
        <a href="${s.link}" target="_blank"><button class="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">Apply Now</button></a>
      `;
      grid.appendChild(div);
    });
  }

  function filterScholarships() {
    const query = searchInput.value.toLowerCase();
    let filtered = scholarships.filter(s => {
      return (
        s.name.toLowerCase().includes(query) ||
        s.eligibility.toLowerCase().includes(query) ||
        s.type?.toLowerCase().includes(query)
      );
    });

    filters.forEach(select => {
      const val = select.value;
      if (!val || val.includes("🎓") || val.includes("🏷️") || val.includes("📍") || val.includes("🚻") || val.includes("💸")) return;

      filtered = filtered.filter(s =>
        Object.values(s).some(field => field.toLowerCase().includes(val.toLowerCase()))
      );
    });

    displayScholarships(filtered);
  }

  searchInput.addEventListener("input", filterScholarships);
  filters.forEach(select => select.addEventListener("change", filterScholarships));

  // Allen AI basic reply
  allenBtn.addEventListener("click", () => {
    const q = allenInput.value.toLowerCase();
    let response = "Sorry, I didn't understand that.";

    if (q.includes("deadline")) {
      response = "Most deadlines are between Aug and Dec 2025.";
    } else if (q.includes("10") || q.includes("class 10")) {
      response = "Here are some scholarships for Class 10 students. Please use the filter!";
    } else if (q.includes("female")) {
      response = "Use the gender filter to find female-specific scholarships!";
    }

    alert("ALLEN AI says:\n\n" + response);
  });
});
