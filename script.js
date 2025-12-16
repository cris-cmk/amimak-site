// AIMAK Website JavaScript - FIXED NAVIGATION VERSION

// DOM Elements
const backToTopBtn = document.getElementById('backToTopBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Track if we're on a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('AIMAK Website Initialized - Mobile:', isMobile);

    // Initialize all components
    initEventListeners();
    initNavigation(); // MUST BE CALLED BEFORE OTHER INIT FUNCTIONS
    initHeroSlider();
    initStatsCounter();
    initCountdownTimer();
    initScrollAnimations();
    initNewsletterForm();
    initFAQs();
    initSmoothScrolling();
    initImageLazyLoading();
    fixMobileIssues();

    // Load saved theme
    loadTheme();

    // Handle initial page load
    handleInitialPageLoad();

    // Add loading indicator removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Initialize all event listeners
function initEventListeners() {
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Back to top
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    // Mobile nav toggle - SIMPLIFIED
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMobileNav();
        });
    }

    // Mobile nav close
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMobileNav();
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (event) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(event.target) &&
                event.target !== mobileNavToggle &&
                !mobileNavToggle.contains(event.target)) {
                toggleMobileNav();
            }
        }
    });

    // Prevent clicks inside mobile nav from closing it
    if (mobileNav) {
        mobileNav.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Handle Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMobileNav();
            }
        }
    });

    // Carousel controls
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselDots = document.querySelectorAll('.dot');

    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => changeSlide(-1));
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', () => changeSlide(1));
    }

    carouselDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    // Fix for hero buttons on mobile
    fixHeroButtonsOnMobile();
}

// Initialize Navigation - SIMPLIFIED AND FIXED
function initNavigation() {
    console.log('Initializing navigation...');
    
    // Function to handle navigation clicks
    function handleNavClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const link = e.currentTarget;
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const pageId = href.substring(1);
            
            // Validate page ID
            const validPages = ['home', 'about', 'management', 'membership', 'events', 'news', 'contact'];
            
            if (validPages.includes(pageId)) {
                console.log('Navigating to:', pageId);
                showPage(pageId);
                
                // Close mobile nav if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    toggleMobileNav();
                }
            }
        }
    }
    
    // Add event listeners to ALL navigation links
    const allNavLinks = document.querySelectorAll('.nav-link, .footer-nav-link, .learn-more-btn, .join-us-btn, .view-all-benefits, .view-all-news, .register-event-btn, .apply-now-btn, .news-link, .service-link');
    
    allNavLinks.forEach(link => {
        // Remove existing listeners to prevent duplicates
        link.removeEventListener('click', handleNavClick);
        // Add new listener
        link.addEventListener('click', handleNavClick);
    });
    
    // Also handle footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
        link.addEventListener('click', handleNavClick);
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function () {
        const hash = window.location.hash.substring(1);
        const validPages = ['home', 'about', 'management', 'membership', 'events', 'news', 'contact'];
        
        if (hash && validPages.includes(hash)) {
            showPage(hash);
        } else {
            showPage('home');
        }
    });
}

// Fix hero buttons on mobile
function fixHeroButtonsOnMobile() {
    const heroButtons = document.querySelector('.hero-buttons');
    const carouselDots = document.querySelector('.carousel-dots');

    if (isMobile && heroButtons && carouselDots) {
        // Add extra margin to hero buttons on mobile
        heroButtons.style.marginTop = '40px';

        // Move carousel dots up on mobile
        carouselDots.style.bottom = '100px';
    }
}

// Handle initial page load and hash
function handleInitialPageLoad() {
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'about', 'management', 'membership', 'events', 'news', 'contact'];

    if (hash && validPages.includes(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
}

// Show specific page - FIXED
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
        if (window.location.hash.substring(1) !== pageId) {
            window.history.pushState(null, null, `#${pageId}`);
        }

        // Scroll to top of the page (smoothly)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Reinitialize animations for the new page
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
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

// Enhanced Theme Toggle
function toggleTheme() {
    const isDarkMode = body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('.theme-toggle i');

    if (themeIcon) {
        if (isDarkMode) {
            themeIcon.className = 'fas fa-sun';
            themeIcon.setAttribute('title', 'Switch to Light Mode');
            localStorage.setItem('theme', 'dark');

            // Add animation to icon
            themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg)';
            }, 300);
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.setAttribute('title', 'Switch to Dark Mode');
            localStorage.setItem('theme', 'light');

            // Add animation to icon
            themeIcon.style.transform = 'rotate(-360deg)';
            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg)';
            }, 300);
        }
    }

    // Dispatch custom event for theme change
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDarkMode } }));
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Use saved theme, then system preference, default to light
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
            themeIcon.setAttribute('title', 'Switch to Light Mode');
        }
    } else {
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.setAttribute('title', 'Switch to Dark Mode');
        }
    }
}

