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

  // 🕒 Show Current Date
  const dateEl = document.getElementById("todayDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // 📈 Chart.js - Payment Chart
  const chartEl = document.getElementById("paymentChart");
  if (chartEl) {
    const ctx = chartEl.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Total Payment (₹)",
            data: [5200, 6000, 5800, 6200, 6600, 6500],
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  // 📱 MOBILE SIDEBAR TOGGLE (with slide effect)
  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    // Create toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "mobileToggle";
    toggleBtn.innerHTML = "☰";

    Object.assign(toggleBtn.style, {
      position: "fixed",
      top: "12px",
      left: "15px",
      fontSize: "24px",
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "4px 10px",
      zIndex: "10000",
      cursor: "pointer",
      display: "none",
    });

    document.body.appendChild(toggleBtn);

    // Create overlay for background dim
    const overlay = document.createElement("div");
    overlay.id = "sidebarOverlay";
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      zIndex: "9998",
      display: "none",
    });
    document.body.appendChild(overlay);

    // Responsive show/hide toggle button
    function handleResponsiveToggle() {
      if (window.innerWidth <= 768) {
        toggleBtn.style.display = "block";
        sidebar.classList.add("mobile-mode");
      } else {
        toggleBtn.style.display = "none";
        sidebar.classList.remove("mobile-mode", "sidebar-show");
        overlay.style.display = "none";
      }
    }

    handleResponsiveToggle();
    window.addEventListener("resize", handleResponsiveToggle);

    // Toggle sidebar on button click
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("sidebar-show");
      overlay.style.display = sidebar.classList.contains("sidebar-show")
        ? "block"
        : "none";
    });

    // Close sidebar when clicking outside
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("sidebar-show");
      overlay.style.display = "none";
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


