document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const animationManager = new AnimationManager();
    const microInteractions = new MicroInteractions();
    const navigationManager = new NavigationManager();
    const pageLoader = new PageLoader();

    // Initialize optimization managers
    const performanceManager = new PerformanceManager();
    const resourceOptimizer = new ResourceOptimizer();

    // Add critical CSS inline
    const criticalCSS = document.createElement('style');
    criticalCSS.textContent = `
        /* Add critical CSS here */
        .navbar { /* ... */ }
        .hero { /* ... */ }
    `;
    document.head.appendChild(criticalCSS);

    // Update image tags to use progressive loading
    document.querySelectorAll('img').forEach(img => {
        if (img.src) {
            img.setAttribute('data-src', img.src);
            img.removeAttribute('src');
        }
    });
});

// Add cleanup method to each manager class
class AnimationManager {
    destroy() {
        // Remove observers and event listeners
        this.observer?.disconnect();
    }
}

// Update main.js
window.addEventListener('unload', () => {
    // Cleanup all managers
    animationManager?.destroy();
    microInteractions?.destroy();
    navigationManager?.destroy();
    performanceManager?.destroy();
    resourceOptimizer?.destroy();
}); 