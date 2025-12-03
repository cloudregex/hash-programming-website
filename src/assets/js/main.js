// DOM Elements
const navbar = document.getElementById('navbar');
const logoText = document.getElementById('logo-text');
const navLinks = document.querySelectorAll('.nav-link'); // Desktop links
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link'); // Mobile links

// Mobile Menu Toggle Logic
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        // Toggle 'open' class for CSS transition (using scaleY and opacity)
        mobileMenu.classList.toggle('open');

        // Change Icon
        const icon = mobileMenuBtn.querySelector('i');

        if (mobileMenu.classList.contains('open')) {
            icon.classList.remove('bi-list');
            icon.classList.add('bi-x-lg');
        } else {
            icon.classList.remove('bi-x-lg');
            icon.classList.add('bi-list');
        }
    });
}

// Scroll Logic - Handles Header Color Switching and visibility
window.addEventListener('scroll', function () {

    if (window.scrollY > 400) {
        // SCROLLED STATE (Solid White Navbar)
        navbar.classList.remove('bg-white/10', 'border-white/20', 'shadow-2xl');
        navbar.classList.add('bg-white', 'border-slate-200', 'shadow-lg');

        logoText.classList.remove('text-white');
        logoText.classList.add('text-slate-900');

        navLinks.forEach(link => {
            // Switch links from light blue (unscrolled) to dark gray (scrolled)
            link.classList.remove('text-blue-200', 'hover:text-white', 'hover:bg-white/10');
            link.classList.add('text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-100');
        });

        mobileMenuBtn.classList.remove('text-white');
        mobileMenuBtn.classList.add('text-slate-800');

    } else {
        // TOP STATE (Glassmorphic Navbar)
        navbar.classList.remove('bg-white', 'border-slate-200', 'shadow-lg');
        navbar.classList.add('bg-white/10', 'border-white/20', 'shadow-2xl');

        logoText.classList.remove('text-slate-900');
        logoText.classList.add('text-white');

        navLinks.forEach(link => {
            // Switch links back to light blue (unscrolled)
            link.classList.remove('text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-100');
            link.classList.add('text-blue-200', 'hover:text-white', 'hover:bg-white/10');
        });

        mobileMenuBtn.classList.remove('text-slate-800');
        mobileMenuBtn.classList.add('text-white');
    }
});

// Course Filtering Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');
const noResults = document.getElementById('no-results');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button state
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
            });
            button.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');
            button.classList.add('bg-blue-600', 'text-white');

            // Filter courses
            let visibleCount = 0;

            courseCards.forEach(card => {
                const categories = card.getAttribute('data-categories');

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    // Add fade-in animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease-in-out';
                        card.style.opacity = '1';
                    }, 10);
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide no results message
            if (noResults) {
                if (visibleCount === 0) {
                    noResults.classList.remove('hidden');
                } else {
                    noResults.classList.add('hidden');
                }
            }
        });
    });
}

