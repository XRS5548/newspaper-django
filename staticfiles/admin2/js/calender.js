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

  // ✅ Dropdown (Main)
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

  // ✅ Calendar
  const calendarDays = document.getElementById("calendarDays");
  const monthYear = document.getElementById("monthYear");
  if (calendarDays && monthYear) {
    let currentDate = new Date();
    const savedStatus = JSON.parse(localStorage.getItem("deliveryStatus")) || {};

    function renderCalendar() {
      calendarDays.innerHTML = "";

      // 🗓️ Add weekdays row
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      daysOfWeek.forEach((day) => {
        const dayNameDiv = document.createElement("div");
        dayNameDiv.textContent = day;
        dayNameDiv.classList.add("day-name");
        calendarDays.appendChild(dayNameDiv);
      });

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const totalDays = new Date(year, month + 1, 0).getDate();

      monthYear.textContent = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      // 🏁 Empty cells before month starts
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarDays.appendChild(emptyCell);
      }

      // 📅 Add actual days
      for (let day = 1; day <= totalDays; day++) {
        const dateKey = `${year}-${month + 1}-${day}`;
        const dayDiv = document.createElement("div");
        dayDiv.textContent = day;
        dayDiv.classList.add("day");

        if (savedStatus[dateKey] === "delivered") {
          dayDiv.classList.add("delivered");
        } else if (savedStatus[dateKey] === "not-delivered") {
          dayDiv.classList.add("not-delivered");
        }

        dayDiv.addEventListener("click", () => {
          savedStatus[dateKey] =
            savedStatus[dateKey] === "delivered"
              ? "not-delivered"
              : "delivered";
          localStorage.setItem("deliveryStatus", JSON.stringify(savedStatus));
          renderCalendar();
        });

        calendarDays.appendChild(dayDiv);
      }
    }

    document.getElementById("prevMonth")?.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    document.getElementById("nextMonth")?.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    renderCalendar();
  }

  // ✅ English ↔ Hindi Language Toggle
  const translations = {
    "Admin Panel": "प्रशासन पैनल",
    "User Dashboard": "उपयोगकर्ता डैशबोर्ड",
    "Calendar": "कैलेंडर",
    "User Profile": "उपयोगकर्ता प्रोफ़ाइल",
    "Monthly Payment": "मासिक भुगतान",
    "Total Due Payment": "कुल बकाया भुगतान",
    "Total Payment": "कुल भुगतान",
    "NewsPapers ▾": "समाचार पत्र ▾",
    "Books ▾": "पुस्तकें ▾",
    "Settings": "सेटिंग्स",
    "Newspaper Delivery Calendar": "समाचार पत्र वितरण कैलेंडर",
    "Delivered": "वितरित",
    "Not Delivered": "वितरित नहीं",
    "← Prev": "← पिछला",
    "Next →": "अगला →",
    "दैनिक भास्कर": "Dainik Bhaskar",
    "छोटा दैनिक भास्कर": "Small Dainik Bhaskar",
    "राजस्थान पत्रिका": "Rajasthan Patrika",
    "छोटा राजस्थान पत्रिका": "Small Rajasthan Patrika",
    "पंजाब केसरी": "Punjab Kesari",
    "The Hindu": "द हिन्दू",
    "Indian Express": "इंडियन एक्सप्रेस",
    "Hindustan Times": "हिंदुस्तान टाइम्स",
    "Economic Times": "इकोनॉमिक टाइम्स",
    "दैनिक नवज्योति": "Dainik Navjyoti",
  };

  let currentLang = localStorage.getItem("lang") || "en";

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

  function translatePage(lang) {
    document.querySelectorAll("h1,h2,h3,p,a,button,div").forEach((el) => {
      const text = el.textContent.trim();
      if (!text) return;

      if (lang === "hi" && translations[text]) {
        el.dataset.original = text;
        el.textContent = translations[text];
      } else if (lang === "en") {
        const eng = el.dataset.original;
        if (eng && translations[eng] === text) el.textContent = eng;
        else {
          const engKey = Object.keys(translations).find(
            (k) => translations[k] === text
          );
          if (engKey) el.textContent = engKey;
        }
      }
    });
  }

  translateBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    localStorage.setItem("lang", currentLang);
    translatePage(currentLang);
  });

  translatePage(currentLang);
});
