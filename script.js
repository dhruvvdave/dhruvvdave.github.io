
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("modal-close");
  const title = document.getElementById("modal-title");
  const image = document.getElementById("modal-image");
  const desc = document.getElementById("modal-description");
  const tech = document.getElementById("modal-tech");

  // Function to open modal
  function openModal(card) {
    title.innerText = card.dataset.title;
    image.src = card.dataset.image;
    desc.innerText = card.dataset.description;
    tech.innerText = card.dataset.tech;
    modal.style.display = "block";
  }

  cards.forEach(card => {
    // Click event
    card.addEventListener("click", () => openModal(card));
    
    // Keyboard support (Enter and Space)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  closeBtn.onclick = () => { modal.style.display = "none"; };
  window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };
  
  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
});

// Mobile hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  const isExpanded = hamburger.classList.contains('active');
  hamburger.setAttribute('aria-expanded', isExpanded);
});

// Close mobile menu when clicking on a nav link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-to-top button logic
const scrollBtn = document.getElementById('scrollToTopBtn');

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
};

scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

AOS.init({
  once: false,
  mirror: true,
  duration: 600,
  easing: 'ease-out',
});
