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


    // Toggle Chart Submenu
  const chartMenu = document.getElementById('chartMenu');
  const chartSubmenu = document.getElementById('chartSubmenu');
  const arrowIcon = document.getElementById('arrowIcon');

  chartMenu.addEventListener('click', () => {
    chartSubmenu.classList.toggle('hidden');
    arrowIcon.classList.toggle('rotate-180');
  });

  // ApexCharts Bar Chart
  var options = {
    series: [{
      name: 'Sales',
      data: [44, 55, 57, 56, 61, 58, 63]
    }],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: '45%',
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yaxis: {
      title: { text: 'Revenue ($K)' }
    },
    fill: { opacity: 1 },
    tooltip: {
      y: { formatter: function (val) { return "$" + val + "K"; } }
    },
    colors: ['#3B82F6']
  };

  var chart = new ApexCharts(document.querySelector("#barChart"), options);
  chart.render();

    