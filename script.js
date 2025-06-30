
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-section").forEach((el) => {
    fadeObserver.observe(el);
  });

  AOS.init({
    once: false, // Allow AOS to animate on scroll up and down
    duration: 800,
    easing: "ease-in-out"
  });

  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3")?.textContent || "";
      const desc = card.querySelector("p")?.textContent || "";
      const tech = card.querySelector(".tech")?.textContent || "";
      const image = card.dataset.image || "";

      modalContent.innerHTML = `
        <span class="close">&times;</span>
        <h2>${title}</h2>
        <p>${desc}</p>
        <p><strong>Technologies:</strong> ${tech}</p>
        <img src="${image}" alt="${title}" />
      `;
      modal.style.display = "block";

      modalContent.querySelector(".close").onclick = () => {
        modal.style.display = "none";
      };
    });
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
