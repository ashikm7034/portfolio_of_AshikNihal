document.addEventListener("DOMContentLoaded", function() {
  // Particle effect on mouse move
  document.addEventListener("mousemove", function(event) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = `${event.clientX - 5}px`;
      particle.style.top = `${event.clientY - 5}px`;
      document.body.appendChild(particle);
      setTimeout(() => {
          particle.remove();
      }, 1500);
  });
});
  