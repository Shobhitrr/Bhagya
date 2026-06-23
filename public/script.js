// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Scroll effect (only on home page)
if (document.body.classList.contains('page-home')) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            const siblings = [...parent.querySelectorAll('.animate-in')];
            const index = siblings.indexOf(entry.target);
            const delay = Math.min(index * 100, 400);

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL (for same-page links) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navH = navbar.offsetHeight;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - navH,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HERO ENTRANCE =====
window.addEventListener('load', () => {
    const heroEls = document.querySelectorAll('.hero .animate-in');
    heroEls.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 200 + (i * 150));
    });
});

// ===== PARALLAX ON HERO SHAPES =====
if (document.body.classList.contains('page-home')) {
    const shapes = document.querySelectorAll('.hero-shape');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        shapes.forEach((shape, i) => {
            shape.style.transform = `translateY(${scrolled * (i + 1) * 0.15}px)`;
        });
    });
}
