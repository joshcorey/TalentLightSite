// Utility class to manage all animations
class AnimationManager {
    constructor() {
        // Default animation options
        this.defaultOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        // Animation classes mapped to their effects
        this.animationTypes = {
            'fade-up': 'animate-fade-up',
            'fade-in': 'animate-fade-in',
            'scale-in': 'animate-scale-in',
            'slide-left': 'animate-slide-left',
            'slide-right': 'animate-slide-right'
        };

        this.init();
    }

    init() {
        // Create observer for animated elements
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.defaultOptions
        );

        // Observe all elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(element => {
            element.classList.add('animate-prepare');
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate;
                
                // Add animation class
                element.classList.add(this.animationTypes[animationType]);
                element.classList.remove('animate-prepare');
                
                // Stop observing after animation
                this.observer.unobserve(element);
            }
        });
    }
} 