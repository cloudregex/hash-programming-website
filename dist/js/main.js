// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function () {
    initMouseTrail();
    initTheme();
    initScrollAnimations();
    initTypingAnimation();
    initCounters();
    initCodeRain();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initMagneticButtons();
    initParallax();
    initScrollProgress();
    initBackToTop();
    initCardHoverEffects();
    initParticles();
});

// ==================== MOUSE TRAIL ====================
function initMouseTrail() {
    const colors = ['#f97316', '#3b82f6', '#f59e0b', '#06b6d4'];
    const particles = [];

    document.addEventListener('mousemove', (e) => {
        createParticle(e.clientX, e.clientY);
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(particle);
        particles.push(particle);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
            particles.shift();
        }, 500);
    }
}

// ==================== THEME TOGGLE ====================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');

        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const sections = document.querySelectorAll('.page-section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==================== TYPING ANIMATION ====================
function initTypingAnimation() {
    const texts = ['Java','PHP', 'MERN', 'Python', 'Android', 'Node.js',  'Angular', 'Tailwind', 'JavaScript', 'React.js', 'BootStrap', 'Flutter', 'React Native', 'MongoDB', 'Spring Boot', 'Django', 'Dart', ];
    const typingElement = document.getElementById('typingText');

    if (!typingElement) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ==================== COUNTER ANIMATION ====================
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2 seconds
                const startTime = performance.now();

                function easeOutQuart(t) {
                    return 1 - Math.pow(1 - t, 4);
                }

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutQuart(progress);
                    const current = Math.floor(easedProgress * target);

                    // Format number with suffix
                    let suffix = '';
                    if (target === 95) {
                        suffix = '%';
                    } else if (target >= 1000) {
                        suffix = '+';
                    } else {
                        suffix = '+';
                    }

                    counter.textContent = current.toLocaleString() + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString() + suffix;
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ==================== CODE RAIN EFFECT ====================
function initCodeRain() {
    const container = document.getElementById('codeRain');
    if (!container) return;

    const chars = '01()QWERTYUIOPASDFGHJKL;ZXCVBNM<>{}[];=+-*&^%$#@!~';
    const colors = ['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#ec4899'];

    function createDrop() {
        const drop = document.createElement('div');
        drop.className = 'code-rain';
        drop.textContent = chars[Math.floor(Math.random() * chars.length)];

        drop.style.left = Math.random() * 100 + 'vw';

        // Slow falling (6s–12s)
        drop.style.animationDuration = (Math.random() * 6 + 6) + 's';

        drop.style.opacity = Math.random() * 0.5 + 0.1;
        drop.style.fontSize = (Math.random() * 15 + 10) + 'px';
        drop.style.color = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(drop);

        drop.addEventListener('animationend', () => drop.remove());
        setTimeout(() => drop.remove(), 13000);
    }

    // Slow rain (280ms)
    setInterval(createDrop, 280);
}


// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('menu-open');
        mobileMenu.classList.toggle('hidden');

        // Prevent body scroll when menu is open
        if (!mobileMenu.classList.contains('hidden')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('menu-open');
            mobileMenu.classList.add('hidden');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            menuBtn.classList.remove('menu-open');
            mobileMenu.classList.add('hidden');
            body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            menuBtn.classList.remove('menu-open');
            mobileMenu.classList.add('hidden');
            body.style.overflow = '';
        }
    });
}

// ==================== NAVBAR SCROLL ====================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        const navbarInner = navbar.querySelector('.glass');

        if (currentScrollY > 100) {
            // Add background blur and shadow when scrolled
            navbarInner.classList.add('shadow-lg', 'shadow-orange-500/10');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbarInner.classList.remove('shadow-lg', 'shadow-orange-500/10');
            navbar.style.padding = '0';
        }

        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Add active state to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-orange-500', 'dark:text-orange-400');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-orange-500', 'dark:text-orange-400');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ==================== MAGNETIC BUTTONS ====================
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    const blobs = document.querySelectorAll('.blob');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        blobs.forEach((blob, index) => {
            const speed = 0.1 + (index * 0.05);
            blob.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // Mouse parallax for hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;

            const floatingElements = heroSection.querySelectorAll('.animate-float, .animate-float-delay');
            floatingElements.forEach((el, index) => {
                const depth = 1 + index * 0.2;
                el.style.transform = `translate(${xPos * depth}px, ${yPos * depth}px)`;
            });
        });
    }
}

