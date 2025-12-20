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

      allContents.forEach((el) => {
        if (el !== content) el.classList.remove("show");
      });

      content.classList.toggle("show");

      // Rotate arrow ▸ to ▼ when open
      if (content.classList.contains("show")) {
        this.innerHTML = this.innerHTML.replace("▸", "▼");
      } else {
        this.innerHTML = this.innerHTML.replace("▼", "▸");
      }
    });
  });

  // ✅ Payment Data
  const payments = [
    { month: "जनवरी", amount: 1200, status: "Paid", date: "05-01-2025" },
    { month: "फरवरी", amount: 1300, status: "Paid", date: "05-02-2025" },
    { month: "मार्च", amount: 1250, status: "Pending", date: "-" },
  ];

  let totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  let totalDue = payments
    .filter((p) => p.status !== "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  document.getElementById("totalPaid").textContent = `₹${totalPaid}`;
  document.getElementById("totalDue").textContent = `₹${totalDue}`;
  document.getElementById("status").textContent =
    totalDue > 0 ? "Pending" : "Paid";

  // ✅ Table Fill
  const tableBody = document.getElementById("paymentTable");
  payments.forEach((p) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.month}</td>
      <td>₹${p.amount}</td>
      <td>${p.status}</td>
      <td>${p.date}</td>
    `;
    tableBody.appendChild(row);
  });

  // ✅ Chart
  new Chart(document.getElementById("paymentChart"), {
    type: "bar",
    data: {
      labels: payments.map((p) => p.month),
      datasets: [
        {
          label: "Monthly Payment (₹)",
          data: payments.map((p) => p.amount),
          backgroundColor: "#4285F4",
        },
      ],
    },
  });

  // 📱 Sidebar Mobile Toggle Button
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

    // Show toggle only on mobile
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
    handleResize();
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
    "Total Paid": "कुल भुगतान",
    "Total Due": "कुल बकाया",
    "Status": "स्थिति",
    "Paid": "भुगतान किया गया",
    "Pending": "लंबित",
    "Due": "देय",
    "Month": "महीना",
    "Paid Amount": "भुगतान राशि",
    "Payment Date": "भुगतान तिथि",
    "Payment Overview": "भुगतान अवलोकन",
    "Monthly Payment Graph": "मासिक भुगतान ग्राफ़",
    "Monthly Payment Details": "मासिक भुगतान विवरण",
    "Dainik Bhaskar": "दैनिक भास्कर",
    "Chhota Dainik Bhaskar": "छोटा दैनिक भास्कर",
    "Jaipur Edition": "जयपुर संस्करण",
    "Founded 1958": "स्थापित 1958",
    "Hindi Daily": "हिंदी दैनिक",
    "Total Paid Amount": "कुल भुगतान राशि",
    "Admin Total Payments": "प्रशासन कुल भुगतान",
    "Total Payment Dashboard": "कुल भुगतान डैशबोर्ड",
    "January": "जनवरी",
    "February": "फ़रवरी",
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

  // 🧠 Translate text content
  function translateText(text, lang) {
    const dict = lang === "hi" ? translations : reverseTranslations;
    for (const [key, val] of Object.entries(dict)) {
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      text = text.replace(regex, val);
    }
    return text;
  }

  // 🔄 Live translate all visible text nodes
  function translatePage(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim().length > 0) {
        node.nodeValue = translateText(node.nodeValue, lang);
      }
    }
  }

  // Apply saved language on load
  translatePage(currentLang);

  // 🌐 Toggle Button Click (No reload)
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    localStorage.setItem("lang", currentLang);
    translatePage(currentLang);
  });
});
