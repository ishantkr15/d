// Batches page specific JavaScript
class BatchesPage {
    constructor() {
        this.originalRows = [];
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupTableAnimations();
        this.setupEnrollButtons();
        this.setupAnimations();
        this.storeOriginalRows();
    }

    storeOriginalRows() {
        const tableBody = document.querySelector('#scheduleTable tbody');
        this.originalRows = Array.from(tableBody.querySelectorAll('tr'));
    }

    setupFilters() {
        const courseFilter = document.getElementById('courseFilter');
        const classFilter = document.getElementById('classFilter');
        const timingFilter = document.getElementById('timingFilter');
        const clearFiltersBtn = document.getElementById('clearFilters');

        // Add event listeners to filters
        [courseFilter, classFilter, timingFilter].forEach(filter => {
            filter.addEventListener('change', () => this.applyFilters());
        });

        // Clear filters button
        clearFiltersBtn.addEventListener('click', () => {
            courseFilter.value = 'all';
            classFilter.value = 'all';
            timingFilter.value = 'all';
            this.applyFilters();
        });
    }

    applyFilters() {
        const courseFilter = document.getElementById('courseFilter').value;
        const classFilter = document.getElementById('classFilter').value;
        const timingFilter = document.getElementById('timingFilter').value;

        const tableBody = document.querySelector('#scheduleTable tbody');
        
        // Clear current rows
        tableBody.innerHTML = '';

        // Filter and display rows
        const filteredRows = this.originalRows.filter(row => {
            const rowCourse = row.getAttribute('data-course');
            const rowClass = row.getAttribute('data-class');
            const rowTiming = row.getAttribute('data-timing');

            const courseMatch = courseFilter === 'all' || rowCourse === courseFilter;
            const classMatch = classFilter === 'all' || rowClass === classFilter;
            const timingMatch = timingFilter === 'all' || rowTiming === timingFilter;

            return courseMatch && classMatch && timingMatch;
        });

        // Add filtered rows back to table
        filteredRows.forEach((row, index) => {
            const clonedRow = row.cloneNode(true);
            clonedRow.style.opacity = '0';
            clonedRow.style.transform = 'translateX(-20px)';
            tableBody.appendChild(clonedRow);

            // Animate row appearance
            setTimeout(() => {
                clonedRow.style.opacity = '1';
                clonedRow.style.transform = 'translateX(0)';
            }, index * 50);
        });

        // Re-setup enroll buttons for new rows
        this.setupEnrollButtons();

        // Show message if no results
        if (filteredRows.length === 0) {
            const noResultsRow = document.createElement('tr');
            noResultsRow.innerHTML = `
                <td colspan="10" style="text-align: center; padding: 2rem; color: #666;">
                    No batches found matching your criteria. Please try different filters.
                </td>
            `;
            tableBody.appendChild(noResultsRow);
        }
    }

    setupTableAnimations() {
        const tableRows = document.querySelectorAll('#scheduleTable tbody tr');
        
        tableRows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            row.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, index * 100);

            // Add hover effects
            row.addEventListener('mouseenter', () => {
                row.style.background = 'linear-gradient(135deg, rgba(214, 40, 40, 0.1), rgba(247, 127, 0, 0.1))';
                row.style.transform = 'scale(1.02)';
                row.style.boxShadow = '0 5px 15px rgba(214, 40, 40, 0.2)';
            });

