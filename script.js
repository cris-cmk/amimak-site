// Fixed JavaScript for AIMAK Website

// DOM Elements
const backToTopBtn = document.querySelector('.back-to-top');
const mobileNav = document.getElementById('mobileNav');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('AIMAK Website Initialized');

    // Initialize all components
    initHeroSlider();
    initStatsCounter();
    initScrollAnimations();
    initNavigation();

    // Load saved theme
    loadTheme();

    // Handle initial page load
    handleInitialPageLoad();
});

// Handle initial page load and hash
function handleInitialPageLoad() {
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'about', 'services', 'management', 'gallery', 'news', 'contact'];

    if (hash && validPages.includes(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
}

// Show specific page
function showPage(pageId) {
    console.log('Showing page:', pageId);

    // Hide all pages
    const allPages = document.querySelectorAll('.page-section');
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');

        // Update active navigation links
        updateActiveNav(pageId);

        // Update URL hash without scrolling
        window.history.replaceState(null, null, `#${pageId}`);

        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Update active navigation links
function updateActiveNav(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${pageId}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function changeSlide(direction) {
        clearInterval(slideInterval);
        let newIndex = (currentSlide + direction + slides.length) % slides.length;
        showSlide(newIndex);
        startAutoSlide();
    }

    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            clearInterval(slideInterval);
            showSlide(index);
            startAutoSlide();
        }
    }

    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Initialize slider
    window.changeSlide = changeSlide;
    window.goToSlide = goToSlide;

    // Show first slide
    showSlide(0);
    startAutoSlide();

    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length === 0) return;

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    function checkStatsVisibility() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
            statNumbers.forEach(animateCounter);
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    }

    window.addEventListener('scroll', checkStatsVisibility);
    checkStatsVisibility(); // Check on load
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    function checkScroll() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('visible');
                }, delay);
            }
        });

        // Back to top button visibility
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
}

// Initialize Navigation
function initNavigation() {
    // Handle navigation clicks
    document.addEventListener('click', function (event) {
        const link = event.target.closest('.nav-link');
        if (link) {
            event.preventDefault();

            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const pageId = href.substring(1);
                showPage(pageId);

                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    toggleMobileNav();
                }
            }
        }
    });

    // Handle hash changes
    window.addEventListener('hashchange', function () {
        const hash = window.location.hash.substring(1);
        const validPages = ['home', 'about', 'services', 'management', 'gallery', 'news', 'contact'];

        if (hash && validPages.includes(hash)) {
            showPage(hash);
        }
    });
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    if (mobileNav) {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Close mobile nav when clicking outside
document.addEventListener('click', function (event) {
    if (mobileNav && mobileNavToggle) {
        if (!mobileNav.contains(event.target) &&
            !mobileNavToggle.contains(event.target) &&
            mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    }
});

// Close mobile nav on escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        toggleMobileNav();
    }
});

// Handle window resize
window.addEventListener('resize', function () {
    // Close mobile nav on larger screens
    if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
        toggleMobileNav();
    }
});

// Initialize window functions
window.toggleTheme = toggleTheme;
window.scrollToTop = scrollToTop;
window.toggleMobileNav = toggleMobileNav;
window.showPage = showPage;