// Courses page specific JavaScript
class CoursesPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabs();
        this.setupAnimations();
        this.setupCourseCards();
        this.setupEnrollButtons();
    }

    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');

                // Animate tab content
                this.animateTabContent(targetTab);
            });
        });
    }

    animateTabContent(tabId) {
        const tabContent = document.getElementById(tabId);
        const courseCards = tabContent.querySelectorAll('.course-card');

        courseCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupAnimations() {
        // Animate course cards on scroll
        const courseCards = document.querySelectorAll('.course-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        });

        courseCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Animate feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            card.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 100);
        });

        // Animate success stories
        const storyCards = document.querySelectorAll('.story-card');
        storyCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-50px)';
            card.style.transition = 'all 0.6s ease';

            const storyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, index * 200);
                    }
                });
            });

            storyObserver.observe(card);
        });
    }

    setupCourseCards() {
        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateY(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(214, 40, 40, 0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });

            // Add click animation
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('course-btn')) {
                    this.showCourseDetails(card);
                }
            });
        });
    }

    showCourseDetails(card) {
        const courseTitle = card.querySelector('h3').textContent;
        const courseDescription = card.querySelector('.course-description').textContent;
        const features = Array.from(card.querySelectorAll('.feature')).map(f => f.textContent);

        const modal = document.createElement('div');
        modal.className = 'course-modal';
        modal.innerHTML = `
            <div class="course-modal-content">
                <div class="course-modal-header">
                    <h3>${courseTitle}</h3>
                    <button class="close-course-modal">&times;</button>
                </div>
                <div class="course-modal-body">
                    <p>${courseDescription}</p>
                    <h4>Course Features:</h4>
                    <ul>
                        ${features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <div class="modal-actions">
                        <button class="enroll-modal-btn">Enroll Now</button>
                        <button class="contact-modal-btn">Contact for Details</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        const modalStyles = `
            .course-modal {
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
            
            .course-modal-content {
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .course-modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .course-modal-header h3 {
                color: #d62828;
                margin: 0;
            }
            
            .close-course-modal {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            }
            
            .course-modal-body {
                padding: 1.5rem;
            }
            
            .course-modal-body h4 {
                color: #d62828;
                margin: 1rem 0 0.5rem 0;
            }
            
            .course-modal-body ul {
                list-style: none;
                padding: 0;
            }
            
            .course-modal-body li {
                padding: 0.25rem 0;
                color: #666;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
            }
            
            .enroll-modal-btn,
            .contact-modal-btn {
                flex: 1;
                padding: 0.75rem;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .enroll-modal-btn {
                background: #d62828;
                color: white;
            }
            
            .contact-modal-btn {
                background: #f5f5f5;
                color: #d62828;
                border: 2px solid #d62828;
            }
            
            .enroll-modal-btn:hover {
                background: #b91c1c;
                transform: translateY(-2px);
            }
            
            .contact-modal-btn:hover {
                background: #d62828;
                color: white;
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
        const closeBtn = modal.querySelector('.close-course-modal');
        const enrollBtn = modal.querySelector('.enroll-modal-btn');
        const contactBtn = modal.querySelector('.contact-modal-btn');

        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(styleSheet);
            }, 300);
        });

        enrollBtn.addEventListener('click', () => {
            window.location.href = 'admission.html';
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

    setupEnrollButtons() {
        const enrollButtons = document.querySelectorAll('.course-btn');

        enrollButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);

                // Redirect to admission page
                setTimeout(() => {
                    window.location.href = 'admission.html';
                }, 300);
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CoursesPage();
});

// Add CSS styles for courses page
const coursesStyles = `
    .course-categories {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .course-tabs {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
    }

    .tab-btn {
        padding: 1rem 2rem;
        border: 2px solid #d62828;
        background: white;
        color: #d62828;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .tab-btn::before {
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

    .tab-btn span {
        position: relative;
        z-index: 2;
    }

    .tab-btn:hover::before,
    .tab-btn.active::before {
        left: 0;
    }

    .tab-btn:hover,
    .tab-btn.active {
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(214, 40, 40, 0.3);
    }

    .tab-content {
        display: none;
    }

    .tab-content.active {
        display: block;
    }

    .courses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
    }

    .course-card {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }

    .course-card.featured {
        border: 3px solid #d62828;
        transform: scale(1.02);
    }

    .course-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #d62828;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    .course-icon {
        font-size: 4rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    .course-card h3 {
        color: #d62828;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    .course-description {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .course-details {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1.5rem;
    }

    .detail-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

    .detail-label {
        font-weight: 600;
        color: #333;
    }

    .detail-value {
        color: #d62828;
        font-weight: 500;
    }

    .course-features {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .feature {
        color: #666;
        font-size: 0.9rem;
    }

    .course-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 10px;
    }

    .stat {
        text-align: center;
    }

    .stat-number {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: #d62828;
    }

    .stat-label {
        font-size: 0.8rem;
        color: #666;
    }

    .course-btn {
        width: 100%;
        background: linear-gradient(135deg, #d62828, #f77f00);
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .course-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(214, 40, 40, 0.4);
    }

    .course-features-section {
        padding: 5rem 0;
        background: white;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .feature-card {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        transition: all 0.3s ease;
    }

    .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(214, 40, 40, 0.15);
        background: white;
    }

    .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .feature-card h4 {
        color: #d62828;
        margin-bottom: 1rem;
    }

    .feature-card p {
        color: #666;
        line-height: 1.6;
    }

    .success-stories-section {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .stories-slider {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .story-card {
        background: white;
        border-radius: 15px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .story-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(214, 40, 40, 0.15);
    }

    .quote-mark {
        font-size: 4rem;
        color: #d62828;
        line-height: 1;
        margin-bottom: 1rem;
    }

    .story-content p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        font-style: italic;
    }

    .story-author {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .author-info h5 {
        color: #333;
        margin-bottom: 0.25rem;
    }

    .author-info span {
        color: #666;
        font-size: 0.9rem;
    }

    .course-tag {
        background: #d62828;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .courses-grid {
            grid-template-columns: 1fr;
        }
        
        .course-features {
            grid-template-columns: 1fr;
        }
        
        .course-stats {
            flex-direction: column;
            gap: 1rem;
        }
        
        .features-grid {
            grid-template-columns: 1fr;
        }
        
        .stories-slider {
            grid-template-columns: 1fr;
        }
        
        .course-tabs {
            flex-direction: column;
            align-items: center;
        }
        
        .tab-btn {
            width: 200px;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = coursesStyles;
document.head.appendChild(styleSheet);