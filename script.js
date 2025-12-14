// AIMAK Website JavaScript

// DOM Elements
const backToTopBtn = document.getElementById('backToTopBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('AIMAK Website Initialized');

    // Initialize all components
    initNavigation(); // MUST BE FIRST
    initHeroSlider();
    initStatsCounter();
    initCountdownTimer();
    initScrollAnimations();
    initNewsletterForm();
    initFAQs();
    initSmoothScrolling();
    initImageLazyLoading();
    initEventListeners();

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

    // Mobile nav toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', toggleMobileNav);
    }

    // Mobile nav close
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', toggleMobileNav);
    }

    // Event page buttons
    const subscribeEventsBtn = document.getElementById('subscribeEvents');
    if (subscribeEventsBtn) {
        subscribeEventsBtn.addEventListener('click', subscribeToEvents);
    }

    const viewEventCalendarBtn = document.getElementById('viewEventCalendar');
    if (viewEventCalendarBtn) {
        viewEventCalendarBtn.addEventListener('click', viewEventCalendar);
    }

    // Past event links
    document.querySelectorAll('.view-photos').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const eventId = this.getAttribute('data-event');
            viewEventPhotos(eventId);
        });
    });

    document.querySelectorAll('.download-report').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const eventId = this.getAttribute('data-event');
            downloadEventReport(eventId);
        });
    });

    document.querySelectorAll('.view-presentation').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const eventId = this.getAttribute('data-event');
            viewEventPresentation(eventId);
        });
    });

    // Newsletter archive links
    document.querySelectorAll('.download-newsletter').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const year = this.getAttribute('data-year');
            downloadNewsletter(year);
        });
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

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (event) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            // Don't close if clicking inside the nav or on the toggle button
            if (!mobileNav.contains(event.target) &&
                event.target !== mobileNavToggle &&
                !mobileNavToggle.contains(event.target)) {
                console.log('Clicking outside - closing mobile nav');
                toggleMobileNav();
            }
        }
    }, { passive: true });

    // Also handle touch events for mobile
    document.addEventListener('touchstart', function (event) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(event.target) &&
                event.target !== mobileNavToggle &&
                !mobileNavToggle.contains(event.target)) {
                console.log('Touch outside - closing mobile nav');
                toggleMobileNav();
            }
        }
    }, { passive: true });

    // Handle window resize
    window.addEventListener('resize', function () {
        // Close mobile nav on larger screens
        if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    });

    // Handle Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMobileNav();
            }
        }
    });
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
        window.history.pushState(null, null, `#${pageId}`);

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

