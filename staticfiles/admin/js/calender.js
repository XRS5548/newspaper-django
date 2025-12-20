document.addEventListener('DOMContentLoaded', function() {

  /* ========== FullCalendar Setup ========== */
  const calendarEl = document.getElementById('calendar');
  let calendar; // Keep reference for dark mode

  if (calendarEl) {
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      themeSystem: 'standard',
      height: 'auto',
      selectable: true,
      editable: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      events: [
        { title: 'Meeting', start: '2025-10-20T10:30:00', end: '2025-10-20T12:30:00' },
        { title: 'Conference', start: '2025-10-22', end: '2025-10-24' },
        { title: 'Team Outing', start: '2025-10-27T18:00:00' }
      ],
      dateClick: function(info) {
        const title = prompt('Enter Event Title:');
        if (title) {
          calendar.addEvent({ title: title, start: info.date, allDay: true });
          alert(`Event "${title}" added on ${info.dateStr}`);
        }
      }
    });
    calendar.render();
    updateCalendarTheme(); // Apply initial theme
  }

  /* ========== Sidebar Toggle ========== */
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const toggleBtn = document.getElementById('sidebarToggle');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      overlay.classList.toggle('hidden');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('hidden');
    });
  }

  /* ========== Dark Mode Toggle ========== */
  const darkBtn = document.getElementById('darkModeBtn');
  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      updateChartsTheme();       // Your charts dark mode
      updateCalendarTheme();     // Calendar dark mode
    });
  }

  /* ========== Notifications Button ========== */
  const notifBtn = document.getElementById('notifBtn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => alert('You have new notifications!'));
  }

  /* ========== ApexCharts Setup ========== */
  let targetChart, barChart;
  function setupCharts() {
    const targetEl = document.querySelector("#target-chart");
    const barEl = document.querySelector("#bar-chart");

    if (targetEl) {
      const targetOptions = {
        series: [75],
        chart: { type: 'radialBar', height: 200, toolbar: { show: false } },
        plotOptions: { radialBar: { hollow: { size: '60%' } } },
        labels: ['Target'],
        theme: { mode: document.body.classList.contains('dark') ? 'dark' : 'light' }
      };
      targetChart = new ApexCharts(targetEl, targetOptions);
      targetChart.render();
    }

    if (barEl) {
      const barOptions = {
        series: [{ name: 'Sales', data: [10,20,15,25,18,30,22] }],
        chart: { type: 'bar', height: 200, toolbar: { show: false } },
        xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul'] },
        theme: { mode: document.body.classList.contains('dark') ? 'dark' : 'light' }
      };
      barChart = new ApexCharts(barEl, barOptions);
      barChart.render();
    }
  }

  function updateChartsTheme() {
    const themeMode = document.body.classList.contains('dark') ? 'dark' : 'light';
    if (targetChart) targetChart.updateOptions({ theme: { mode: themeMode } });
    if (barChart) barChart.updateOptions({ theme: { mode: themeMode } });
  }

  setupCharts();

  /* ========== FullCalendar Dark Mode Function ========== */
  function updateCalendarTheme() {
    if (!calendar) return;

    const isDark = document.body.classList.contains('dark');

    const dayColor = isDark ? '#ffffff' : '#000000';
    const weekendColor = isDark ? '#ffcc00' : '#d9534f';
    const eventTextColor = '#ffffff';
    const eventBgColor = isDark ? '#555555' : '#3788d8';
    const headerColor = isDark ? '#ffffff' : '#000000';
    const calendarBg = isDark ? '#1a1a1a' : '#ffffff';

    const calendarEl = document.getElementById('calendar');

    // Calendar background
    calendarEl.style.backgroundColor = calendarBg;

    // Update events
    calendar.getEvents().forEach(event => {
      event.setProp('backgroundColor', eventBgColor);
      event.setProp('textColor', eventTextColor);
    });

    // Update day cells
    const dayCells = calendarEl.querySelectorAll('.fc-daygrid-day');
    dayCells.forEach(cell => {
      cell.style.color = dayColor;
      const dateStr = cell.getAttribute('data-date');
      const date = new Date(dateStr);
      if (date.getDay() === 0 || date.getDay() === 6) {
        cell.style.color = weekendColor;
      }
    });

    // Update header toolbar
    const headers = calendarEl.querySelectorAll('.fc-col-header-cell, .fc-toolbar-title, .fc-button');
    headers.forEach(el => {
      el.style.color = headerColor;
      if (el.classList.contains('fc-button')) {
        el.style.backgroundColor = isDark ? '#333' : '#f0f0f0';
        el.style.borderColor = isDark ? '#555' : '#ccc';
      }
    });
  }

  /* ========== Profile Dropdown ========== */
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      profileDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
      if (!profileDropdown.contains(event.target) && !profileBtn.contains(event.target)) {
        profileDropdown.classList.add('hidden');
      }
    });
  }

});
 document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      themeSystem: 'standard',
      height: 'auto',
      selectable: true,
      editable: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      // ✅ This ensures days (Sun, Mon, Tue...) appear properly
      dayHeaderFormat: { weekday: 'short' }, // short = Sun, Mon, Tue...
      events: [
        { title: 'Meeting', start: '2025-10-20T10:30:00', end: '2025-10-20T12:30:00' },
        { title: 'Conference', start: '2025-10-22', end: '2025-10-24' },
        { title: 'Team Outing', start: '2025-10-27T18:00:00' }
      ],
      dateClick: function(info) {
        const title = prompt('Enter Event Title:');
        if (title) {
          calendar.addEvent({ title: title, start: info.date, allDay: true });
          alert(`Event "${title}" added on ${info.dateStr}`);
        }
      }
    });

    calendar.render();
  });