// Mobile Navigation Toggle - SIMPLIFIED
function toggleMobileNav() {
    if (!mobileNav) return;

    const isOpening = !mobileNav.classList.contains('active');

    // Toggle active class
    mobileNav.classList.toggle('active');

    // Update ARIA attributes
    if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', isOpening);
    }

    // Update body scroll
    if (isOpening) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.classList.add('no-scroll');
    } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.classList.remove('no-scroll');
    }
}

// Initialize lazy loading for images
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
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
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
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
    // Initial check in case stats are already visible
    setTimeout(checkStatsVisibility, 500);
}

// Countdown Timer
function initCountdownTimer() {
    const eventDate = new Date('December 15, 2025 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
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

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's a nav-link (handled by showPage)
            if (this.classList.contains('nav-link') || 
                this.classList.contains('footer-nav-link') ||
                this.classList.contains('learn-more-btn') ||
                this.classList.contains('join-us-btn') ||
                this.classList.contains('view-all-benefits') ||
                this.classList.contains('view-all-news') ||
                this.classList.contains('register-event-btn') ||
                this.classList.contains('apply-now-btn') ||
                this.classList.contains('news-link') ||
                this.classList.contains('service-link')) {
                return;
            }

            // Handle regular anchor links
            if (href !== '#') {
                e.preventDefault();

                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Enhanced FAQ functionality
function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        // Add ARIA attributes
        const answer = question.nextElementSibling;
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Toggle current FAQ
            question.setAttribute('aria-expanded', !isExpanded);
            answer.setAttribute('aria-hidden', isExpanded);
            question.classList.toggle('active');
            answer.classList.toggle('active');

            // Smooth height transition
            if (!isExpanded) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });
}

// Enhanced Newsletter Form with validation
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('newsletterName').value.trim();
            const email = document.getElementById('newsletterEmail').value.trim();
            const eventUpdates = document.getElementById('eventUpdates').checked;
            const newsletter = document.getElementById('newsletterSub').checked;

            // Validation
            if (!name || !email) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                const message = `Thank you, ${name}! You have been subscribed. Confirmation sent to: ${email}`;
                showNotification(message, 'success');

                // Reset form
                newsletterForm.reset();

                // Log subscription (in real app, send to server)
                console.log("Newsletter subscription:", { name, email, eventUpdates, newsletter });

            } catch (error) {
                showNotification('Something went wrong. Please try again.', 'error');
                console.error('Subscription error:', error);
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Footer newsletter form
    const footerNewsletter = document.getElementById('footerNewsletter');
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();

            if (email && validateEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" id="notificationClose">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 500px;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .notification-success {
            background: #4caf50;
            color: white;
        }
        .notification-error {
            background: #f44336;
            color: white;
        }
        .notification-info {
            background: #2196f3;
            color: white;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            margin-left: 15px;
            opacity: 0.8;
        }
        .notification-close:hover {
            opacity: 1;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        body.dark-mode .notification {
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
    `;

    // Add to document
    document.head.appendChild(style);
    document.body.appendChild(notification);

    // Add close event
    const closeBtn = document.getElementById('notificationClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Fix mobile issues
function fixMobileIssues() {
    // Prevent zoom on double tap
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // Fix for iOS 100vh issue
    function setVh() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVh();
    window.addEventListener('resize', setVh);

    // Handle window resize
    window.addEventListener('resize', function () {
        // Close mobile nav on larger screens
        if (window.innerWidth > 992 && mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }

        // Adjust hero buttons on mobile resize
        fixHeroButtonsOnMobile();
    });
}

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
        // Re-check scroll animations
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
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
    }, 100);
});

// Make sure all global functions are available
window.scrollToTop = scrollToTop;
window.toggleMobileNav = toggleMobileNav;
window.showPage = showPage;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.showNotification = showNotification;
window.toggleTheme = toggleTheme;