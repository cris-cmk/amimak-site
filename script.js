// AIMAK Website JavaScript with Blog Detail Feature

// DOM Elements
const backToTopBtn = document.getElementById('backToTopBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Track if we're on a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Blog Data
const blogPosts = [
    {
        id: 1,
        title: "Annual General Meeting 2026",
        date: "26th March  2026",
        image: "images/general-meeting.avif",
        category: "Events",
        tags: ["AGM", "Meeting", "Members"],
        content: `
            <p>We are excited to announce our upcoming Annual General Meeting 2026, where we'll gather to review our achievements over the past year and chart the course for AIMAK's future development.</p>
            
            <h2>Meeting Agenda</h2>
            <p>The AGM will cover several key areas including:</p>
            <ul>
                <li>Review of 2024 achievements and milestones</li>
                <li>Financial reports and budget planning for 2025</li>
                <li>Strategic initiatives for advancing AIM standards</li>
                <li>Election of new executive committee members</li>
                <li>Member feedback and open forum discussion</li>
            </ul>
            
            <h2>Special Highlights</h2>
            <p>This year's AGM will feature special presentations on:</p>
            <ol>
                <li>ICAO's updated Annex 15 requirements</li>
                <li>Digital transformation in Aeronautical Information Services</li>
                <li>Regional collaboration opportunities</li>
                <li>Professional development programs for 2025</li>
            </ol>
            
            <h2>Participation Details</h2>
            <p>The meeting will be held at the Kenya Civil Aviation Authority Headquarters. Both physical and virtual attendance options will be available to accommodate members from different regions.</p>
            
            <blockquote>
                "This AGM represents a pivotal moment for AIMAK as we continue to elevate professional standards in aeronautical information management across Kenya and East Africa."
            </blockquote>
            
            <p>All members are encouraged to participate actively in shaping the future direction of our association.</p>
        `
    },
    {
        id: 2,
        title: "ICAO Standards Training Workshop",
        date: "October 2025",
        image: "images/ICAO.jpeg",
        category: "Training",
        tags: ["ICAO", "Workshop", "Training", "Standards"],
        content: `
            <p>Our recent ICAO Standards Training Workshop successfully equipped participants with the latest knowledge on Annex 15 updates and digital transformation initiatives.</p>
            
            <h2>Workshop Objectives</h2>
            <p>The primary objectives of this comprehensive workshop were:</p>
            <ul>
                <li>Understanding ICAO Annex 15 amendments effective from 2025</li>
                <li>Implementing digital NOTAM and AIS digitalization</li>
                <li>Quality management systems for aeronautical information</li>
                <li>Data integrity and security protocols</li>
            </ul>
            
            <h2>Key Learnings</h2>
            <p>Participants gained valuable insights into:</p>
            <ol>
                <li>Transition from AIS to AIM concepts</li>
                <li>Electronic Aeronautical Information Publication (eAIP) implementation</li>
                <li>Digital data sets and their validation</li>
                <li>Cybersecurity considerations for AIM systems</li>
            </ol>
            
            <h2>Expert Facilitation</h2>
            <p>The workshop was facilitated by international AIM experts with decades of experience in implementing ICAO standards across different regions.</p>
            
            <blockquote>
                "Digital transformation in AIM is no longer optional – it's essential for maintaining aviation safety and efficiency in the modern era."
            </blockquote>
            
            <p>Participants received certification upon completion, enhancing their professional credentials in aeronautical information management.</p>
        `
    },
    {
        id: 3,
        title: "IFAIMA Regional Conference",
        date: "September 2025",
        image: "images/conference.avif",
        category: "Conference",
        tags: ["IFAIMA", "Conference", "International"],
        content: `
            <p>AIMAK members proudly represented Kenya at the IFAIMA Regional Conference in Johannesburg, sharing our nation's experiences in AIM modernization.</p>
            
            <h2>Conference Highlights</h2>
            <p>The conference focused on several critical themes:</p>
            <ul>
                <li>Regional harmonization of AIM practices</li>
                <li>Technology adoption challenges in developing nations</li>
                <li>Capacity building and knowledge transfer</li>
                <li>Future of aeronautical information management</li>
            </ul>
            
            <h2>Kenya's Presentation</h2>
            <p>Our delegation presented on:</p>
            <ol>
                <li>Kenya's progress in AIM digitalization</li>
                <li>Challenges and solutions in local implementation</li>
                <li>Training and certification programs developed</li>
                <li>Regional collaboration initiatives</li>
            </ol>
            
            <h2>Networking Opportunities</h2>
            <p>The conference provided excellent networking opportunities with AIM professionals from across Africa and beyond, fostering collaborations that will benefit Kenya's aviation sector.</p>
            
            <blockquote>
                "Sharing our experiences at international forums helps position Kenya as a leader in AIM modernization in East Africa."
            </blockquote>
            
            <p>The knowledge gained will directly contribute to our ongoing initiatives and future strategic planning.</p>
        `
    },
    {
        id: 4,
        title: "Advanced Flight Planning Workshop",
        date: "August 2025",
        image: "images/flight-planning.jpg",
        category: "Training",
        tags: ["Flight Planning", "Workshop", "Aviation"],
        content: `
            <p>Our Advanced Flight Planning Workshop provided in-depth training on modern flight planning techniques and sector flight plan management.</p>
            
            <h2>Workshop Focus Areas</h2>
            <p>The workshop covered:</p>
            <ul>
                <li>Advanced flight planning methodologies</li>
                <li>Sector flight plan optimization</li>
                <li>Fuel efficiency calculations</li>
                <li>Weather integration in flight planning</li>
            </ul>
            
            <h2>Practical Applications</h2>
            <p>Participants worked on:</p>
            <ol>
                <li>Real-world flight planning scenarios</li>
                <li>Software tools and applications</li>
                <li>Case studies from different airspaces</li>
                <li>Emergency planning considerations</li>
            </ol>
            
            <p>The workshop combined theoretical knowledge with hands-on practical exercises for maximum learning impact.</p>
        `
    },
    {
        id: 5,
        title: "Aviation Technology Summit",
        date: "July 2025",
        image: "images/drones-futuristic-cityscape-sunset.jpg",
        category: "Technology",
        tags: ["Technology", "Innovation", "Summit"],
        content: `
            <p>AIMAK actively participated in the East Africa Aviation Technology Summit 2025, showcasing innovative solutions for modern aviation challenges.</p>
            
            <h2>Summit Themes</h2>
            <p>The summit explored:</p>
            <ul>
                <li>Emerging technologies in aviation</li>
                <li>Digital transformation strategies</li>
                <li>Sustainable aviation solutions</li>
                <li>Future air navigation systems</li>
            </ul>
            
            <h2>AIMAK's Contributions</h2>
            <p>We presented on:</p>
            <ol>
                <li>Digital AIM implementation in Kenya</li>
                <li>Collaboration with technology partners</li>
                <li>Training programs for new technologies</li>
                <li>Future roadmap for AIM in East Africa</li>
            </ol>
            
            <p>The summit highlighted the critical role of technology in advancing aviation safety and efficiency.</p>
        `
    },
    {
        id: 6,
        title: "Member Achievement Recognition",
        date: "June 2025",
        image: "images/archivement.jpg",
        category: "Recognition",
        tags: ["Achievement", "Members", "Recognition"],
        content: `
            <p>We celebrate the outstanding achievements of our members who have significantly contributed to advancing aeronautical information management standards.</p>
            
            <h2>Recognized Members</h2>
            <p>This quarter, we honor:</p>
            <ul>
                <li>Members who completed advanced certifications</li>
                <li>Contributors to AIM research and publications</li>
                <li>Innovators in process improvement</li>
                <li>Mentors supporting junior professionals</li>
            </ul>
            
            <h2>Achievement Categories</h2>
            <p>Recognitions were awarded in:</p>
            <ol>
                <li>Professional development excellence</li>
                <li>Innovation and process improvement</li>
                <li>Leadership and mentorship</li>
                <li>Research and publication contributions</li>
            </ol>
            
            <p>These recognitions highlight the talent and dedication within our AIMAK community.</p>
        `
    }
];

let currentBlogIndex = 0;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('AIMAK Website Initialized - Mobile:', isMobile);

    // Initialize all components
    initEventListeners();
    initNavigation();
    initHeroSlider();
    initStatsCounter();
    initCountdownTimer();
    initScrollAnimations();
    initNewsletterForm();
    initFAQs();
    initSmoothScrolling();
    initImageLazyLoading();
    fixMobileIssues();
    initBlog();

    // Load saved theme
    loadTheme();

    // Handle initial page load
    handleInitialPageLoad();

    // Handle blog navigation on hash change
    window.addEventListener('hashchange', handleBlogNavigation);

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

// Initialize Blog Functionality
function initBlog() {
    console.log('Initializing blog functionality...');

    // Add event listeners to all "Read More" links
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach((link, index) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const blogId = parseInt(this.getAttribute('data-id'));
            const blogIndex = blogPosts.findIndex(post => post.id === blogId);
            if (blogIndex !== -1) {
                showBlogDetail(blogIndex);
            }
        });
    });

    // Add event listener for back button
    const backToBlogBtn = document.getElementById('backToBlog');
    if (backToBlogBtn) {
        backToBlogBtn.addEventListener('click', function (e) {
            e.preventDefault();
            hideBlogDetail();
        });
    }

    // Add event listeners for navigation buttons
    const prevBtn = document.getElementById('prev-blog');
    const nextBtn = document.getElementById('next-blog');

    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousBlog);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextBlog);
    }

    // Add event listeners for share buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function () {
            const platform = this.getAttribute('data-platform');
            shareBlog(platform);
        });
    });

    // Add click event to related articles
    document.addEventListener('click', function (e) {
        if (e.target.closest('.related-article')) {
            const article = e.target.closest('.related-article');
            const blogId = parseInt(article.getAttribute('data-id'));
            if (blogId) {
                const blogIndex = blogPosts.findIndex(post => post.id === blogId);
                if (blogIndex !== -1) {
                    showBlogDetail(blogIndex);
                }
            }
        }
    });
}

