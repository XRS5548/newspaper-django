document.addEventListener("DOMContentLoaded", () => {
  // ✅ Sidebar Toggle for Mobile
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "menuToggle";
  toggleBtn.innerHTML = "☰";
  toggleBtn.style.cssText = `
    position: fixed;
    top: 15px;
    left: 15px;
    font-size: 26px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 6px 10px;
    cursor: pointer;
    z-index: 1001;
    display: none;
  `;
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("show") &&
      !sidebar.contains(e.target) &&
      e.target !== toggleBtn
    ) {
      sidebar.classList.remove("show");
    }
  });

  function handleResize() {
    if (window.innerWidth <= 768) {
      toggleBtn.style.display = "block";
      sidebar.classList.remove("show");
    } else {
      toggleBtn.style.display = "none";
      sidebar.classList.remove("show");
    }
  }
  handleResize();
  window.addEventListener("resize", handleResize);

  // ✅ Dropdown
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      this.parentElement.classList.toggle("active");
      document.querySelectorAll(".dropdown").forEach((drop) => {
        if (drop !== this.parentElement) drop.classList.remove("active");
      });
    });
  });

  // ✅ Nested Dropdown
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

  // ✅ Charts
  const ctx1 = document.getElementById("paymentChart");
  const ctx2 = document.getElementById("dueChart");
  const ctx3 = document.getElementById("growthChart");

  const paymentChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Payments (₹)",
          data: [12000, 15000, 13000, 17000, 16000, 19000],
          backgroundColor: "#0077ff",
        },
      ],
    },
    options: { animation: { duration: 1500 }, plugins: { legend: { display: true } } },
  });

  const dueChart = new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["Paid", "Due"],
      datasets: [{ data: [75, 25], backgroundColor: ["#00c853", "#ff5252"] }],
    },
    options: { cutout: "70%", animation: { animateRotate: true } },
  });

  const growthChart = new Chart(ctx3, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue (₹)",
          data: [5000, 8000, 7000, 11000, 13000, 16000],
          borderColor: "#0077ff",
          backgroundColor: "rgba(0,119,255,0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: { animation: { duration: 2000 }, plugins: { legend: { display: true } } },
  });

  // ✅ Language Toggle (Hindi ↔ English)
  const translateBtn = document.createElement("button");
  translateBtn.innerHTML = "🌐 Hindi / English";
  translateBtn.style.cssText = `
    position: fixed;
    top: 15px;
    right: 15px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 14px;
    cursor: pointer;
    z-index: 1001;
  `;
  document.body.appendChild(translateBtn);

  let currentLang = localStorage.getItem("lang") || "en";

  const translations = {
    "Dashboard Overview": "डैशबोर्ड अवलोकन",
    "Available Balance": "उपलब्ध शेष राशि",
    "Monthly Payment Overview": "मासिक भुगतान अवलोकन",
    "Expenses & Dues": "खर्च और बकाया",
    "Revenue Growth": "राजस्व वृद्धि",
    "Admin Panel": "प्रशासन पैनल",
    "User Dashboard": "उपयोगकर्ता डैशबोर्ड",
    "Calendar": "कैलेंडर",
    "User Profile": "उपयोगकर्ता प्रोफ़ाइल",
    "Monthly Payment": "मासिक भुगतान",
    "Total Due Payment": "कुल बकाया भुगतान",
    "Total Payment": "कुल भुगतान",
    "Books ▾": "पुस्तकें ▾",
    "NewsPapers ▾": "समाचार पत्र ▾",
    "Paid": "भुगतान किया गया",
    "Due": "बकाया",
    "Payments (₹)": "भुगतान (₹)",
    "Revenue (₹)": "राजस्व (₹)",
  };

  function translatePage(lang) {
    document.querySelectorAll("h1,h2,h3,p,a,button,div,span").forEach((el) => {
      // ✅ Skip chart containers and canvases
      if (
        el.tagName.toLowerCase() === "canvas" ||
        el.querySelector("canvas") ||
        el.classList.contains("chart-container") ||
        el.id.includes("Chart")
      ) {
        return;
      }

      const text = el.textContent.trim();
      if (!text) return;

      if (lang === "hi" && translations[text]) {
        el.dataset.original = text;
        el.textContent = translations[text];
      } else if (lang === "en") {
        const original = el.dataset.original;
        if (original && translations[original] === text) el.textContent = original;
        else {
          const engKey = Object.keys(translations).find(
            (k) => translations[k] === text
          );
          if (engKey) el.textContent = engKey;
        }
      }
    });

    // ✅ Update Chart Labels only (chart stays intact)
    paymentChart.data.datasets[0].label =
      lang === "hi" ? translations["Payments (₹)"] : "Payments (₹)";
    dueChart.data.labels =
      lang === "hi" ? [translations["Paid"], translations["Due"]] : ["Paid", "Due"];
    growthChart.data.datasets[0].label =
      lang === "hi" ? translations["Revenue (₹)"] : "Revenue (₹)";

    paymentChart.update();
    dueChart.update();
    growthChart.update();
  }

  // Apply saved language
  translatePage(currentLang);

  translateBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    localStorage.setItem("lang", currentLang);
    translatePage(currentLang);
  });
});
function contactOwner() {
  // 🟢 WhatsApp direct chat (change number as needed)
  const phoneNumber = "917733905848"; // without + sign
  const message = encodeURIComponent("Hello! I’d like to contact you regarding the franchise dashboard.");
  
  // Open WhatsApp (mobile or web)
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}
