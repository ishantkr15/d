// Fees page specific JavaScript
class FeesPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupEnrollButtons();
        this.setupFeeCalculator();
        this.setupDownloadButtons();
    }

    setupAnimations() {
        // Animate fee cards
        const feeCards = document.querySelectorAll('.fee-card');
        feeCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateY(5deg)';
                card.style.boxShadow = '0 25px 50px rgba(214, 40, 40, 0.3)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0)';
                card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            });
        });

        // Animate table rows
        const tableRows = document.querySelectorAll('.fee-table tbody tr');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        });

        tableRows.forEach(row => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-30px)';
            row.style.transition = 'all 0.5s ease';
            observer.observe(row);

            // Add hover effects
            row.addEventListener('mouseenter', () => {
                row.style.background = 'linear-gradient(135deg, rgba(214, 40, 40, 0.1), rgba(247, 127, 0, 0.1))';
                row.style.transform = 'scale(1.02)';
            });

            row.addEventListener('mouseleave', () => {
                row.style.background = '';
                row.style.transform = 'scale(1)';
            });
        });

        // Animate payment cards
        const paymentCards = document.querySelectorAll('.payment-card');
        paymentCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            card.style.transition = 'all 0.6s ease';

            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'scale(1)';
                        }, index * 150);
                    }
                });
            });

            cardObserver.observe(card);
        });

        // Animate scholarship cards
        const scholarshipCards = document.querySelectorAll('.scholarship-card');
        scholarshipCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';

            const scholarshipObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            });

            scholarshipObserver.observe(card);
        });
    }

    setupEnrollButtons() {
        const enrollButtons = document.querySelectorAll('.enroll-fee-btn, .table-enroll-btn');

        enrollButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
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

    setupDownloadButtons() {
        const downloadButtons = document.querySelectorAll('.download-fee-btn');

        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get course name from the card
                const feeCard = button.closest('.fee-card');
                const courseName = feeCard.querySelector('h3').textContent;
                
                this.downloadBrochure(courseName);
            });
        });
    }

    downloadBrochure(courseName) {
        // Create a simple brochure content
        const brochureContent = this.generateBrochureContent(courseName);
        
        // Create and download the file
        const blob = new Blob([brochureContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${courseName.replace(/\s+/g, '_')}_Brochure.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Show success message
        this.showDownloadMessage(courseName);
    }

    generateBrochureContent(courseName) {
        return `
D SHARMA CLASSES - MORADABAD
India's Most Trusted Coaching Since 1956

${courseName} COURSE BROCHURE
===============================

COURSE OVERVIEW:
- Comprehensive ${courseName} preparation
- Expert faculty with years of experience
- Complete study material included
- Regular assessments and mock tests
- Doubt clearing sessions
- Performance analysis and feedback

FACILITIES:
- Modern air-conditioned classrooms
- Digital library with extensive resources
- Science laboratories for practical learning
- Computer lab with high-speed internet
- Cafeteria and parking facilities
- 24/7 security

CONTACT INFORMATION:
Address: Civil Lines, Near Court, Moradabad, UP - 244001
Phone: +91 591 2345678
Email: dsharmaclassesmbd@gmail.com
Website: www.dsharmaclasses.com

SOCIAL MEDIA:
YouTube: @dsharmaclasses
Instagram: @dsharma3070

For admission and more details, visit our campus or contact us.

© 2024 D Sharma Classes. All rights reserved.
        `;
    }

    showDownloadMessage(courseName) {
        const message = document.createElement('div');
        message.className = 'download-message';
        message.innerHTML = `
            <div class="download-content">
                <div class="download-icon">📄</div>
                <h4>Brochure Downloaded!</h4>
                <p>${courseName} brochure has been downloaded successfully.</p>
            </div>
        `;

        document.body.appendChild(message);

        // Add styles
        const messageStyles = `
            .download-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 15px;
                padding: 2rem;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .download-content {
                text-align: center;
            }
            
            .download-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            
            .download-content h4 {
                color: #d62828;
                margin-bottom: 0.5rem;
            }
            
            .download-content p {
                color: #666;
                margin: 0;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = messageStyles;
        document.head.appendChild(styleSheet);

        // Show message
        setTimeout(() => {
            message.style.opacity = '1';
        }, 10);

        // Hide message after 3 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(message);
                document.head.removeChild(styleSheet);
            }, 300);
        }, 3000);
    }

    setupFeeCalculator() {
        const calculateBtn = document.getElementById('calculateFee');
        const courseSelect = document.getElementById('calcCourse');
        const paymentSelect = document.getElementById('calcPayment');
        const discountSelect = document.getElementById('calcDiscount');

        calculateBtn.addEventListener('click', () => {
            this.calculateFee();
        });

        // Auto-calculate on change
        [courseSelect, paymentSelect, discountSelect].forEach(select => {
            select.addEventListener('change', () => {
                if (courseSelect.value) {
                    this.calculateFee();
                }
            });
        });
    }

    calculateFee() {
        const courseSelect = document.getElementById('calcCourse');
        const paymentSelect = document.getElementById('calcPayment');
        const discountSelect = document.getElementById('calcDiscount');

        const selectedOption = courseSelect.selectedOptions[0];
        if (!selectedOption || !selectedOption.dataset.fee) {
            alert('Please select a course first');
            return;
        }

        const baseFee = parseInt(selectedOption.dataset.fee);
        const discountPercent = parseInt(discountSelect.value);
        const paymentMode = paymentSelect.value;

        // Calculate discount amount
        const discountAmount = (baseFee * discountPercent) / 100;
        const totalFee = baseFee - discountAmount;
        const monthlyEmi = Math.ceil(totalFee / 12);

        // Update result display
        document.getElementById('baseFee').textContent = `₹${baseFee.toLocaleString()}`;
        document.getElementById('discountAmount').textContent = `₹${discountAmount.toLocaleString()}`;
        document.getElementById('totalFee').textContent = `₹${totalFee.toLocaleString()}`;
        document.getElementById('monthlyEmi').textContent = `₹${monthlyEmi.toLocaleString()}`;

        // Animate result
        const resultContainer = document.getElementById('calculatorResult');
        resultContainer.style.opacity = '0';
        resultContainer.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            resultContainer.style.opacity = '1';
            resultContainer.style.transform = 'scale(1)';
        }, 100);

        // Add success animation
        calculateBtn.style.background = '#27ae60';
        calculateBtn.textContent = 'Calculated!';
        
        setTimeout(() => {
            calculateBtn.style.background = '';
            calculateBtn.textContent = 'Calculate Fee';
        }, 2000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FeesPage();
});

// Add CSS styles for fees page
const feesStyles = `
    .fee-overview {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .fee-cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .fee-card {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .fee-card.featured {
        border: 3px solid #d62828;
        transform: scale(1.05);
    }

    .fee-badge {
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

    .fee-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .course-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    .fee-header h3 {
        color: #d62828;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .course-duration {
        color: #666;
        font-size: 0.9rem;
    }

    .fee-pricing {
        text-align: center;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 15px;
    }

    .fee-amount {
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 0.25rem;
        margin-bottom: 0.5rem;
    }

    .currency {
        font-size: 1.5rem;
        color: #d62828;
        font-weight: 600;
    }

    .amount {
        font-size: 3rem;
        color: #d62828;
        font-weight: 700;
    }

    .period {
        font-size: 1rem;
        color: #666;
    }

    .monthly-fee {
        color: #666;
        font-size: 0.9rem;
    }

    .fee-features {
        margin-bottom: 2rem;
    }

    .feature-item {
        padding: 0.5rem 0;
        color: #333;
        border-bottom: 1px solid #f0f0f0;
    }

    .feature-item:last-child {
        border-bottom: none;
    }

    .fee-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .enroll-fee-btn,
    .download-fee-btn {
        padding: 1rem;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .enroll-fee-btn {
        background: linear-gradient(135deg, #d62828, #f77f00);
        color: white;
    }

    .download-fee-btn {
        background: #f5f5f5;
        color: #d62828;
        border: 2px solid #d62828;
    }

    .enroll-fee-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(214, 40, 40, 0.4);
    }

    .download-fee-btn:hover {
        background: #d62828;
        color: white;
    }

    .board-fee-section {
        padding: 5rem 0;
        background: white;
    }

    .board-fee-table {
        margin-top: 3rem;
        overflow-x: auto;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .fee-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        min-width: 800px;
    }

    .fee-table th,
    .fee-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
    }

    .fee-table th {
        background: linear-gradient(135deg, #d62828, #f77f00);
        color: white;
        font-weight: 600;
    }

    .class-badge {
        background: #d62828;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .discount-tag {
        background: #27ae60;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-weight: 600;
        font-size: 0.8rem;
    }

    .table-enroll-btn {
        background: #d62828;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .table-enroll-btn:hover {
        background: #b91c1c;
        transform: translateY(-2px);
    }

    .highlighted-row {
        background: rgba(214, 40, 40, 0.05);
    }

    .payment-options {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .payment-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .payment-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .payment-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(214, 40, 40, 0.15);
    }

    .payment-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .payment-card h4 {
        color: #d62828;
        margin-bottom: 1rem;
    }

    .payment-card p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    .payment-features {
        list-style: none;
        padding: 0;
    }

    .payment-features li {
        padding: 0.25rem 0;
        color: #333;
        position: relative;
        padding-left: 1.5rem;
    }

    .payment-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #d62828;
        font-weight: bold;
    }

    .scholarships-section {
        padding: 5rem 0;
        background: white;
    }

    .scholarships-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .scholarship-card {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }

    .scholarship-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(214, 40, 40, 0.15);
        background: white;
        border-color: #d62828;
    }

    .scholarship-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .scholarship-card h4 {
        color: #d62828;
        margin-bottom: 1rem;
    }

    .scholarship-amount {
        font-size: 1.5rem;
        font-weight: 700;
        color: #27ae60;
        margin-bottom: 1rem;
    }

    .scholarship-card p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    .scholarship-criteria {
        list-style: none;
        padding: 0;
    }

    .scholarship-criteria li {
        padding: 0.25rem 0;
        color: #333;
        position: relative;
        padding-left: 1.5rem;
        font-size: 0.9rem;
    }

    .scholarship-criteria li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #d62828;
        font-weight: bold;
    }

    .fee-calculator {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .calculator-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        margin-top: 3rem;
        align-items: start;
    }

    .calculator-form {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .calc-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .calc-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .calc-group label {
        font-weight: 600;
        color: #333;
    }

    .calc-select {
        padding: 0.75rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .calc-select:focus {
        outline: none;
        border-color: #d62828;
        box-shadow: 0 0 0 3px rgba(214, 40, 40, 0.1);
    }

    .calculate-btn {
        background: linear-gradient(135deg, #d62828, #f77f00);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        width: 100%;
    }

    .calculate-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(214, 40, 40, 0.3);
    }

    .calculator-result {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .calculator-result h4 {
        color: #d62828;
        margin-bottom: 1.5rem;
        font-size: 1.3rem;
    }

    .result-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .result-item:last-child {
        border-bottom: none;
    }

    .result-item.total {
        font-weight: 700;
        font-size: 1.2rem;
        color: #d62828;
        border-top: 2px solid #d62828;
        margin-top: 1rem;
        padding-top: 1rem;
    }

    @media (max-width: 768px) {
        .fee-cards-grid {
            grid-template-columns: 1fr;
        }
        
        .fee-card.featured {
            transform: scale(1);
        }
        
        .payment-grid {
            grid-template-columns: 1fr;
        }
        
        .scholarships-grid {
            grid-template-columns: 1fr;
        }
        
        .calculator-container {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .calc-row {
            grid-template-columns: 1fr;
        }
        
        .board-fee-table {
            margin: 2rem -20px 0;
            border-radius: 0;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = feesStyles;
document.head.appendChild(styleSheet);