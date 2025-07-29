document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("scholarshipGrid");
  const searchInput = document.getElementById("searchInput");

  // Filters
  const academic = document.getElementById("filterAcademic");
  const type = document.getElementById("filterType");
  const gender = document.getElementById("filterGender");
  const income = document.getElementById("filterIncome");
  const state = document.getElementById("filterState");

  let scholarships = [];

  fetch("scholarships.json")
    .then(res => res.json())
    .then(data => {
      scholarships = data;
      renderScholarships(scholarships);
    });

  function renderScholarships(data) {
    grid.innerHTML = "";

    if (data.length === 0) {
      grid.innerHTML = `<p class="text-gray-500 col-span-full text-center py-10">No scholarships found.</p>`;
      return;
    }

    data.forEach(s => {
      const card = document.createElement("div");
      card.className = "bg-white p-5 rounded-2xl shadow hover:shadow-lg transition duration-300 animate-fade-in";
      card.innerHTML = `
        <h3 class="text-lg font-semibold text-indigo-700 mb-2">${s.name}</h3>
        <p class="text-sm text-gray-600 mb-1"><b>Type:</b> ${s.type}</p>
        <p class="text-sm text-gray-600 mb-1"><b>Academic:</b> ${s.academic}</p>
        <p class="text-sm text-gray-600 mb-1"><b>Gender:</b> ${s.gender}</p>
        <p class="text-sm text-gray-600 mb-1"><b>Income:</b> ${s.income}</p>
        <p class="text-sm text-gray-600 mb-3"><b>State:</b> ${s.state}</p>
        <a href="${s.link}" target="_blank" class="inline-block mt-2 text-indigo-600 font-medium hover:underline">Apply Now →</a>
      `;
      grid.appendChild(card);
    });
  }

  // Filter logic
  function applyFilters() {
    const keyword = searchInput.value.toLowerCase();

    const filtered = scholarships.filter(s => {
      const matchSearch =
        s.name.toLowerCase().includes(keyword) ||
        s.type.toLowerCase().includes(keyword) ||
        s.eligibility?.toLowerCase().includes(keyword);

      const matchAcademic = !academic.value || s.academic === academic.value;
      const matchType = !type.value || s.type === type.value;
      const matchGender = !gender.value || s.gender === gender.value;
      const matchIncome = !income.value || s.income === income.value;
      const matchState = !state.value || s.state === state.value;

      return (
        matchSearch &&
        matchAcademic &&
        matchType &&
        matchGender &&
        matchIncome &&
        matchState
      );
    });

    renderScholarships(filtered);
  }

  // Add event listeners
  [searchInput, academic, type, gender, income, state].forEach(el =>
    el.addEventListener("input", applyFilters)
  );
});
