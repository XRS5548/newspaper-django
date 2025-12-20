document.addEventListener("DOMContentLoaded", () => {
  // ✅ Payment Table Rendering
  const payments = [
    { month: "January", amount: 10000, status: "Paid", date: "05 Jan 2025" },
    { month: "February", amount: 12000, status: "Paid", date: "06 Feb 2025" },
    { month: "April", amount: 15000, status: "Paid", date: "05 Apr 2025" },
    { month: "May", amount: 9000, status: "Paid", date: "03 May 2025" },
    { month: "July", amount: 11000, status: "Paid", date: "07 Jul 2025" },
    { month: "August", amount: 8000, status: "Paid", date: "06 Aug 2025" },
    { month: "October", amount: 14000, status: "Paid", date: "05 Oct 2025" }
  ];

  const tableBody = document.getElementById("paymentTable");
  const paidAmount = document.getElementById("paidAmount");

  let total = 0;

  payments.forEach(payment => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${payment.month}</td>
      <td>${payment.amount.toLocaleString()}</td>
      <td class="paid">${payment.status}</td>
      <td>${payment.date}</td>
    `;
    tableBody.appendChild(row);
    total += payment.amount;
  });

  if (paidAmount) {
    paidAmount.textContent = "₹" + total.toLocaleString();
  }

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

  // 📱 Sidebar Mobile Toggle
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = "☰";
    toggleBtn.classList.add("mobile-toggle");

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
        sidebar.classList.remove("mobile-mode");
        sidebar.classList.remove("sidebar-show");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on load
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // 🌐 Hindi / English Toggle Button
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

  // 🗣 Dictionary
  const translations = {
    "Admin Panel": "प्रशासन पैनल",
    "User Dashboard": "उपयोगकर्ता डैशबोर्ड",
    "Calendar": "कैलेंडर",
    "User Profile": "उपयोगकर्ता प्रोफ़ाइल",
    "Monthly Payment": "मासिक भुगतान",
    "Total Due Payment": "कुल बकाया भुगतान",
    "Total Payment": "कुल भुगतान",
    "Books": "पुस्तकें",
    "NewsPapers": "समाचार पत्र",
    "Settings": "सेटिंग्स",
    "Total Paid Amount": "कुल भुगतान राशि",
    "Admin Total Payments": "प्रशासन कुल भुगतान",
    "Total Payment Dashboard": "कुल भुगतान डैशबोर्ड",
    "Month": "महीना",
    "Paid Amount": "भुगतान राशि",
    "Status": "स्थिति",
    "Payment Date": "भुगतान तिथि",
    "Paid": "भुगतान किया गया",
    "Pending": "लंबित",
    "Due": "देय",
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
    "December": "दिसंबर"
  };

  // 🔁 Reverse dictionary (Hindi → English)
  const reverseTranslations = Object.fromEntries(
    Object.entries(translations).map(([en, hi]) => [hi, en])
  );

  let currentLang = localStorage.getItem("lang") || "en";

  // 🧠 Function to translate text (supports partial + reverse)
  function translateText(text, lang) {
    const dict = lang === "hi" ? translations : reverseTranslations;
    for (const [key, val] of Object.entries(dict)) {
      const find = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex chars
      const regex = new RegExp(find, "gi");
      text = text.replace(regex, val);
    }
    return text;
  }

  // 🔄 Translate all visible text nodes
  function translatePage(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim()) {
        node.nodeValue = translateText(node.nodeValue, lang);
      }
    }
  }

  // Apply saved language on load
  translatePage(currentLang);

  // Toggle on button click
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    localStorage.setItem("lang", currentLang);
    translatePage(currentLang);
  });
});