// ==================== SCROLL PROGRESS ====================
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #f97316, #3b82f6);
        z-index: 9999;
        transition: width 0.1s ease;
        border-radius: 0 2px 2px 0;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    // Create button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f97316, #3b82f6);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 9998;
        box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    `;
    document.body.appendChild(backToTopBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
        backToTopBtn.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.5)';
    });

    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'scale(1) translateY(0)';
        backToTopBtn.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.4)';
    });
}

// ==================== CARD HOVER EFFECTS ====================
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card-3d, .course-card, .glass');

    // ✅ Easy to adjust these values
    const ROTATION_INTENSITY = 50;  // Higher = less rotation (20=strong, 50=subtle, 100=minimal)
    const SCALE_AMOUNT = 1.01;      // 1.00 = no scale, 1.02 = noticeable
    const ENABLE_3D = true;         // Set false to disable 3D effect completely

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mousemove', (e) => {
            if (!ENABLE_3D) {
                card.style.transform = `scale(${SCALE_AMOUNT})`;
                return;
            }

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / ROTATION_INTENSITY;
            const rotateY = (centerX - x) / ROTATION_INTENSITY;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${SCALE_AMOUNT})`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ==================== FLOATING PARTICLES ====================
function initParticles() {
    const container = document.querySelector('.fixed.inset-0');
    if (!container) return;

    const particleCount = 20;
    const colors = ['#f97316', '#3b82f6', '#22c55e', '#a855f7'];

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, colors);
    }
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        opacity: ${Math.random() * 0.3 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
    `;

    container.appendChild(particle);
}

// Add particle animation keyframes dynamically
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(100px, -100px) rotate(90deg);
        }
        50% {
            transform: translate(50px, -200px) rotate(180deg);
        }
        75% {
            transform: translate(-50px, -100px) rotate(270deg);
        }
    }
`;
document.head.appendChild(particleStyle);

// ==================== ENROLLMENT BUTTON HANDLER ====================
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-shine') && e.target.textContent.includes('Enroll')) {
        e.preventDefault();

        // Get course info
        const card = e.target.closest('.course-card');
        const courseName = card ? card.querySelector('h3').textContent : 'Course';

        // Show enrollment modal or toast
        showToast('success', `Thank you for your interest in "${courseName}"! Redirecting to enrollment...`);

        // Simulate redirect
        setTimeout(() => {
            // window.location.href = '/enroll?course=' + encodeURIComponent(courseName);
            console.log('Enrolling in:', courseName);
        }, 2000);
    }
});

// ==================== NEWSLETTER SUBSCRIPTION ====================
document.addEventListener('submit', (e) => {
    if (e.target.closest('footer')) {
        e.preventDefault();

        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value : '';

        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('success', 'Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            showToast('error', 'Please enter a valid email address.');
        }
    }
});

// ==================== LAZY LOADING IMAGES ====================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('img-reveal');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    // Press '/' to focus search (if exists)
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) searchInput.focus();
    }

    // Press 'Escape' to close any open modal/menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.getElementById('mobileMenuBtn');

        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuBtn.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    // Initialize lazy loading after page load
    initLazyLoading();
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// ==================== CONSOLE EASTER EGG ====================
console.log('%c Hash Programming classes ', 'background: linear-gradient(90deg, #f97316, #3b82f6); color: white; font-size: 24px; padding: 10px 20px; border-radius: 10px; font-weight: bold;');
console.log('%c Want to become a developer? Check out our courses! ', 'color: #f97316; font-size: 14px;');