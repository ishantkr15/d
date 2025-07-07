// Admission page specific JavaScript
class AdmissionPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupAnimations();
        this.setupDateValidation();
    }

    setupFormValidation() {
        const form = document.getElementById('admissionForm');
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
        if ((fieldName === 'mobileNumber' || fieldName === 'parentMobile') && value) {
            const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Name validation
        if ((fieldName === 'studentName' || fieldName === 'parentName') && value) {
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (!nameRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid name';
            }
        }

        // Percentage validation
        if (fieldName === 'previousPercentage' && value) {
            const percentage = parseFloat(value);
            if (percentage < 0 || percentage > 100) {
                isValid = false;
                errorMessage = 'Please enter a valid percentage (0-100)';
            }
        }

        // Date of birth validation
        if (fieldName === 'dateOfBirth' && value) {
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 5 || age > 25) {
                isValid = false;
                errorMessage = 'Please enter a valid date of birth';
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
        const form = document.getElementById('admissionForm');
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('span');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate all required fields
            const requiredInputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let allValid = true;

            requiredInputs.forEach(input => {
                if (!this.validateField(input)) {
                    allValid = false;
                }
            });

            // Check declaration checkbox
            const declaration = form.querySelector('#declaration');
            if (!declaration.checked) {
                allValid = false;
                this.showError(declaration, 'Please accept the declaration');
            }

            if (!allValid) {
                this.showFormError('Please fix the errors above before submitting.');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';

            try {
                // Generate application ID
                const applicationId = 'DSC' + Date.now().toString().slice(-6);
                
                // Add application ID to form data
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'applicationId';
                hiddenInput.value = applicationId;
                form.appendChild(hiddenInput);

                // Submit form
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.showSuccessModal(applicationId);
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
        const form = document.getElementById('admissionForm');
        
        // Remove existing error
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.style.cssText = `
            background: #dc3545;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
        `;
        errorElement.textContent = message;
        form.insertBefore(errorElement, form.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }

    showSuccessModal(applicationId) {
        const modal = document.getElementById('successModal');
        const applicationIdSpan = document.getElementById('applicationId');
        
        if (applicationIdSpan) {
            applicationIdSpan.textContent = applicationId;
        }
        
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

        // Auto-close after 5 seconds
        setTimeout(() => {
            this.closeModal();
        }, 5000);
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
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);

        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${this.getRandomColor()};
                left: ${Math.random() * 100}%;
                animation: confetti-fall 3s linear infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            confettiContainer.appendChild(confetti);
        }

        // Add confetti animation
        const style = document.createElement('style');
        style.textContent = `
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
        `;
        document.head.appendChild(style);

        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
            style.remove();
        }, 4000);
    }

    getRandomColor() {
        const colors = ['#d62828', '#f77f00', '#fcbf49', '#eae2b7', '#003049'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupDateValidation() {
        const dateInput = document.getElementById('dateOfBirth');
        if (dateInput) {
            // Set max date to today
            const today = new Date().toISOString().split('T')[0];
            dateInput.max = today;
            
            // Set min date to 25 years ago
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 25);
            dateInput.min = minDate.toISOString().split('T')[0];
        }
    }

    setupAnimations() {
        // Animate process steps
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animate requirement cards
        const requirementCards = document.querySelectorAll('.requirement-card');
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

        requirementCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Animate date cards
        const dateCards = document.querySelectorAll('.date-card');
        dateCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            card.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 150);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdmissionPage();
});

// Add CSS for error states
const admissionStyles = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        background: #fff5f5;
    }

    .error-message {
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = admissionStyles;
document.head.appendChild(styleSheet);