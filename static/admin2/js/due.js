document.addEventListener("DOMContentLoaded", () => {
  // ✅ Sidebar main dropdown toggle
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

  // 💸 Example balance update
  const dueEl = document.getElementById("dueAmount");
  if (dueEl) dueEl.innerText = "₹" + (25000).toLocaleString();

  // 📱 Mobile Sidebar Toggle
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = "☰";
    Object.assign(toggleBtn.style, {
      position: "fixed",
      top: "15px",
      left: "15px",
      background: "#0077ff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 14px",
      fontSize: "20px",
      zIndex: "10000",
      cursor: "pointer",
      display: "none",
    });
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar-show");
    });

    function handleResize() {
      if (window.innerWidth <= 768) {
        toggleBtn.style.display = "block";
        sidebar.classList.add("mobile-mode");
      } else {
        toggleBtn.style.display = "none";
        sidebar.classList.remove("mobile-mode", "sidebar-show");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
  }

  // 🌐 Custom Hindi/English Toggle Button
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

  // 🗣 Dictionary: English → Hindi
 // 🗣 Dictionary: English → Hindi
const translations = {
  // Sidebar & Dashboard
  "Admin Panel": "प्रशासन पैनल",
  "User Dashboard": "उपयोगकर्ता डैशबोर्ड",
  "Calendar": "कैलेंडर",
  "User Profile": "उपयोगकर्ता प्रोफ़ाइल",
  "Monthly Payment": "मासिक भुगतान",
  "Total Due Payment": "कुल बकाया भुगतान",
  "Total Payment": "कुल भुगतान",
  "Books ▾": "पुस्तकें ▾",
    "NewsPapers ▾": "समाचार पत्र ▾",
  "Settings": "सेटिंग्स",

  // Dashboard Headings
  "Total Due Payment Dashboard": "कुल बकाया भुगतान डैशबोर्ड",
  "Monthly Payment Dashboard": "मासिक भुगतान डैशबोर्ड",
  "Admin Total Due Payments": "प्रशासन कुल बकाया भुगतान",
  "Total Due Balance": "कुल बकाया राशि",
  "Total Balance": "कुल शेष राशि",
  "Due Amount": "बकाया राशि",

  // Table / Labels
  "Month": "महीना",
  "Amount (₹)": "राशि (₹)",
  "Status": "स्थिति",
  "Payment Date": "भुगतान तिथि",
  "Due Date": "देय तिथि",
  "Paid": "भुगतान किया गया",
  "Pending": "लंबित",
  "Due Soon": "जल्द देय",
  "Overdue": "अवधि समाप्त",
  "Unpaid": "अभुगतानित",
  "Paid Amount": "भुगतान की गई राशि",
  "Due Amount": "बकाया राशि",
  "Due Amount (₹)": "बकाया राशि (₹)",   // ✅ Corrected

  // Months
  "January": "जनवरी",
  "February": "फरवरी",
  "March": "मार्च",
  "April": "अप्रैल",
  "May": "मई",
  "June": "जून",
  "July": "जुलाई",
  "August": "अगस्त",
  "September": "सितंबर",
  "October": "अक्टूबर",
  "November": "नवंबर",
  "December": "दिसंबर",

  // Common Buttons & Text
  "Dashboard": "डैशबोर्ड",
  "Profile": "प्रोफ़ाइल",
  "Payment": "भुगतान",
  "Admin": "प्रशासन",
  "Balance": "शेष राशि",
  "Due": "देय",
  "Soon": "जल्द",
};

  // 🪄 Reverse dictionary (Hindi → English)
  const reverseTranslations = {};
  for (const [en, hi] of Object.entries(translations)) {
    reverseTranslations[hi] = en;
  }

  let currentLang = localStorage.getItem("lang") || "en";

  // 🧠 Translate every visible text node
  function translateElementText(element, lang) {
    element.childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        const text = node.textContent.trim();
        if (!text) return;

        if (lang === "hi" && translations[text]) {
          node.textContent = translations[text];
        } else if (lang === "en" && reverseTranslations[text]) {
          node.textContent = reverseTranslations[text];
        }
      } else if (node.nodeType === 1) {
        translateElementText(node, lang);
      }
    });
  }

  // 🔄 Translate full page
  function translatePage(lang) {
    document.querySelectorAll("body *").forEach((el) => {
      translateElementText(el, lang);
    });
  }

  // Apply saved language
  translatePage(currentLang);

  // Toggle on button click
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    localStorage.setItem("lang", currentLang);
    translatePage(currentLang);
  });
});