// Initialize Navigation - MOBILE-FIXED VERSION
function initNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const validPages = ['home', 'about', 'management', 'membership', 'events', 'news', 'contact'];

    // Function to handle navigation
    function handleNavClick(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const link = event.currentTarget;
        const href = link.getAttribute('href');

        console.log('Navigation clicked:', href);

        if (href && href.startsWith('#')) {
            const pageId = href.substring(1);

            if (validPages.includes(pageId)) {
                // Close mobile menu first if it's open
                const isMobileMenuOpen = mobileNav && mobileNav.classList.contains('active');

                console.log('Is mobile menu open?', isMobileMenuOpen);
                console.log('Navigating to:', pageId);

                if (isMobileMenuOpen) {
                    // Force close mobile nav
                    mobileNav.classList.remove('active');
                    mobileNav.classList.remove('opening');
                    document.body.style.overflow = '';
                    document.body.classList.remove('no-scroll');
                    if (mobileNavToggle) {
                        mobileNavToggle.setAttribute('aria-expanded', 'false');
                    }
                }

                // Show the page immediately
                showPage(pageId);
            }
        }

        return false;
    }

    // Remove any existing click handlers and add new ones
    navLinks.forEach(link => {
        // Clone the node to remove all existing event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);

        // Add both click and touchend for better mobile support
        newLink.addEventListener('click', handleNavClick, { passive: false });
        newLink.addEventListener('touchend', handleNavClick, { passive: false });
    });

    // Re-query after cloning
    const updatedNavLinks = document.querySelectorAll('.nav-link');
    console.log('Navigation links initialized:', updatedNavLinks.length);

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function () {
        const hash = window.location.hash.substring(1);

        if (hash && validPages.includes(hash)) {
            showPage(hash);
        } else {
            showPage('home');
        }
    });

    // Also handle button navigation
    document.addEventListener('click', function (event) {
        const btn = event.target.closest('.btn');
        if (btn && btn.getAttribute('href')?.startsWith('#')) {
            event.preventDefault();
            const href = btn.getAttribute('href');
            const pageId = href.substring(1);

            if (validPages.includes(pageId)) {
                showPage(pageId);
            }
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

// Mobile Navigation Toggle
function toggleMobileNav() {
    if (mobileNav) {
        const isOpening = !mobileNav.classList.contains('active');

        console.log('Toggling mobile nav. Opening:', isOpening);

        mobileNav.classList.toggle('active');

        // Update ARIA attributes
        if (mobileNavToggle) {
            mobileNavToggle.setAttribute('aria-expanded', isOpening);
        }

        // Update body scroll
        if (isOpening) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('no-scroll');
            mobileNav.classList.add('opening');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('no-scroll');
            mobileNav.classList.remove('opening');
        }
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
            if (this.classList.contains('nav-link')) {
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

// EVENTS PAGE FUNCTIONS

// Subscribe to events
function subscribeToEvents(event) {
    if (event) event.preventDefault();
    const email = prompt("Please enter your email address to subscribe for event updates:");

    if (email) {
        // Basic email validation
        if (email.includes('@') && email.includes('.')) {
            showNotification("Thank you! You have been subscribed to event updates.", "success");
            console.log("New subscriber:", email);
            return true;
        } else {
            showNotification("Please enter a valid email address.", "error");
            return false;
        }
    }
    return false;
}

// View event calendar
function viewEventCalendar(event) {
    if (event) event.preventDefault();

    // Create a modal with event calendar
    const modal = document.createElement('div');
    modal.className = 'event-calendar-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Upcoming Events Calendar</h3>
                <button class="close-modal" id="modalCloseBtn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="calendar-event">
                    <div class="calendar-date">March 15, 2025</div>
                    <h4>Annual General Meeting 2025</h4>
                    <p>Wilson Airport Conference Hall</p>
                    <a href="#" class="btn btn-small">Register Now</a>
                </div>
                <div class="calendar-event">
                    <div class="calendar-date">May 10, 2025</div>
                    <h4>World AIS Day Celebration</h4>
                    <p>Virtual Event</p>
                    <a href="#" class="btn btn-small">Join Webinar</a>
                </div>
                <div class="calendar-event">
                    <div class="calendar-date">August 20, 2025</div>
                    <h4>CSR Tree Planting Day</h4>
                    <p>Ngong Forest</p>
                    <a href="#" class="btn btn-small">Volunteer</a>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .event-calendar-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        .modal-content {
            background: white;
            border-radius: var(--border-radius);
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
        }
        .modal-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h3 {
            color: var(--primary-color);
            margin: 0;
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        .modal-body {
            padding: 20px;
        }
        .calendar-event {
            padding: 15px;
            border-bottom: 1px solid #eee;
        }
        .calendar-event:last-child {
            border-bottom: none;
        }
        .calendar-date {
            color: var(--accent-color);
            font-weight: 600;
            margin-bottom: 5px;
        }
        .calendar-event h4 {
            color: var(--primary-color);
            margin: 0 0 5px 0;
        }
        .btn-small {
            padding: 8px 20px;
            font-size: 0.9rem;
            margin-top: 10px;
        }
        body.dark-mode .modal-content {
            background: var(--gray-light);
            color: var(--text-color);
        }
        body.dark-mode .calendar-event {
            border-bottom-color: #444;
        }
        body.dark-mode .modal-header {
            border-bottom-color: #444;
        }
        body.dark-mode .close-modal {
            color: var(--text-color);
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Add close event
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close when clicking outside modal
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// View event photos
function viewEventPhotos(eventId) {
    showNotification(`Viewing photos for ${eventId}. This would open a photo gallery in a real implementation.`, "info");
}

// Download event report
function downloadEventReport(eventId) {
    showNotification(`Downloading report for ${eventId}. In a real implementation, this would download a PDF.`, "info");
}

// View event presentation
function viewEventPresentation(eventId) {
    showNotification(`Opening presentation for ${eventId}. In a real implementation, this would open a slideshow or PDF.`, "info");
}

// Download newsletter
function downloadNewsletter(year) {
    showNotification(`Downloading ${year} newsletter. In a real implementation, this would download a PDF.`, "info");
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.event-calendar-modal');
    if (modal) {
        modal.remove();
    }
}

// MEMBERSHIP PAGE FUNCTIONS

// Download application form
function downloadApplicationForm(event) {
    if (event) event.preventDefault();
    showNotification("Downloading membership application form. In a real implementation, this would download a PDF file.", "info");
    console.log("Membership application form downloaded");
}

// Download membership brochure
function downloadMembershipBrochure(event) {
    if (event) event.preventDefault();
    showNotification("Downloading membership brochure. In a real implementation, this would download a PDF file.", "info");
    console.log("Membership brochure downloaded");
}

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
        checkScroll();
    }, 100);
});

// Touch device detection and enhancements
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');

    // Add touch feedback for buttons
    document.addEventListener('touchstart', function () { }, { passive: true });

    // Prevent zoom on double-tap
    document.addEventListener('touchend', function (event) {
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A') {
            event.preventDefault();
        }
    }, { passive: false });
}

// Make sure all global functions are available
window.scrollToTop = scrollToTop;
window.toggleMobileNav = toggleMobileNav;
window.showPage = showPage;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.subscribeToEvents = subscribeToEvents;
window.viewEventCalendar = viewEventCalendar;
window.viewEventPhotos = viewEventPhotos;
window.downloadEventReport = downloadEventReport;
window.viewEventPresentation = viewEventPresentation;
window.downloadNewsletter = downloadNewsletter;
window.downloadApplicationForm = downloadApplicationForm;
window.downloadMembershipBrochure = downloadMembershipBrochure;
window.closeModal = closeModal;
window.showNotification = showNotification;
window.toggleTheme = toggleTheme;