/* ============================================
   MAIN JAVASCRIPT FILE
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functions
    initPreloader();
    initAOS();
    initFloatingParticles();
    initTypewriter();
    initStatsCounter();
});

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function () {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Enable scrolling
            document.body.style.overflow = 'visible';
        }, 2000);
    });

    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';
}

/* ============================================
   AOS (Animate On Scroll) INITIALIZATION
   ============================================ */
function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 100
    });
}

/* ============================================
   FLOATING PARTICLES
   ============================================ */
function initFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    const foodEmojis = ['🍕', '🍔', '🍣', '🍷', '🥗', '🍰', '🍝', '🥘', '🍜', '🥂', '🧁', '🍤'];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, foodEmojis);
    }
}

function createParticle(container, emojis) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';

    container.appendChild(particle);
}

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        'Fine Dining',
        'Culinary Excellence',
        'Gourmet Cuisine',
        'Unforgettable Taste',
        'Premium Quality'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a delay
    setTimeout(type, 2500);
}

/* ============================================
   STATS COUNTER ANIMATION
   ============================================ */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseFloat(stat.getAttribute('data-target'));
                animateCounter(stat, target);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;

        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   PARALLAX EFFECT ON SCROLL
   ============================================ */
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const decorations = document.querySelectorAll('.deco-circle');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }

    decorations.forEach((deco, index) => {
        const speed = (index + 1) * 0.1;
        deco.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
    });
});
/* ============================================
   NAVIGATION FUNCTIONALITY
   ============================================ */

// Initialize Navigation
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initScrollEffects();
    initActiveNavHighlight();
});

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    // Toggle Mobile Menu
    navToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on overlay click
    navOverlay.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 992) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Mobile Dropdown Toggle
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');

        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                item.classList.toggle('open');

                // Close other dropdowns
                dropdownItems.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('open');
                    }
                });
            }
        });
    });
}

/* ============================================
   SCROLL EFFECTS
   ============================================ */
function initScrollEffects() {
    const header = document.getElementById('header');
    const quickBar = document.getElementById('quickBar');
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Header Background on Scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/Show Header on Scroll Direction
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scrolling Down
            header.classList.add('hidden');
        } else {
            // Scrolling Up
            header.classList.remove('hidden');
        }

        // Quick Bar Visibility
        if (currentScroll > 300) {
            quickBar.classList.add('visible');
        } else {
            quickBar.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });
}

/* ============================================
   ACTIVE NAV LINK HIGHLIGHTING
   ============================================ */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   CART FUNCTIONALITY (Basic)
   ============================================ */
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    cartCount.textContent = totalItems;

    if (totalItems === 0) {
        cartCount.classList.add('empty');
    } else {
        cartCount.classList.remove('empty');
        // Add animation
        cartCount.style.animation = 'none';
        setTimeout(() => {
            cartCount.style.animation = 'cartPulse 0.5s ease';
        }, 10);
    }
}

// Initialize cart count on load
document.addEventListener('DOMContentLoaded', updateCartCount);

/* ============================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================ */
document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            e.preventDefault();

            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   KEYBOARD NAVIGATION ACCESSIBILITY
   ============================================ */
document.addEventListener('keydown', function (e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navOverlay = document.getElementById('navOverlay');

        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});
/* ============================================
   ABOUT SECTION ANIMATIONS
   ============================================ */

// Initialize About Section
document.addEventListener('DOMContentLoaded', function () {
    initAboutStatsCounter();
    initParallaxEffect();
    initTimelineAnimation();
});

/* ============================================
   STATS COUNTER FOR ABOUT SECTION
   ============================================ */
function initAboutStatsCounter() {
    const statCounters = document.querySelectorAll('.stat-counter');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateStatCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    statCounters.forEach(counter => observer.observe(counter));
}

function animateStatCounter(element, target) {
    const duration = 2500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(target * easeOutExpo);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ============================================
   PARALLAX EFFECT
   ============================================ */
function initParallaxEffect() {
    const parallaxBg = document.querySelector('.parallax-bg');

    if (parallaxBg) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const section = parallaxBg.closest('section');

            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrolled >= sectionTop - window.innerHeight &&
                    scrolled <= sectionTop + sectionHeight) {
                    const yPos = (scrolled - sectionTop) * 0.3;
                    parallaxBg.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    }
}

/* ============================================
   TIMELINE ANIMATION
   ============================================ */
function initTimelineAnimation() {
    const timelineLine = document.querySelector('.timeline-line');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (!timelineLine || timelineItems.length === 0) return;

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => observer.observe(item));

    // Animate timeline line on scroll
    window.addEventListener('scroll', function () {
        const timelineSection = document.querySelector('.timeline-section');
        if (!timelineSection) return;

        const sectionTop = timelineSection.offsetTop;
        const sectionHeight = timelineSection.offsetHeight;
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        if (scrolled >= sectionTop - windowHeight &&
            scrolled <= sectionTop + sectionHeight) {
            const progress = (scrolled - sectionTop + windowHeight) / (sectionHeight + windowHeight);
            const lineHeight = Math.min(progress * 100, 100);
            timelineLine.style.background = `linear-gradient(to bottom, 
                var(--primary-gold) ${lineHeight}%, 
                rgba(212, 168, 83, 0.2) ${lineHeight}%)`;
        }
    });
}

/* ============================================
   IMAGE GALLERY LIGHTBOX (Optional Enhancement)
   ============================================ */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('.gallery-img');
            const src = img.src;
            const alt = img.alt;

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="${src}" alt="${alt}">
                    <p class="lightbox-caption">${alt}</p>
                </div>
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Animate in
            setTimeout(() => lightbox.classList.add('active'), 10);

            // Close handlers
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) closeLightbox();
            });

            function closeLightbox() {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });
}



// Add this CSS for lightbox (add to style.css)
/*
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lightbox.active {
    opacity: 1;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: var(--radius-md);
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
}

.lightbox-caption {
    text-align: center;
    color: var(--text-muted);
    margin-top: 15px;
}
*/

/* ============================================
   CHEF CARDS HOVER EFFECT
   ============================================ */
document.querySelectorAll('.chef-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.querySelector('.chef-image').style.transform = 'scale(1.1)';
    });

    card.addEventListener('mouseleave', function () {
        this.querySelector('.chef-image').style.transform = 'scale(1)';
    });
});

/* ============================================
   SCROLL REVEAL FOR TIMELINE ITEMS
   ============================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}
/* ============================================
   MENU SECTION FUNCTIONALITY
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initMenuFilter();
    initMenuSearch();
    initQuickViewModal();
    initAddToCart();
});

/* ============================================
   MENU FILTER TABS
   ============================================ */
function initMenuFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const menuCards = document.querySelectorAll('.menu-card');
    const noResults = document.getElementById('noResults');
    const resetBtn = document.getElementById('resetFilters');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            filterMenuItems(filter);
        });
    });

    // Reset filters button
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            filterTabs.forEach(t => t.classList.remove('active'));
            document.querySelector('[data-filter="all"]').classList.add('active');
            document.getElementById('menuSearch').value = '';
            filterMenuItems('all');
        });
    }
}

