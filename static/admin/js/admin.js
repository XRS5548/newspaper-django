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
  });

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
// ---- Live Active Newspaper Data ----
let activeNewspapers = {
    "Dainik Jagran": 5,
    "Amar Ujala": 3,
    "Hindustan Times": 7,
    "Times of India": 4,
    "Navbharat Times": 6
};

function loadLiveData() {

    // Randomly simulate live changes (increment/decrement)
    for (let paper in activeNewspapers) {

        let change = Math.random() > 0.5 ? 1 : -1;

        activeNewspapers[paper] += change;

        // values should never go below 0
        if (activeNewspapers[paper] < 0) {
            activeNewspapers[paper] = 0;
        }
    }

    // Count total active (sum of all)
    let totalActive = Object.values(activeNewspapers).reduce((a, b) => a + b, 0);

    document.getElementById("activeCount").innerText = totalActive;

    // Update List
    let listHTML = "";

    for (let name in activeNewspapers) {
        listHTML += `
            <div class="flex justify-between text-gray-700 dark:text-gray-200">
                <span>${name}</span>
                <span class="font-semibold">${activeNewspapers[name]}</span>
            </div>
        `;
    }

    document.getElementById("activeList").innerHTML = listHTML;
}

// Auto update every 2 seconds
setInterval(loadLiveData, 2000);

// First load
loadLiveData();
// ---- Live Deactive Counter ----
let deactive = 15;

function loadDeactiveData() {
    // Random increment/decrement
    let change = Math.random() > 0.5 ? 1 : -1;
    deactive += change;

    if (deactive < 0) deactive = 0;

    document.getElementById("deactiveCount").innerText = deactive;
}

setInterval(loadDeactiveData, 2000);
loadDeactiveData();
