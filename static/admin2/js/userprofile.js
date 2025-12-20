window.onload = () => {
  const data = JSON.parse(localStorage.getItem("profileData"));
  if (data) {
    for (const key in data) {
      const element = document.getElementById(key);
      if (element) element.textContent = data[key];
    }
    if (data.profilePic) document.getElementById("profilePic").src = data.profilePic;
  }
};

// ✏️ Inline Edit Functions
function toggleEdit(section) {
  const fields = {
    personal: ["fullName", "email", "phone", "altPhone", "bio"],
    address: ["address1", "address2", "country", "postal"]
  };

  fields[section].forEach(id => {
    const p = document.getElementById(id);
    const input = document.getElementById(id + "Input");
    input.value = p.textContent;
    p.style.display = "none";
    input.style.display = "block";
  });

  document.querySelector(`.edit-btn[onclick="toggleEdit('${section}')"]`).style.display = "none";
  document.getElementById(`save${section.charAt(0).toUpperCase()+section.slice(1)}`).style.display = "inline";
}

function saveData() {
  const ids = ["fullName", "email", "phone", "altPhone", "bio", "address1", "address2", "country", "postal"];
  const data = {};
  ids.forEach(id => {
    const input = document.getElementById(id + "Input");
    if (input && input.style.display === "block") {
      const p = document.getElementById(id);
      p.textContent = input.value;
      input.style.display = "none";
      p.style.display = "block";
    }
    data[id] = document.getElementById(id).textContent;
  });
  data.profilePic = document.getElementById("profilePic").src;
  localStorage.setItem("profileData", JSON.stringify(data));

  document.querySelectorAll(".save-btn").forEach(btn => btn.style.display = "none");
  document.querySelectorAll(".edit-btn").forEach(btn => btn.style.display = "inline");
}

function uploadPhoto() {
  document.getElementById("photoInput").click();
}

document.getElementById("photoInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.getElementById("profilePic");
      img.src = e.target.result;
      let data = JSON.parse(localStorage.getItem("profileData")) || {};
      data.profilePic = e.target.result;
      localStorage.setItem("profileData", JSON.stringify(data));
    };
    reader.readAsDataURL(file);
  }
});


// ✅ Sidebar Dropdowns + Nested
document.addEventListener("DOMContentLoaded", () => {
  // Main Dropdowns
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      this.parentElement.classList.toggle("active");
      document.querySelectorAll(".dropdown").forEach((drop) => {
        if (drop !== this.parentElement) drop.classList.remove("active");
      });
    });
  });

  // Nested Dropdowns
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
});


// 📱 Responsive Sidebar Toggle (hidden in mobile)
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
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
    sidebar.classList.toggle("sidebar-visible");
  });

  function handleResize() {
    if (window.innerWidth <= 768) {
      toggleBtn.style.display = "block";
      sidebar.classList.add("mobile-mode");
      sidebar.classList.remove("sidebar-visible");
    } else {
      toggleBtn.style.display = "none";
      sidebar.classList.remove("mobile-mode");
      sidebar.classList.add("sidebar-visible");
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize();
});


// 🌐 Safe Full Page Hindi-English Toggle (preserves layout & style)
document.addEventListener("DOMContentLoaded", () => {
  // 🟦 Create toggle button
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

  // 🗣️ Translation dictionary
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
    "Newspaper Delivery Calendar": "अखबार वितरण कैलेंडर",
    "Delivered": "वितरित",
    "Not Delivered": "अवितरित",
    "Next": "अगला",
    "Prev": "पिछला",
    "Email": "ईमेल",
    "Phone": "फ़ोन",
    "Address": "पता",
    "Save": "सहेजें",
    "Edit": "संपादित करें",
    "Personal Info": "व्यक्तिगत जानकारी",
    "Address Info": "पता जानकारी",
    "Full Name": "पूरा नाम",
    "Alternate Phone": "वैकल्पिक फोन",
    "Country": "देश",
    "Postal Code": "पिन कोड",
    "Search": "खोजें",
    "Total": "कुल",
    "Bio": "जीवनी",
    "The Hindu": "द हिन्दू",
    "Indian Express": "इंडियन एक्सप्रेस",
    "Hindustan Times": "हिंदुस्तान टाइम्स",
    "Economic Times": "इकोनॉमिक टाइम्स",
    "दैनिक नवज्योति": "Dainik Navjyoti",
    "दैनिक भास्कर": "Dainik Bhaskar",
    "छोटा दैनिक भास्कर": "Small Dainik Bhaskar",
    "राजस्थान पत्रिका": "Rajasthan Patrika",
    "छोटा राजस्थान पत्रिका": "Small Rajasthan Patrika",
    "पंजाब केसरी": "Punjab Kesari"
  };

  // 🌍 Saved language
  let currentLang = localStorage.getItem("lang") || "en";

  // 🔁 Only translate *pure text nodes* (safe for layout)
  function translateNodeText(node, lang) {
    if (node.nodeType === 3) {
      const text = node.nodeValue.trim();
      if (!text) return;

      Object.keys(translations).forEach(key => {
        const val = translations[key];
        if (lang === "hi" && node.nodeValue.trim() === key) {
          node.nodeValue = val;
        } else if (lang === "en" && node.nodeValue.trim() === val) {
          node.nodeValue = key;
        }
      });
    } else {
      node.childNodes.forEach(child => translateNodeText(child, lang));
    }
  }

  function translatePage(lang) {
    translateNodeText(document.body, lang);
  }

  // ✅ Initial load
  translatePage(currentLang);

  // 🔘 Toggle click
  translateBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    localStorage.setItem("lang", currentLang);
    translatePage(currentLang);
  });
});