function filterMenuItems(filter) {
    const menuCards = document.querySelectorAll('.menu-card');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;

    menuCards.forEach((card, index) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
            card.classList.remove('hidden', 'fade-out');
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.05}s`;
            visibleCount++;
        } else {
            card.classList.add('fade-out');
            setTimeout(() => {
                card.classList.add('hidden');
                card.classList.remove('fade-out');
            }, 300);
        }
    });

    // Show/hide no results message
    setTimeout(() => {
        if (visibleCount === 0) {
            noResults.classList.add('show');
        } else {
            noResults.classList.remove('show');
        }
    }, 350);
}

/* ============================================
   MENU SEARCH
   ============================================ */
function initMenuSearch() {
    const searchInput = document.getElementById('menuSearch');
    const menuCards = document.querySelectorAll('.menu-card');
    const noResults = document.getElementById('noResults');

    if (!searchInput) return;

    let searchTimeout;

    searchInput.addEventListener('input', function () {
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;

            // Reset filter tabs
            document.querySelectorAll('.filter-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector('[data-filter="all"]').classList.add('active');

            menuCards.forEach(card => {
                const title = card.querySelector('.menu-title').textContent.toLowerCase();
                const description = card.querySelector('.menu-description').textContent.toLowerCase();
                const category = card.dataset.category.toLowerCase();

                const matches = title.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    category.includes(searchTerm);

                if (matches || searchTerm === '') {
                    card.classList.remove('hidden');
                    card.classList.add('fade-in');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('fade-in');
                }
            });

            // Show/hide no results
            if (visibleCount === 0 && searchTerm !== '') {
                noResults.classList.add('show');
            } else {
                noResults.classList.remove('show');
            }
        }, 300);
    });
}

/* ============================================
   QUICK VIEW MODAL
   ============================================ */
function initQuickViewModal() {
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.getElementById('modalClose');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');

    // Menu data for modal
    const menuData = {
        1: {
            name: 'Classic Bruschetta',
            category: 'Starters',
            price: 12.99,
            rating: 4.8,
            description: 'Grilled bread rubbed with garlic, topped with fresh tomatoes, basil, olive oil, and a hint of balsamic glaze. A perfect start to your dining experience.',
            time: '10 min',
            calories: '180 cal',
            serving: '1 serving',
            ingredients: ['Ciabatta Bread', 'Fresh Tomatoes', 'Basil', 'Garlic', 'Olive Oil', 'Balsamic Glaze'],
            image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600'
        },
        2: {
            name: 'French Onion Soup',
            category: 'Starters',
            price: 9.99,
            rating: 4.9,
            description: 'Rich beef broth with caramelized onions, topped with a crusty baguette and melted Gruyère cheese. A timeless French classic.',
            time: '15 min',
            calories: '220 cal',
            serving: '1 bowl',
            ingredients: ['Beef Broth', 'Caramelized Onions', 'Gruyère Cheese', 'Baguette', 'Thyme', 'Bay Leaves'],
            image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600'
        },
        3: {
            name: 'Truffle Arancini',
            category: 'Starters',
            price: 18.99,
            rating: 5.0,
            description: 'Crispy risotto balls infused with black truffle, filled with melted mozzarella, and served with truffle aioli. Chef\'s signature creation.',
            time: '20 min',
            calories: '320 cal',
            serving: '4 pieces',
            ingredients: ['Arborio Rice', 'Black Truffle', 'Mozzarella', 'Parmesan', 'Truffle Oil', 'Panko Breadcrumbs'],
            image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600'
        },
        4: {
            name: 'Wagyu Ribeye Steak',
            category: 'Main Course',
            price: 38.99,
            rating: 4.9,
            description: 'Premium A5 Wagyu beef, grilled to your preference, served with truffle mashed potatoes, seasonal vegetables, and red wine reduction.',
            time: '25 min',
            calories: '650 cal',
            serving: '1 serving',
            ingredients: ['A5 Wagyu Beef', 'Truffle', 'Potatoes', 'Asparagus', 'Red Wine', 'Butter'],
            image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600'
        },
        5: {
            name: 'Herb Roasted Chicken',
            category: 'Main Course',
            price: 28.99,
            rating: 4.7,
            description: 'Free-range chicken roasted with fresh rosemary and thyme, served with roasted root vegetables and natural jus.',
            time: '30 min',
            calories: '520 cal',
            serving: '1 serving',
            ingredients: ['Free-Range Chicken', 'Rosemary', 'Thyme', 'Garlic', 'Root Vegetables', 'Lemon'],
            image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'
        },
        6: {
            name: 'Truffle Mushroom Pasta',
            category: 'Main Course',
            price: 24.99,
            rating: 4.8,
            description: 'Fresh homemade fettuccine tossed with wild mushrooms, black truffle oil, and creamy parmesan sauce.',
            time: '20 min',
            calories: '480 cal',
            serving: '1 serving',
            ingredients: ['Fresh Fettuccine', 'Wild Mushrooms', 'Black Truffle Oil', 'Parmesan', 'Heavy Cream', 'Garlic'],
            image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600'
        },
        7: {
            name: 'Grilled Lamb Chops',
            category: 'Main Course',
            price: 45.99,
            rating: 5.0,
            description: 'New Zealand lamb chops marinated in herbs, grilled to perfection, served with mint chimichurri and roasted fingerling potatoes.',
            time: '35 min',
            calories: '580 cal',
            serving: '4 chops',
            ingredients: ['NZ Lamb Chops', 'Fresh Mint', 'Parsley', 'Garlic', 'Olive Oil', 'Fingerling Potatoes'],
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600'
        },
        8: {
            name: 'Atlantic Grilled Salmon',
            category: 'Seafood',
            price: 32.99,
            rating: 4.9,
            description: 'Fresh Atlantic salmon fillet, grilled and glazed with lemon butter sauce, served with seasonal vegetables and quinoa.',
            time: '20 min',
            calories: '420 cal',
            serving: '1 fillet',
            ingredients: ['Atlantic Salmon', 'Lemon', 'Butter', 'Dill', 'Quinoa', 'Asparagus'],
            image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600'
        },
        9: {
            name: 'Butter Poached Lobster',
            category: 'Seafood',
            price: 58.99,
            rating: 5.0,
            description: 'Maine lobster tail gently poached in herb butter, served with drawn butter, grilled lemon, and seasonal sides.',
            time: '25 min',
            calories: '380 cal',
            serving: '1 tail',
            ingredients: ['Maine Lobster', 'Clarified Butter', 'Fresh Herbs', 'Lemon', 'Chives', 'Sea Salt'],
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600'
        },
        10: {
            name: 'Premium Sushi Platter',
            category: 'Seafood',
            price: 42.99,
            rating: 4.9,
            description: 'Chef\'s selection of 12 premium nigiri pieces featuring fresh salmon, tuna, yellowtail, and seasonal fish.',
            time: '15 min',
            calories: '340 cal',
            serving: '12 pieces',
            ingredients: ['Fresh Salmon', 'Bluefin Tuna', 'Yellowtail', 'Sushi Rice', 'Wasabi', 'Pickled Ginger'],
            image: 'https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=600'
        },
        11: {
            name: 'Chocolate Lava Cake',
            category: 'Desserts',
            price: 14.99,
            rating: 5.0,
            description: 'Warm chocolate cake with a molten center, served with vanilla bean ice cream and fresh berries.',
            time: '12 min',
            calories: '450 cal',
            serving: '1 cake',
            ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Vanilla Ice Cream', 'Fresh Berries'],
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600'
        },
        12: {
            name: 'Classic Tiramisu',
            category: 'Desserts',
            price: 12.99,
            rating: 4.8,
            description: 'Layers of espresso-soaked ladyfingers and creamy mascarpone, dusted with premium cocoa powder.',
            time: '5 min',
            calories: '380 cal',
            serving: '1 slice',
            ingredients: ['Mascarpone', 'Espresso', 'Ladyfingers', 'Eggs', 'Cocoa Powder', 'Marsala Wine'],
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600'
        },
        13: {
            name: 'French Crème Brûlée',
            category: 'Desserts',
            price: 11.99,
            rating: 4.7,
            description: 'Rich vanilla custard with a perfectly caramelized sugar crust, served with fresh mint.',
            time: '8 min',
            calories: '320 cal',
            serving: '1 ramekin',
            ingredients: ['Heavy Cream', 'Vanilla Bean', 'Egg Yolks', 'Sugar', 'Fresh Mint'],
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600'
        },
        14: {
            name: 'Château Bordeaux',
            category: 'Drinks',
            price: 18.99,
            rating: 4.9,
            description: 'Premium French red wine with elegant notes of blackberry, cassis, and subtle oak undertones.',
            time: '2 min',
            calories: '125 cal',
            serving: '150ml glass',
            ingredients: ['Cabernet Sauvignon', 'Merlot', 'Aged in Oak Barrels'],
            image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=600'
        },
        15: {
            name: 'Signature Royale Martini',
            category: 'Drinks',
            price: 15.99,
            rating: 4.8,
            description: 'House special cocktail with premium vodka, elderflower liqueur, and a splash of champagne.',
            time: '5 min',
            calories: '180 cal',
            serving: '120ml',
            ingredients: ['Premium Vodka', 'Elderflower Liqueur', 'Champagne', 'Lemon Twist'],
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600'
        },
        16: {
            name: 'Fresh Detox Blend',
            category: 'Drinks',
            price: 8.99,
            rating: 4.6,
            description: 'Freshly pressed green juice with apple, celery, ginger, and lemon. Healthy and refreshing.',
            time: '5 min',
            calories: '85 cal',
            serving: '300ml',
            ingredients: ['Green Apple', 'Celery', 'Fresh Ginger', 'Lemon', 'Cucumber', 'Spinach'],
            image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600'
        }
    };

    // Open modal
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const itemId = this.dataset.id;
            const item = menuData[itemId];

            if (item) {
                populateModal(item, itemId);
                openModal();
            }
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on overlay click
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Quantity controls
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyInput = document.getElementById('qtyInput');

    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', function () {
            let value = parseInt(qtyInput.value);
            if (value > 1) {
                qtyInput.value = value - 1;
            }
        });

        qtyPlus.addEventListener('click', function () {
            let value = parseInt(qtyInput.value);
            if (value < 10) {
                qtyInput.value = value + 1;
            }
        });

        qtyInput.addEventListener('change', function () {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        });
    }

    // Add to cart from modal
    const addToCartModal = document.getElementById('addToCartModal');
    if (addToCartModal) {
        addToCartModal.addEventListener('click', function () {
            const itemId = this.dataset.id;
            const itemName = document.getElementById('modalTitle').textContent;
            const itemPrice = parseFloat(document.getElementById('modalPrice').textContent.replace('$', ''));
            const quantity = parseInt(document.getElementById('qtyInput').value);

            addItemToCart(itemId, itemName, itemPrice, quantity);
            closeModal();
        });
    }

    function populateModal(item, id) {
        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalImage').alt = item.name;
        document.getElementById('modalCategory').textContent = item.category;
        document.getElementById('modalTitle').textContent = item.name;
        document.getElementById('modalRating').textContent = item.rating;
        document.getElementById('modalDescription').textContent = item.description;
        document.getElementById('modalTime').textContent = item.time;
        document.getElementById('modalCalories').textContent = item.calories;
        document.getElementById('modalServing').textContent = item.serving;
        document.getElementById('modalPrice').textContent = `$${item.price.toFixed(2)}`;
        document.getElementById('qtyInput').value = 1;
        document.getElementById('addToCartModal').dataset.id = id;

        // Populate ingredients
        const ingredientsList = document.getElementById('modalIngredients');
        ingredientsList.innerHTML = '';
        item.ingredients.forEach(ingredient => {
            const span = document.createElement('span');
            span.className = 'ingredient';
            span.textContent = ingredient;
            ingredientsList.appendChild(span);
        });
    }

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ============================================
   ADD TO CART FUNCTIONALITY
   ============================================ */
let cart = JSON.parse(localStorage.getItem('restaurantCart')) || [];

function initAddToCart() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const itemId = this.dataset.id;
            const itemName = this.dataset.name;
            const itemPrice = parseFloat(this.dataset.price);

            addItemToCart(itemId, itemName, itemPrice, 1);

            // Button animation
            this.classList.add('added');
            setTimeout(() => {
                this.classList.remove('added');
            }, 2000);
        });
    });

    // Update cart count on page load
    updateCartDisplay();
}

function addItemToCart(id, name, price, quantity = 1) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: quantity
        });
    }

    // Save to localStorage
    localStorage.setItem('restaurantCart', JSON.stringify(cart));

    // Update display
    updateCartDisplay();

    // Show toast notification
    showToast('Added to Cart', `${name} x${quantity} has been added to your cart.`);
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) {
        cartCount.textContent = totalItems;

        if (totalItems === 0) {
            cartCount.style.display = 'none';
        } else {
            cartCount.style.display = 'flex';
            // Animate
            cartCount.style.animation = 'none';
            setTimeout(() => {
                cartCount.style.animation = 'cartPulse 0.5s ease';
            }, 10);
        }
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function clearCart() {
    cart = [];
    localStorage.setItem('restaurantCart', JSON.stringify(cart));
    updateCartDisplay();
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
function showToast(title, message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');

    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    const iconClass = type === 'success' ? 'fa-check' : type === 'error' ? 'fa-times' : 'fa-info';
    const iconBg = type === 'success' ? 'var(--accent-green)' : type === 'error' ? 'var(--accent-red)' : 'var(--primary-gold)';

    toast.innerHTML = `
        <div class="toast-icon" style="background: ${iconBg}">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', function () {
        removeToast(toast);
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        removeToast(toast);
    }, 4000);
}

function removeToast(toast) {
    toast.classList.add('removing');
    setTimeout(() => {
        toast.remove();
    }, 500);
}

/* ============================================
   MENU CARD HOVER EFFECTS
   ============================================ */
document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});
/* ============================================
   RESERVATION SYSTEM
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initCalendar();
    initTimeSlots();
    initGuestSelector();
    initReservationForm();
});

/* ============================================
   CALENDAR FUNCTIONALITY
   ============================================ */
let currentDate = new Date();
let selectedDate = null;

function initCalendar() {
    renderCalendar();

    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }
}

function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthEl = document.getElementById('currentMonth');

    if (!calendarDays || !currentMonthEl) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonthEl.textContent = `${monthNames[month]} ${year}`;

    // Get first day and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // Clear previous days
    calendarDays.innerHTML = '';

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;

        const dayDate = new Date(year, month, day);

        // Check if today
        if (dayDate.toDateString() === today.toDateString()) {
            dayEl.classList.add('today');
        }

        // Check if past
        if (dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            dayEl.classList.add('disabled');
        } else {
            dayEl.addEventListener('click', function () {
                selectDate(dayDate, this);
            });
        }

        // Check if selected
        if (selectedDate && dayDate.toDateString() === selectedDate.toDateString()) {
            dayEl.classList.add('selected');
        }

        calendarDays.appendChild(dayEl);
    }
}

function selectDate(date, element) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day.selected').forEach(day => {
        day.classList.remove('selected');
    });

    // Add selection
    element.classList.add('selected');
    selectedDate = date;

    // Update hidden input
    const dateInput = document.getElementById('selectedDate');
    if (dateInput) {
        dateInput.value = formatDate(date);
    }

    // Update time slots availability (simulate)
    updateTimeSlotAvailability();
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function updateTimeSlotAvailability() {
    const slots = document.querySelectorAll('.time-slot');

    slots.forEach(slot => {
        // Remove unavailable class first
        slot.classList.remove('unavailable');

        // Randomly make some slots unavailable (simulation)
        if (Math.random() < 0.2) {
            slot.classList.add('unavailable');
        }
    });
}

/* ============================================
   TIME SLOTS
   ============================================ */
function initTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');

    timeSlots.forEach(slot => {
        slot.addEventListener('click', function () {
            if (this.classList.contains('unavailable')) return;

            // Remove previous selection
            timeSlots.forEach(s => s.classList.remove('selected'));

            // Add selection
            this.classList.add('selected');

            // Update hidden input
            const timeInput = document.getElementById('selectedTime');
            if (timeInput) {
                timeInput.value = this.textContent;
            }
        });
    });
}

/* ============================================
   GUEST SELECTOR
   ============================================ */
