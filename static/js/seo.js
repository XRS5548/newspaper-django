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

// 🌟 Dropdown Toggle on Mobile
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      const dropdownMenu = toggle.nextElementSibling;
      dropdownMenu.classList.toggle("show");
    }
  });
});

// 🌟 Developer Popup
const devPopup = document.getElementById("devPopup");
const contactDevLink = document.getElementById("contactDevLink");
const closePopup = document.getElementById("closePopup");

contactDevLink.addEventListener("click", (e) => {
  e.preventDefault();
  devPopup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  devPopup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === devPopup) devPopup.style.display = "none";
});
