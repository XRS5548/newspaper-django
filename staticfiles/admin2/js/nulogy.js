document.addEventListener("DOMContentLoaded", () => {
  // ✅ Main dropdown toggle
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      this.parentElement.classList.toggle("active");

      // Close other dropdowns
      document.querySelectorAll(".dropdown").forEach((drop) => {
        if (drop !== this.parentElement) drop.classList.remove("active");
      });
    });
  });

  // ✅ Nested dropdown toggle
  document.querySelectorAll(".nested-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();

      const content = this.nextElementSibling;
      const allContents = document.querySelectorAll(".nested-content");

      // Close all other nested dropdowns
      allContents.forEach((el) => {
        if (el !== content) el.classList.remove("show");
      });

      // Toggle current one
      content.classList.toggle("show");

      // Rotate arrow ▸ to ▼ when open
      if (content.classList.contains("show")) {
        this.innerHTML = this.innerHTML.replace("▸", "▼");
      } else {
        this.innerHTML = this.innerHTML.replace("▼", "▸");
      }
    });
  });

  // ✅ Nested dropdown toggle (this fixes your issue)
  document.querySelectorAll(".nested-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();

      const content = this.nextElementSibling;
      const allContents = document.querySelectorAll(".nested-content");

      // Close all other nested dropdowns
      allContents.forEach((el) => {
        if (el !== content) el.classList.remove("show");
      });

      // Toggle current one
      content.classList.toggle("show");

      // Rotate arrow ▸ to ▼ when open
      if (content.classList.contains("show")) {
        this.innerHTML = this.innerHTML.replace("▸", "▼");
      } else {
        this.innerHTML = this.innerHTML.replace("▼", "▸");
      }
    });
  });
});
// =============================
// 🧾 Payment Data (Sample Data)
// =============================
const paymentData = [
  { month: "January", amount: 5000, status: "Paid", date: "05 Jan 2025" },
  { month: "February", amount: 5500, status: "Paid", date: "07 Feb 2025" },
  { month: "March", amount: 6000, status: "Paid", date: "06 Mar 2025" },
  { month: "April", amount: 4000, status: "Pending", date: "-" },
  { month: "May", amount: 5800, status: "Paid", date: "08 May 2025" },
  { month: "June", amount: 0, status: "Due Soon", date: "-" },
  { month: "July", amount: 5200, status: "Paid", date: "09 Jul 2025" },
  { month: "August", amount: 5300, status: "Paid", date: "05 Aug 2025" },
  { month: "September", amount: 5500, status: "Paid", date: "06 Sep 2025" },
  { month: "October", amount: 4700, status: "Pending", date: "-" }
];

// ====================================
// 📅 Render Table Data Dynamically
// ====================================
const tableBody = document.getElementById("paymentTable");

if (tableBody) {
  tableBody.innerHTML = paymentData.map(payment => `
    <tr>
      <td>${payment.month}</td>
      <td>₹${payment.amount.toLocaleString()}</td>
      <td class="${payment.status.toLowerCase()}">${payment.status}</td>
      <td>${payment.date}</td>
    </tr>
  `).join('');
}

// =============================
// 📊 Create Payment Trend Chart
// =============================
const ctx = document.getElementById("paymentChart");

if (ctx) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: paymentData.map(p => p.month),
      datasets: [{
        label: "Monthly Payment (₹)",
        data: paymentData.map(p => p.amount),
        fill: true,
        borderColor: "#1a1a2e",
        backgroundColor: "rgba(100, 181, 246, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#0077b6",
        pointRadius: 5,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: "top" },
        title: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#333" },
          grid: { color: "rgba(0,0,0,0.05)" }
        },
        x: {
          ticks: { color: "#333" },
          grid: { color: "rgba(0,0,0,0.05)" }
        }
      }
    }
  });
}

// =============================
// 🎨 Table Row Styling
// =============================
document.querySelectorAll(".paid").forEach(el => {
  el.style.color = "#2b9348";
  el.style.fontWeight = "bold";
});
document.querySelectorAll(".pending").forEach(el => {
  el.style.color = "#ffb703";
  el.style.fontWeight = "bold";
});
document.querySelectorAll(".due").forEach(el => {
  el.style.color = "#d00000";
  el.style.fontWeight = "bold";
});

// 🌐 Google Translate-like Multi-Language Integration (Pure JS)
// Works on any page — NO HTML editing needed

function loadGoogleTranslate() {
  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(script);
}

function googleTranslateElementInit() {
  // Create Google Translate dropdown container dynamically
  const div = document.createElement("div");
  div.id = "google_translate_element";

  // Apply fixed styling (like Google Translate floating widget)
  Object.assign(div.style, {
    position: "fixed",
    top: "10px",
    right: "20px",
    zIndex: "99999",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "14px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  });

  document.body.appendChild(div);

  // Initialize Google Translate widget
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages:
        "en,hi,es,fr,de,gu,bn,ta,te,ml,mr,ur,pa,zh-CN,ja,ko,ar,ru,it,pt,tr",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element"
  );
}

// 🚀 Run after page load
document.addEventListener("DOMContentLoaded", loadGoogleTranslate);

// 📱 MOBILE SIDEBAR TOGGLE (no HTML editing required)
document.addEventListener("DOMContentLoaded", () => {
  // Create toggle button dynamically
  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("mobile-toggle");
  toggleBtn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  document.body.appendChild(toggleBtn);

  const sidebar = document.querySelector(".sidebar");

  // Only work on mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  toggleBtn.addEventListener("click", () => {
    if (isMobile()) {
      sidebar.classList.toggle("active");
    }
  });

  // Optional: Hide sidebar when clicking outside it
  document.addEventListener("click", (e) => {
    if (isMobile() && sidebar.classList.contains("active")) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove("active");
      }
    }
  });

  // Hide sidebar if resized back to desktop
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      sidebar.classList.remove("active");
    }
  });
});
