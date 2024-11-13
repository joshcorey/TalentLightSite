class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.deferNonCriticalCSS();
        this.setupPreconnect();
        this.initializeEventDelegation();
        this.setupErrorBoundary();
    }

    setupLazyLoading() {
        // Lazy load components and sections
        const lazyComponents = document.querySelectorAll('[data-lazy]');
        
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadComponent(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        lazyComponents.forEach(component => lazyLoadObserver.observe(component));
    }

    loadComponent(component) {
        const componentId = component.dataset.lazy;
        import(`./components/${componentId}.js`)
            .then(module => {
                module.default(component);
                component.classList.add('component-loaded');
            })
            .catch(error => {
                console.error(`Failed to load component: ${componentId}`, error);
            });
    }

    deferNonCriticalCSS() {
        const nonCriticalCSS = [
            '/css/animations.css',
            '/css/micro-interactions.css'
        ];

        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = () => {
                link.media = 'all';
            };
            document.head.appendChild(link);
        });
    }

    setupPreconnect() {
        // Preconnect to required origins
        const origins = [
            'https://fonts.googleapis.com',
            'https://clarity.design'
        ];

        origins.forEach(origin => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = origin;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }

    initializeEventDelegation() {
        // Event delegation for better performance
        document.addEventListener('click', (e) => {
            // Handle button clicks
            if (e.target.matches('.btn-primary, .btn-secondary, .cta-button')) {
                this.handleButtonClick(e);
            }
            
            // Handle card interactions
            if (e.target.closest('.feature-card, .pricing-card')) {
                this.handleCardInteraction(e);
            }
        });
    }

    setupErrorBoundary() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            // Send to analytics if needed
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            // Send to analytics if needed
        });
    }
} 