function initGuestSelector() {
    const minusBtn = document.getElementById('guestMinus');
    const plusBtn = document.getElementById('guestPlus');
    const guestNumber = document.getElementById('guestNumber');
    const guestInput = document.getElementById('selectedGuests');

    let guests = 2;
    const minGuests = 1;
    const maxGuests = 20;

    if (minusBtn) {
        minusBtn.addEventListener('click', function () {
            if (guests > minGuests) {
                guests--;
                updateGuestDisplay();
            }
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener('click', function () {
            if (guests < maxGuests) {
                guests++;
                updateGuestDisplay();
            }
        });
    }

    function updateGuestDisplay() {
        if (guestNumber) {
            guestNumber.textContent = guests;
            guestNumber.style.animation = 'none';
            setTimeout(() => {
                guestNumber.style.animation = 'pulse 0.3s ease';
            }, 10);
        }
        if (guestInput) {
            guestInput.value = guests;
        }
    }
}

/* ============================================
   RESERVATION FORM
   ============================================ */
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');

    let currentStep = 1;

    // Next button handlers
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const nextStep = parseInt(this.dataset.next);

            // Validate current step
            if (validateStep(currentStep)) {
                goToStep(nextStep);
            }
        });
    });

    // Previous button handlers
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const prevStep = parseInt(this.dataset.prev);
            goToStep(prevStep);
        });
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateStep(3)) {
                submitReservation();
            }
        });
    }

    function goToStep(step) {
        // Update form steps
        steps.forEach(s => s.classList.remove('active'));
        document.getElementById(`step${step}`).classList.add('active');

        // Update progress
        progressSteps.forEach((ps, index) => {
            ps.classList.remove('active', 'completed');
            if (index + 1 < step) {
                ps.classList.add('completed');
            } else if (index + 1 === step) {
                ps.classList.add('active');
            }
        });

        // Update summary if going to step 3
        if (step === 3) {
            updateSummary();
        }

        currentStep = step;

        // Scroll to top of form
        document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function validateStep(step) {
        let isValid = true;

        switch (step) {
            case 1:
                // Check date
                if (!document.getElementById('selectedDate').value) {
                    showToast('Please select a date', 'Please choose your preferred date from the calendar.', 'error');
                    isValid = false;
                }
                // Check time
                else if (!document.getElementById('selectedTime').value) {
                    showToast('Please select a time', 'Please choose your preferred time slot.', 'error');
                    isValid = false;
                }
                break;

            case 2:
                const firstName = document.getElementById('firstName');
                const lastName = document.getElementById('lastName');
                const email = document.getElementById('email');
                const phone = document.getElementById('phone');

                // Clear previous errors
                [firstName, lastName, email, phone].forEach(input => {
                    input.classList.remove('error');
                    input.nextElementSibling.textContent = '';
                });

                // Validate first name
                if (!firstName.value.trim()) {
                    firstName.classList.add('error');
                    firstName.nextElementSibling.textContent = 'First name is required';
                    isValid = false;
                }

                // Validate last name
                if (!lastName.value.trim()) {
                    lastName.classList.add('error');
                    lastName.nextElementSibling.textContent = 'Last name is required';
                    isValid = false;
                }

                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.value.trim() || !emailRegex.test(email.value)) {
                    email.classList.add('error');
                    email.nextElementSibling.textContent = 'Valid email is required';
                    isValid = false;
                }

                // Validate phone
                if (!phone.value.trim() || phone.value.length < 10) {
                    phone.classList.add('error');
                    phone.nextElementSibling.textContent = 'Valid phone number is required';
                    isValid = false;
                }
                break;

            case 3:
                const termsCheckbox = document.getElementById('termsAgree');
                if (!termsCheckbox.checked) {
                    showToast('Terms Required', 'Please agree to the reservation policy.', 'error');
                    isValid = false;
                }
                break;
        }

        return isValid;
    }

    function updateSummary() {
        // Date
        document.getElementById('summaryDate').textContent =
            document.getElementById('selectedDate').value || '-';

        // Time
        document.getElementById('summaryTime').textContent =
            document.getElementById('selectedTime').value || '-';

        // Guests
        document.getElementById('summaryGuests').textContent =
            document.getElementById('selectedGuests').value + ' Guests';

        // Name
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        document.getElementById('summaryName').textContent = `${firstName} ${lastName}`;

        // Email
        document.getElementById('summaryEmail').textContent =
            document.getElementById('email').value;

        // Phone
        document.getElementById('summaryPhone').textContent =
            document.getElementById('phone').value;

        // Occasion
        const occasion = document.querySelector('input[name="occasion"]:checked');
        if (occasion && occasion.value !== 'none') {
            document.getElementById('summaryOccasionWrap').style.display = 'flex';
            document.getElementById('summaryOccasion').textContent =
                occasion.nextElementSibling.querySelector('span:last-child').textContent;
        } else {
            document.getElementById('summaryOccasionWrap').style.display = 'none';
        }

        // Special Requests
        const requests = document.getElementById('specialRequests').value;
        if (requests.trim()) {
            document.getElementById('summaryRequestsWrap').style.display = 'flex';
            document.getElementById('summaryRequests').textContent = requests;
        } else {
            document.getElementById('summaryRequestsWrap').style.display = 'none';
        }
    }

    function submitReservation() {
        // Generate booking ID
        const bookingId = 'LCR' + Date.now().toString().slice(-8);

        // Get form data
        const reservationData = {
            id: bookingId,
            date: document.getElementById('selectedDate').value,
            time: document.getElementById('selectedTime').value,
            guests: document.getElementById('selectedGuests').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            occasion: document.querySelector('input[name="occasion"]:checked').value,
            specialRequests: document.getElementById('specialRequests').value,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        saveReservation(reservationData);

        // Show confirmation modal
        showConfirmation(reservationData);

        // Reset form
        form.reset();
        currentStep = 1;
        selectedDate = null;

        // Reset UI
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        document.querySelectorAll('.time-slot.selected').forEach(slot => {
            slot.classList.remove('selected');
        });
        document.getElementById('guestNumber').textContent = '2';
        document.getElementById('selectedGuests').value = '2';

        // Go back to step 1
        steps.forEach(s => s.classList.remove('active'));
        document.getElementById('step1').classList.add('active');
        progressSteps.forEach(ps => ps.classList.remove('active', 'completed'));
        progressSteps[0].classList.add('active');
    }
}

function saveReservation(data) {
    let reservations = JSON.parse(localStorage.getItem('restaurantReservations')) || [];
    reservations.push(data);
    localStorage.setItem('restaurantReservations', JSON.stringify(reservations));
}

function showConfirmation(data) {
    const modal = document.getElementById('confirmationModal');

    // Populate confirmation details
    document.getElementById('confirmEmail').textContent = data.email;
    document.getElementById('bookingId').textContent = data.id;
    document.getElementById('confirmDate').textContent = data.date;
    document.getElementById('confirmTime').textContent = data.time;
    document.getElementById('confirmGuests').textContent = data.guests + ' Guests';

    // Show modal
    modal.classList.add('active');

    // Create confetti
    createConfetti();

    // Close button
    document.getElementById('closeConfirmation').addEventListener('click', function () {
        modal.classList.remove('active');
    });

    // Add to calendar button (simulation)
    document.getElementById('addToCalendar').addEventListener('click', function () {
        showToast('Calendar', 'Event added to your calendar!', 'success');
    });
}

function createConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';

    const colors = ['#d4a853', '#e8c87a', '#ffffff', '#2ecc71', '#e74c3c'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.setProperty('--x', (Math.random() - 0.5) * 400 + 'px');
        confetti.style.setProperty('--y', (Math.random() - 0.5) * 400 + 'px');
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

        container.appendChild(confetti);
    }
}

/* ============================================
   PHONE NUMBER FORMATTING
   ============================================ */
document.getElementById('phone')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }

    e.target.value = value;
});
/* ============================================
   ONLINE ORDERING SYSTEM
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initOrderTypeToggle();
    initQuickAddButtons();
    initCartSidebar();
    initPromoCode();
    initCheckout();
});

// Global cart state
let orderCart = JSON.parse(localStorage.getItem('restaurantOrderCart')) || [];
let orderType = 'delivery';
let promoCode = null;
let promoDiscount = 0;
let tipPercentage = 15;
let tipAmount = 0;

const DELIVERY_FEE = 4.99;
const TAX_RATE = 0.08;
const FREE_DELIVERY_THRESHOLD = 30;

// Promo codes database
const promoCodes = {
    'SAVE20': { type: 'percent', value: 20 },
    'FLAT10': { type: 'fixed', value: 10 },
    'FREESHIP': { type: 'freeDelivery', value: 0 },
    'WELCOME15': { type: 'percent', value: 15 }
};

/* ============================================
   ORDER TYPE TOGGLE
   ============================================ */
function initOrderTypeToggle() {
    const orderTypeBtns = document.querySelectorAll('.order-type-btn');

    orderTypeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            orderTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            orderType = this.dataset.type;
            updateOrderTypeDisplay();
            updateCartTotals();
        });
    });
}

function updateOrderTypeDisplay() {
    const display = document.getElementById('orderTypeDisplay');
    const timeDisplay = document.querySelector('.order-time');
    const deliveryRow = document.getElementById('deliveryRow');
    const checkoutDeliveryRow = document.getElementById('checkoutDeliveryRow');
    const deliveryAddressSection = document.getElementById('deliveryAddressSection');
    const orderTypeText = document.getElementById('orderTypeText');
    const estimatedTime = document.getElementById('estimatedTime');

    if (orderType === 'delivery') {
        if (display) {
            display.innerHTML = '<i class="fas fa-motorcycle"></i><span>Delivery</span>';
        }
        if (timeDisplay) timeDisplay.textContent = '30-45 min';
        if (deliveryRow) deliveryRow.style.display = 'flex';
        if (checkoutDeliveryRow) checkoutDeliveryRow.style.display = 'flex';
        if (deliveryAddressSection) deliveryAddressSection.style.display = 'block';
        if (orderTypeText) orderTypeText.textContent = 'Delivery';
        if (estimatedTime) estimatedTime.textContent = '30-45 min';
    } else {
        if (display) {
            display.innerHTML = '<i class="fas fa-store"></i><span>Pickup</span>';
        }
        if (timeDisplay) timeDisplay.textContent = '15-20 min';
        if (deliveryRow) deliveryRow.style.display = 'none';
        if (checkoutDeliveryRow) checkoutDeliveryRow.style.display = 'none';
        if (deliveryAddressSection) deliveryAddressSection.style.display = 'none';
        if (orderTypeText) orderTypeText.textContent = 'Pickup';
        if (estimatedTime) estimatedTime.textContent = '15-20 min';
    }
}

/* ============================================
   QUICK ADD BUTTONS
   ============================================ */
function initQuickAddButtons() {
    const quickAddBtns = document.querySelectorAll('.quick-add-btn');

    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const image = this.dataset.image;

            addToOrderCart(id, name, price, image, 1);

            // Button animation
            this.classList.add('added');
            setTimeout(() => {
                this.classList.remove('added');
            }, 1500);
        });
    });
}

/* ============================================
   CART SIDEBAR
   ============================================ */
function initCartSidebar() {
    const cartBtn = document.getElementById('cartBtn');
    const viewCartBtn = document.getElementById('viewCartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const browseMenuBtn = document.getElementById('browseMenuBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Open cart
    [cartBtn, viewCartBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', openCart);
        }
    });

    // Close cart
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Browse menu button
    if (browseMenuBtn) {
        browseMenuBtn.addEventListener('click', function () {
            closeCart();
        });
    }

    // Clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function () {
            if (confirm('Are you sure you want to clear your cart?')) {
                clearOrderCart();
            }
        });
    }

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (!this.disabled) {
                closeCart();
                openCheckout();
            }
        });
    }

    // Initialize cart display
    updateCartDisplay();
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ============================================
   CART MANAGEMENT
   ============================================ */
function addToOrderCart(id, name, price, image, quantity = 1) {
    const existingItem = orderCart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        orderCart.push({
            id,
            name,
            price,
            image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
            quantity
        });
    }

    saveCart();
    updateCartDisplay();
    showToast('Added to Cart', `${name} has been added to your cart.`, 'success');
}

