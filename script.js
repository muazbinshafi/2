// ===== CYBERPUNK PORTFOLIO JAVASCRIPT =====

class CyberpunkPortfolio {
    constructor() {
        this.currentPage = 0;
        this.totalPages = 6;
        this.isScrolling = false;
        this.scrollCooldown = 1000; // 1 second cooldown between scrolls
        this.pages = ['home', 'ops', 'art', 'skills', 'blog', 'contact'];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initParticles();
        this.initCustomCursor();
        this.initTypedEffect();
        this.initAnimations();
        this.setActivePage(0);
    }
    
    setupEventListeners() {
        // Scroll events
        window.addEventListener('wheel', this.handleScroll.bind(this), { passive: false });
        window.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Touch events for mobile
        let touchStartY = 0;
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        window.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextPage();
                } else {
                    this.prevPage();
                }
            }
        }, { passive: true });
        
        // Navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                const pageIndex = this.pages.indexOf(section);
                if (pageIndex !== -1) {
                    this.setActivePage(pageIndex);
                }
            });
        });
        
        // Pulse effect on click/tap
        document.addEventListener('click', this.createPulseEffect.bind(this));
        document.addEventListener('touchstart', this.createPulseEffect.bind(this));
        
        // Resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    handleScroll(e) {
        e.preventDefault();
        
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        if (e.deltaY > 0) {
            this.nextPage();
        } else {
            this.prevPage();
        }
        
        setTimeout(() => {
            this.isScrolling = false;
        }, this.scrollCooldown);
    }
    
    handleKeyboard(e) {
        if (this.isScrolling) return;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                this.nextPage();
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.prevPage();
                break;
            case 'Home':
                e.preventDefault();
                this.setActivePage(0);
                break;
            case 'End':
                e.preventDefault();
                this.setActivePage(this.totalPages - 1);
                break;
        }
    }
    
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.setActivePage(this.currentPage + 1);
        }
    }
    
    prevPage() {
        if (this.currentPage > 0) {
            this.setActivePage(this.currentPage - 1);
        }
    }
    
    setActivePage(pageIndex) {
        if (pageIndex === this.currentPage) return;
        
        this.currentPage = pageIndex;
        const pageId = this.pages[pageIndex];
        
        // Update page visibility
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        document.getElementById(pageId).classList.add('active');
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        document.querySelectorAll(`[data-section="${pageId}"]`).forEach(link => {
            link.classList.add('active');
        });
        
        // Trigger page-specific animations
        this.triggerPageAnimations(pageId);
        
        // Update URL hash
        window.history.replaceState(null, null, `#${pageId}`);
    }
    
    triggerPageAnimations(pageId) {
        const page = document.getElementById(pageId);
        
        switch(pageId) {
            case 'home':
                this.animateHomeIntro();
                break;
            case 'ops':
                this.animateOpsCards();
                this.animateTerminalWidget();
                break;
            case 'art':
                this.animateArtStats();
                break;
            case 'skills':
                this.animateSkillTags();
                break;
            case 'blog':
                this.animateBlogCards();
                break;
            case 'contact':
                this.animateContactElements();
                break;
        }
    }
    
    animateHomeIntro() {
        // Reset typed effect
        if (this.typed) {
            this.typed.destroy();
        }
        this.initTypedEffect();
    }
    
    animateOpsCards() {
        const cards = document.querySelectorAll('.ops-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    animateTerminalWidget() {
        const lines = document.querySelectorAll('.terminal-line');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.5s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, 1000 + (index * 200));
        });
    }
    
    animateArtStats() {
        const stats = document.querySelectorAll('.stat-item');
        stats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                stat.style.transition = 'all 0.8s ease';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    animateSkillTags() {
        const tags = document.querySelectorAll('.skill-tag');
        tags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.4s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1)';
            }, index * 50);
        });
    }
    
    animateBlogCards() {
        const cards = document.querySelectorAll('.blog-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    animateContactElements() {
        const links = document.querySelectorAll('.contact-link');
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
    
    initCustomCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile
        
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorRing = document.querySelector('.cursor-ring');
        
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });
        
        // Smooth follow for ring
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.1;
            ringY += (mouseY - ringY) * 0.1;
            
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            
            requestAnimationFrame(animateRing);
        };
        
        animateRing();
        
        // Hover effects
        document.querySelectorAll('a, button, .skill-tag, .ops-card, .blog-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(1.5)';
                cursorRing.style.transform = 'scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorRing.style.transform = 'scale(1)';
            });
        });
    }
    
    createPulseEffect(e) {
        const pulse = document.querySelector('.pulse-effect');
        
        // Remove existing pulse
        pulse.classList.remove('active');
        
        // Get click/touch position
        let x, y;
        if (e.type === 'touchstart') {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        
        // Position pulse effect
        pulse.style.left = (x - 50) + 'px';
        pulse.style.top = (y - 50) + 'px';
        
        // Trigger animation
        setTimeout(() => {
            pulse.classList.add('active');
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            pulse.classList.remove('active');
        }, 1000);
    }
    
    initParticles() {
        if (typeof particlesJS === 'undefined') {
            console.warn('Particles.js not loaded');
            return;
        }
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00FFFF'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#B967FF',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    
    initTypedEffect() {
        if (typeof Typed === 'undefined') {
            console.warn('Typed.js not loaded');
            return;
        }
        
        this.typed = new Typed('#typed-intro', {
            strings: [
                '// INITIALIZING PROFILE...',
                "I'm Muaz",
                'Red Team Operator & Digital Artist'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1000,
            startDelay: 500,
            loop: false,
            showCursor: true,
            cursorChar: '_',
            contentType: 'html'
        });
    }
    
    initAnimations() {
        // Initialize any additional animations
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate in
        document.querySelectorAll('.ops-card, .stat-item, .skill-tag, .blog-card, .contact-link').forEach(el => {
            observer.observe(el);
        });
    }
    
    handleResize() {
        // Reinitialize particles on resize
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.fn.canvasSize();
        }
        
        // Update cursor visibility
        const cursorElements = document.querySelectorAll('.cursor-dot, .cursor-ring');
        if (window.innerWidth <= 768) {
            cursorElements.forEach(el => el.style.display = 'none');
        } else {
            cursorElements.forEach(el => el.style.display = 'block');
        }
    }
    
    // Utility method to check if page is in view
    isPageActive(pageId) {
        return document.getElementById(pageId).classList.contains('active');
    }
    
    // Method to get current page
    getCurrentPage() {
        return this.pages[this.currentPage];
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for hash in URL
    const hash = window.location.hash.substring(1);
    let initialPage = 0;
    
    if (hash) {
        const pageIndex = ['home', 'ops', 'art', 'skills', 'blog', 'contact'].indexOf(hash);
        if (pageIndex !== -1) {
            initialPage = pageIndex;
        }
    }
    
    // Initialize portfolio
    const portfolio = new CyberpunkPortfolio();
    
    // Set initial page if different from home
    if (initialPage !== 0) {
        setTimeout(() => {
            portfolio.setActivePage(initialPage);
        }, 100);
    }
    
    // Global portfolio instance for debugging
    window.portfolio = portfolio;
});

// Prevent default scroll behavior
document.addEventListener('wheel', (e) => {
    e.preventDefault();
}, { passive: false });

// Prevent default touch scroll on mobile
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) return; // Allow pinch zoom
    e.preventDefault();
}, { passive: false });

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.substring(1);
    if (hash && window.portfolio) {
        const pageIndex = window.portfolio.pages.indexOf(hash);
        if (pageIndex !== -1) {
            window.portfolio.setActivePage(pageIndex);
        }
    }
});

// Performance optimization: Preload next page content
const preloadNextPage = (currentIndex) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < 6) {
        const nextPage = document.getElementById(['home', 'ops', 'art', 'skills', 'blog', 'contact'][nextIndex]);
        // Trigger any lazy loading or preparation for next page
    }
};

// Add smooth scrolling fallback for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const smoothScroll = (target) => {
        const targetElement = document.getElementById(target);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
}

// Console easter egg
console.log(`
%c
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ 
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗
╚██████╗   ██║   ██████╔╝███████╗██║  ██║
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                          
    GHOST PROTOCOL ACTIVATED
    Welcome to the Matrix, Neo...
    
    MuazBinShafi - Red Team Operator
    
`, 'color: #00FF41; font-family: monospace; font-size: 12px;');

console.log('%cSystem Status: ONLINE', 'color: #00FFFF; font-weight: bold;');
console.log('%cSecurity Level: MAXIMUM', 'color: #FF0038; font-weight: bold;');
console.log('%cAccess Level: AUTHORIZED', 'color: #B967FF; font-weight: bold;');

