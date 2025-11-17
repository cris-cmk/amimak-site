// Mobile navigation toggle
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Close mobile nav when clicking outside
document.addEventListener('click', function (event) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

    if (!mobileNav.contains(event.target) && !mobileNavToggle.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});

// Hero image carousel functionality
const heroImages = [
    'images/aimak1.jpg',
    'images/aimak2.jpg',
    'images/aimak3.jpg',
    'images/aimak4.jpg',
    'images/aimak5.jpg'
];
let currentHeroIndex = 0;

function changeHeroImage(direction) {
    const heroImg = document.getElementById('hero-image');
    currentHeroIndex = (currentHeroIndex + direction + heroImages.length) % heroImages.length;
    heroImg.style.opacity = '0.5';
    setTimeout(() => {
        heroImg.src = heroImages[currentHeroIndex];
        heroImg.style.opacity = '1';
    }, 300);
}

// Auto-rotate hero images every 5 seconds
setInterval(() => changeHeroImage(1), 5000);

// Navigation functionality
function navigateTo(pageId) {
    console.log('Navigating to:', pageId);

    const currentPage = document.querySelector('.page.active');
    const targetPage = document.getElementById(pageId);
    if (!targetPage || currentPage === targetPage) return;

    // Close mobile nav if open
    const mobileNav = document.getElementById('mobileNav');
    console.log('Closing mobile menu');
    mobileNav.classList.remove('active');

    // Update active navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Switch pages with smooth transition
    currentPage.classList.remove('active');

    // Small delay to ensure smooth transition
    setTimeout(() => {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'instant' });
        window.location.hash = pageId;
    }, 50);
}

// Handle hash changes
window.addEventListener('hashchange', function () {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateTo(hash);
    }
});

// Initialize page on load
window.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateTo(hash);
    } else {
        navigateTo('home');
    }
    window.scrollTo(0, 0);
});

// Additional scroll handling for page transitions
document.addEventListener('click', function (e) {
    if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    }
});