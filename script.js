const scholarshipList = document.getElementById('scholarship-list');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category');
const educationFilter = document.getElementById('education-level');
const deadlineFilter = document.getElementById('deadline');

let scholarships = [];

async function fetchScholarships() {
  try {
    const response = await fetch('scholarships.json');
    scholarships = await response.json();
    displayScholarships();
  } catch (err) {
    scholarshipList.innerHTML = '<p class="text-red-500">Failed to load data.</p>';
  }
}

function displayScholarships() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const educationLevel = educationFilter.value;
  const deadline = deadlineFilter.value;

  const filtered = scholarships.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm) || s.description.toLowerCase().includes(searchTerm);
    const matchesCategory = category ? s.category === category : true;
    const matchesEducation = educationLevel ? s.education_level === educationLevel : true;
    const matchesDeadline = deadline ? new Date(s.deadline) >= new Date(deadline) : true;
    return matchesSearch && matchesCategory && matchesEducation && matchesDeadline;
  });

  scholarshipList.innerHTML = filtered.length ? '' : '<p>No scholarships found.</p>';

  filtered.forEach(s => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 mb-4 rounded shadow';
    card.innerHTML = `
      <h2 class="text-xl font-semibold mb-2">${s.name}</h2>
      <p class="mb-2">${s.description}</p>
      <p class="mb-2">Deadline: ${s.deadline} (<span class="text-red-600" id="countdown-${s.name}"></span>)</p>
      <a href="${s.apply_link}" target="_blank" class="bg-blue-600 text-white px-3 py-1 rounded">Apply Now</a>
    `;
    scholarshipList.appendChild(card);

    // Initialize countdown
    initializeCountdown(s.name, s.deadline);
  });
}

function initializeCountdown(name, deadline) {
  const countdownEl = document.getElementById(`countdown-${name}`);
  const endTime = new Date(deadline).getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = endTime - now;
    if (diff <= 0) {
      countdownEl.textContent = 'Closed';
      clearInterval(interval);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    countdownEl.textContent = `${days}d ${hours}h ${minutes}m`;
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 60000);
}

// Event listeners
searchInput.addEventListener('input', displayScholarships);
categoryFilter.addEventListener('change', displayScholarships);
educationFilter.addEventListener('change', displayScholarships);
deadlineFilter.addEventListener('change', displayScholarships);

fetchScholarships();

// AI Assistant toggle
const aiButton = document.getElementById('ai-toggle');
const aiChat = document.getElementById('ai-chat');
const closeAi = document.getElementById('close-ai');
const aiMessages = document.getElementById('ai-messages');
const aiInput = document.getElementById('ai-input');
const sendAi = document.getElementById('send-ai');

aiButton.onclick = () => {
  aiChat.classList.toggle('hidden');
};

closeAi.onclick = () => {
  aiChat.classList.add('hidden');
};

sendAi.onclick = () => {
  const message = aiInput.value.trim();
  if (!message) return;
  addMessage('You', message);
  aiInput.value = '';
  respondToAI(message);
};

function addMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  aiMessages.appendChild(msgDiv);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function respondToAI(message) {
  // Simple placeholder response
  const response = "I'm here to help! Please specify your query.";
  setTimeout(() => addMessage('Allen AI', response), 1000);
}
