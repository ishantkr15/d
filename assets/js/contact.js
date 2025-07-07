// Contact page specific JavaScript
class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFAQ();
        this.setupFormSubmission();
        this.setupAnimations();
    }

    setupFormValidation() {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Name validation
        if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!nameRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid name';
            }
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);

        // Add shake animation
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    clearError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    setupFormSubmission() {
        const form = document.getElementById('contactForm');
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('span');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate all fields
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let allValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    allValid = false;
                }
            });

            if (!allValid) {
                this.showFormError('Please fix the errors above before submitting.');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';

            try {
                // Submit form
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.showSuccessModal();
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                this.showFormError('Something went wrong. Please try again.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        });
    }

    showFormError(message) {
        const form = document.getElementById('contactForm');
        
        // Remove existing error
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        form.insertBefore(errorElement, form.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }

    showSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        
        // Animate modal appearance
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);

        // Add confetti effect
        this.createConfetti();

        // Close modal handlers
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => this.closeModal());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Auto-close after 3 seconds
        setTimeout(() => {
            this.closeModal();
        }, 3000);
    }

    closeModal() {
        const modal = document.getElementById('successModal');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);

        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = this.getRandomColor();
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confettiContainer.appendChild(confetti);
        }

        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 4000);
    }

    getRandomColor() {
        const colors = ['#d62828', '#f77f00', '#fcbf49', '#eae2b7', '#003049'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                        otherItem.querySelector('.faq-icon').textContent = '+';
                    }
                });

                // Toggle current item
                if (isOpen) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    icon.textContent = '+';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.textContent = '−';
                }
            });
        });
    }

    setupAnimations() {
        // Animate contact info cards
        const contactCards = document.querySelectorAll('.contact-info-card');
        contactCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        const faqObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        });

        faqItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.6s ease';
            faqObserver.observe(item);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
});

// Add CSS styles for contact page
const contactStyles = `
    .contact-info-section {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .contact-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }

    .contact-info-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .contact-info-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(214, 40, 40, 0.2);
    }

    .contact-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .contact-info-card h3 {
        color: #d62828;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }

    .contact-info-card p {
        color: #666;
        line-height: 1.6;
    }

    .contact-form-section {
        padding: 5rem 0;
        background: linear-gradient(135deg, #d62828, #f77f00);
    }

    .contact-form-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    }

    .contact-form-content {
        padding: 3rem;
    }

    .form-header {
        margin-bottom: 2rem;
    }

    .form-header h2 {
        color: #d62828;
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    .form-header p {
        color: #666;
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .form-group {
        position: relative;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #333;
        font-weight: 500;
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: white;
    }

    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        outline: none;
        border-color: #d62828;
        box-shadow: 0 0 0 3px rgba(214, 40, 40, 0.1);
    }

    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #dc3545;
        background: #fff5f5;
    }

    .error-message {
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
    }

    .form-error {
        background: #dc3545;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
    }

    .submit-btn {
        background: linear-gradient(135deg, #d62828, #f77f00);
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(214, 40, 40, 0.4);
    }

    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .btn-loader {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
    }

    .contact-image {
        height: 100%;
        min-height: 400px;
    }

    .contact-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .map-section {
        padding: 5rem 0;
        background: white;
    }

    .map-container-large {
        margin-top: 2rem;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .faq-section {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .faq-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .faq-item {
        background: white;
        margin-bottom: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .faq-item:hover {
        box-shadow: 0 10px 25px rgba(214, 40, 40, 0.1);
    }

    .faq-question {
        padding: 1.5rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
    }

    .faq-question:hover {
        background: #f8f9fa;
    }

    .faq-question h3 {
        color: #333;
        font-size: 1.1rem;
        margin: 0;
    }

    .faq-icon {
        font-size: 1.5rem;
        color: #d62828;
        font-weight: bold;
        transition: transform 0.3s ease;
    }

    .faq-item.active .faq-icon {
        transform: rotate(180deg);
    }

    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }

    .faq-answer p {
        padding: 0 1.5rem 1.5rem;
        color: #666;
        line-height: 1.6;
        margin: 0;
    }

    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        align-items: center;
        justify-content: center;
    }

    .modal-content {
        background: white;
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }

    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h2 {
        color: #d62828;
        margin: 0;
    }

    .close-modal {
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        border: none;
        background: none;
    }

    .modal-body {
        padding: 1.5rem;
    }

    .confetti-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    }

    .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        background: #d62828;
        animation: confetti-fall 3s linear infinite;
    }

    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
        .contact-form-container {
            grid-template-columns: 1fr;
        }
        
        .contact-image {
            order: -1;
            min-height: 200px;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .contact-form-content {
            padding: 2rem;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
document.head.appendChild(styleSheet);