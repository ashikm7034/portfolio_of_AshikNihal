<script>
  document.addEventListener("mousemove", function(event) {
    let stars = document.querySelectorAll('.stars::before');
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    // Apply a slight movement to the background stars based on mouse position
    stars.forEach(star => {
      let speed = 0.05;  // Control how sensitive the star movement is to mouse
      let x = (mouseX * speed);
      let y = (mouseY * speed);

      star.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
</script>