// Initialize Navigation
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
    const allNavLinks = document.querySelectorAll('.nav-link, .footer-nav-link, .learn-more-btn, .join-us-btn, .view-all-benefits, .view-all-news, .register-event-btn, .apply-now-btn, .service-link');

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

        // If showing news page, ensure blog list is visible
        if (pageId === 'news') {
            const blogList = document.querySelector('#news .content-section');
            const blogDetail = document.getElementById('blog-detail');

            if (blogList && blogDetail) {
                blogList.style.display = 'block';
                blogDetail.style.display = 'none';
            }
        }

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

// Show blog detail
function showBlogDetail(index) {
    console.log('Showing blog detail for index:', index);

    if (index < 0 || index >= blogPosts.length) {
        console.error('Invalid blog index:', index);
        return;
    }

    currentBlogIndex = index;
    const blog = blogPosts[index];

    // Update blog detail elements
    document.getElementById('blog-detail-title').textContent = blog.title;
    document.getElementById('blog-detail-date').textContent = blog.date;
    document.getElementById('blog-detail-category').textContent = blog.category;
    document.getElementById('blog-detail-image').src = blog.image;
    document.getElementById('blog-detail-image').alt = blog.title;

    // Use innerHTML to properly render HTML content
    document.getElementById('blog-detail-article').innerHTML = blog.content;

    // Update tags
    const tagsContainer = document.getElementById('blog-detail-tags');
    tagsContainer.innerHTML = '';
    blog.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    // Update navigation buttons
    updateNavigationButtons();

    // Show blog detail and hide blog list
    const blogList = document.querySelector('#news .content-section');
    const blogDetail = document.getElementById('blog-detail');

    if (blogList && blogDetail) {
        blogList.style.display = 'none';
        blogDetail.style.display = 'block';

        // Scroll to top of blog detail
        blogDetail.scrollIntoView({ behavior: 'smooth' });
    }

    // Update URL hash without scrolling
    window.history.pushState({ blogId: blog.id }, '', `#blog-${blog.id}`);

    // Load related articles
    loadRelatedArticles(index);
}

