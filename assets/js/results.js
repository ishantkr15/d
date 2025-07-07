// Results page specific JavaScript
class ResultsPage {
    constructor() {
        this.currentSlide = 0;
        this.slidesPerView = this.getSlidesPerView();
        this.totalSlides = document.querySelectorAll('.topper-card').length;
        this.maxSlides = Math.max(0, this.totalSlides - this.slidesPerView);
        this.init();
    }

    init() {
        this.setupCarousel();
        this.setupFilters();
        this.setupTableAnimations();
        this.setupStoryCards();
        this.handleResponsive();
    }

    getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    setupCarousel() {
        const carousel = document.querySelector('.carousel-container');
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const topperCards = document.querySelectorAll('.topper-card');

        if (!carousel || !nextBtn || !prevBtn) return;

        // Set initial state
        this.updateCarousel();

        // Next button
        nextBtn.addEventListener('click', () => {
            if (this.currentSlide < this.maxSlides) {
                this.currentSlide++;
                this.updateCarousel();
            }
        });

        // Previous button
        prevBtn.addEventListener('click', () => {
            if (this.currentSlide > 0) {
                this.currentSlide--;
                this.updateCarousel();
            }
        });

        // Auto-play carousel
        setInterval(() => {
            if (this.currentSlide < this.maxSlides) {
                this.currentSlide++;
            } else {
                this.currentSlide = 0;
            }
            this.updateCarousel();
        }, 5000);

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });

        // Mouse drag support
        let isDragging = false;
        let dragStartX = 0;

        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            carousel.style.cursor = 'grabbing';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        carousel.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            carousel.style.cursor = 'grab';
            this.handleSwipe(dragStartX, e.clientX);
        });

        carousel.addEventListener('mouseleave', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });

        // Add hover effects to cards
        topperCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateY(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(214, 40, 40, 0.3)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && this.currentSlide < this.maxSlides) {
                // Swipe left (next)
                this.currentSlide++;
                this.updateCarousel();
            } else if (diff < 0 && this.currentSlide > 0) {
                // Swipe right (previous)
                this.currentSlide--;
                this.updateCarousel();
            }
        }
    }

    updateCarousel() {
        const carousel = document.querySelector('.carousel-container');
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');

        if (!carousel) return;

        const slideWidth = 100 / this.slidesPerView;
        const translateX = -(this.currentSlide * slideWidth);
        
        carousel.style.transform = `translateX(${translateX}%)`;

        // Update button states
        if (prevBtn) {
            prevBtn.disabled = this.currentSlide === 0;
            prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentSlide >= this.maxSlides;
            nextBtn.style.opacity = this.currentSlide >= this.maxSlides ? '0.5' : '1';
        }
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const topperCards = document.querySelectorAll('.topper-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                
                // Filter topper cards
                topperCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });

                // Reset carousel after filtering
                this.currentSlide = 0;
                this.updateCarousel();
            });
        });
    }

    setupTableAnimations() {
        const table = document.querySelector('.results-table');
        const rows = document.querySelectorAll('.results-table tbody tr');

        if (!table || !rows.length) return;

        // Add hover effects to table rows
        rows.forEach((row, index) => {
            row.addEventListener('mouseenter', () => {
                row.style.background = 'linear-gradient(135deg, #d62828, #f77f00)';
                row.style.color = 'white';
                row.style.transform = 'scale(1.02)';
                row.style.boxShadow = '0 5px 15px rgba(214, 40, 40, 0.3)';
            });

            row.addEventListener('mouseleave', () => {
                row.style.background = '';
                row.style.color = '';
                row.style.transform = 'scale(1)';
                row.style.boxShadow = '';
            });

            // Animate rows on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, index * 100);
                    }
                });
            });

            row.style.opacity = '0';
            row.style.transform = 'translateX(-50px)';
            row.style.transition = 'all 0.5s ease';
            observer.observe(row);
        });
    }

    setupStoryCards() {
        const storyCards = document.querySelectorAll('.story-card');

        storyCards.forEach((card, index) => {
            // Add entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';

            // Animate on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 200);
                    }
                });
            });

            observer.observe(card);

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateX(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(214, 40, 40, 0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    handleResponsive() {
        window.addEventListener('resize', () => {
            const newSlidesPerView = this.getSlidesPerView();
            
            if (newSlidesPerView !== this.slidesPerView) {
                this.slidesPerView = newSlidesPerView;
                this.maxSlides = Math.max(0, this.totalSlides - this.slidesPerView);
                
                // Adjust current slide if needed
                if (this.currentSlide > this.maxSlides) {
                    this.currentSlide = this.maxSlides;
                }
                
                this.updateCarousel();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResultsPage();
});

// Add CSS styles for results page
const resultsStyles = `
    .page-header {
        background: linear-gradient(135deg, #d62828, #f77f00);
        color: white;
        padding: 8rem 0 4rem;
        text-align: center;
        margin-top: 80px;
    }

    .page-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .page-subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
    }

    .results-filter {
        padding: 2rem 0;
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .filter-btn {
        padding: 0.75rem 1.5rem;
        border: 2px solid #d62828;
        background: white;
        color: #d62828;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
    }

    .filter-btn:hover,
    .filter-btn.active {
        background: #d62828;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(214, 40, 40, 0.3);
    }

    .toppers-section {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .toppers-carousel {
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        margin-top: 2rem;
    }

    .carousel-container {
        display: flex;
        transition: transform 0.5s ease;
        cursor: grab;
    }

    .topper-card {
        min-width: 33.333%;
        padding: 1rem;
        transition: all 0.3s ease;
    }

    .topper-card .topper-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 1rem;
        border: 4px solid #d62828;
    }

    .topper-card .topper-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .topper-card .topper-info {
        text-align: center;
        background: white;
        padding: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .topper-card h3 {
        font-size: 1.3rem;
        color: #d62828;
        margin-bottom: 0.5rem;
    }

    .topper-card .achievement {
        font-weight: 600;
        color: #333;
        margin-bottom: 0.25rem;
    }

    .topper-card .exam-year {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }

    .topper-card .topper-quote {
        font-style: italic;
        color: #555;
        font-size: 0.9rem;
        border-left: 3px solid #d62828;
        padding-left: 1rem;
    }

    .carousel-controls {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
        pointer-events: none;
    }

    .carousel-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(214, 40, 40, 0.9);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        pointer-events: auto;
    }

    .carousel-btn:hover {
        background: #d62828;
        transform: scale(1.1);
    }

    .carousel-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .results-stats {
        padding: 5rem 0;
        background: white;
    }

    .yearwise-results {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .results-table-container {
        overflow-x: auto;
        margin-top: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .results-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
    }

    .results-table th,
    .results-table td {
        padding: 1rem;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
    }

    .results-table th {
        background: linear-gradient(135deg, #d62828, #f77f00);
        color: white;
        font-weight: 600;
    }

    .results-table tbody tr:hover {
        background: #f8f9fa;
    }

    .success-stories {
        padding: 5rem 0;
        background: white;
    }

    .stories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .story-card {
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .story-content {
        padding: 2rem;
    }

    .quote-icon {
        font-size: 2rem;
        color: #d62828;
        margin-bottom: 1rem;
    }

    .story-text {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 1.5rem;
        font-style: italic;
    }

    .story-author {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .story-author strong {
        color: #d62828;
        font-size: 1.1rem;
    }

    .story-author span {
        color: #666;
        font-size: 0.9rem;
    }

    @media (max-width: 1024px) {
        .topper-card {
            min-width: 50%;
        }
    }

    @media (max-width: 768px) {
        .topper-card {
            min-width: 100%;
        }
        
        .page-title {
            font-size: 2rem;
        }
        
        .filter-buttons {
            flex-direction: column;
            align-items: center;
        }
        
        .filter-btn {
            width: 200px;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = resultsStyles;
document.head.appendChild(styleSheet);