function updateItemQuantity(id, change) {
    const item = orderCart.find(item => item.id === id);

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

function removeFromCart(id) {
    const itemElement = document.querySelector(`.cart-item[data-id="${id}"]`);

    if (itemElement) {
        itemElement.classList.add('removing');

        setTimeout(() => {
            orderCart = orderCart.filter(item => item.id !== id);
            saveCart();
            updateCartDisplay();
        }, 300);
    } else {
        orderCart = orderCart.filter(item => item.id !== id);
        saveCart();
        updateCartDisplay();
    }
}

function clearOrderCart() {
    orderCart = [];
    promoCode = null;
    promoDiscount = 0;
    saveCart();
    updateCartDisplay();
    updatePromoDisplay();
}

function saveCart() {
    localStorage.setItem('restaurantOrderCart', JSON.stringify(orderCart));
}

/* ============================================
   CART DISPLAY
   ============================================ */
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartPromo = document.getElementById('cartPromo');
    const cartSummary = document.getElementById('cartSummary');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartCount = document.getElementById('cartCount');
    const btnCartCount = document.getElementById('btnCartCount');

    // Update cart count in header
    const totalItems = orderCart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (btnCartCount) {
        btnCartCount.textContent = totalItems;
    }

    // Show/hide empty state
    if (orderCart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartItemsList) cartItemsList.style.display = 'none';
        if (cartPromo) cartPromo.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    // Show cart items
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartItemsList) cartItemsList.style.display = 'block';
    if (cartPromo) cartPromo.style.display = 'block';
    if (cartSummary) cartSummary.style.display = 'block';
    if (checkoutBtn) checkoutBtn.disabled = false;

    // Render cart items
    if (cartItemsList) {
        cartItemsList.innerHTML = orderCart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update totals
    updateCartTotals();
}

function updateCartTotals() {
    const subtotal = orderCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discount = 0;
    if (promoCode && promoCodes[promoCode]) {
        const promo = promoCodes[promoCode];
        if (promo.type === 'percent') {
            discount = subtotal * (promo.value / 100);
        } else if (promo.type === 'fixed') {
            discount = Math.min(promo.value, subtotal);
        }
    }
    promoDiscount = discount;

    // Calculate delivery fee
    let delivery = 0;
    if (orderType === 'delivery') {
        if (promoCode && promoCodes[promoCode]?.type === 'freeDelivery') {
            delivery = 0;
        } else if (subtotal >= FREE_DELIVERY_THRESHOLD) {
            delivery = 0;
        } else {
            delivery = DELIVERY_FEE;
        }
    }

    // Calculate tax
    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * TAX_RATE;

    // Calculate total
    const total = taxableAmount + delivery + tax;

    // Update cart sidebar
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartDiscount = document.getElementById('cartDiscount');
    const discountRow = document.getElementById('discountRow');
    const deliveryFee = document.getElementById('deliveryFee');
    const cartTax = document.getElementById('cartTax');
    const cartTotal = document.getElementById('cartTotal');

    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

    if (discount > 0) {
        if (discountRow) discountRow.style.display = 'flex';
        if (cartDiscount) cartDiscount.textContent = `-$${discount.toFixed(2)}`;
    } else {
        if (discountRow) discountRow.style.display = 'none';
    }

    if (deliveryFee) {
        if (delivery === 0 && orderType === 'delivery') {
            deliveryFee.textContent = 'FREE';
            deliveryFee.style.color = 'var(--accent-green)';
        } else {
            deliveryFee.textContent = `$${delivery.toFixed(2)}`;
            deliveryFee.style.color = '';
        }
    }

    if (cartTax) cartTax.textContent = `$${tax.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;

    // Update checkout summary
    updateCheckoutSummary(subtotal, discount, delivery, tax, total);
}

/* ============================================
   PROMO CODE
   ============================================ */
function initPromoCode() {
    const promoApply = document.getElementById('promoApply');
    const promoRemove = document.getElementById('promoRemove');
    const promoInput = document.getElementById('promoInput');

    if (promoApply) {
        promoApply.addEventListener('click', function () {
            const code = promoInput.value.trim().toUpperCase();

            if (!code) {
                showToast('Error', 'Please enter a promo code.', 'error');
                return;
            }

            if (promoCodes[code]) {
                promoCode = code;
                updatePromoDisplay();
                updateCartTotals();
                showToast('Promo Applied!', `Code "${code}" has been applied.`, 'success');
            } else {
                showToast('Invalid Code', 'This promo code is not valid.', 'error');
            }
        });
    }

    if (promoRemove) {
        promoRemove.addEventListener('click', function () {
            promoCode = null;
            promoDiscount = 0;
            updatePromoDisplay();
            updateCartTotals();
            showToast('Promo Removed', 'Promo code has been removed.', 'info');
        });
    }

    // Enter key to apply promo
    if (promoInput) {
        promoInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                promoApply.click();
            }
        });
    }
}

function updatePromoDisplay() {
    const promoInputWrap = document.querySelector('.promo-input-wrap');
    const promoApplied = document.getElementById('promoApplied');
    const promoCodeText = document.getElementById('promoCodeText');
    const promoInput = document.getElementById('promoInput');

    if (promoCode) {
        if (promoInputWrap) promoInputWrap.style.display = 'none';
        if (promoApplied) promoApplied.style.display = 'flex';
        if (promoCodeText) promoCodeText.textContent = promoCode;
    } else {
        if (promoInputWrap) promoInputWrap.style.display = 'flex';
        if (promoApplied) promoApplied.style.display = 'none';
        if (promoInput) promoInput.value = '';
    }
}

/* ============================================
   CHECKOUT
   ============================================ */
function initCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutBack = document.getElementById('checkoutBack');
    const checkoutForm = document.getElementById('checkoutForm');
    const tipBtns = document.querySelectorAll('.tip-btn');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    // Back button
    if (checkoutBack) {
        checkoutBack.addEventListener('click', closeCheckout);
    }

    // Payment method toggle
    paymentOptions.forEach(option => {
        option.addEventListener('change', function () {
            const cardDetails = document.getElementById('cardDetails');
            if (cardDetails) {
                cardDetails.style.display = this.value === 'card' ? 'block' : 'none';
            }
        });
    });

    // Tip buttons
    tipBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            tipBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const tipValue = this.dataset.tip;
            const customTip = document.getElementById('customTip');

            if (tipValue === 'custom') {
                if (customTip) customTip.style.display = 'block';
                tipPercentage = 0;
            } else {
                if (customTip) customTip.style.display = 'none';
                tipPercentage = parseInt(tipValue);
            }

            updateCheckoutTotals();
        });
    });

    // Custom tip input
    const customTipAmount = document.getElementById('customTipAmount');
    if (customTipAmount) {
        customTipAmount.addEventListener('input', function () {
            tipAmount = parseFloat(this.value) || 0;
            tipPercentage = 0;
            updateCheckoutTotals();
        });
    }

    // Form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateCheckoutForm()) {
                processOrder();
            }
        });
    }

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Expiry date formatting
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }

    // Phone formatting
    const checkoutPhone = document.getElementById('checkoutPhone');
    if (checkoutPhone) {
        checkoutPhone.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
}

function openCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');

    if (checkoutModal) {
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCheckoutItems();
        updateCheckoutTotals();
    }
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');

    if (checkoutModal) {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateCheckoutItems() {
    const checkoutItems = document.getElementById('checkoutItems');

    if (checkoutItems) {
        checkoutItems.innerHTML = orderCart.map(item => `
            <div class="checkout-item">
                <div class="checkout-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="checkout-item-info">
                    <p class="checkout-item-name">${item.name}</p>
                    <p class="checkout-item-qty">Qty: ${item.quantity}</p>
                </div>
                <span class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    }
}

function updateCheckoutSummary(subtotal, discount, delivery, tax, total) {
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutDiscount = document.getElementById('checkoutDiscount');
    const checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
    const checkoutDelivery = document.getElementById('checkoutDelivery');
    const checkoutTaxAmount = document.getElementById('checkoutTaxAmount');
    const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');
    const orderTotalBtn = document.getElementById('orderTotalBtn');

    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;

    if (discount > 0) {
        if (checkoutDiscountRow) checkoutDiscountRow.style.display = 'flex';
        if (checkoutDiscount) checkoutDiscount.textContent = `-$${discount.toFixed(2)}`;
    } else {
        if (checkoutDiscountRow) checkoutDiscountRow.style.display = 'none';
    }

    if (checkoutDelivery) {
        if (delivery === 0 && orderType === 'delivery') {
            checkoutDelivery.textContent = 'FREE';
        } else {
            checkoutDelivery.textContent = `$${delivery.toFixed(2)}`;
        }
    }

    if (checkoutTaxAmount) checkoutTaxAmount.textContent = `$${tax.toFixed(2)}`;

    // Calculate with tip
    updateCheckoutTotals();
}

function updateCheckoutTotals() {
    const subtotal = orderCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate discount
    let discount = 0;
    if (promoCode && promoCodes[promoCode]) {
        const promo = promoCodes[promoCode];
        if (promo.type === 'percent') {
            discount = subtotal * (promo.value / 100);
        } else if (promo.type === 'fixed') {
            discount = Math.min(promo.value, subtotal);
        }
    }

    // Calculate delivery fee
    let delivery = 0;
    if (orderType === 'delivery') {
        if (promoCode && promoCodes[promoCode]?.type === 'freeDelivery') {
            delivery = 0;
        } else if (subtotal >= FREE_DELIVERY_THRESHOLD) {
            delivery = 0;
        } else {
            delivery = DELIVERY_FEE;
        }
    }

    // Calculate tax
    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * TAX_RATE;

    // Calculate tip
    let tip = 0;
    if (tipPercentage > 0) {
        tip = subtotal * (tipPercentage / 100);
    } else {
        tip = tipAmount;
    }

    // Calculate grand total
    const grandTotal = taxableAmount + delivery + tax + tip;

    // Update display
    const checkoutTip = document.getElementById('checkoutTip');
    const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');
    const orderTotalBtn = document.getElementById('orderTotalBtn');

    if (checkoutTip) checkoutTip.textContent = `$${tip.toFixed(2)}`;
    if (checkoutGrandTotal) checkoutGrandTotal.textContent = `$${grandTotal.toFixed(2)}`;
    if (orderTotalBtn) orderTotalBtn.textContent = `$${grandTotal.toFixed(2)}`;
}

function validateCheckoutForm() {
    const requiredFields = [
        { id: 'checkoutName', message: 'Please enter your name' },
        { id: 'checkoutPhone', message: 'Please enter your phone number' },
        { id: 'checkoutEmail', message: 'Please enter your email' }
    ];

    // Add delivery fields if delivery is selected
    if (orderType === 'delivery') {
        requiredFields.push(
            { id: 'deliveryAddress', message: 'Please enter your address' },
            { id: 'city', message: 'Please enter your city' },
            { id: 'zipCode', message: 'Please enter your ZIP code' }
        );
    }

    // Check payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    if (paymentMethod === 'card') {
        requiredFields.push(
            { id: 'cardNumber', message: 'Please enter your card number' },
            { id: 'cardExpiry', message: 'Please enter expiry date' },
            { id: 'cardCVV', message: 'Please enter CVV' },
            { id: 'cardName', message: 'Please enter name on card' }
        );
    }

    for (const field of requiredFields) {
        const input = document.getElementById(field.id);
        if (input && !input.value.trim()) {
            showToast('Required Field', field.message, 'error');
            input.focus();
            return false;
        }
    }

    // Validate email format
    const email = document.getElementById('checkoutEmail');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showToast('Invalid Email', 'Please enter a valid email address', 'error');
        email.focus();
        return false;
    }

    return true;
}

