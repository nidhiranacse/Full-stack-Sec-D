const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent =
    document.body.classList.contains("light-mode") ? "Dark Mode" : "Light Mode";
});
