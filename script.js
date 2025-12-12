// AIMAK Website JavaScript

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
    initCountdownTimer();
    initScrollAnimations();
    initNavigation();
    initNewsletterForm();
    initFAQs();

    // Load saved theme
    loadTheme();

    // Handle initial page load
    handleInitialPageLoad();
});

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
        window.history.replaceState(null, null, `#${pageId}`);

        // Scroll to top of the page smoothly
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
    checkStatsVisibility(); // Check on load
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

// Initialize Navigation
function initNavigation() {
    // Handle navigation clicks
    document.addEventListener('click', function (event) {
        const link = event.target.closest('.nav-link');
        if (link && link.getAttribute('href').startsWith('#')) {
            event.preventDefault();

            const href = link.getAttribute('href');
            const pageId = href.substring(1);
            showPage(pageId);

            // Close mobile menu if open
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMobileNav();
            }
        }
    });

    // Handle hash changes
    window.addEventListener('hashchange', function () {
        const hash = window.location.hash.substring(1);
        const validPages = ['home', 'about', 'management', 'membership', 'events', 'news', 'contact'];

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

// EVENTS PAGE FUNCTIONS

// Subscribe to events
function subscribeToEvents(event) {
    if (event) event.preventDefault();
    const email = prompt("Please enter your email address to subscribe for event updates:");

    if (email) {
        // Basic email validation
        if (email.includes('@') && email.includes('.')) {
            // In a real application, you would send this to your server
            alert("Thank you! You have been subscribed to event updates.");
            console.log("New subscriber:", email);

            // You could add an AJAX request here to send to your server
            // Example:
            // fetch('/api/subscribe', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email: email, type: 'events' })
            // });

            return true;
        } else {
            alert("Please enter a valid email address.");
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
                <button class="close-modal" onclick="closeModal()">&times;</button>
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
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);
}

// View event photos
function viewEventPhotos(eventId, e) {
    if (e) e.preventDefault();
    alert(`Viewing photos for ${eventId}. This would open a photo gallery in a real implementation.`);
    // In real implementation, open a lightbox or navigate to photo gallery
}

// Download event report
function downloadEventReport(eventId, e) {
    if (e) e.preventDefault();
    alert(`Downloading report for ${eventId}. In a real implementation, this would download a PDF.`);
    // Example download simulation:
    // const link = document.createElement('a');
    // link.href = `/reports/${eventId}.pdf`;
    // link.download = `${eventId}_report.pdf`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// View event presentation
function viewEventPresentation(eventId, e) {
    if (e) e.preventDefault();
    alert(`Opening presentation for ${eventId}. In a real implementation, this would open a slideshow or PDF.`);
}

// Download newsletter
function downloadNewsletter(year, e) {
    if (e) e.preventDefault();
    alert(`Downloading ${year} newsletter. In a real implementation, this would download a PDF.`);
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.event-calendar-modal');
    if (modal) {
        modal.remove();
    }
}

// Initialize newsletter form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('newsletterName').value;
            const email = document.getElementById('newsletterEmail').value;
            const eventUpdates = document.getElementById('eventUpdates').checked;
            const newsletter = document.getElementById('newsletterSub').checked;

            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show success message
            const message = `Thank you, ${name}! You have been subscribed to:\n` +
                (eventUpdates ? "✓ Event updates\n" : "") +
                (newsletter ? "✓ Annual newsletter\n" : "") +
                `\nConfirmation sent to: ${email}`;

            alert(message);

            // Reset form
            newsletterForm.reset();

            // In a real application, send to server
            console.log("Newsletter subscription:", { name, email, eventUpdates, newsletter });
        });
    }
}

// MEMBERSHIP PAGE FUNCTIONS

// Download application form
function downloadApplicationForm(event) {
    if (event) event.preventDefault();
    alert("Downloading membership application form. In a real implementation, this would download a PDF file.");

    // Example implementation:
    // const link = document.createElement('a');
    // link.href = '/membership/application-form.pdf';
    // link.download = 'AIMAK_Membership_Application_Form.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    // Track download
    console.log("Membership application form downloaded");
}

// Download membership brochure
function downloadMembershipBrochure(event) {
    if (event) event.preventDefault();
    alert("Downloading membership brochure. In a real implementation, this would download a PDF file.");

    // Example implementation:
    // const link = document.createElement('a');
    // link.href = '/membership/membership-brochure.pdf';
    // link.download = 'AIMAK_Membership_Brochure.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    // Track download
    console.log("Membership brochure downloaded");
}

// Initialize FAQ functionality
function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Toggle active class on question
            question.classList.toggle('active');

            // Get the answer element
            const answer = question.nextElementSibling;

            // Close other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current FAQ answer
            answer.classList.toggle('active');
        });
    });
}

// Make functions available globally
window.toggleTheme = toggleTheme;
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