function processOrder() {
    // Generate order number
    const orderNumber = 'ORD-' + Date.now().toString().slice(-8);

    // Get form data
    const orderData = {
        orderNumber,
        orderType,
        items: [...orderCart],
        customer: {
            name: document.getElementById('checkoutName')?.value,
            phone: document.getElementById('checkoutPhone')?.value,
            email: document.getElementById('checkoutEmail')?.value
        },
        delivery: orderType === 'delivery' ? {
            address: document.getElementById('deliveryAddress')?.value,
            apartment: document.getElementById('apartment')?.value,
            city: document.getElementById('city')?.value,
            zipCode: document.getElementById('zipCode')?.value,
            instructions: document.getElementById('deliveryInstructions')?.value
        } : null,
        payment: document.querySelector('input[name="payment"]:checked')?.value,
        promoCode,
        promoDiscount,
        tipPercentage,
        tipAmount: tipPercentage > 0 ?
            orderCart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (tipPercentage / 100) :
            tipAmount,
        subtotal: orderCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        total: parseFloat(document.getElementById('checkoutGrandTotal')?.textContent.replace('$', '')),
        createdAt: new Date().toISOString(),
        status: 'confirmed'
    };

    // Save order to localStorage
    saveOrder(orderData);

    // Show confirmation
    showOrderConfirmation(orderData);

    // Clear cart
    clearOrderCart();

    // Close checkout
    closeCheckout();
}

function saveOrder(orderData) {
    let orders = JSON.parse(localStorage.getItem('restaurantOrders')) || [];
    orders.push(orderData);
    localStorage.setItem('restaurantOrders', JSON.stringify(orders));
}

function showOrderConfirmation(orderData) {
    const modal = document.getElementById('orderConfirmationModal');

    if (modal) {
        // Populate confirmation details
        const orderNumber = document.getElementById('orderNumber');
        const confirmEstimatedTime = document.getElementById('confirmEstimatedTime');
        const confirmTotal = document.getElementById('confirmTotal');
        const confirmEmailAddress = document.getElementById('confirmEmailAddress');

        if (orderNumber) orderNumber.textContent = `#${orderData.orderNumber}`;
        if (confirmEstimatedTime) {
            confirmEstimatedTime.textContent = orderType === 'delivery' ? '30-45 minutes' : '15-20 minutes';
        }
        if (confirmTotal) confirmTotal.textContent = `$${orderData.total.toFixed(2)}`;
        if (confirmEmailAddress) confirmEmailAddress.textContent = orderData.customer.email;

        // Update delivery animation
        const deliveryAnimation = document.getElementById('deliveryAnimation');
        if (deliveryAnimation) {
            deliveryAnimation.style.display = orderType === 'delivery' ? 'block' : 'none';
        }

        // Show modal
        modal.classList.add('active');

        // Simulate order tracking
        simulateOrderTracking();
    }

    // Close confirmation handlers
    const closeOrderConfirm = document.getElementById('closeOrderConfirm');
    const trackOrderBtn = document.getElementById('trackOrderBtn');

    if (closeOrderConfirm) {
        closeOrderConfirm.addEventListener('click', function () {
            modal.classList.remove('active');
        });
    }

    if (trackOrderBtn) {
        trackOrderBtn.addEventListener('click', function () {
            showToast('Order Tracking', 'You will receive real-time updates via SMS and email.', 'info');
        });
    }
}

function simulateOrderTracking() {
    const steps = document.querySelectorAll('.tracker-step');
    const lines = document.querySelectorAll('.tracker-line');

    let currentStep = 0;

    const interval = setInterval(() => {
        currentStep++;

        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            if (lines[currentStep - 1]) {
                lines[currentStep - 1].style.background = 'var(--accent-green)';
            }
        }

        if (currentStep >= steps.length - 1) {
            clearInterval(interval);
        }
    }, 3000);
}

/* ============================================
   INTEGRATION WITH MENU ADD TO CART
   ============================================ */
// Override the existing addItemToCart function to work with ordering system
function addItemToCartFromMenu(id, name, price, quantity = 1) {
    // Get image from menu data or use default
    const menuCard = document.querySelector(`.menu-card .add-to-cart-btn[data-id="${id}"]`);
    let image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200';

    if (menuCard) {
        const cardImage = menuCard.closest('.menu-card').querySelector('.menu-card-image img');
        if (cardImage) {
            image = cardImage.src;
        }
    }

    addToOrderCart(id, name, price, image, quantity);
}

// Update existing add-to-cart buttons to use the new system
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);

        // Get image
        const menuCard = this.closest('.menu-card');
        let image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200';
        if (menuCard) {
            const cardImage = menuCard.querySelector('.menu-card-image img');
            if (cardImage) {
                image = cardImage.src;
            }
        }

        addToOrderCart(id, name, price, image, 1);

        // Button animation
        this.classList.add('added');
        setTimeout(() => {
            this.classList.remove('added');
        }, 2000);
    });
});
/* ============================================
   REVIEWS SECTION
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initReviewsCarousel();
    initReviewFilters();
    initHelpfulButtons();
    initWriteReviewModal();
    initReviewForm();
    animateRatingBars();
});

/* ============================================
   REVIEWS CAROUSEL
   ============================================ */
var currentSlide = 0;
var slidesPerView = 2;
var totalSlides = 5;

function initReviewsCarousel() {
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.indicator');

    if (!track) return;

    // Calculate slides per view based on screen width
    function updateSlidesPerView() {
        if (window.innerWidth <= 992) {
            slidesPerView = 1;
        } else {
            slidesPerView = 2;
        }
    }

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentSlide = Math.max(0, currentSlide - 1);
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentSlide = Math.min(totalSlides - slidesPerView, currentSlide + 1);
            updateCarousel();
        });
    }

    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Touch/Swipe support
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', function (e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentSlide = Math.min(totalSlides - slidesPerView, currentSlide + 1);
            } else {
                currentSlide = Math.max(0, currentSlide - 1);
            }
            updateCarousel();
        }
    }

    // Auto-play
    let autoPlayInterval = setInterval(function () {
        currentSlide++;
        if (currentSlide > totalSlides - slidesPerView) {
            currentSlide = 0;
        }
        updateCarousel();
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', function () {
        clearInterval(autoPlayInterval);
    });

    track.addEventListener('mouseleave', function () {
        autoPlayInterval = setInterval(function () {
            currentSlide++;
            if (currentSlide > totalSlides - slidesPerView) {
                currentSlide = 0;
            }
            updateCarousel();
        }, 5000);
    });

    function updateCarousel() {
        const slideWidth = 100 / slidesPerView;
        const gap = 30;
        const offset = currentSlide * (slideWidth + (gap / track.offsetWidth * 100));
        track.style.transform = `translateX(-${offset}%)`;

        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentSlide);
        });
    }
}

/* ============================================
   REVIEW FILTERS
   ============================================ */
function initReviewFilters() {
    const ratingFilterBtn = document.getElementById('ratingFilterBtn');
    const sortFilterBtn = document.getElementById('sortFilterBtn');
    const ratingOptions = document.querySelectorAll('#ratingFilterMenu .filter-option');
    const sortOptions = document.querySelectorAll('#sortFilterMenu .filter-option');
    const reviewCards = document.querySelectorAll('.review-card');

    // Toggle dropdowns
    [ratingFilterBtn, sortFilterBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const dropdown = this.closest('.filter-dropdown');
                dropdown.classList.toggle('active');

                document.querySelectorAll('.filter-dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
            });
        }
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function () {
        document.querySelectorAll('.filter-dropdown').forEach(d => {
            d.classList.remove('active');
        });
    });

    // Rating filter
    ratingOptions.forEach(option => {
        option.addEventListener('click', function () {
            const filter = this.dataset.filter;

            ratingOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            if (ratingFilterBtn) {
                ratingFilterBtn.querySelector('span').textContent = this.textContent;
            }

            filterReviews(filter);
            this.closest('.filter-dropdown').classList.remove('active');
        });
    });

    // Sort filter
    sortOptions.forEach(option => {
        option.addEventListener('click', function () {
            const sort = this.dataset.sort;

            sortOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            if (sortFilterBtn) {
                sortFilterBtn.querySelector('span').textContent = this.textContent;
            }

            sortReviews(sort);
            this.closest('.filter-dropdown').classList.remove('active');
        });
    });

    function filterReviews(filter) {
        reviewCards.forEach(card => {
            const rating = parseInt(card.dataset.rating);
            let show = false;

            switch (filter) {
                case 'all':
                    show = true;
                    break;
                case '5':
                    show = rating === 5;
                    break;
                case '4':
                    show = rating >= 4;
                    break;
                case '3':
                    show = rating >= 3;
                    break;
                default:
                    show = true;
            }

            if (show) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function sortReviews(sort) {
        const grid = document.getElementById('reviewsGrid');
        if (!grid) return;

        const cards = Array.from(reviewCards);

        cards.sort((a, b) => {
            switch (sort) {
                case 'highest':
                    return parseInt(b.dataset.rating) - parseInt(a.dataset.rating);
                case 'lowest':
                    return parseInt(a.dataset.rating) - parseInt(b.dataset.rating);
                case 'helpful':
                    const aHelpful = parseInt(a.querySelector('.helpful-btn span:last-child')?.textContent || 0);
                    const bHelpful = parseInt(b.querySelector('.helpful-btn span:last-child')?.textContent || 0);
                    return bHelpful - aHelpful;
                case 'recent':
                default:
                    return 0;
            }
        });

        // Re-append sorted cards
        cards.forEach(card => {
            grid.appendChild(card);
            card.style.animation = 'fadeIn 0.5s ease';
        });
    }
}

/* ============================================
   HELPFUL BUTTONS
   ============================================ */
function initHelpfulButtons() {
    const helpfulBtns = document.querySelectorAll('.helpful-btn');

    // Load helpful votes from localStorage
    let helpfulVotes = JSON.parse(localStorage.getItem('reviewHelpfulVotes')) || {};

    helpfulBtns.forEach(btn => {
        const reviewId = btn.dataset.id;

        // Check if already voted
        if (helpfulVotes[reviewId]) {
            btn.classList.add('active');
            btn.querySelector('i').className = 'fas fa-thumbs-up';
        }

        btn.addEventListener('click', function () {
            const countSpan = this.querySelector('.helpful-count') || this.querySelector('span:last-child');
            let count = parseInt(countSpan?.textContent || 0);

            if (this.classList.contains('active')) {
                // Remove vote
                this.classList.remove('active');
                this.querySelector('i').className = 'far fa-thumbs-up';
                count--;
                delete helpfulVotes[reviewId];
            } else {
                // Add vote
                this.classList.add('active');
                this.querySelector('i').className = 'fas fa-thumbs-up';
                count++;
                helpfulVotes[reviewId] = true;

                // Animate
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }

            if (countSpan) {
                countSpan.textContent = count;
            }

            // Save to localStorage
            localStorage.setItem('reviewHelpfulVotes', JSON.stringify(helpfulVotes));
        });
    });
}

/* ============================================
   WRITE REVIEW MODAL
   ============================================ */
function initWriteReviewModal() {
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const reviewModalClose = document.getElementById('reviewModalClose');
    const cancelReview = document.getElementById('cancelReview');

    if (writeReviewBtn && reviewModal) {
        writeReviewBtn.addEventListener('click', function () {
            openReviewModal();
        });
    }

    if (reviewModalClose) {
        reviewModalClose.addEventListener('click', function () {
            closeReviewModal();
        });
    }

    if (cancelReview) {
        cancelReview.addEventListener('click', function () {
            closeReviewModal();
        });
    }

    // Close on outside click
    if (reviewModal) {
        reviewModal.addEventListener('click', function (e) {
            if (e.target === reviewModal) {
                closeReviewModal();
            }
        });
    }

    // Close on escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && reviewModal?.classList.contains('active')) {
            closeReviewModal();
        }
    });

    function openReviewModal() {
        reviewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeReviewModal() {
        reviewModal.classList.remove('active');
        document.body.style.overflow = '';

        // Reset form
        document.getElementById('reviewForm')?.reset();
        document.getElementById('photoPreview').innerHTML = '';
        document.getElementById('orderedItemsList').innerHTML = '';
        document.getElementById('ratingText').textContent = 'Select a rating';
        document.getElementById('charCount').textContent = '0';

        // Reset category stars
        document.querySelectorAll('.mini-star-input i').forEach(star => {
            star.className = 'far fa-star';
        });
    }
}

