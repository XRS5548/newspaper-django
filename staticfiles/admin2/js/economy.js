document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
     🧭 SIDEBAR + TOGGLE SYSTEM
  ============================ */
  const sidebar =
    document.getElementById("sidebar") ||
    document.querySelector(".sidebar") ||
    document.querySelector("nav");

  if (!sidebar) return;

  let toggleBtn = document.getElementById("toggleBtn");

  // 🔹 Auto-create toggle if missing (Main Page Toggle)
  if (!toggleBtn) {
    toggleBtn = document.createElement("button");
    toggleBtn.id = "toggleBtn";
    toggleBtn.textContent = "☰";
    toggleBtn.setAttribute(
      "style",
      `
      position: fixed;
      top: 12px;
      left: 15px;
      background: #fff;
      color: #fff;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 22px;
      z-index: 1100;
      cursor: pointer;
      display: none;
    `
    );
    document.body.appendChild(toggleBtn);
  }

  // 🔹 Create internal toggle inside sidebar
  let innerToggle = sidebar.querySelector(".inner-toggle");
  if (!innerToggle) {
    innerToggle = document.createElement("button");
    innerToggle.className = "inner-toggle";
    innerToggle.textContent = "☰";
    innerToggle.setAttribute(
      "style",
      `
      position: absolute;
      top: 10px;
      right: 15px;
      background: #fff;
      color: black;
      border: none;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 20px;
      cursor: pointer;
      display: none;
    `
    );
    sidebar.prepend(innerToggle);
  }

  // 🔹 Toggle sidebar open/close
  function toggleSidebar() {
    const isActive = sidebar.classList.toggle("active");
    document.body.classList.toggle("sidebar-open", isActive);
    toggleBtn.textContent = isActive ? "✖" : "☰";
    innerToggle.style.display = isActive && window.innerWidth <= 768 ? "block" : "none";
  }

  toggleBtn.addEventListener("click", toggleSidebar);
  innerToggle.addEventListener("click", toggleSidebar);

  // 🔹 Show toggles only on mobile
  function handleResponsiveToggle() {
    if (window.innerWidth <= 768) {
      toggleBtn.style.display = "block";
      if (sidebar.classList.contains("active")) {
        innerToggle.style.display = "block";
      }
    } else {
      toggleBtn.style.display = "none";
      innerToggle.style.display = "none";
      sidebar.classList.remove("active");
      document.body.classList.remove("sidebar-open");
      toggleBtn.textContent = "☰";
    }
  }

  handleResponsiveToggle();
  window.addEventListener("resize", handleResponsiveToggle);
});


/* ===========================
   🔽 MAIN & NESTED DROPDOWNS
============================ */
document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    this.parentElement.classList.toggle("active");
    document.querySelectorAll(".dropdown").forEach((drop) => {
      if (drop !== this.parentElement) drop.classList.remove("active");
    });
  });
});

document.querySelectorAll(".nested-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    const content = this.nextElementSibling;
    const allContents = document.querySelectorAll(".nested-content");
    allContents.forEach((el) => {
      if (el !== content) el.classList.remove("show");
    });
    content.classList.toggle("show");
    this.innerHTML = content.classList.contains("show")
      ? this.innerHTML.replace("▸", "▼")
      : this.innerHTML.replace("▼", "▸");
  });
});

/* ===========================
   🕒 DATE DISPLAY
============================ */
const dateEl = document.getElementById("todayDate");
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ===========================
   📊 STATIC STATS
============================ */
const stats = [
  { id: "subscribers", value: 520 },
  { id: "delivered", value: 495 },
  { id: "pending", value: 25 },
  { id: "payment", value: 74500 },
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

/* ===========================
   📈 CHART.JS (Gradient Chart)
============================ */
const chartCanvas = document.getElementById("growthChart");
if (chartCanvas) {
  const ctx = chartCanvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(0, 150, 136, 0.5)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue (₹)",
          data: [9000, 9500, 9800, 10200, 10800, 11500],
          backgroundColor: gradient,
          borderColor: "#009688",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Subscribers",
          data: [340, 360, 390, 420, 460, 520],
          borderColor: "#fbc02d",
          backgroundColor: "rgba(251, 192, 45, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: "bottom" },
      },
      scales: { y: { beginAtZero: true } },
    },
  });
}

/* ===========================
   💹 LIVE TICKER
============================ */
const sensex = document.getElementById("sensex");
const nifty = document.getElementById("nifty");
const usd = document.getElementById("usd");
if (sensex && nifty && usd) {
  sensex.textContent = "73,500";
  nifty.textContent = "22,200";
  usd.textContent = "₹83.10";
}

/* ===========================
   🌐 GOOGLE TRANSLATE WIDGET
============================ */
function loadGoogleTranslate() {
  const script = document.createElement("script");
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(script);
}

window.googleTranslateElementInit = function () {
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
};

loadGoogleTranslate();