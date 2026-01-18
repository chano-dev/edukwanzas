// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu-section');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            // Show menu
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('mobile-menu-enter');
            
            // Animate hamburger to X
            animateHamburgerToX();
        } else {
            // Hide menu
            mobileMenu.classList.add('mobile-menu-exit');
            
            // Animate X back to hamburger
            animateXToHamburger();
            
            // Hide after animation
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-enter', 'mobile-menu-exit');
            }, 300);
        }
    });
    
    // Close menu when clicking on links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('mobile-menu-exit');
                animateXToHamburger();
                
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('mobile-menu-enter', 'mobile-menu-exit');
                }, 300);
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = mobileMenuButton.contains(event.target) || mobileMenu.contains(event.target);
        
        if (!isClickInside && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('mobile-menu-exit');
            animateXToHamburger();
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-enter', 'mobile-menu-exit');
            }, 300);
        }
    });
    
    // Animate hamburger to X
    function animateHamburgerToX() {
        const spans = mobileMenuButton.querySelectorAll('span');
        
        // Top line - rotate to 45 degrees
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[0].style.transition = 'all 0.3s ease-in-out';
        
        // Middle line - fade out
        spans[1].style.opacity = '0';
        spans[1].style.transition = 'all 0.3s ease-in-out';
        
        // Bottom line - rotate to -45 degrees
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        spans[2].style.transition = 'all 0.3s ease-in-out';
    }
    
    // Animate X back to hamburger
    function animateXToHamburger() {
        const spans = mobileMenuButton.querySelectorAll('span');
        
        // Reset all lines
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // If window is resized to desktop size, close mobile menu
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                animateXToHamburger();
            }
        }, 250);
    });
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for sticky header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + targetId) {
            link.classList.add('active');
        }
    });
}

// Highlight active section on scroll
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightSection);
    highlightSection(); // Initial call
}

// Initialize navigation features
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollSpy();
});