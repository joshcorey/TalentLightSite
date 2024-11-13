class ResourceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupImageOptimization();
        this.initializeIntersectionObservers();
        this.setupPerformanceMetrics();
        this.initializeCache();
    }

    setupImageOptimization() {
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            // Generate srcset for responsive images
            if (img.dataset.responsive) {
                const sizes = [300, 600, 900, 1200];
                const srcset = sizes
                    .map(size => `${this.generateImageUrl(img.dataset.src, size)} ${size}w`)
                    .join(', ');
                img.srcset = srcset;
            }
        });
    }

    generateImageUrl(src, size) {
        // Add image transformation parameters for your CDN
        return `${src}?width=${size}&quality=80&format=webp`;
    }

    initializeIntersectionObservers() {
        // Create a single observer for all intersection-based features
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.dataset.src) {
                        this.loadImage(element);
                    }
                    if (element.dataset.animation) {
                        this.triggerAnimation(element);
                    }
                    if (element.dataset.metric) {
                        this.trackVisibility(element);
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Observe all relevant elements
        document.querySelectorAll('[data-src], [data-animation], [data-metric]')
            .forEach(element => observer.observe(element));
    }

    setupPerformanceMetrics() {
        if ('performance' in window) {
            // Track Core Web Vitals
            this.trackWebVitals();
            
            // Custom performance marks
            performance.mark('app-init');
            
            window.addEventListener('load', () => {
                performance.mark('app-loaded');
                performance.measure('app-load-time', 'app-init', 'app-loaded');
            });
        }
    }

    trackWebVitals() {
        // Import and initialize web-vitals library
        import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
            getCLS(this.logMetric);
            getFID(this.logMetric);
            getLCP(this.logMetric);
        });
    }

    logMetric(metric) {
        console.log(metric.name, metric.value);
        // Send to analytics
    }

    initializeCache() {
        if ('caches' in window) {
            // Cache static assets
            caches.open('static-v1').then(cache => {
                cache.addAll([
                    '/css/critical.css',
                    '/js/main.js',
                    '/images/logo.svg'
                ]);
            });
        }
    }

    loadImage(element) {
        try {
            const src = element.dataset.src;
            if (!src) return;
            
            const img = new Image();
            img.onload = () => {
                element.src = src;
                element.classList.add('img-loaded');
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
                element.classList.add('img-error');
            };
            img.src = src;
        } catch (error) {
            console.error('Image loading error:', error);
        }
    }
} 