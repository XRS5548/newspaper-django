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
// --- User Data ---
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", active: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "8765432109", active: false },
  { id: 3, name: "Rahul Swami", email: "rahul@gmail.com", phone: "9999999999", active: true }
];

// --- Render Table ---
function renderTable() {
  const table = document.getElementById("userTable");
  table.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.classList.add("hover:bg-gray-50");

    row.innerHTML = `
      <td class="border px-4 py-2">${index + 1}</td>
      <td class="border px-4 py-2">${user.name}</td>
      <td class="border px-4 py-2">${user.email}</td>
      <td class="border px-4 py-2">${user.phone}</td>
      <td class="border px-4 py-2">
        <span class="px-2 py-1 text-sm rounded ${
          user.active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
        }">${user.active ? "Active" : "Inactive"}</span>
      </td>
      <td class="border px-4 py-2 text-center space-x-2">
        <button onclick="toggleStatus(${user.id})" class="text-sm px-2 py-1 rounded ${
          user.active ? "bg-yellow-400 hover:bg-yellow-500" : "bg-green-500 hover:bg-green-600"
        } text-white">
          ${user.active ? "Deactivate" : "Activate"}
        </button>
        <button onclick="editUser(${user.id})" class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded">Edit</button>
        <button onclick="deleteUser(${user.id})" class="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// --- Toggle Active Status ---
function toggleStatus(id) {
  const user = users.find(u => u.id === id);
  user.active = !user.active;
  renderTable();
}

// --- Edit User ---
function editUser(id) {
  const user = users.find(u => u.id === id);
  const newName = prompt("Edit Name:", user.name);
  const newEmail = prompt("Edit Email:", user.email);
  const newPhone = prompt("Edit Phone:", user.phone);

  if (newName && newEmail && newPhone) {
    user.name = newName;
    user.email = newEmail;
    user.phone = newPhone;
    alert("✅ User updated successfully!");
    renderTable();
  }
}

// --- Delete User ---
function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    users = users.filter(u => u.id !== id);
    renderTable();
  }
}

// --- Add New User ---
document.getElementById("addUserBtn").addEventListener("click", () => {
  const name = prompt("Enter name:");
  const email = prompt("Enter email:");
  const phone = prompt("Enter phone:");
  if (name && email && phone) {
    users.push({
      id: Date.now(),
      name,
      email,
      phone,
      active: true
    });
    alert("✅ New user added!");
    renderTable();
  }
});

// --- Initialize ---
renderTable();
