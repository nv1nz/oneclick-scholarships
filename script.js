function handleAIInput(query) {
  const scholarships = window.allScholarships || [];
  const filters = {
    academicLevel: null,
    type: null,
    gender: null,
    income: null,
    state: null,
    deadline: null,
  };

  const q = query.toLowerCase();

  // Match academicLevel
  if (q.includes("class 10")) filters.academicLevel = "Class 10";
  else if (q.includes("class 12")) filters.academicLevel = "Class 12";
  else if (q.includes("undergraduate") || q.includes("bachelor")) filters.academicLevel = "Undergraduate";
  else if (q.includes("postgraduate") || q.includes("pg") || q.includes("master")) filters.academicLevel = "Postgraduate";

  // Match type
  if (q.includes("government")) filters.type = "Government";
  else if (q.includes("private")) filters.type = "Private";
  else if (q.includes("merit")) filters.type = "Merit-based";
  else if (q.includes("need") || q.includes("financial")) filters.type = "Need-based";

  // Match gender
  if (q.includes("female") || q.includes("girl") || q.includes("women")) filters.gender = "Females Only";
  else if (q.includes("male") || q.includes("boy") || q.includes("man")) filters.gender = "Males Only";
  else if (q.includes("all") || q.includes("any")) filters.gender = "All";

  // Match income
  if (q.includes("below 1") || q.includes("under 1")) filters.income = "Below ₹1L";
  else if (q.includes("below 2") || q.includes("under 2")) filters.income = "Below ₹2L";
  else if (q.includes("below 5") || q.includes("under 5")) filters.income = "₹1L - ₹5L";
  else if (q.includes("below 8") || q.includes("under 8")) filters.income = "Below ₹8L";
  else if (q.includes("above 8") || q.includes("more than 8")) filters.income = "Above ₹8L";

  // Match state
  const allStates = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Gujarat", "Bihar", "West Bengal", "Rajasthan", "Punjab"];
  for (const state of allStates) {
    if (q.includes(state.toLowerCase())) {
      filters.state = state;
      break;
    }
  }

  // Filter the scholarships based on extracted filters
  const filtered = scholarships.filter(sch => {
    return (!filters.academicLevel || sch.academicLevel === filters.academicLevel) &&
           (!filters.type || sch.type === filters.type) &&
           (!filters.gender || sch.gender === filters.gender) &&
           (!filters.income || sch.income === filters.income) &&
           (!filters.state || sch.state === filters.state);
  });

  displayScholarships(filtered);
}
