// Facilities page specific JavaScript
class FacilitiesPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupIconAnimations();
        this.setupVirtualTour();
        this.setupFacilityCards();
    }

    setupAnimations() {
        // Animate facility cards on scroll
        const facilityCards = document.querySelectorAll('.facility-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        });

        facilityCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Animate infrastructure items
        const infrastructureItems = document.querySelectorAll('.infrastructure-item');
        infrastructureItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'all 0.8s ease';

            const itemObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, 200);
                    }
                });
            });

            itemObserver.observe(item);
        });

        // Animate amenity items
        const amenityItems = document.querySelectorAll('.amenity-item');
        amenityItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            item.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 100);
        });
    }

    setupIconAnimations() {
        // Add specific animations for different facility icons
        const iconAnimations = {
            '🏫': 'pulse',
            '📚': 'bounce',
            '🔬': 'rotate',
            '💻': 'glow',
            '🍽️': 'shake',
            '🚗': 'slide',
            '🛡️': 'flash',
            '🚌': 'move'
        };

        document.querySelectorAll('.icon-animation').forEach(icon => {
            const emoji = icon.textContent;
            const animation = iconAnimations[emoji] || 'pulse';
            
            icon.addEventListener('mouseenter', () => {
                icon.style.animation = `${animation} 1s ease-in-out`;
            });

            icon.addEventListener('animationend', () => {
                icon.style.animation = '';
            });
        });

        // Add CSS animations
        const animationStyles = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes glow {
                0%, 100% { filter: brightness(1); }
                50% { filter: brightness(1.5) drop-shadow(0 0 10px #d62828); }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes slide {
                0% { transform: translateX(0); }
                50% { transform: translateX(10px); }
                100% { transform: translateX(0); }
            }
            
            @keyframes flash {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            @keyframes move {
                0% { transform: translateX(0); }
                25% { transform: translateX(5px); }
                50% { transform: translateX(0); }
                75% { transform: translateX(-5px); }
                100% { transform: translateX(0); }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = animationStyles;
        document.head.appendChild(styleSheet);
    }

    setupVirtualTour() {
        const playButton = document.querySelector('.play-button');
        const tourBtn = document.querySelector('.tour-btn');

        if (playButton) {
            playButton.addEventListener('click', () => {
                // Simulate video play
                this.showVideoModal();
            });
        }

        if (tourBtn) {
            tourBtn.addEventListener('click', () => {
                // Redirect to contact page or show contact modal
                window.location.href = 'contact.html';
            });
        }
    }

    showVideoModal() {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <div class="video-modal-header">
                    <h3>Campus Virtual Tour</h3>
                    <button class="close-video-modal">&times;</button>
                </div>
                <div class="video-container">
                    <div class="video-placeholder">
                        <p>Virtual tour video would be embedded here</p>
                        <p>Contact us to schedule a live campus visit!</p>
                        <button class="contact-btn">Contact Us</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        const modalStyles = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .video-modal-content {
                background: white;
                border-radius: 15px;
                max-width: 800px;
                width: 90%;
                max-height: 600px;
                overflow: hidden;
            }
            
            .video-modal-header {
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .close-video-modal {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            }
            
            .video-container {
                padding: 2rem;
                text-align: center;
            }
            
            .video-placeholder {
                background: #f5f5f5;
                padding: 3rem;
                border-radius: 10px;
            }
            
            .contact-btn {
                background: #d62828;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                margin-top: 1rem;
                transition: all 0.3s ease;
            }
            
            .contact-btn:hover {
                background: #b91c1c;
                transform: translateY(-2px);
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        // Show modal
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        // Close modal handlers
        const closeBtn = modal.querySelector('.close-video-modal');
        const contactBtn = modal.querySelector('.contact-btn');

        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(styleSheet);
            }, 300);
        });

        contactBtn.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBtn.click();
            }
        });
    }

    setupFacilityCards() {
        const facilityCards = document.querySelectorAll('.facility-card');

        facilityCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateY(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(214, 40, 40, 0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });

            // Add click effect
            card.addEventListener('click', () => {
                const facilityType = card.getAttribute('data-facility');
                this.showFacilityDetails(facilityType);
            });
        });
    }

    showFacilityDetails(facilityType) {
        const facilityInfo = {
            classroom: {
                title: 'Modern Classrooms',
                description: 'Our state-of-the-art classrooms are designed for optimal learning with modern amenities.',
                features: ['Air Conditioning', 'Smart Boards', 'Ergonomic Seating', 'Audio-Visual Systems']
            },
            library: {
                title: 'Digital Library',
                description: 'Comprehensive library with vast collection of books and digital resources.',
                features: ['10,000+ Books', 'Digital Access', 'Study Areas', 'Online Resources']
            },
            lab: {
                title: 'Science Labs',
                description: 'Fully equipped laboratories for practical learning and experiments.',
                features: ['Modern Equipment', 'Safety Measures', 'Individual Workstations', 'Expert Supervision']
            },
            computer: {
                title: 'Computer Lab',
                description: 'High-tech computer lab with latest hardware and software.',
                features: ['Latest Computers', 'High-Speed Internet', 'Software Tools', 'Online Testing']
            },
            cafeteria: {
                title: 'Cafeteria',
                description: 'Hygienic food court serving nutritious and delicious meals.',
                features: ['Hygienic Environment', 'Nutritious Food', 'Affordable Prices', 'Variety of Options']
            },
            parking: {
                title: 'Parking Area',
                description: 'Secure and spacious parking facility for all vehicles.',
                features: ['Secure Parking', 'CCTV Surveillance', 'Spacious Area', '24/7 Access']
            },
            security: {
                title: '24/7 Security',
                description: 'Round-the-clock security for student safety and peace of mind.',
                features: ['24/7 Monitoring', 'Trained Personnel', 'CCTV Coverage', 'Emergency Response']
            },
            transport: {
                title: 'Transport Service',
                description: 'Convenient and safe transportation covering major areas.',
                features: ['Multiple Routes', 'Safe Travel', 'Trained Drivers', 'Affordable Rates']
            }
        };

        const info = facilityInfo[facilityType];
        if (info) {
            alert(`${info.title}\n\n${info.description}\n\nKey Features:\n${info.features.join('\n')}`);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FacilitiesPage();
});

