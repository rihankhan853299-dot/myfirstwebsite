// year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// theme toggle (dark <-> light)
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

// restore saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const mode = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", mode);
});

// simple form validation + fake submit
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function setError(id, msg) {
  const small = document.querySelector(`.error[data-for="${id}"]`);
  if (small) small.textContent = msg || "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // basic validation
  let ok = true;

  if (!name) { setError("name", "Name required"); ok = false; } else setError("name");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Valid email required"); ok = false;
  } else setError("email");
  if (!message) { setError("message", "Message required"); ok = false; } else setError("message");

  if (!ok) return;

  // fake async submit UX
  statusEl.textContent = "Sending...";
  setTimeout(() => {
    statusEl.textContent = "Thanks! Your message has been received.";
    form.reset();
  }, 600);
});
