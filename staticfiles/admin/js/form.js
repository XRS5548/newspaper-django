// Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const toggleBtn = document.getElementById('sidebarToggle');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  });

// Dark mode toggle
const darkBtn = document.getElementById('darkModeBtn');
darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  updateChartsTheme();

  // Update sidebar text color
  updateSidebarTextColor();
});

// Function to update sidebar text color
function updateSidebarTextColor() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // Select all elements inside the sidebar
  const textElements = sidebar.querySelectorAll('*');

  textElements.forEach(el => {
    // Only apply color to elements that actually have visible text
    if (el.children.length === 0 && el.textContent.trim().length > 0) {
      if (document.body.classList.contains('dark')) {
        // Add Tailwind class for white text and remove potential dark-conflicting classes
        el.classList.add('text-white');
        el.classList.remove('text-black', 'text-gray-800', 'text-gray-900');
      } else {
        // Remove white text in light mode
        el.classList.remove('text-white');
      }
    }
  });
}

// Run on page load in case dark mode is active initially
updateSidebarTextColor();


// Call it once on page load in case dark mode is already active
updateSidebarTextColor();

  // Notifications & Profile
  document.getElementById('notifBtn').addEventListener('click', () => alert('You have new notifications!'));
  document.getElementById('profileBtn').addEventListener('click', () => alert('Profile menu clicked!'));

  // ApexCharts
  let targetOptions = {
    series: [75],
    chart: { type: 'radialBar', height: 200, toolbar: { show: false } },
    plotOptions: { radialBar: { hollow: { size: '60%' } } },
    labels: ['Target'],
    theme: { mode: document.body.classList.contains('dark') ? 'dark' : 'light' }
  };
  let targetChart = new ApexCharts(document.querySelector("#target-chart"), targetOptions);
  targetChart.render();

  let barOptions = {
    series: [{ name: 'Sales', data: [10,20,15,25,18,30,22] }],
    chart: { type: 'bar', height: 200, toolbar: { show: false } },
    xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul'] },
    theme: { mode: document.body.classList.contains('dark') ? 'dark' : 'light' }
  };
  let barChart = new ApexCharts(document.querySelector("#bar-chart"), barOptions);
  barChart.render();

  function updateChartsTheme() {
    const themeMode = document.body.classList.contains('dark') ? 'dark' : 'light';
    targetChart.updateOptions({ theme: { mode: themeMode } });
    barChart.updateOptions({ theme: { mode: themeMode } });
  }
  
  // Profile dropdown
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');

  profileBtn.addEventListener('click', (e) => {
    profileDropdown.classList.toggle('hidden');
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if(!profileBtn.contains(e.target)) {
      profileDropdown.classList.add('hidden');
    }
  });


   // Drag & Drop File Upload Logic
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");

  dropZone.addEventListener("click", () => fileInput.click());

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("bg-blue-50");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("bg-blue-50");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("bg-blue-50");
    alert(`${e.dataTransfer.files.length} file(s) uploaded successfully!`);
  });