// Add CSS styles for facilities page
const facilitiesStyles = `
    .facilities-overview {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .facilities-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .facility-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .facility-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #d62828, #f77f00);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
    }

    .facility-card:hover::before {
        opacity: 0.05;
    }

    .facility-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        position: relative;
        z-index: 2;
    }

    .facility-card h3 {
        color: #d62828;
        margin-bottom: 1rem;
        font-size: 1.3rem;
        position: relative;
        z-index: 2;
    }

    .facility-card p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        position: relative;
        z-index: 2;
    }

    .facility-features {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
        position: relative;
        z-index: 2;
    }

    .feature {
        background: #f5f5f5;
        color: #d62828;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .infrastructure-details {
        padding: 5rem 0;
        background: white;
    }

    .infrastructure-content {
        margin-top: 3rem;
    }

    .infrastructure-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
        margin-bottom: 4rem;
    }

    .infrastructure-item.reverse {
        direction: rtl;
    }

    .infrastructure-item.reverse > * {
        direction: ltr;
    }

    .infrastructure-image {
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }

    .infrastructure-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .infrastructure-image:hover img {
        transform: scale(1.05);
    }

    .infrastructure-info h3 {
        color: #d62828;
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    .infrastructure-info p {
        color: #666;
        line-height: 1.7;
        margin-bottom: 1.5rem;
    }

    .infrastructure-features {
        list-style: none;
    }

    .infrastructure-features li {
        padding: 0.5rem 0;
        color: #333;
        position: relative;
        padding-left: 1.5rem;
    }

    .infrastructure-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #d62828;
        font-weight: bold;
    }

    .amenities-section {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .amenities-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .amenity-item {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .amenity-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(214, 40, 40, 0.15);
    }

    .amenity-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .amenity-item h4 {
        color: #d62828;
        margin-bottom: 1rem;
    }

    .amenity-item p {
        color: #666;
        line-height: 1.6;
    }

    .virtual-tour {
        padding: 5rem 0;
        background: white;
    }

    .tour-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
        margin-top: 3rem;
    }

    .tour-video {
        position: relative;
    }

    .video-placeholder {
        position: relative;
        border-radius: 15px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .video-placeholder:hover {
        transform: scale(1.02);
    }

    .video-placeholder img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }

    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        background: rgba(214, 40, 40, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.3s ease;
    }

    .play-button:hover {
        background: #d62828;
        transform: translate(-50%, -50%) scale(1.1);
    }

    .tour-info h3 {
        color: #d62828;
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .tour-info p {
        color: #666;
        line-height: 1.7;
        margin-bottom: 2rem;
    }

    .tour-highlights {
        margin-bottom: 2rem;
    }

    .highlight-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .highlight-number {
        width: 40px;
        height: 40px;
        background: #d62828;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }

    .highlight-content h4 {
        color: #333;
        margin-bottom: 0.5rem;
    }

    .highlight-content p {
        color: #666;
        margin: 0;
    }

    .tour-btn {
        background: linear-gradient(135deg, #d62828, #f77f00);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .tour-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(214, 40, 40, 0.4);
    }

    @media (max-width: 768px) {
        .infrastructure-item,
        .tour-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .infrastructure-item.reverse {
            direction: ltr;
        }
        
        .facilities-grid {
            grid-template-columns: 1fr;
        }
        
        .amenities-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = facilitiesStyles;
document.head.appendChild(styleSheet);