/* ============================================
   REVIEW FORM
   ============================================ */
function initReviewForm() {
    const form = document.getElementById('reviewForm');
    const reviewText = document.getElementById('reviewText');
    const charCount = document.getElementById('charCount');
    const photoUploadArea = document.getElementById('photoUploadArea');
    const reviewPhotos = document.getElementById('reviewPhotos');
    const photoPreview = document.getElementById('photoPreview');
    const addOrderedItem = document.getElementById('addOrderedItem');
    const orderedItemInput = document.getElementById('orderedItem');
    const orderedItemsList = document.getElementById('orderedItemsList');

    // Star rating
    const starInputs = document.querySelectorAll('.star-rating-input input');
    const ratingText = document.getElementById('ratingText');
    const ratingTexts = {
        1: 'Poor - Very disappointed',
        2: 'Fair - Could be better',
        3: 'Good - Met expectations',
        4: 'Very Good - Exceeded expectations',
        5: 'Excellent - Outstanding!'
    };

    starInputs.forEach(input => {
        input.addEventListener('change', function () {
            const rating = this.value;
            if (ratingText) {
                ratingText.textContent = ratingTexts[rating];
                ratingText.style.color = 'var(--primary-gold)';
            }
        });
    });

    // Category mini stars
    document.querySelectorAll('.mini-star-input').forEach(starGroup => {
        const stars = starGroup.querySelectorAll('i');

        stars.forEach((star, index) => {
            star.addEventListener('click', function () {
                // Fill stars up to clicked
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.className = 'fas fa-star';
                    } else {
                        s.className = 'far fa-star';
                    }
                });
            });

            star.addEventListener('mouseenter', function () {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.style.color = 'var(--primary-gold)';
                    }
                });
            });

            star.addEventListener('mouseleave', function () {
                stars.forEach(s => {
                    s.style.color = '';
                });
            });
        });
    });

    // Character count
    if (reviewText && charCount) {
        reviewText.addEventListener('input', function () {
            const count = this.value.length;
            charCount.textContent = count;

            if (count > 500) {
                charCount.style.color = 'var(--accent-red)';
            } else if (count > 400) {
                charCount.style.color = 'var(--primary-gold)';
            } else {
                charCount.style.color = '';
            }
        });
    }

    // Photo upload
    if (photoUploadArea && reviewPhotos) {
        photoUploadArea.addEventListener('click', function () {
            reviewPhotos.click();
        });

        // Drag and drop
        photoUploadArea.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.classList.add('dragover');
        });

        photoUploadArea.addEventListener('dragleave', function () {
            this.classList.remove('dragover');
        });

        photoUploadArea.addEventListener('drop', function (e) {
            e.preventDefault();
            this.classList.remove('dragover');

            const files = e.dataTransfer.files;
            handlePhotoUpload(files);
        });

        reviewPhotos.addEventListener('change', function () {
            handlePhotoUpload(this.files);
        });
    }

    function handlePhotoUpload(files) {
        const maxFiles = 5;
        const maxSize = 5 * 1024 * 1024; // 5MB
        const currentPhotos = photoPreview.querySelectorAll('.preview-image').length;

        if (currentPhotos >= maxFiles) {
            showToast('Limit Reached', 'You can only upload up to 5 photos.', 'error');
            return;
        }

        Array.from(files).slice(0, maxFiles - currentPhotos).forEach(file => {
            if (!file.type.startsWith('image/')) {
                showToast('Invalid File', 'Please upload only image files.', 'error');
                return;
            }

            if (file.size > maxSize) {
                showToast('File Too Large', 'Each image must be under 5MB.', 'error');
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'preview-image';
                previewDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="remove-preview">
                        <i class="fas fa-times"></i>
                    </button>
                `;

                previewDiv.querySelector('.remove-preview').addEventListener('click', function () {
                    previewDiv.remove();
                });

                photoPreview.appendChild(previewDiv);
            };

            reader.readAsDataURL(file);
        });

        // Hide placeholder if photos added
        const placeholder = document.getElementById('uploadPlaceholder');
        if (placeholder && photoPreview.children.length > 0) {
            placeholder.style.display = 'none';
        }
    }

    // Ordered items
    if (addOrderedItem && orderedItemInput && orderedItemsList) {
        addOrderedItem.addEventListener('click', addItem);

        orderedItemInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addItem();
            }
        });

        function addItem() {
            const item = orderedItemInput.value.trim();

            if (!item) {
                showToast('Empty Field', 'Please enter a dish name.', 'error');
                return;
            }

            const tag = document.createElement('span');
            tag.className = 'ordered-item-tag';
            tag.innerHTML = `
                ${item}
                <button type="button"><i class="fas fa-times"></i></button>
            `;

            tag.querySelector('button').addEventListener('click', function () {
                tag.remove();
            });

            orderedItemsList.appendChild(tag);
            orderedItemInput.value = '';

            // Animation
            tag.style.animation = 'fadeIn 0.3s ease';
        }
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate rating
            const selectedRating = document.querySelector('.star-rating-input input:checked');
            if (!selectedRating) {
                showToast('Rating Required', 'Please select a rating.', 'error');
                return;
            }

            // Validate terms
            const termsChecked = document.getElementById('reviewTerms').checked;
            if (!termsChecked) {
                showToast('Terms Required', 'Please accept the terms to submit.', 'error');
                return;
            }

            // Collect form data
            const reviewData = {
                id: Date.now(),
                rating: parseInt(selectedRating.value),
                title: document.getElementById('reviewTitle').value,
                text: document.getElementById('reviewText').value,
                name: document.getElementById('reviewerName').value,
                email: document.getElementById('reviewerEmail').value,
                orderedItems: Array.from(orderedItemsList.querySelectorAll('.ordered-item-tag')).map(tag =>
                    tag.textContent.trim()
                ),
                categoryRatings: {},
                date: new Date().toISOString(),
                helpful: 0,
                verified: false
            };

            // Get category ratings
            document.querySelectorAll('.mini-star-input').forEach(group => {
                const category = group.dataset.category;
                const filledStars = group.querySelectorAll('.fas.fa-star').length;
                reviewData.categoryRatings[category] = filledStars;
            });

            // Save to localStorage
            saveReview(reviewData);

            // Show success message
            showToast('Review Submitted!', 'Thank you for sharing your experience.', 'success');

            // Close modal
            closeReviewModalAndReset();

            // Add review to grid (optional - display immediately)
            addReviewToGrid(reviewData);
        });
    }

    function closeReviewModalAndReset() {
        const reviewModal = document.getElementById('reviewModal');
        if (reviewModal) {
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Reset form
        form.reset();
        if (photoPreview) photoPreview.innerHTML = '';
        if (orderedItemsList) orderedItemsList.innerHTML = '';
        if (ratingText) {
            ratingText.textContent = 'Select a rating';
            ratingText.style.color = '';
        }
        if (charCount) charCount.textContent = '0';

        // Reset placeholder
        const placeholder = document.getElementById('uploadPlaceholder');
        if (placeholder) placeholder.style.display = '';

        // Reset category stars
        document.querySelectorAll('.mini-star-input i').forEach(star => {
            star.className = 'far fa-star';
        });
    }
}

function saveReview(reviewData) {
    let reviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    reviews.unshift(reviewData);
    localStorage.setItem('userReviews', JSON.stringify(reviews));
}

function addReviewToGrid(reviewData) {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    const stars = '★'.repeat(reviewData.rating) + '☆'.repeat(5 - reviewData.rating);

    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.dataset.rating = reviewData.rating;
    reviewCard.innerHTML = `
        <div class="review-header">
            <div class="reviewer-avatar">
                <div style="width:100%;height:100%;background:var(--gradient-gold);display:flex;align-items:center;justify-content:center;color:var(--dark-bg);font-weight:bold;font-size:1.2rem;">
                    ${reviewData.name.charAt(0).toUpperCase()}
                </div>
            </div>
            <div class="reviewer-info">
                <h4>${reviewData.name}</h4>
                <div class="review-meta">
                    <div class="review-stars" style="color:var(--primary-gold);">
                        ${stars.split('').map(s => `< i class="${s === '★' ? 'fas' : 'far'} fa-star" > </i >`).join('')}
                    </div>
                    <span class="review-date">Just now</span>
                </div>
            </div>
            <span class="verified-badge small" style="background:rgba(46,204,113,0.1);color:var(--accent-green);">
                <i class="fas fa-clock"></i>
                Pending
            </span>
        </div>
        <div class="review-body">
            <p><strong>${reviewData.title}</strong></p>
            <p>${reviewData.text}</p>
        </div>
        <div class="review-footer">
            <button class="helpful-btn" data-id="${reviewData.id}">
                <i class="far fa-thumbs-up"></i>
                <span>0</span>
            </button>
        </div>
    `;

    // Add animation
    reviewCard.style.animation = 'fadeIn 0.5s ease';

    // Insert at beginning
    grid.insertBefore(reviewCard, grid.firstChild);

    // Reinitialize helpful button
    initHelpfulButtons();
}

/* ============================================
   ANIMATE RATING BARS
   ============================================ */
function animateRatingBars() {
    const breakdownItems = document.querySelectorAll('.breakdown-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.breakdown-fill');
                if (fill) {
                    const width = fill.style.width;
                    fill.style.width = '0';

                    setTimeout(() => {
                        fill.style.transition = 'width 1s ease';
                        fill.style.width = width;
                    }, 200);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    breakdownItems.forEach(item => observer.observe(item));
}

/* ============================================
   LOAD MORE REVIEWS
   ============================================ */
document.getElementById('loadMoreReviews')?.addEventListener('click', function () {
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

    // Simulate loading
    setTimeout(() => {
        // Add more review cards (in real app, would fetch from server)
        const grid = document.getElementById('reviewsGrid');

        const moreReviews = [
            {
                name: 'Alexandra Stone',
                rating: 5,
                date: '1 month ago',
                text: 'The best fine dining experience in the city! The presentation was exquisite and the flavors were perfectly balanced.',
                avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
            },
            {
                name: 'Marcus Johnson',
                rating: 4,
                date: '1 month ago',
                text: 'Great atmosphere and delicious food. Slightly pricey but worth it for special occasions.',
                avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
            }
        ];

        moreReviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.dataset.rating = review.rating;
            card.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-avatar">
                        <img src="${review.avatar}" alt="${review.name}">
                    </div>
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <div class="review-meta">
                            <div class="review-stars">
                                ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                                ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                            </div>
                            <span class="review-date">${review.date}</span>
                        </div>
                    </div>
                    <span class="verified-badge small">
                        <i class="fas fa-check-circle"></i>
                        Verified
                    </span>
                </div>
                <div class="review-body">
                    <p>${review.text}</p>
                </div>
                <div class="review-footer">
                    <button class="helpful-btn" data-id="${Date.now()}">
                        <i class="far fa-thumbs-up"></i>
                        <span>${Math.floor(Math.random() * 20)}</span>
                    </button>
                    <button class="reply-btn">
                        <i class="far fa-comment"></i>
                        <span>Reply</span>
                    </button>
                </div>
            `;

            card.style.animation = 'fadeIn 0.5s ease';
            grid.appendChild(card);
        });

        // Reset button
        this.innerHTML = '<span>Load More Reviews</span><i class="fas fa-chevron-down"></i>';

        // Reinitialize helpful buttons
        initHelpfulButtons();

        showToast('Reviews Loaded', '2 more reviews loaded.', 'success');
    }, 1500);
});
/* ============================================
   REVIEWS SECTION
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initReviewsCarousel();
    initReviewFilters();
    initHelpfulButtons();
    initWriteReviewModal();
    initReviewForm();
    animateRatingBars();
});

/* ============================================
   REVIEWS CAROUSEL
   ============================================ */