// Hide blog detail
function hideBlogDetail() {
    const blogList = document.querySelector('#news .content-section');
    const blogDetail = document.getElementById('blog-detail');

    if (blogList && blogDetail) {
        blogList.style.display = 'block';
        blogDetail.style.display = 'none';

        // Scroll to top of blog section
        document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
    }

    // Update URL hash
    window.history.pushState(null, '', '#news');
}

// Show previous blog
function showPreviousBlog() {
    if (currentBlogIndex > 0) {
        showBlogDetail(currentBlogIndex - 1);
    }
}

// Show next blog
function showNextBlog() {
    if (currentBlogIndex < blogPosts.length - 1) {
        showBlogDetail(currentBlogIndex + 1);
    }
}

// Update navigation buttons state
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-blog');
    const nextBtn = document.getElementById('next-blog');

    if (prevBtn) {
        prevBtn.style.opacity = currentBlogIndex > 0 ? '1' : '0.5';
        prevBtn.style.cursor = currentBlogIndex > 0 ? 'pointer' : 'not-allowed';
        prevBtn.disabled = currentBlogIndex === 0;
    }

    if (nextBtn) {
        nextBtn.style.opacity = currentBlogIndex < blogPosts.length - 1 ? '1' : '0.5';
        nextBtn.style.cursor = currentBlogIndex < blogPosts.length - 1 ? 'pointer' : 'not-allowed';
        nextBtn.disabled = currentBlogIndex === blogPosts.length - 1;
    }
}

