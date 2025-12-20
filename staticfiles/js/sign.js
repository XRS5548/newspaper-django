function validateForm() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please fill in all fields.");
    return false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (password.length < 2) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  alert("Sign In Successful!");
  return true;
}
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

function toggleDropdown(event) {
  event.stopPropagation();
  event.currentTarget.classList.toggle("show");
}