// ===== ADDITIONAL ANIMATIONS AND EFFECTS =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PROFILE PHOTO ANIMATIONS =====
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        // Remove hover effects as requested
        // Only keep click animation
        profilePhoto.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }
    
    // ===== RIPPLE EFFECT UTILITY =====
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, var(--brand-color) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // ===== APPLY RIPPLE EFFECTS =====
    const rippleElements = document.querySelectorAll('.hire-btn, .theme-toggle, .nav-link');
    rippleElements.forEach(addRippleEffect);
    
    // ===== NAVBAR ENTRANCE ANIMATION =====
    const navbar = document.querySelector('.navbar');
    navbar.style.animation = 'slideDown 0.8s ease-out';
    
    // ===== STAGGER ANIMATION FOR MOBILE MENU =====
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-hire-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Observe mobile menu state changes
    const menuObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active')) {
                    // Menu opened - animate items in
                    mobileNavLinks.forEach((link, index) => {
                        link.style.opacity = '0';
                        link.style.transform = 'translateX(-30px)';
                        setTimeout(() => {
                            link.style.transition = 'all 0.3s ease';
                            link.style.opacity = '1';
                            link.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                } else {
                    // Menu closed - reset styles
                    mobileNavLinks.forEach(link => {
                        link.style.transition = '';
                        link.style.opacity = '';
                        link.style.transform = '';
                    });
                }
            }
        });
    });
    
    if (mobileMenu) {
        menuObserver.observe(mobileMenu, { attributes: true });
    }
    
    // ===== THEME TOGGLE ANIMATIONS =====
    const themeToggle = document.querySelector('.theme-toggle');
    const toggleSlider = document.querySelector('.theme-toggle-slider');
    
    if (themeToggle && toggleSlider) {
        themeToggle.addEventListener('click', function() {
            // Add rotation animation to slider
            toggleSlider.style.transform += ' rotate(360deg)';
            setTimeout(() => {
                toggleSlider.style.transform = toggleSlider.style.transform.replace(' rotate(360deg)', '');
            }, 300);
        });
    }
    
    // ===== PARALLAX EFFECT FOR NAVBAR BACKGROUND =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (navbar) {
            navbar.style.backgroundPosition = `center ${parallax}px`;
        }
    });
    
    // ===== HOVER EFFECTS FOR NAV LINKS =====
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Remove hover effects to prevent blur
        // Only keep basic CSS hover effects
    });
    
    // ===== PERFORMANCE OPTIMIZATION =====
    let ticking = false;
    
    function updateAnimations() {
        // Throttle expensive animations
        if (!ticking) {
            requestAnimationFrame(function() {
                // Add any performance-heavy animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateAnimations);
    window.addEventListener('resize', updateAnimations);
});

// ===== CSS ANIMATIONS INJECTION =====
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 var(--shadow);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px transparent;
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px var(--shadow);
        }
        50% {
            box-shadow: 0 0 20px var(--shadow), 0 0 30px var(--shadow);
        }
    }
    
    .nav-link.active {
        animation: glow 2s ease-in-out infinite;
    }
    
    .hire-btn:hover {
        animation: glow 1s ease-in-out infinite;
    }
`;
document.head.appendChild(animationStyles);
