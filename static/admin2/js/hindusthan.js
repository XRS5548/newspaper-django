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

  // 🕒 Date Display
  const dateEl = document.getElementById("todayDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // 🎯 Fixed Stats
  const stats = [
    { id: "subscribers", value: 420 },
    { id: "delivered", value: 390 },
    { id: "pending", value: 30 },
    { id: "payment", value: 56200 },
  ];

  stats.forEach((stat) => {
    const el = document.getElementById(stat.id);
    if (el) {
      el.textContent =
        stat.id === "payment"
          ? "₹" + stat.value.toLocaleString()
          : stat.value;
    }
  });

  // 📈 Chart.js Mixed Chart
  const chartEl = document.getElementById("performanceChart");
  if (chartEl) {
    const ctx = chartEl.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Revenue (₹)",
            data: [8500, 8800, 9000, 9400, 9700, 10200],
            backgroundColor: "rgba(0, 123, 255, 0.6)",
            borderRadius: 8,
          },
          {
            label: "Subscribers",
            data: [300, 320, 340, 360, 380, 420],
            type: "line",
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: "bottom" } },
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  // 📱 MOBILE SIDEBAR TOGGLE
  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    // create toggle button dynamically
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
      display: "none", // hidden by default
    });

    document.body.appendChild(toggleBtn);

    // responsive behavior
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

    // click toggle
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("sidebar-show");
    });

    // close sidebar when clicking outside
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
