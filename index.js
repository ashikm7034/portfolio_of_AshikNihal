document.addEventListener("DOMContentLoaded", function() {
  // Show main content after loading
  setTimeout(function () {
      document.getElementById("loading-container").style.display = "none";
      document.getElementById("main-content").style.display = "block";
  }, 3000);
  
  // Particle effect
  document.addEventListener("mousemove", function (event) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = `${event.clientX - 5}px`;
      particle.style.top = `${event.clientY - 5}px`;
      document.body.appendChild(particle);
      setTimeout(() => {
          particle.remove();
      }, 1500);
  });

  // Smooth scroll to sections
  const links = document.querySelectorAll('.top-bar a');
  links.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          targetSection.scrollIntoView({ behavior: 'smooth' });
      });
  });

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Message sent! We will get back to you soon.');
      contactForm.reset();
  });

  // Team card flip functionality
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
      let isFlipped = false;
      
      card.addEventListener('click', function() {
          isFlipped = !isFlipped;
          this.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0)';
      });
      
      // For touch devices
      card.addEventListener('touchstart', function(e) {
          e.preventDefault();
          isFlipped = !isFlipped;
          this.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0)';
      });
  });
});
  