var currentSlide = 0;
var slidesPerView = 2;
var totalSlides = 5;

function initReviewsCarousel() {
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.indicator');

    if (!track) return;

    // Calculate slides per view based on screen width
    function updateSlidesPerView() {
        if (window.innerWidth <= 992) {
            slidesPerView = 1;
        } else {
            slidesPerView = 2;
        }
    }

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentSlide = Math.max(0, currentSlide - 1);
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentSlide = Math.min(totalSlides - slidesPerView, currentSlide + 1);
            updateCarousel();
        });
    }

    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Touch/Swipe support
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', function (e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentSlide = Math.min(totalSlides - slidesPerView, currentSlide + 1);
            } else {
                currentSlide = Math.max(0, currentSlide - 1);
            }
            updateCarousel();
        }
    }

    // Auto-play
    let autoPlayInterval = setInterval(function () {
        currentSlide++;
        if (currentSlide > totalSlides - slidesPerView) {
            currentSlide = 0;
        }
        updateCarousel();
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', function () {
        clearInterval(autoPlayInterval);
    });

    track.addEventListener('mouseleave', function () {
        autoPlayInterval = setInterval(function () {
            currentSlide++;
            if (currentSlide > totalSlides - slidesPerView) {
                currentSlide = 0;
            }
            updateCarousel();
        }, 5000);
    });

    function updateCarousel() {
        const slideWidth = 100 / slidesPerView;
        const gap = 30;
        const offset = currentSlide * (slideWidth + (gap / track.offsetWidth * 100));
        track.style.transform = `translateX(-${offset}%)`;

        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentSlide);
        });
    }
}

/* ============================================
   REVIEW FILTERS
   ============================================ */
function initReviewFilters() {
    const ratingFilterBtn = document.getElementById('ratingFilterBtn');
    const sortFilterBtn = document.getElementById('sortFilterBtn');
    const ratingOptions = document.querySelectorAll('#ratingFilterMenu .filter-option');
    const sortOptions = document.querySelectorAll('#sortFilterMenu .filter-option');
    const reviewCards = document.querySelectorAll('.review-card');

    // Toggle dropdowns
    [ratingFilterBtn, sortFilterBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const dropdown = this.closest('.filter-dropdown');
                dropdown.classList.toggle('active');

                document.querySelectorAll('.filter-dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
            });
        }
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function () {
        document.querySelectorAll('.filter-dropdown').forEach(d => {
            d.classList.remove('active');
        });
    });

    // Rating filter
    ratingOptions.forEach(option => {
        option.addEventListener('click', function () {
            const filter = this.dataset.filter;

            ratingOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            if (ratingFilterBtn) {
                ratingFilterBtn.querySelector('span').textContent = this.textContent;
            }

            filterReviews(filter);
            this.closest('.filter-dropdown').classList.remove('active');
        });
    });

    // Sort filter
    sortOptions.forEach(option => {
        option.addEventListener('click', function () {
            const sort = this.dataset.sort;

            sortOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            if (sortFilterBtn) {
                sortFilterBtn.querySelector('span').textContent = this.textContent;
            }

            sortReviews(sort);
            this.closest('.filter-dropdown').classList.remove('active');
        });
    });

    function filterReviews(filter) {
        reviewCards.forEach(card => {
            const rating = parseInt(card.dataset.rating);
            let show = false;

            switch (filter) {
                case 'all':
                    show = true;
                    break;
                case '5':
                    show = rating === 5;
                    break;
                case '4':
                    show = rating >= 4;
                    break;
                case '3':
                    show = rating >= 3;
                    break;
                default:
                    show = true;
            }

            if (show) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function sortReviews(sort) {
        const grid = document.getElementById('reviewsGrid');
        if (!grid) return;

        const cards = Array.from(reviewCards);

        cards.sort((a, b) => {
            switch (sort) {
                case 'highest':
                    return parseInt(b.dataset.rating) - parseInt(a.dataset.rating);
                case 'lowest':
                    return parseInt(a.dataset.rating) - parseInt(b.dataset.rating);
                case 'helpful':
                    const aHelpful = parseInt(a.querySelector('.helpful-btn span:last-child')?.textContent || 0);
                    const bHelpful = parseInt(b.querySelector('.helpful-btn span:last-child')?.textContent || 0);
                    return bHelpful - aHelpful;
                case 'recent':
                default:
                    return 0;
            }
        });

        // Re-append sorted cards
        cards.forEach(card => {
            grid.appendChild(card);
            card.style.animation = 'fadeIn 0.5s ease';
        });
    }
}

/* ============================================
   HELPFUL BUTTONS
   ============================================ */
function initHelpfulButtons() {
    const helpfulBtns = document.querySelectorAll('.helpful-btn');

    // Load helpful votes from localStorage
    let helpfulVotes = JSON.parse(localStorage.getItem('reviewHelpfulVotes')) || {};

    helpfulBtns.forEach(btn => {
        const reviewId = btn.dataset.id;

        // Check if already voted
        if (helpfulVotes[reviewId]) {
            btn.classList.add('active');
            btn.querySelector('i').className = 'fas fa-thumbs-up';
        }

        btn.addEventListener('click', function () {
            const countSpan = this.querySelector('.helpful-count') || this.querySelector('span:last-child');
            let count = parseInt(countSpan?.textContent || 0);

            if (this.classList.contains('active')) {
                // Remove vote
                this.classList.remove('active');
                this.querySelector('i').className = 'far fa-thumbs-up';
                count--;
                delete helpfulVotes[reviewId];
            } else {
                // Add vote
                this.classList.add('active');
                this.querySelector('i').className = 'fas fa-thumbs-up';
                count++;
                helpfulVotes[reviewId] = true;

                // Animate
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }

            if (countSpan) {
                countSpan.textContent = count;
            }

            // Save to localStorage
            localStorage.setItem('reviewHelpfulVotes', JSON.stringify(helpfulVotes));
        });
    });
}

/* ============================================
   WRITE REVIEW MODAL
   ============================================ */
function initWriteReviewModal() {
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const reviewModalClose = document.getElementById('reviewModalClose');
    const cancelReview = document.getElementById('cancelReview');

    if (writeReviewBtn && reviewModal) {
        writeReviewBtn.addEventListener('click', function () {
            openReviewModal();
        });
    }

    if (reviewModalClose) {
        reviewModalClose.addEventListener('click', function () {
            closeReviewModal();
        });
    }

    if (cancelReview) {
        cancelReview.addEventListener('click', function () {
            closeReviewModal();
        });
    }

    // Close on outside click
    if (reviewModal) {
        reviewModal.addEventListener('click', function (e) {
            if (e.target === reviewModal) {
                closeReviewModal();
            }
        });
    }

    // Close on escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && reviewModal?.classList.contains('active')) {
            closeReviewModal();
        }
    });

    function openReviewModal() {
        reviewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeReviewModal() {
        reviewModal.classList.remove('active');
        document.body.style.overflow = '';

        // Reset form
        document.getElementById('reviewForm')?.reset();
        document.getElementById('photoPreview').innerHTML = '';
        document.getElementById('orderedItemsList').innerHTML = '';
        document.getElementById('ratingText').textContent = 'Select a rating';
        document.getElementById('charCount').textContent = '0';

        // Reset category stars
        document.querySelectorAll('.mini-star-input i').forEach(star => {
            star.className = 'far fa-star';
        });
    }
}

/* ============================================
   REVIEW FORM
   ============================================ */
