class MicroInteractions {
    constructor() {
        this.initMagneticButtons();
        this.initStatsCounter();
        this.initPricingToggle();
    }

    initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Subtle magnetic effect
                const magneticPull = 4; // pixels
                const moveX = (x - rect.width / 2) / rect.width * magneticPull;
                const moveY = (y - rect.height / 2) / rect.height * magneticPull;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    initStatsCounter() {
        const stats = document.querySelectorAll('.stat-number');
        
        const animateValue = (element, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value + (element.dataset.suffix || '');
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const end = parseInt(element.dataset.value);
                    animateValue(element, 0, end, 2000);
                    observer.unobserve(element);
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    }

    initPricingToggle() {
        const toggle = document.getElementById('billing-toggle');
        const prices = document.querySelectorAll('.price .amount');
        const monthlyPrices = ['$49', '$199'];
        const annualPrices = ['$39', '$159'];

        toggle.addEventListener('change', () => {
            prices.forEach((price, index) => {
                if (price.textContent !== 'Custom') {
                    const targetPrice = toggle.checked ? annualPrices[index] : monthlyPrices[index];
                    this.animatePrice(price, targetPrice);
                }
            });
        });
    }

    animatePrice(element, newPrice) {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = newPrice;
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 200);
    }
} 