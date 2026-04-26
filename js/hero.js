// ===== HERO SECTION FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function () {

    // ===== LOADING SCREEN (Smart Loading) =====
    const loadingScreen = document.getElementById('loading-screen');

    // Function to check if website is fully loaded
    function isWebsiteFullyLoaded() {
        // Check document ready state
        if (document.readyState !== 'complete') {
            return false;
        }

        // Check if all images are loaded
        const images = document.querySelectorAll('img');
        for (let img of images) {
            if (!img.complete || img.naturalHeight === 0) {
                return false;
            }
        }

        // Check if external stylesheets are loaded
        const externalStyles = document.querySelectorAll('link[rel="stylesheet"][href*="cdnjs"]');
        for (let link of externalStyles) {
            if (!link.sheet) {
                return false;
            }
        }

        // Check if fonts are loaded (if available)
        if ('fonts' in document && document.fonts.status !== 'loaded') {
            return false;
        }

        return true;
    }

    // Function to detect network conditions for background loading
    function getBackgroundLoadingDelay() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const effectiveType = connection.effectiveType;
            const downlink = connection.downlink;

            switch (effectiveType) {
                case 'slow-2g':
                    return downlink < 0.1 ? 10000 : 8000;
                case '2g':
                    return downlink < 0.2 ? 7000 : 6000;
                case '3g':
                    return downlink < 0.5 ? 4000 : 2000;
                case '4g':
                default:
                    return downlink < 1 ? 2000 : 1000;
            }
        }

        if (!navigator.onLine) {
            return 8000;
        }

        return 3000; // Default for unknown connection
    }

    // Smart loading logic
    if (loadingScreen) {
        const loadingStatus = document.querySelector('.loading-status');

        // Check if website is already fully loaded
        if (isWebsiteFullyLoaded()) {
            // Website is ready - show loading for just 1 second for branding
            if (loadingStatus) {
                loadingStatus.innerHTML = 'Loading Portfolio<span class="dots"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>';
            }

            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 1000); // Just 1 second for fully loaded website

        } else {
            // Website still loading - show loading screen while content loads in background
            const backgroundDelay = getBackgroundLoadingDelay();

            // Update status based on what's happening
            if (loadingStatus) {
                if (!navigator.onLine) {
                    loadingStatus.innerHTML = 'Offline Mode - Loading Content<span class="dots"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>';
                } else if (backgroundDelay >= 8000) {
                    loadingStatus.innerHTML = 'Loading Content - Slow Network<span class="dots"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>';
                } else if (backgroundDelay >= 6000) {
                    loadingStatus.innerHTML = 'Loading Resources<span class="dots"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>';
                } else if (backgroundDelay >= 3000) {
                    loadingStatus.innerHTML = 'Loading Portfolio<span class="dots"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>';
                } else {
                    loadingStatus.innerHTML = 'Almost Ready<span class="dots"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>';
                }
            }

            // Continue checking if website becomes fully loaded
            const checkInterval = setInterval(() => {
                if (isWebsiteFullyLoaded()) {
                    clearInterval(checkInterval);
                    // Website loaded during our check - hide loading screen
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 300);
                }
            }, 500); // Check every 500ms

            // Fallback: Hide after max delay even if not fully loaded
            setTimeout(() => {
                clearInterval(checkInterval);
                if (loadingScreen.style.display !== 'none') {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 300);
                }
            }, backgroundDelay);
        }
    }

    // Listen for online/offline events to update loading behavior
    window.addEventListener('online', () => {
        console.log('Connection restored');
    });

    window.addEventListener('offline', () => {
        console.log('Connection lost');
    });

    // ===== TYPING ANIMATION =====
    const roles = [
        'Security Professional',
        'IT Auditor',
        'Writer',
        'Philosopher'
    ];

    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typeSpeed = 150;
    let deleteSpeed = 100;
    let pauseTime = 1500;

    const typedTextElement = document.getElementById('typed-text');

    function typeRole() {
        const currentText = roles[currentRole];

        if (isDeleting) {
            // Deleting characters
            typedTextElement.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;

            if (currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
                setTimeout(typeRole, 500);
                return;
            }
            setTimeout(typeRole, deleteSpeed);
        } else {
            // Typing characters
            typedTextElement.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;

            if (currentChar === currentText.length) {
                isDeleting = true;
                setTimeout(typeRole, pauseTime);
                return;
            }
            setTimeout(typeRole, typeSpeed);
        }
    }

    // Start typing animation
    setTimeout(typeRole, 1000);

    // ===== SIMPLE PARTICLE SYSTEM =====
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';

    // Add canvas to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.insertBefore(canvas, heroSection.firstChild);
    }

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouse = { x: 0, y: 0 };

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Mouse tracking
    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Simple particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            // Movement
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse attraction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100 * 0.3;
                this.x += dx * force * 0.01;
                this.y += dy * force * 0.01;
            }

            // Bounce off edges
            if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

            // Keep within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        draw() {
            const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
            const color = isDarkTheme ? '0, 255, 0' : '0, 179, 0';

            ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    function createParticles() {
        particles = [];
        const particleCount = window.innerWidth >= 768 ? 50 : 25;

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Draw connections between nearby particles
    function drawConnections() {
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
        const color = isDarkTheme ? '0, 255, 0' : '0, 179, 0';

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.2;
                    ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        drawConnections();

        animationId = requestAnimationFrame(animate);
    }

    // Initialize particles
    resizeCanvas();
    createParticles();
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            // Particles will automatically use new theme colors on next frame
        });
    }

    // ===== FLOATING BADGES INTERACTION =====
    const floatingBadges = document.querySelectorAll('.floating-badge');
    floatingBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 255, 0, 0.2)';
        });

        badge.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});
