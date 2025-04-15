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

  // Parallax scroll effect on stars background
  const stars = document.querySelector('.stars');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    stars.style.backgroundPosition = `center ${scrollY * 0.5}px`;
  });

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Message sent! We will get back to you soon.');
      contactForm.reset();
  });

  // Fetch Airtable projects and render dynamically
  const airtableApiKey = 'patnmojDNso7KkoL0.93cd6b3006bb995435a340badd075bb0ebaa7710feb3b6fec2af69324671237e'; // User provided token
  const airtableBaseId = 'appQfbVpYAGMZ56D9'; // User provided base ID
  const airtableTableName = 'portfolio'; // Updated Airtable table name
  const projectGrid = document.getElementById('project-grid');

  async function fetchAirtableProjects() {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`, {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      projectGrid.innerHTML = '';
      data.records.forEach(record => {
        const fields = record.fields;
        const thumbnailUrl = fields.thumbnail && fields.thumbnail.length > 0 ? fields.thumbnail[0].url : '';
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card glow';
        projectCard.innerHTML = `
          ${thumbnailUrl ? `<img src="${thumbnailUrl}" alt="${fields.name}" class="project-thumbnail" />` : ''}
          <h3>${fields.name}</h3>
          <p>${fields['short description'] ? fields['short description'] : 'No description available.'}</p>
        `;
        projectGrid.appendChild(projectCard);
      });
    } catch (error) {
      projectGrid.innerHTML = '<p>Failed to load projects from Airtable.</p>';
      console.error('Error fetching Airtable projects:', error);
    }
  }

  fetchAirtableProjects();

  // Scroll animations
  const sections = document.querySelectorAll('.next-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Team card animations
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
      let isFlipped = false;
      
      // Tilt effect on mouse move
      card.addEventListener('mousemove', (e) => {
          if(!isFlipped) {
              const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
              const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
              card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
          }
      });
      
      // Reset on mouse leave
      card.addEventListener('mouseleave', () => {
          if(!isFlipped) {
              card.style.transform = 'rotateY(0) rotateX(0)';
          }
      });
      
      // Click to flip
      card.addEventListener('click', function() {
          isFlipped = !isFlipped;
          this.style.transform = isFlipped ? 
              'rotateY(180deg) translateY(-10px)' : 
              'rotateY(0) translateY(-10px)';
      });
      
      // Touch support
      card.addEventListener('touchstart', function(e) {
          e.preventDefault();
          isFlipped = !isFlipped;
          this.style.transform = isFlipped ? 
              'rotateY(180deg) translateY(-10px)' : 
              'rotateY(0) translateY(-10px)';
      });
  });

  // Add glow effect to all cards
  const cards = document.querySelectorAll('.card-front, .project-card');
  cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
          const x = e.pageX - card.offsetLeft;
          const y = e.pageY - card.offsetTop;
          card.style.setProperty('--x', `${x}px`);
          card.style.setProperty('--y', `${y}px`);
      });
  });

});
