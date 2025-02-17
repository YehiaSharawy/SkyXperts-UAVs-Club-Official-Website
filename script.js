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

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  if (cards.length === 0) {
    console.error("No cards found in the DOM.");
    return;
  }

  cards.forEach((card) => {
    let bounds;
    const glow = document.createElement("div");
    glow.classList.add("glow-effect");
    card.appendChild(glow);

    function rotateToMouse(event) {
      if (!bounds) return;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const leftOffset = mouseX - bounds.x;
      const topOffset = mouseY - bounds.y;

      const center = {
        x: leftOffset - bounds.width / 2,
        y: topOffset - bounds.height / 2,
      };

      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      card.style.transform = `
                scale3d(1.1, 1.1, 1.1)
                rotate3d(
                    ${-center.y / 100},
                    ${center.x / 100},
                    0,
                    ${Math.log(distance) * 2}deg
                )
            `;

      glow.style.background = `radial-gradient(circle at ${leftOffset}px ${topOffset}px, rgba(220, 20, 60, 0.2), rgba(220, 20, 60, 0) 50%)`;
    }

    function createParticles() {
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        card.appendChild(particle);

        // Random start position inside the card
        const startX = Math.random() * card.clientWidth;
        const startY = Math.random() * card.clientHeight;
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        // Move particles outward
        const x = (Math.random() - 0.5) * 150;
        const y = (Math.random() - 0.5) * 150;

        requestAnimationFrame(() => {
          particle.style.transform = `translate(${x}px, ${y}px)`;
          particle.style.opacity = "0";
        });

        setTimeout(() => particle.remove(), 1000);
      }
    }

    card.addEventListener("mouseenter", () => {
      bounds = card.getBoundingClientRect();
      if (!bounds) return;
      document.addEventListener("mousemove", rotateToMouse);
      glow.style.opacity = "1";
      createParticles();
      console.log("Mouse entered card");
    });

    card.addEventListener("mouseleave", () => {
      setTimeout(() => {
        document.removeEventListener("mousemove", rotateToMouse);
        card.style.transition = "transform 0.1s ease-out";
        card.style.transform = "";
        glow.style.opacity = "0";
        console.log("Mouse left card");
      }, 200);
    });
  });
});
