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
                    ${-center.y / 50},
                    ${center.x / 50},
                    0,
                    ${Math.log(distance) * 3}deg
                )
            `;

      glow.style.background = `radial-gradient(circle at ${leftOffset}px ${topOffset}px, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 50%)`;
    }

    card.addEventListener("mouseenter", () => {
      bounds = card.getBoundingClientRect();
      if (!bounds) return;
      document.addEventListener("mousemove", rotateToMouse);
      glow.style.opacity = "1";
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
