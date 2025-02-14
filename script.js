document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Add fade-in
          // observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove("visible"); // Remove fade-in when out of view
        }
      });
    },
    { threshold: 0.15 },
  );

  const fadeElements = document.querySelectorAll(
    ".fade-in, .border-animate, .hollow-text, .blob, .handwritten",
  );
  fadeElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  // Smooth Scroll Function
  function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollProgress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(
        0,
        startPosition + distance * easeInOutQuad(scrollProgress),
      );

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    requestAnimationFrame(animation);
  }

  // Apply Smooth Scroll to all Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      smoothScroll(target, 1200); // Adjust the duration (in ms) to control speed
    });
  });
});

let lastScrollY = window.scrollY;
const navbar = document.querySelector(".navbar-container");

window.addEventListener("scroll", function () {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 0.01) {
    navbar.classList.add("hidden");
  } else {
    navbar.classList.remove("hidden");
  }

  lastScrollY = currentScrollY;
});