            row.addEventListener('mouseleave', () => {
                row.style.background = '';
                row.style.transform = 'scale(1)';
                row.style.boxShadow = '';
            });
        });
    }

    setupEnrollButtons() {
        const enrollButtons = document.querySelectorAll('.enroll-btn');

        enrollButtons.forEach(button => {
            // Remove existing event listeners
            button.replaceWith(button.cloneNode(true));
        });

        // Re-select buttons after cloning
        const newEnrollButtons = document.querySelectorAll('.enroll-btn');
        
        newEnrollButtons.forEach(button => {
            if (!button.disabled) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    const row = button.closest('tr');
                    const batchCode = row.querySelector('.batch-code').textContent;
                    const course = row.querySelector('.course-tag').textContent;
                    const classInfo = row.cells[2].textContent;
                    const timing = row.cells[3].textContent;
                    
                    this.showEnrollmentModal(batchCode, course, classInfo, timing);
                });
            }
        });
    }

    showEnrollmentModal(batchCode, course, classInfo, timing) {
        const modal = document.createElement('div');
        modal.className = 'enrollment-modal';
        modal.innerHTML = `
            <div class="enrollment-modal-content">
                <div class="enrollment-modal-header">
                    <h3>Enroll in Batch</h3>
                    <button class="close-enrollment-modal">&times;</button>
                </div>
                <div class="enrollment-modal-body">
                    <div class="batch-details">
                        <h4>Batch Information</h4>
                        <div class="detail-row">
                            <span class="detail-label">Batch Code:</span>
                            <span class="detail-value">${batchCode}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Course:</span>
                            <span class="detail-value">${course}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Class:</span>
                            <span class="detail-value">${classInfo}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Timing:</span>
                            <span class="detail-value">${timing}</span>
                        </div>
                    </div>
                    
                    <div class="enrollment-actions">
                        <p>To enroll in this batch, please complete the admission process.</p>
                        <div class="action-buttons">
                            <button class="proceed-admission-btn">Proceed to Admission</button>
                            <button class="contact-info-btn">Contact for Info</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        const modalStyles = `
            .enrollment-modal {
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
            
            .enrollment-modal-content {
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .enrollment-modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(135deg, #d62828, #f77f00);
                color: white;
                border-radius: 15px 15px 0 0;
            }
            
            .enrollment-modal-header h3 {
                margin: 0;
            }
            
            .close-enrollment-modal {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: white;
            }
            
            .enrollment-modal-body {
                padding: 1.5rem;
            }
            
            .batch-details {
                margin-bottom: 2rem;
            }
            
            .batch-details h4 {
                color: #d62828;
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.75rem;
                padding: 0.5rem;
                background: #f8f9fa;
                border-radius: 8px;
            }
            
            .detail-label {
                font-weight: 600;
                color: #333;
            }
            
            .detail-value {
                color: #d62828;
                font-weight: 500;
            }
            
            .enrollment-actions p {
                text-align: center;
                color: #666;
                margin-bottom: 1.5rem;
            }
            
            .action-buttons {
                display: flex;
                gap: 1rem;
            }
            
            .proceed-admission-btn,
            .contact-info-btn {
                flex: 1;
                padding: 0.75rem;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .proceed-admission-btn {
                background: #d62828;
                color: white;
            }
            
            .contact-info-btn {
                background: #f5f5f5;
                color: #d62828;
                border: 2px solid #d62828;
            }
            
            .proceed-admission-btn:hover {
                background: #b91c1c;
                transform: translateY(-2px);
            }
            
            .contact-info-btn:hover {
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
        const closeBtn = modal.querySelector('.close-enrollment-modal');
        const proceedBtn = modal.querySelector('.proceed-admission-btn');
        const contactBtn = modal.querySelector('.contact-info-btn');

        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(styleSheet);
            }, 300);
        });

        proceedBtn.addEventListener('click', () => {
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

    setupAnimations() {
        // Animate filter controls
        const filterControls = document.querySelectorAll('.filter-group');
        filterControls.forEach((control, index) => {
            control.style.opacity = '0';
            control.style.transform = 'translateY(-20px)';
            control.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                control.style.opacity = '1';
                control.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate feature items
        const featureItems = document.querySelectorAll('.feature-item');
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

        featureItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);
        });

        // Animate guideline cards
        const guidelineCards = document.querySelectorAll('.guideline-card');
        guidelineCards.forEach((card, index) => {
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
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BatchesPage();
});

// Add CSS styles for batches page
const batchesStyles = `
    .batch-filters {
        padding: 2rem 0;
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .filter-controls {
        display: flex;
        gap: 2rem;
        align-items: end;
        flex-wrap: wrap;
        justify-content: center;
    }

    .filter-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .filter-group label {
        font-weight: 600;
        color: #333;
        font-size: 0.9rem;
    }

    .filter-select {
        padding: 0.75rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        min-width: 150px;
        transition: all 0.3s ease;
    }

    .filter-select:focus {
        outline: none;
        border-color: #d62828;
        box-shadow: 0 0 0 3px rgba(214, 40, 40, 0.1);
    }

    .clear-filters-btn {
        background: #d62828;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .clear-filters-btn:hover {
        background: #b91c1c;
        transform: translateY(-2px);
    }

    .batch-schedule {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .schedule-table-container {
        margin-top: 3rem;
        overflow-x: auto;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        background: white;
    }

    .schedule-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 1000px;
    }

    .schedule-table th,
    .schedule-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
    }

    .schedule-table th {
        background: linear-gradient(135deg, #d62828, #f77f00);
        color: white;
        font-weight: 600;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .schedule-table tbody tr {
        transition: all 0.3s ease;
    }

    .schedule-table tbody tr:hover {
        background: #f8f9fa;
    }

    .batch-code {
        background: #f5f5f5;
        color: #d62828;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .course-tag {
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-weight: 600;
        font-size: 0.8rem;
        color: white;
    }

    .course-tag.iit {
        background: #d62828;
    }

    .course-tag.neet {
        background: #16a085;
    }

    .course-tag.nda {
        background: #8e44ad;
    }

    .course-tag.foundation {
        background: #f39c12;
    }

    .course-tag.board {
        background: #3498db;
    }

    .seats {
        font-weight: 600;
    }

    .seats.available {
        color: #27ae60;
    }

    .seats.limited {
        color: #f39c12;
    }

    .seats.full {
        color: #e74c3c;
    }

    .status {
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-weight: 600;
        font-size: 0.8rem;
        color: white;
    }

    .status.open {
        background: #27ae60;
    }

    .status.limited {
        background: #f39c12;
    }

    .status.closed {
        background: #e74c3c;
    }

    .enroll-btn {
        background: #d62828;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }

    .enroll-btn:hover:not(:disabled) {
        background: #b91c1c;
        transform: translateY(-2px);
    }

    .enroll-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
    }

    .batch-features {
        padding: 5rem 0;
        background: white;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .feature-item {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        transition: all 0.3s ease;
    }

    .feature-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(214, 40, 40, 0.15);
        background: white;
    }

    .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .feature-item h4 {
        color: #d62828;
        margin-bottom: 1rem;
    }

    .feature-item p {
        color: #666;
        line-height: 1.6;
    }

    .batch-guidelines {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .guidelines-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .guideline-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .guideline-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(214, 40, 40, 0.15);
    }

    .guideline-card h4 {
        color: #d62828;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }

    .guideline-card ul {
        list-style: none;
        padding: 0;
    }

    .guideline-card li {
        padding: 0.5rem 0;
        color: #666;
        position: relative;
        padding-left: 1.5rem;
        line-height: 1.6;
    }

    .guideline-card li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #d62828;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        .filter-controls {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        
        .filter-group {
            width: 100%;
            max-width: 250px;
        }
        
        .filter-select {
            width: 100%;
        }
        
        .schedule-table-container {
            margin: 2rem -20px 0;
            border-radius: 0;
        }
        
        .features-grid {
            grid-template-columns: 1fr;
        }
        
        .guidelines-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = batchesStyles;
document.head.appendChild(styleSheet);