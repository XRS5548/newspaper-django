document.addEventListener("DOMContentLoaded", () => {
  // ✅ Safe translator init placeholder
  function initTranslator() {}

  // ✅ Main dropdown toggle
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      this.parentElement.classList.toggle("active");
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
      allContents.forEach((el) => {
        if (el !== content) el.classList.remove("show");
      });
      content.classList.toggle("show");
      if (content.classList.contains("show")) {
        this.innerHTML = this.innerHTML.replace("▸", "▼");
      } else {
        this.innerHTML = this.innerHTML.replace("▼", "▸");
      }
    });
  });

  // 🪄 Translator auto-run
  initTranslator();

  // 📱 MOBILE SIDEBAR TOGGLE BUTTON
  const sidebar = document.querySelector(".sidebar");

  if (!sidebar) {
    console.error("❌ No .sidebar element found in HTML!");
    return;
  }

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
    zIndex: "99999",
    cursor: "pointer",
    display: "none", // hidden by default
  });
  document.body.appendChild(toggleBtn);

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

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("sidebar-show");
  });

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
});





// 💰 Payments + Chart
document.addEventListener("DOMContentLoaded", () => {
  const payments = [
    { month: "जनवरी", amount: 5000, status: "Paid", date: "05-01-2025" },
    { month: "फ़रवरी", amount: 5500, status: "Paid", date: "05-02-2025" },
    { month: "मार्च", amount: 5200, status: "Paid", date: "05-03-2025" },
    { month: "अप्रैल", amount: 6000, status: "Paid", date: "05-04-2025" },
    { month: "मई", amount: 4800, status: "Pending", date: "-" },
    { month: "जून", amount: 5300, status: "Paid", date: "05-06-2025" },
    { month: "जुलाई", amount: 5500, status: "Paid", date: "05-07-2025" },
    { month: "अगस्त", amount: 4600, status: "Pending", date: "-" },
    { month: "सितंबर", amount: 5600, status: "Paid", date: "05-09-2025" },
  ];

  const table = document.getElementById("paymentTable");
  if (table) {
    payments.forEach((p) => {
      const row = `<tr>
        <td>${p.month}</td>
        <td>₹${p.amount}</td>
        <td>${p.status}</td>
        <td>${p.date}</td>
      </tr>`;
      table.innerHTML += row;
    });
  }

  const chartCanvas = document.getElementById("paymentChart");
  if (chartCanvas) {
    const ctx = chartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: payments.map((p) => p.month),
        datasets: [
          {
            label: "Monthly Payment (₹)",
            data: payments.map((p) => p.amount),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
  }
});
 document.addEventListener("DOMContentLoaded", function () {
      // 🌐 Create Toggle Button
      const langBtn = document.createElement("button");
      langBtn.innerHTML = "🌐 Hindi / English";
      Object.assign(langBtn.style, {
        position: "fixed",
        top: "15px",
        right: "15px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "6px 10px",
        fontSize: "14px",
        cursor: "pointer",
        zIndex: "10001",
      });
      document.body.appendChild(langBtn);

      // 🗣️ Dictionary
      const translations = {
        "छोटा राजस्थान पत्रिका": "Chhota Rajasthan Patrika",
        "राजस्थान पत्रिका": "Rajasthan Patrika",
        "दैनिक भास्कर": "Dainik Bhaskar",
        "छोटा दैनिक भास्कर": "Chhota Dainik Bhaskar",
        "पंजाब केसरी": "Punjab Kesari",
        "द हिंदू": "The Hindu",
        "इंडियन एक्सप्रेस": "Indian Express",
        "हिंदुस्तान टाइम्स": "Hindustan Times",
        "इकॉनॉमिक टाइम्स": "Economic Times",
        "दैनिक नवज्योति": "Dainik Navjyoti",
        "मासिक भुगतान विवरण": "Monthly Payment Details",
        "माह": "Month",
        "राशि": "Amount",
        "स्थिति": "Status",
        "भुगतान तिथि": "Payment Date",
        "कुल भुगतान": "Total Paid",
        "लंबित": "Pending",
        "भुगतान किया गया": "Paid",
        "देय": "Due",
        "भुगतान डैशबोर्ड": "Payment Dashboard"
      };

      // 🔁 Reverse dictionary
      const reverse = Object.fromEntries(Object.entries(translations).map(([hi, en]) => [en, hi]));

      let currentLang = localStorage.getItem("lang") || "hi";

      function translateText(text, lang) {
        const dict = lang === "hi" ? reverse : translations;
        for (const [from, to] of Object.entries(dict)) {
          const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
          text = text.replace(regex, to);
        }
        return text;
      }

      function translatePage(lang) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          if (node.nodeValue.trim().length > 0) {
            node.nodeValue = translateText(node.nodeValue, lang);
          }
        }
      }

      // Apply saved language
      translatePage(currentLang);

      // 🌐 Button click
      langBtn.addEventListener("click", () => {
        currentLang = currentLang === "hi" ? "en" : "hi";
        localStorage.setItem("lang", currentLang);
        translatePage(currentLang);
      });
    });

