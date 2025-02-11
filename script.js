document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Add fade-in
        } else {
          entry.target.classList.remove("visible"); // Remove fade-in when out of view
        }
      });
    },
    { threshold: 0.15 },
  );

  const fadeElements = document.querySelectorAll(
    ".fade-in, .border-animate, .hollow-text, .blob",
  );
  fadeElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate"); // Start animation when visible
        } else {
          entry.target.classList.remove("animate"); // Remove if you want it to re-trigger on scroll
        }
      });
    },
    { threshold: 0.15 },
  );

  const handwritingElements = document.querySelectorAll(".handwritten");
  handwritingElements.forEach((el) => observer.observe(el));
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