function initReviewForm() {
    const form = document.getElementById('reviewForm');
    const reviewText = document.getElementById('reviewText');
    const charCount = document.getElementById('charCount');
    const photoUploadArea = document.getElementById('photoUploadArea');
    const reviewPhotos = document.getElementById('reviewPhotos');
    const photoPreview = document.getElementById('photoPreview');
    const addOrderedItem = document.getElementById('addOrderedItem');
    const orderedItemInput = document.getElementById('orderedItem');
    const orderedItemsList = document.getElementById('orderedItemsList');

    // Star rating
    const starInputs = document.querySelectorAll('.star-rating-input input');
    const ratingText = document.getElementById('ratingText');
    const ratingTexts = {
        1: 'Poor - Very disappointed',
        2: 'Fair - Could be better',
        3: 'Good - Met expectations',
        4: 'Very Good - Exceeded expectations',
        5: 'Excellent - Outstanding!'
    };

    starInputs.forEach(input => {
        input.addEventListener('change', function () {
            const rating = this.value;
            if (ratingText) {
                ratingText.textContent = ratingTexts[rating];
                ratingText.style.color = 'var(--primary-gold)';
            }
        });
    });

    // Category mini stars
    document.querySelectorAll('.mini-star-input').forEach(starGroup => {
        const stars = starGroup.querySelectorAll('i');

        stars.forEach((star, index) => {
            star.addEventListener('click', function () {
                // Fill stars up to clicked
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.className = 'fas fa-star';
                    } else {
                        s.className = 'far fa-star';
                    }
                });
            });

            star.addEventListener('mouseenter', function () {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.style.color = 'var(--primary-gold)';
                    }
                });
            });

            star.addEventListener('mouseleave', function () {
                stars.forEach(s => {
                    s.style.color = '';
                });
            });
        });
    });

    // Character count
    if (reviewText && charCount) {
        reviewText.addEventListener('input', function () {
            const count = this.value.length;
            charCount.textContent = count;

            if (count > 500) {
                charCount.style.color = 'var(--accent-red)';
            } else if (count > 400) {
                charCount.style.color = 'var(--primary-gold)';
            } else {
                charCount.style.color = '';
            }
        });
    }

    // Photo upload
    if (photoUploadArea && reviewPhotos) {
        photoUploadArea.addEventListener('click', function () {
            reviewPhotos.click();
        });

        // Drag and drop
        photoUploadArea.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.classList.add('dragover');
        });

        photoUploadArea.addEventListener('dragleave', function () {
            this.classList.remove('dragover');
        });

        photoUploadArea.addEventListener('drop', function (e) {
            e.preventDefault();
            this.classList.remove('dragover');

            const files = e.dataTransfer.files;
            handlePhotoUpload(files);
        });

        reviewPhotos.addEventListener('change', function () {
            handlePhotoUpload(this.files);
        });
    }

    function handlePhotoUpload(files) {
        const maxFiles = 5;
        const maxSize = 5 * 1024 * 1024; // 5MB
        const currentPhotos = photoPreview.querySelectorAll('.preview-image').length;

        if (currentPhotos >= maxFiles) {
            showToast('Limit Reached', 'You can only upload up to 5 photos.', 'error');
            return;
        }

        Array.from(files).slice(0, maxFiles - currentPhotos).forEach(file => {
            if (!file.type.startsWith('image/')) {
                showToast('Invalid File', 'Please upload only image files.', 'error');
                return;
            }

            if (file.size > maxSize) {
                showToast('File Too Large', 'Each image must be under 5MB.', 'error');
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'preview-image';
                previewDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="remove-preview">
                        <i class="fas fa-times"></i>
                    </button>
                `;

                previewDiv.querySelector('.remove-preview').addEventListener('click', function () {
                    previewDiv.remove();
                });

                photoPreview.appendChild(previewDiv);
            };

            reader.readAsDataURL(file);
        });

        // Hide placeholder if photos added
        const placeholder = document.getElementById('uploadPlaceholder');
        if (placeholder && photoPreview.children.length > 0) {
            placeholder.style.display = 'none';
        }
    }

    // Ordered items
    if (addOrderedItem && orderedItemInput && orderedItemsList) {
        addOrderedItem.addEventListener('click', addItem);

        orderedItemInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addItem();
            }
        });

        function addItem() {
            const item = orderedItemInput.value.trim();

            if (!item) {
                showToast('Empty Field', 'Please enter a dish name.', 'error');
                return;
            }

            const tag = document.createElement('span');
            tag.className = 'ordered-item-tag';
            tag.innerHTML = `
                ${item}
                <button type="button"><i class="fas fa-times"></i></button>
            `;

            tag.querySelector('button').addEventListener('click', function () {
                tag.remove();
            });

            orderedItemsList.appendChild(tag);
            orderedItemInput.value = '';

            // Animation
            tag.style.animation = 'fadeIn 0.3s ease';
        }
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate rating
            const selectedRating = document.querySelector('.star-rating-input input:checked');
            if (!selectedRating) {
                showToast('Rating Required', 'Please select a rating.', 'error');
                return;
            }

            // Validate terms
            const termsChecked = document.getElementById('reviewTerms').checked;
            if (!termsChecked) {
                showToast('Terms Required', 'Please accept the terms to submit.', 'error');
                return;
            }

            // Collect form data
            const reviewData = {
                id: Date.now(),
                rating: parseInt(selectedRating.value),
                title: document.getElementById('reviewTitle').value,
                text: document.getElementById('reviewText').value,
                name: document.getElementById('reviewerName').value,
                email: document.getElementById('reviewerEmail').value,
                orderedItems: Array.from(orderedItemsList.querySelectorAll('.ordered-item-tag')).map(tag =>
                    tag.textContent.trim()
                ),
                categoryRatings: {},
                date: new Date().toISOString(),
                helpful: 0,
                verified: false
            };

            // Get category ratings
            document.querySelectorAll('.mini-star-input').forEach(group => {
                const category = group.dataset.category;
                const filledStars = group.querySelectorAll('.fas.fa-star').length;
                reviewData.categoryRatings[category] = filledStars;
            });

            // Save to localStorage
            saveReview(reviewData);

            // Show success message
            showToast('Review Submitted!', 'Thank you for sharing your experience.', 'success');

            // Close modal
            closeReviewModalAndReset();

            // Add review to grid (optional - display immediately)
            addReviewToGrid(reviewData);
        });
    }

    function closeReviewModalAndReset() {
        const reviewModal = document.getElementById('reviewModal');
        if (reviewModal) {
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Reset form
        form.reset();
        if (photoPreview) photoPreview.innerHTML = '';
        if (orderedItemsList) orderedItemsList.innerHTML = '';
        if (ratingText) {
            ratingText.textContent = 'Select a rating';
            ratingText.style.color = '';
        }
        if (charCount) charCount.textContent = '0';

        // Reset placeholder
        const placeholder = document.getElementById('uploadPlaceholder');
        if (placeholder) placeholder.style.display = '';

        // Reset category stars
        document.querySelectorAll('.mini-star-input i').forEach(star => {
            star.className = 'far fa-star';
        });
    }
}

function saveReview(reviewData) {
    let reviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    reviews.unshift(reviewData);
    localStorage.setItem('userReviews', JSON.stringify(reviews));
}

function addReviewToGrid(reviewData) {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    const stars = '★'.repeat(reviewData.rating) + '☆'.repeat(5 - reviewData.rating);

    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.dataset.rating = reviewData.rating;
    reviewCard.innerHTML = `
        <div class="review-header">
            <div class="reviewer-avatar">
                <div style="width:100%;height:100%;background:var(--gradient-gold);display:flex;align-items:center;justify-content:center;color:var(--dark-bg);font-weight:bold;font-size:1.2rem;">
                    ${reviewData.name.charAt(0).toUpperCase()}
                </div>
            </div>
            <div class="reviewer-info">
                <h4>${reviewData.name}</h4>
                <div class="review-meta">
                    <div class="review-stars" style="color:var(--primary-gold);">
                        ${stars.split('').map(s => `< i class="${s === '★' ? 'fas' : 'far'} fa-star" ></i > `).join('')}
                    </div>
                    <span class="review-date">Just now</span>
                </div>
            </div>
            <span class="verified-badge small" style="background:rgba(46,204,113,0.1);color:var(--accent-green);">
                <i class="fas fa-clock"></i>
                Pending
            </span>
        </div>
        <div class="review-body">
            <p><strong>${reviewData.title}</strong></p>
            <p>${reviewData.text}</p>
        </div>
        <div class="review-footer">
            <button class="helpful-btn" data-id="${reviewData.id}">
                <i class="far fa-thumbs-up"></i>
                <span>0</span>
            </button>
        </div>
    `;

    // Add animation
    reviewCard.style.animation = 'fadeIn 0.5s ease';

    // Insert at beginning
    grid.insertBefore(reviewCard, grid.firstChild);

    // Reinitialize helpful button
    initHelpfulButtons();
}

/* ============================================
   ANIMATE RATING BARS
   ============================================ */
function animateRatingBars() {
    const breakdownItems = document.querySelectorAll('.breakdown-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.breakdown-fill');
                if (fill) {
                    const width = fill.style.width;
                    fill.style.width = '0';

                    setTimeout(() => {
                        fill.style.transition = 'width 1s ease';
                        fill.style.width = width;
                    }, 200);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    breakdownItems.forEach(item => observer.observe(item));
}

/* ============================================
   LOAD MORE REVIEWS
   ============================================ */
document.getElementById('loadMoreReviews')?.addEventListener('click', function () {
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

    // Simulate loading
    setTimeout(() => {
        // Add more review cards (in real app, would fetch from server)
        const grid = document.getElementById('reviewsGrid');

        const moreReviews = [
            {
                name: 'Alexandra Stone',
                rating: 5,
                date: '1 month ago',
                text: 'The best fine dining experience in the city! The presentation was exquisite and the flavors were perfectly balanced.',
                avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
            },
            {
                name: 'Marcus Johnson',
                rating: 4,
                date: '1 month ago',
                text: 'Great atmosphere and delicious food. Slightly pricey but worth it for special occasions.',
                avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
            }
        ];

        moreReviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.dataset.rating = review.rating;
            card.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-avatar">
                        <img src="${review.avatar}" alt="${review.name}">
                    </div>
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <div class="review-meta">
                            <div class="review-stars">
                                ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                                ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                            </div>
                            <span class="review-date">${review.date}</span>
                        </div>
                    </div>
                    <span class="verified-badge small">
                        <i class="fas fa-check-circle"></i>
                        Verified
                    </span>
                </div>
                <div class="review-body">
                    <p>${review.text}</p>
                </div>
                <div class="review-footer">
                    <button class="helpful-btn" data-id="${Date.now()}">
                        <i class="far fa-thumbs-up"></i>
                        <span>${Math.floor(Math.random() * 20)}</span>
                    </button>
                    <button class="reply-btn">
                        <i class="far fa-comment"></i>
                        <span>Reply</span>
                    </button>
                </div>
            `;

            card.style.animation = 'fadeIn 0.5s ease';
            grid.appendChild(card);
        });

        // Reset button
        this.innerHTML = '<span>Load More Reviews</span><i class="fas fa-chevron-down"></i>';

        // Reinitialize helpful buttons
        initHelpfulButtons();

        showToast('Reviews Loaded', '2 more reviews loaded.', 'success');
    }, 1500);
});
/* ============================================
   CONTACT SECTION
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initNewsletterForm();
    initBackToTop();
    updateOpenStatus();
    initPhoneFormatting();
    setCurrentYear();
});

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const messageInput = document.getElementById('contactMessage');
    const charCount = document.getElementById('messageCharCount');

    // Character counter
    if (messageInput && charCount) {
        messageInput.addEventListener('input', function () {
            const count = this.value.length;
            charCount.textContent = count;

            if (count > 1000) {
                charCount.style.color = 'var(--accent-red)';
                this.value = this.value.substring(0, 1000);
            } else if (count > 800) {
                charCount.style.color = 'var(--primary-gold)';
            } else {
                charCount.style.color = '';
            }
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
}

function validateContactForm() {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');
    const privacy = document.getElementById('agreePrivacy');

    let isValid = true;

    // Clear previous errors
    [name, email, subject, message].forEach(input => {
        if (input) {
            input.classList.remove('error');
            const error = input.nextElementSibling;
            if (error && error.classList.contains('input-error')) {
                error.textContent = '';
            }
        }
    });

    // Validate name
    if (!name.value.trim()) {
        setError(name, 'Please enter your name');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        setError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (!subject.value) {
        setError(subject, 'Please select a subject');
        isValid = false;
    }

    // Validate message
    if (!message.value.trim() || message.value.length < 10) {
        setError(message, 'Please enter a message (min 10 characters)');
        isValid = false;
    }

    // Validate privacy checkbox
    if (!privacy.checked) {
        showToast('Privacy Policy', 'Please agree to the privacy policy', 'error');
        isValid = false;
    }

    return isValid;
}

function setError(input, message) {
    input.classList.add('error');
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('input-error')) {
        errorSpan.textContent = message;
    }
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.btn-submit-contact');

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value,
        newsletter: document.getElementById('subscribeNewsletter').checked,
        timestamp: new Date().toISOString()
    };

    // Simulate sending (replace with actual API call)
    setTimeout(() => {
        // Save to localStorage (for demo purposes)
        saveContactMessage(formData);

        // Reset button
        submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;

        // Reset form
        form.reset();
        document.getElementById('messageCharCount').textContent = '0';

        // Show success modal
        showContactSuccess();

    }, 2000);
}

function saveContactMessage(data) {
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(data);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

function showContactSuccess() {
    const modal = document.getElementById('contactSuccessModal');

    if (modal) {
        modal.classList.add('active');

        // Close button
        document.getElementById('closeContactSuccess').addEventListener('click', function () {
            modal.classList.remove('active');
        });

        // Close on outside click
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

/* ============================================
   NEWSLETTER FORM
   ============================================ */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('newsletterEmail').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                showToast('Invalid Email', 'Please enter a valid email address', 'error');
                return;
            }

            // Save subscriber
            saveSubscriber(email);

            // Reset form
            form.reset();

            // Show success
            showToast('Subscribed!', 'Thank you for subscribing to our newsletter!', 'success');
        });
    }
}

function saveSubscriber(email) {
    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];

    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    }
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    const progressCircle = document.querySelector('.progress-ring-circle');

    if (!backToTop) return;

    const circumference = 2 * Math.PI * 22; // r = 22

    if (progressCircle) {
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
    }

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        // Show/hide button
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Update progress ring
        if (progressCircle) {
            const offset = circumference - (scrollPercent * circumference);
            progressCircle.style.strokeDashoffset = offset;
        }
    });

    // Click to scroll to top
    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   OPEN/CLOSED STATUS
   ============================================ */
function updateOpenStatus() {
    const statusElement = document.getElementById('currentStatus');
    if (!statusElement) return;

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + (minute / 60);

    let isOpen = false;

    // Operating hours
    const hours = {
        0: { open: 10, close: 21 },    // Sunday
        1: { open: 11, close: 22 },    // Monday
        2: { open: 11, close: 22 },    // Tuesday
        3: { open: 11, close: 22 },    // Wednesday
        4: { open: 11, close: 22 },    // Thursday
        5: { open: 11, close: 23 },    // Friday
        6: { open: 11, close: 23 }     // Saturday
    };

    const todayHours = hours[day];

    if (currentTime >= todayHours.open && currentTime < todayHours.close) {
        isOpen = true;
    }

    if (isOpen) {
        statusElement.innerHTML = `
            <span class="status-dot open"></span>
            <span>Currently Open</span>
        `;
        statusElement.classList.remove('closed');
    } else {
        statusElement.innerHTML = `
            <span class="status-dot closed"></span>
            <span>Currently Closed</span>
        `;
        statusElement.classList.add('closed');
    }
}

/* ============================================
   PHONE FORMATTING
   ============================================ */
function initPhoneFormatting() {
    const phoneInput = document.getElementById('contactPhone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }

            e.target.value = value;
        });
    }
}

/* ============================================
   SET CURRENT YEAR
   ============================================ */
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ============================================
   SCROLL ANIMATIONS FOR FOOTER
   ============================================ */
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.footer-brand, .footer-links, .footer-contact').forEach(el => {
    footerObserver.observe(el);
});

/* ============================================
   SMOOTH SCROLL FOR FOOTER LINKS
   ============================================ */
document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
