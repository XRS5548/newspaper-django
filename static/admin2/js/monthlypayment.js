document.addEventListener("DOMContentLoaded", () => {
  // ✅ Sidebar dropdown logic
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
      document.querySelectorAll(".nested-content").forEach((el) => {
        if (el !== content) el.classList.remove("show");
      });
      content.classList.toggle("show");
      this.innerHTML = content.classList.contains("show")
        ? this.innerHTML.replace("▸", "▼")
        : this.innerHTML.replace("▼", "▸");
    });
  });

  // 💸 Balance display
  const balance = 52340;
  const balanceEl = document.getElementById("balanceAmount");
  if (balanceEl) balanceEl.innerText = "₹" + balance.toLocaleString();

  // 📱 Mobile Sidebar Toggle
  const sidebar = document.querySelector(".sidebar");
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

  // 🌐 Hindi-English Toggle Button
  const translateBtn = document.createElement("button");
  translateBtn.innerHTML = "🌐 Hindi / English";
  Object.assign(translateBtn.style, {
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
  document.body.appendChild(translateBtn);

  // 🗣 English ↔ Hindi Dictionary
  const translations = {
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
    "Monthly Payment Dashboard": "मासिक भुगतान डैशबोर्ड",
    "Total Balance": "कुल शेष राशि",
    "Admin Monthly Payments": "प्रशासनिक मासिक भुगतान",
    "Month": "महीना",
    "Amount (₹)": "राशि (₹)",
    "Status": "स्थिति",
    "Payment Date": "भुगतान तिथि",
    "Paid": "भुगतान किया गया",
    "Pending": "लंबित",
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
  };

  // 🔁 Create reverse dictionary (Hindi → English)
  const reverseTranslations = {};
  for (const [eng, hin] of Object.entries(translations)) {
    reverseTranslations[hin] = eng;
  }

  let currentLang = localStorage.getItem("lang") || "en";

  // ✅ Safely translate only text nodes (without breaking HTML)
  function translateElementText(element, lang) {
    element.childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        const text = node.textContent.trim();
        if (text.length > 0) {
          if (lang === "hi" && translations[text]) {
            node.textContent = translations[text];
          } else if (lang === "en" && reverseTranslations[text]) {
            node.textContent = reverseTranslations[text];
          }
        }
      } else if (node.nodeType === 1) {
        translateElementText(node, lang);
      }
    });
  }

  function translatePage(lang) {
    document.querySelectorAll("body *").forEach((el) => {
      translateElementText(el, lang);
    });
  }

  // Apply saved language
  translatePage(currentLang);

  // Button toggle
  translateBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    localStorage.setItem("lang", currentLang);
    translatePage(currentLang);
  });
});
