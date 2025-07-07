// Gallery page specific JavaScript
class GalleryPage {
    constructor() {
        this.currentImageIndex = 0;
        this.filteredImages = [];
        this.init();
    }

    init() {
        this.setupCategoryFilters();
        this.setupLightbox();
        this.setupAnimations();
        this.setupLazyLoading();
        this.initializeFilteredImages();
    }

    initializeFilteredImages() {
        this.filteredImages = Array.from(document.querySelectorAll('.gallery-item'));
    }

    setupCategoryFilters() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');

                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                // Filter gallery items
                this.filterGallery(category, galleryItems);
            });
        });
    }

    filterGallery(category, galleryItems) {
        const galleryGrid = document.getElementById('galleryGrid');
        
        // Hide all items first
        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
        });

        setTimeout(() => {
            this.filteredImages = [];
            
            galleryItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    this.filteredImages.push(item);
                    
                    // Animate visible items
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 50);
                } else {
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        }, 300);
    }

    setupLightbox() {
        const viewImageButtons = document.querySelectorAll('.view-image-btn');
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');

        // Open lightbox
        viewImageButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                
                const galleryItem = button.closest('.gallery-item');
                const imageUrl = button.getAttribute('data-image');
                const title = galleryItem.querySelector('.gallery-info h4').textContent;
                const description = galleryItem.querySelector('.gallery-info p').textContent;
                
                this.currentImageIndex = this.filteredImages.indexOf(galleryItem);
                this.openLightbox(imageUrl, title, description);
            });
        });

        // Close lightbox
        lightboxClose.addEventListener('click', () => {
            this.closeLightbox();
        });

        // Close on background click
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                this.closeLightbox();
            }
        });

        // Navigation
        lightboxPrev.addEventListener('click', () => {
            this.navigateLightbox(-1);
        });

        lightboxNext.addEventListener('click', () => {
            this.navigateLightbox(1);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightboxModal.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.navigateLightbox(-1);
                        break;
                    case 'ArrowRight':
                        this.navigateLightbox(1);
                        break;
                }
            }
        });
    }

    openLightbox(imageUrl, title, description) {
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');

        lightboxImage.src = imageUrl;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;

        lightboxModal.style.display = 'flex';
        lightboxModal.style.opacity = '0';
        
        setTimeout(() => {
            lightboxModal.style.opacity = '1';
        }, 10);

        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const lightboxModal = document.getElementById('lightboxModal');
        
        lightboxModal.style.opacity = '0';
        setTimeout(() => {
            lightboxModal.style.display = 'none';
        }, 300);

        // Enable body scroll
        document.body.style.overflow = '';
    }

    navigateLightbox(direction) {
        const newIndex = this.currentImageIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.filteredImages.length) {
            this.currentImageIndex = newIndex;
            
            const galleryItem = this.filteredImages[this.currentImageIndex];
            const button = galleryItem.querySelector('.view-image-btn');
            const imageUrl = button.getAttribute('data-image');
            const title = galleryItem.querySelector('.gallery-info h4').textContent;
            const description = galleryItem.querySelector('.gallery-info p').textContent;
            
            // Fade out current image
            const lightboxImage = document.getElementById('lightboxImage');
            lightboxImage.style.opacity = '0';
            
            setTimeout(() => {
                lightboxImage.src = imageUrl;
                document.getElementById('lightboxTitle').textContent = title;
                document.getElementById('lightboxDescription').textContent = description;
                
                // Fade in new image
                lightboxImage.style.opacity = '1';
            }, 150);
        }
    }

    setupAnimations() {
        // Animate category buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(-20px)';
            button.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                }
            });
        });

        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);

            // Add hover effects
            const galleryImage = item.querySelector('.gallery-image');
            const galleryOverlay = item.querySelector('.gallery-overlay');

            item.addEventListener('mouseenter', () => {
                galleryImage.style.transform = 'scale(1.1)';
                galleryOverlay.style.opacity = '1';
            });

            item.addEventListener('mouseleave', () => {
                galleryImage.style.transform = 'scale(1)';
                galleryOverlay.style.opacity = '0';
            });
        });
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryPage();
});

// Add CSS styles for gallery page
const galleryStyles = `
    .gallery-categories {
        padding: 2rem 0;
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .category-tabs {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .category-btn {
        padding: 0.75rem 1.5rem;
        border: 2px solid #d62828;
        background: white;
        color: #d62828;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .category-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: #d62828;
        transition: left 0.3s ease;
        z-index: 1;
    }

    .category-btn span {
        position: relative;
        z-index: 2;
    }

    .category-btn:hover::before,
    .category-btn.active::before {
        left: 0;
    }

    .category-btn:hover,
    .category-btn.active {
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(214, 40, 40, 0.3);
    }

    .photo-gallery {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .gallery-item {
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
    }

    .gallery-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(214, 40, 40, 0.2);
    }

    .gallery-image {
        position: relative;
        overflow: hidden;
        height: 250px;
    }

    .gallery-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(214, 40, 40, 0.8));
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .gallery-info {
        color: white;
    }

    .gallery-info h4 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    .gallery-info p {
        font-size: 0.9rem;
        opacity: 0.9;
    }

    .view-image-btn {
        align-self: flex-end;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid white;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .view-image-btn:hover {
        background: white;
        color: #d62828;
        transform: scale(1.1);
    }

    .lightbox-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.3s ease;
    }

    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        z-index: 10001;
        transition: all 0.3s ease;
    }

    .lightbox-close:hover {
        color: #d62828;
        transform: scale(1.2);
    }

    .lightbox-prev,
    .lightbox-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(214, 40, 40, 0.8);
        border: none;
        color: white;
        font-size: 2rem;
        padding: 1rem;
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.3s ease;
        z-index: 10001;
    }

    .lightbox-prev {
        left: -80px;
    }

    .lightbox-next {
        right: -80px;
    }

    .lightbox-prev:hover,
    .lightbox-next:hover {
        background: #d62828;
        transform: translateY(-50%) scale(1.1);
    }

    #lightboxImage {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 10px;
        transition: opacity 0.3s ease;
    }

    .lightbox-caption {
        text-align: center;
        color: white;
        margin-top: 1rem;
        max-width: 500px;
    }

    .lightbox-caption h4 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #d62828;
    }

    .lightbox-caption p {
        opacity: 0.9;
        line-height: 1.6;
    }

    @media (max-width: 768px) {
        .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }
        
        .category-tabs {
            flex-direction: column;
            align-items: center;
        }
        
        .category-btn {
            width: 200px;
        }
        
        .lightbox-prev,
        .lightbox-next {
            display: none;
        }
        
        .lightbox-close {
            top: -40px;
            font-size: 2rem;
        }
        
        .lightbox-content {
            max-width: 95%;
            max-height: 95%;
        }
        
        #lightboxImage {
            max-height: 60vh;
        }
    }

    @media (max-width: 480px) {
        .gallery-grid {
            grid-template-columns: 1fr;
        }
        
        .gallery-image {
            height: 200px;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = galleryStyles;
document.head.appendChild(styleSheet);