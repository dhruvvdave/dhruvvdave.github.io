// ===== Theme Toggle (Dark/Light Mode) =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or system preference
function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// Apply theme
function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.content = theme === 'light' ? '#f8fafc' : '#0a192f';
    }
}

// Initialize theme
applyTheme(getThemePreference());

// Theme toggle click handler
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });

    // Close mobile menu when clicking on a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===== Scroll Progress Bar =====
function updateProgressBar() {
    const bar = document.getElementById('progress-bar');
    if (bar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateProgressBar, { passive: true });
updateProgressBar();

// ===== Scroll to Top Button =====
const scrollBtn = document.getElementById('scrollToTopBtn');

function updateScrollButton() {
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
}

window.addEventListener('scroll', updateScrollButton, { passive: true });

if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Project Modal =====
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDesc = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');

    function openModal(card) {
        if (modal && modalTitle && modalImage && modalDesc && modalTech) {
            modalTitle.innerText = card.dataset.title || '';
            modalImage.src = card.dataset.image || '';
            modalImage.alt = (card.dataset.title || 'Project') + ' preview';
            modalDesc.innerText = card.dataset.description || '';
            modalTech.innerText = card.dataset.tech || '';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// ===== Project Filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects-grid .project-card');
const projectSearch = document.getElementById('project-search');
const noProjectsMessage = document.getElementById('no-projects-message');

let currentFilter = 'all';
let currentSearch = '';

function filterProjects() {
    let visibleCount = 0;
    
    projectCards.forEach(card => {
        const category = card.dataset.category || '';
        const title = (card.dataset.title || '').toLowerCase();
        const tech = (card.dataset.tech || '').toLowerCase();
        const description = (card.dataset.description || '').toLowerCase();
        
        const matchesFilter = currentFilter === 'all' || category.includes(currentFilter);
        const matchesSearch = currentSearch === '' || 
            title.includes(currentSearch) || 
            tech.includes(currentSearch) ||
            description.includes(currentSearch);
        
        if (matchesFilter && matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    if (noProjectsMessage) {
        noProjectsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterProjects();
    });
});

if (projectSearch) {
    projectSearch.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        filterProjects();
    });
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn?.querySelector('.btn-text');
const btnLoading = submitBtn?.querySelector('.btn-loading');
const formSuccess = document.getElementById('form-success');
const formErrorMessage = document.getElementById('form-error-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset messages
        if (formSuccess) formSuccess.style.display = 'none';
        if (formErrorMessage) formErrorMessage.style.display = 'none';
        
        // Validate form
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        if (!name.value.trim()) {
            showError('name-error', 'Please enter your name');
            isValid = false;
        } else {
            clearError('name-error');
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('email-error');
        }
        
        if (!message.value.trim()) {
            showError('message-error', 'Please enter a message');
            isValid = false;
        } else {
            clearError('message-error');
        }
        
        if (!isValid) return;
        
        // Show loading state
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'flex';
        if (submitBtn) submitBtn.disabled = true;
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                contactForm.reset();
                if (formSuccess) formSuccess.style.display = 'block';
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            if (formErrorMessage) formErrorMessage.style.display = 'block';
        } finally {
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

function showError(id, message) {
    const errorEl = document.getElementById(id);
    if (errorEl) errorEl.textContent = message;
}

function clearError(id) {
    const errorEl = document.getElementById(id);
    if (errorEl) errorEl.textContent = '';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Typing Animation =====
const typedText = document.getElementById('typed-text');
const words = [
    'Computer Science Student',
    'Full-Stack Developer',
    'Tech Enthusiast',
    'Problem Solver',
    'Software Engineer in Progress'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typedText) return;
    
    const current = words[wordIndex];
    
    if (isDeleting) {
        charIndex--;
        typedText.textContent = current.substring(0, charIndex);
        if (charIndex <= 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    } else {
        charIndex++;
        typedText.textContent = current.substring(0, charIndex);
        if (charIndex >= current.length) {
            isDeleting = true;
            setTimeout(type, 1500); // Pause before deleting
            return;
        }
    }
    
    setTimeout(type, isDeleting ? 50 : 100);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 500);
});

// ===== AOS Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: false,
            mirror: true,
            duration: 600,
            easing: 'ease-out',
            offset: 50
        });
    }
});

// ===== Easter Egg: Terminal Command =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showEasterEgg();
    }
});

function showEasterEgg() {
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = `
        <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,25,47,0.95);z-index:10000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s ease;">
            <div style="background:#112240;border:1px solid #64ffda;border-radius:12px;padding:2rem;max-width:500px;text-align:center;">
                <h3 style="color:#64ffda;margin-bottom:1rem;">🎮 You found the Easter Egg!</h3>
                <p style="color:#8892b0;margin-bottom:1rem;">Thanks for exploring! Here's a secret: I built this entire portfolio to showcase my skills. The Konami code never fails to impress.</p>
                <p style="color:#ccd6f6;font-family:monospace;">console.log("Hello, curious developer!");</p>
                <button onclick="this.parentElement.parentElement.remove()" style="margin-top:1rem;padding:0.5rem 1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;font-weight:600;">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(easterEgg);
}

// ===== Smooth Scroll for CTA buttons =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px 0px' });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
