// Main JavaScript file for D Sharma Classes website
class DSharmaWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupMagicTrail();
        this.setupScrollEffects();
        this.setupCountUpAnimation();
        this.setupParticles();
        this.setupNavigation();
    }

    setupEventListeners() {
        // Hamburger menu toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const closeMobileMenu = document.querySelector('.close-mobile-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                mobileMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close mobile menu when clicking outside
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // CTA button click
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                window.location.href = 'admission.html';
            });
        }
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const scrollTopBtn = document.getElementById('scrollTopBtn');
            const navbar = document.querySelector('.navbar');

            // Show/hide scroll to top button
            if (scrollTopBtn) {
                if (scrollY > 300) {
                    scrollTopBtn.classList.add('show');
                } else {
                    scrollTopBtn.classList.remove('show');
                }
            }

            // Navbar scroll effect
            if (navbar) {
                if (scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                }
            }

            // Parallax effect for hero section
            const hero = document.querySelector('.hero');
            if (hero && scrollY < window.innerHeight) {
                hero.style.transform = `translateY(${scrollY * 0.5}px)`;
            }

            lastScrollY = scrollY;
        });
    }

    setupCountUpAnimation() {
        const countElements = document.querySelectorAll('.stat-number');
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-count'));
                    this.animateCounter(target, finalValue);
                    observer.unobserve(target);
                }
            });
        }, options);

        countElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateCounter(element, finalValue) {
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 100);
        const duration = 2000;
        const stepTime = duration / (finalValue / increment);

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                element.textContent = finalValue.toLocaleString();
                clearInterval(counter);
            } else {
                element.textContent = currentValue.toLocaleString();
            }
        }, stepTime);
    }

    setupMagicTrail() {
        const canvas = document.getElementById('magicTrail');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const mouse = { x: 0, y: 0 };

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.life = 1;
                this.decay = 0.02;
                this.size = Math.random() * 3 + 1;
                this.color = `hsl(${Math.random() * 60 + 10}, 70%, 60%)`;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                this.size *= 0.98;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            // Create particles on mouse move
            if (Math.random() < 0.1) {
                particles.push(new Particle(mouse.x, mouse.y));
            }
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                particle.update();
                particle.draw();
                
                if (particle.life <= 0) {
                    particles.splice(i, 1);
                }
            }
            
            requestAnimationFrame(animate);
        }

        animate();

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    setupParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;

        // Create floating particles for hero section
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            heroParticles.appendChild(particle);
        }
    }

    initializeAnimations() {
        // Scroll reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Apply scroll animations to elements
        const animatedElements = document.querySelectorAll(
            '.stat-card, .quick-link-card, .about-content, .section-header'
        );

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });

        // Stagger animations for cards
        const cards = document.querySelectorAll('.stat-card, .quick-link-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    setupNavigation() {
        // Active nav link handling
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (href === '#home' && currentPage === 'index.html')) {
                link.classList.add('active');
            }
        });

        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Utility functions
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DSharmaWebsite();
});

// Global functions for external use
window.DSharmaWebsite = DSharmaWebsite;

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalImages = [
        'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1920'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Call preload function
preloadCriticalResources();