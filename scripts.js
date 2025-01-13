
  document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".logo-track");
    const logos = document.querySelectorAll(".logo");

    // Clone logos to create seamless infinite scrolling
    const cloneLogos = Array.from(logos).map((logo) => logo.cloneNode(true));
    cloneLogos.forEach((clone) => track.appendChild(clone));

    // Ensure animation runs seamlessly
    track.style.animationDuration = `${logos.length * 1}s`; // Adjust speed
  });
  let currentIndex = 0;
  const testimonialWrapper = document.querySelector('.custom-testimonial-wrapper');
  const totalTestimonials = document.querySelectorAll('.custom-testimonial-card').length;
  const slideWidth = document.querySelector('.custom-testimonial-card').offsetWidth;
  
  function nextSlide() {
    currentIndex++;
  
    if (currentIndex >= totalTestimonials - 2) {
      // When the slider reaches the last card, reset the position instantly
      currentIndex = 0;
      testimonialWrapper.style.transition = 'none'; // No transition for instant reset
      testimonialWrapper.style.transform = `translateX(0)`; // Instantly reset position
      // Allow for transition again after reset
      setTimeout(() => {
        testimonialWrapper.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    } else {
      testimonialWrapper.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
    }
  
    updateSlidePosition();
  }
  
  function prevSlide() {
    currentIndex--;
  
    if (currentIndex < 0) {
      // When moving to the previous slide at the beginning, reset the position
      currentIndex = totalTestimonials - 3; // Keep the last 3 cards in view
      testimonialWrapper.style.transition = 'none'; // No transition for instant reset
      testimonialWrapper.style.transform = `translateX(-${(totalTestimonials - 3) * slideWidth}px)`; // Instant reset
      // Allow for transition again after reset
      setTimeout(() => {
        testimonialWrapper.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    } else {
      testimonialWrapper.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
    }
  
    updateSlidePosition();
  }
  
  function updateSlidePosition() {
    testimonialWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  
  // Auto-slide every 3 seconds
  setInterval(nextSlide, 3000);  // Auto-slide every 3 seconds
  
  // Update slide position on load to make sure it's positioned correctly
  updateSlidePosition();
  
  // Add hover event to stop auto-slide
  testimonialWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  testimonialWrapper.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 3000);
  });
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter-value");
    const speed = 200; // Adjust the speed for the animation
  
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-count");
        const current = +counter.innerText;
  
        const increment = target / speed;
  
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target; // Set the exact value when animation ends
        }
      };
  
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCount();
              observer.disconnect(); // Stop observing once the counter starts
            }
          });
        },
        { threshold: 0.5 } // Trigger when the section is at least 50% visible
      );
  
      observer.observe(counter);
    });
  });
      
  /* FAQ Toggle Function */
function toggleFaq(button) {
  const answer = button.parentElement.nextElementSibling;
  const isVisible = answer.style.display === "block";

  // Toggle visibility
  answer.style.display = isVisible ? "none" : "block";

  // Toggle button symbol
  button.innerText = isVisible ? "+" : "-";
}