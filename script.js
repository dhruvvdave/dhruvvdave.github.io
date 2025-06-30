
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("modal-close");
  const title = document.getElementById("modal-title");
  const image = document.getElementById("modal-image");
  const desc = document.getElementById("modal-description");
  const tech = document.getElementById("modal-tech");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      title.innerText = card.dataset.title;
      image.src = card.dataset.image;
      desc.innerText = card.dataset.description;
      tech.innerText = card.dataset.tech;
      modal.style.display = "block";
    });
  });

  closeBtn.onclick = () => { modal.style.display = "none"; };
  window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };
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

