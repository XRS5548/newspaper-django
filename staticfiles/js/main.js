// 🌟 ================= MOBILE SIDEBAR TOGGLE =================
const menuToggle = document.getElementById("menuToggle");
const navList = document.querySelector(".nav-list");
const overlay = document.getElementById("overlay");

if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");

    // ☰ ↔ ✖ icon change
    menuToggle.innerHTML = navList.classList.contains("active") ? "&times;" : "&#9776;";

    // Overlay toggle
    if (overlay) overlay.classList.toggle("active");
  });
}

// Overlay click closes sidebar
if (overlay) {
  overlay.addEventListener("click", () => {
    navList.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.innerHTML = "&#9776;";
  });
}

// ✅ Auto-close sidebar when clicking a dropdown link (mobile)
// ✅ Fixed Mobile Dropdown Toggle
document.querySelectorAll(".nav-item.dropdown").forEach(drop => {
  const toggle = drop.querySelector(".dropdown-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      drop.classList.toggle("show");
    }
  });
});


// ===== LIVE NEWS FEED (Demo Placeholder) =====
async function loadLiveNews() {
  const feed = document.getElementById("liveFeed");
  if (!feed) return;
  feed.innerHTML = "<li>Fetching latest news...</li>";

  try {
    const res = await fetch("https://gnews.io");
    const data = await res.json();

    feed.innerHTML = "";
    data.articles.forEach(article => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
      feed.appendChild(li);
    });
  } catch (error) {
    feed.innerHTML = "<li>⚠️ Could not load live news. Please try again later.</li>";
  }
}
loadLiveNews();
setInterval(loadLiveNews, 60000);

// 🔢 Counter Animation (💡 Fixed)
const counters = document.querySelectorAll(".counter");
const speed = 150;

let counterStarted = false; // prevent re-run

function startCounter() {
  if (counterStarted) return;
  counterStarted = true;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCount();
  });
}

// Start counter only once when visible
const counterSection = document.querySelector(".stats-counter");
if (counterSection) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      startCounter();
      observer.unobserve(counterSection);
    }
  }, { threshold: 0.3 });
  observer.observe(counterSection);
}

// 🌟 Developer Contact Popup Script
const contactLink = document.getElementById("contactDevLink");
const popup = document.getElementById("devPopup");
const closePopup = document.getElementById("closePopup");

if (contactLink && popup && closePopup) {
  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
}

// 🪧 Ads Scroll Behavior
document.addEventListener("DOMContentLoaded", function () {
  const adTrack = document.querySelector(".ad-track");
  if (!adTrack) return;

  let pauseTimeout;
  const pauseScroll = () => {
    adTrack.style.animationPlayState = "paused";
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      adTrack.style.animationPlayState = "running";
    }, 2000);
  };

  adTrack.addEventListener("touchstart", pauseScroll);
  adTrack.addEventListener("mousedown", pauseScroll);

  adTrack.querySelectorAll("a").forEach(link => {
    link.addEventListener("touchend", (e) => {
      e.stopPropagation();
      window.open(link.href, "_blank");
    });
  });
});
