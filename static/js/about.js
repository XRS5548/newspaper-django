// 🌟 Mobile Sidebar Toggle
const menuToggle = document.getElementById("menuToggle");
const navList = document.querySelector(".nav-list");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");
  // Change toggle icon (☰ ↔ ✖)
  if (navList.classList.contains("active")) {
    menuToggle.innerHTML = "&times;";
  } else {
    menuToggle.innerHTML = "&#9776;";
  }
});

// 🌟 Dropdown Toggle on Mobile
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      const dropdownMenu = toggle.nextElementSibling;
      dropdownMenu.classList.toggle("show");
    }
  });
});



  // ===== LIVE NEWS FEED SCRIPT =====
  async function loadLiveNews() {
    const feed = document.getElementById("liveFeed");
    feed.innerHTML = "<li>Fetching latest news...</li>";

    try {
      // You can use your own API key from https://gnews.io
      const res = await fetch("https://gnews.io");
      const data = await res.json();

      feed.innerHTML = ""; // clear placeholder
      data.articles.forEach(article => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
        feed.appendChild(li);
      });
    } catch (error) {
      feed.innerHTML = "<li>⚠️ Could not load live news. Please try again later.</li>";
      console.error(error);
    }
  }

  loadLiveNews(); // Call when page loads
  setInterval(loadLiveNews, 60000); // Refresh every 1 minute


// 🔢 Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 150; // speed of count

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };

  // Start animation when section is visible
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      updateCount();
      observer.unobserve(counter);
    }
  }, { threshold: 0.5 });

  observer.observe(counter);
});

// Auto duplicate track for seamless infinite effect
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  if (track) {
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  }
});




  // 🌟 Developer Contact Popup Script
  const contactLink = document.getElementById("contactDevLink");
  const popup = document.getElementById("devPopup");
  const closePopup = document.getElementById("closePopup");

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

 const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', i === idx);
      dots[idx].classList.toggle('active', i === idx);
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      showSlide(index);
    });
  });

  setInterval(nextSlide, 4000); // Auto-slide every 4s