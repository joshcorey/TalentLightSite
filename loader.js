class PageLoader {
    constructor() {
        this.loader = this.createLoader();
        this.init();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <svg class="loader-icon" viewBox="0 0 50 50">
                    <circle class="loader-circle" cx="25" cy="25" r="20" fill="none" stroke-width="5"/>
                </svg>
                <span class="loader-text">Loading TalentLens</span>
            </div>
        `;
        document.body.appendChild(loader);
        return loader;
    }

    init() {
        window.addEventListener('load', () => {
            // Ensure minimum loader display time for better UX
            setTimeout(() => {
                this.hideLoader();
                this.initProgressiveLoad();
            }, 800);
        });
    }

    hideLoader() {
        this.loader.classList.add('loader-hidden');
        setTimeout(() => {
            this.loader.remove();
            document.body.classList.add('content-loaded');
        }, 600);
    }

    initProgressiveLoad() {
        // Load images progressively
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        img.src = src;
        img.addEventListener('load', () => {
            img.classList.add('img-loaded');
        });
    }
} 