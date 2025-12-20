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


   // Line Chart Configuration
    var options = {
      chart: {
        type: 'line',
        height: 350,
        toolbar: { show: false },
        background: 'transparent'
      },
      series: [{
        name: 'Revenue',
        data: [450, 560, 700, 800, 950, 1100, 1200, 1300, 1250, 1400, 1500, 1600]
      }, {
        name: 'Expenses',
        data: [300, 400, 450, 500, 600, 700, 750, 800, 850, 900, 950, 1000]
      }],
      colors: ['#3B82F6', '#F59E0B'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      markers: {
        size: 5
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yaxis: {
        title: { text: 'Amount ($)' }
      },
      grid: {
        borderColor: '#e5e7eb'
      },
      tooltip: {
        theme: 'dark'
      },
      legend: {
        position: 'top',
        labels: {
          colors: '#374151'
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#lineChart"), options);
    chart.render();