// Load related articles
function loadRelatedArticles(currentIndex) {
    const relatedContainer = document.getElementById('related-articles');
    if (!relatedContainer) return;

    // Filter related articles (excluding current)
    const relatedPosts = blogPosts
        .filter((post, index) => index !== currentIndex && post.category === blogPosts[currentIndex].category)
        .slice(0, 3); // Show max 3 related articles

    relatedContainer.innerHTML = '';

    if (relatedPosts.length === 0) {
        relatedContainer.innerHTML = '<p class="no-related">No related articles found.</p>';
        return;
    }

    relatedPosts.forEach(post => {
        const articleElement = document.createElement('div');
        articleElement.className = 'related-article';
        articleElement.setAttribute('data-id', post.id);

        articleElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="related-article-content">
                <h4>${post.title}</h4>
                <p>${post.date} • ${post.category}</p>
            </div>
        `;

        relatedContainer.appendChild(articleElement);
    });
}

// Share blog on social media
function shareBlog(platform) {
    const blog = blogPosts[currentBlogIndex];
    const url = window.location.href.split('#')[0] + `#blog-${blog.id}`;
    const text = `Check out this article from AIMAK: ${blog.title}`;

    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
            break;
    }

    if (platform === 'email') {
        window.location.href = shareUrl;
    } else {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Handle blog navigation from URL hash
function handleBlogNavigation() {
    const hash = window.location.hash;

    if (hash.startsWith('#blog-')) {
        const blogId = parseInt(hash.replace('#blog-', ''));
        const blogIndex = blogPosts.findIndex(post => post.id === blogId);

        if (blogIndex !== -1) {
            // Show news page first
            showPage('news');
            // Then show blog detail
            setTimeout(() => {
                showBlogDetail(blogIndex);
            }, 100);
        }
    } else if (hash === '#news') {
        hideBlogDetail();
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

// Mobile Navigation Toggle
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
    const eventDate = new Date('March 26, 2026 09:00:00').getTime();

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
                this.classList.contains('service-link') ||
                this.classList.contains('read-more-btn')) {
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
window.showBlogDetail = showBlogDetail;
window.hideBlogDetail = hideBlogDetail;