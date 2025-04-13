// Show projects section after scroll
window.addEventListener('scroll', () => {
  const projects = document.getElementById('projects');
  if (window.scrollY > 300) {
    projects.classList.add('show');
  }
});
