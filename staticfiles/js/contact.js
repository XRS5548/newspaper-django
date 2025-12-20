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


// 🌟 DROPDOWN TOGGLE ON MOBILE
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
dropdownToggles.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdownMenu = toggle.nextElementSibling;
      dropdownMenu.classList.toggle("show");
    }
  });
});

// 🌟 DEVELOPER CONTACT POPUP
const contactLink = document.getElementById("contactDevLink");
const popup = document.getElementById("devPopup");
const closePopup = document.getElementById("closePopup");

// Open popup
if (contactLink && popup) {
  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });
}

// Close popup when clicking the close button
if (closePopup) {
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

// Close popup when clicking outside the popup box
window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

// 🌟 OPTIONAL: Smooth Scroll (for better UX)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1 && document.querySelector(targetId)) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
