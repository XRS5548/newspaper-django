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
// 🌟 Mobile Franchise Dropdown Fix
const franchiseDropdown = document.querySelector('.dropdown > a[href="#"]');

if (franchiseDropdown) {
  franchiseDropdown.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      const parent = franchiseDropdown.parentElement;
      const menu = parent.querySelector('.dropdown-menu');

      // Toggle show class
      parent.classList.toggle('show');
      menu.classList.toggle('show');
    }
  });
}

// 🌟 Form Submission Handler
const franchiseForm = document.getElementById("franchiseForm");

if (franchiseForm) {
  franchiseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Franchise application submitted successfully!");
    franchiseForm.reset(); // Optional: clears form fields after submit
  });
}

   document.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const faqItem = btn.parentElement;
        const isActive = faqItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        if (!isActive) faqItem.classList.add('active');
      });
    });