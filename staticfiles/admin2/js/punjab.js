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

      // Close others
      allContents.forEach((el) => {
        if (el !== content) el.classList.remove("show");
      });

      // Toggle this one
      content.classList.toggle("show");

      // Arrow animation
      this.innerHTML = content.classList.contains("show")
        ? this.innerHTML.replace("▸", "▼")
        : this.innerHTML.replace("▼", "▸");
    });
  });

  // 🕒 Date Display
  const dateEl = document.getElementById("todayDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("hi-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // 📊 Chart.js
const chartEl = document.getElementById("paymentChart");
if (chartEl) {
  const ctx = chartEl.getContext("2d");

  // ✅ Fix chart height directly in JS
  chartEl.style.height = "380px"; // fixed height
  chartEl.style.maxHeight = "400px";

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून"],
      datasets: [
        {
          label: "कुल भुगतान (₹)",
          data: [2200, 2800, 3100, 2600, 3200, 2900],
          backgroundColor: "rgba(54,162,235,0.6)",
          borderColor: "#007bff",
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true, // ✅ prevent stretching
      animation: {
        duration: 0, // ✅ stop reanimation
      },
      resizeDelay: 300, // ✅ prevent jitter during window resize
      scales: {
        y: { beginAtZero: true },
      },
      plugins: {
        legend: {
          labels: { font: { size: 14 } },
        },
      },
    },
  });
}

  // 📱 MOBILE SIDEBAR TOGGLE
  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "mobileToggle";
    toggleBtn.innerHTML = "☰";
    Object.assign(toggleBtn.style, {
      position: "fixed",
      top: "12px",
      left: "15px",
      fontSize: "26px",
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "4px 12px",
      zIndex: "10000",
      cursor: "pointer",
      display: "none",
    });
    document.body.appendChild(toggleBtn);

    // ✅ Show/Hide toggle in mobile
    function handleResponsiveToggle() {
      if (window.innerWidth <= 768) {
        toggleBtn.style.display = "block";
        sidebar.classList.add("mobile-mode");
      } else {
        toggleBtn.style.display = "none";
        sidebar.classList.remove("mobile-mode", "sidebar-show");
      }
    }

    handleResponsiveToggle();
    window.addEventListener("resize", handleResponsiveToggle);

    // Sidebar toggle click
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("sidebar-show");
    });

    // Click outside closes sidebar
    document.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("sidebar-show") &&
        !sidebar.contains(e.target) &&
        e.target !== toggleBtn
      ) {
        sidebar.classList.remove("sidebar-show");
      }
    });
  }
});

// 🌐 Google Translate Integration
function loadGoogleTranslate() {
  const script = document.createElement("script");
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(script);
}

function googleTranslateElementInit() {
  const div = document.createElement("div");
  div.id = "google_translate_element";
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

document.addEventListener("DOMContentLoaded", loadGoogleTranslate);

