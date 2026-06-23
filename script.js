// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay based on element position among siblings
            const siblings = entry.target.parentElement.querySelectorAll('.animate-in');
            let delay = 0;
            siblings.forEach((sibling, i) => {
                if (sibling === entry.target) {
                    delay = i * 100;
                }
            });

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, Math.min(delay, 400));

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animate-in elements
document.querySelectorAll('.animate-in').forEach(el => {
    observer.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== TYPING EFFECT FOR HERO (subtle) =====
const heroGreeting = document.querySelector('.hero-greeting');
if (heroGreeting) {
    heroGreeting.style.opacity = '0';
    setTimeout(() => {
        heroGreeting.style.opacity = '1';
        heroGreeting.style.transition = 'opacity 0.6s ease';
    }, 300);
}

// ===== PARALLAX EFFECT ON HERO SHAPES =====
const heroShapes = document.querySelectorAll('.hero-shape, .hero-shape-2');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroShapes.forEach((shape, i) => {
        const speed = (i + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero animations with stagger
    const heroElements = document.querySelectorAll('.hero .animate-in');
    heroElements.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 + (i * 150));
    });
});
