class NavigationManager {
    constructor() {
        this.header = document.querySelector('.navbar');
        this.lastScroll = 0;
        this.ticking = false;
        
        this.init();
    }

    init() {
        this.initScrollBehavior();
        this.initMobileMenu();
        this.initScrollSpy();
    }

    initScrollBehavior() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow and background to navbar on scroll
        if (currentScroll > 50) {
            this.header.classList.add('navbar-scrolled');
        } else {
            this.header.classList.remove('navbar-scrolled');
        }

        // Hide/show navbar based on scroll direction
        if (currentScroll > this.lastScroll && currentScroll > 500) {
            this.header.classList.add('navbar-hidden');
        } else {
            this.header.classList.remove('navbar-hidden');
        }

        this.lastScroll = currentScroll;
    }

    initMobileMenu() {
        const menuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.nav-links');

        menuButton?.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('nav-links-open');
            document.body.classList.toggle('menu-open');
        });
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }
} 