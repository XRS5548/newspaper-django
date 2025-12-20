// 🌟 Mobile Sidebar Toggle
const menuToggle = document.getElementById("menuToggle");
const navList = document.querySelector(".nav-list");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");
  // Change toggle icon (☰ ↔ ✖)
  if (navList.classList.contains("active")) {
    menuToggle.innerHTML = "&times;";
  } else {
    menuToggle.innerHTML = "&#9776;";
  }
});

// =====================
// 🗺️ State → District Data
// =====================
const stateDistricts = {
  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Ajmer",
    "Kota",
    "Kotputli-Behror",

  ],
  "Uttar Pradesh": ["Lucknow", "Varanasi", "Kanpur", "Noida", "Agra"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Hisar", "Karnal"],
  Delhi: ["New Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi"]
};

// =====================
// 🏢 Franchise Data
// =====================
const franchises = {
  Rajasthan: [
    "Raj News - Jaipur",
    "Desert Times - Jodhpur",
    "Udaipur Today - Udaipur",
    "Ajmer Express - Ajmer",
    "Kota Bulletin - Kota",
    "Kotputli-Behror Live News - Kotputli-Behror"
    
  ],
  "Uttar Pradesh": ["Morning India - Lucknow", "National News - Varanasi"],
  Haryana: ["Haryana Herald - Gurugram", "Daily Haryana - Panipat"],
  Delhi: ["The Capital Post - Delhi", "Metro Express - New Delhi"]
};

// =====================
// 📋 Dropdown & Search Logic
// =====================
const stateSelect = document.getElementById("state");
const districtSelect = document.getElementById("district");
const districtBox = document.getElementById("districtBox");
const resultContainer = document.getElementById("resultContainer");

stateSelect.addEventListener("change", function () {
  const selectedState = this.value;
  districtSelect.innerHTML = '<option value="">-- Choose District --</option>';

  if (stateDistricts[selectedState]) {
    stateDistricts[selectedState].forEach((district) => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
    districtBox.style.display = "block";
  } else {
    districtBox.style.display = "none";
  }
});

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const state = stateSelect.value;
  const district = districtSelect.value;

  if (!state || !district) {
    resultContainer.innerHTML = `<p>⚠️ Please select both state and district.</p>`;
    return;
  }

  if (franchises[state]) {
    // 🎯 Filter franchise based on selected district name
    const matchedFranchise = franchises[state].filter((f) =>
      f.toLowerCase().includes(district.toLowerCase())
    );

    if (matchedFranchise.length > 0) {
      resultContainer.innerHTML = `
        <h3>Franchises in ${district}, ${state}</h3>
        <ul>${matchedFranchise.map((f) => `<li>📜 ${f}</li>`).join("")}</ul>
      `;
    } else {
      resultContainer.innerHTML = `
        <p>ℹ️ No specific franchise found for ${district}. Showing all from ${state}:</p>
        <ul>${franchises[state].map((f) => `<li>📜 ${f}</li>`).join("")}</ul>
      `;
    }
  } else {
    resultContainer.innerHTML = `<p>❌ No franchises found for this region.</p>`;
  }
});