// Staff page specific JavaScript
class StaffPage {
    constructor() {
        this.facultyData = this.getFacultyData();
        this.init();
    }

    init() {
        this.setupDepartmentTabs();
        this.setupAnimations();
        this.setupFacultyCards();
        this.setupModal();
    }

    getFacultyData() {
        return {
            'Dr. Rajesh Sharma': {
                name: 'Dr. Rajesh Sharma',
                designation: 'Director & Physics Head',
                qualification: 'M.Sc. Physics, Ph.D. IIT Delhi',
                experience: '30+ years of teaching experience in Physics with specialization in IIT JEE preparation. Former researcher at ISRO.',
                philosophy: 'Physics is not just about formulas and equations, it\'s about understanding the fundamental principles that govern our universe. I believe in making complex concepts simple and relatable.',
                achievements: [
                    'Best Teacher Award - UP Government (2018)',
                    'Published 5 books on IIT JEE Physics',
                    'Guided 500+ students to IIT selections',
                    'Research papers in quantum mechanics'
                ]
            },
            'Dr. Priya Gupta': {
                name: 'Dr. Priya Gupta',
                designation: 'Chemistry Head',
                qualification: 'M.Sc. Chemistry, Ph.D. Delhi University',
                experience: '25+ years of experience in Chemistry teaching with focus on NEET and JEE preparation. Expert in Organic Chemistry.',
                philosophy: 'Chemistry is the bridge between physics and biology. I focus on building strong conceptual foundation and practical understanding.',
                achievements: [
                    'Excellence in Teaching Award (2020)',
                    'Author of NEET Chemistry guide',
                    '400+ NEET selections under guidance',
                    'Guest lecturer at various universities'
                ]
            },
            'Prof. Amit Kumar': {
                name: 'Prof. Amit Kumar',
                designation: 'Mathematics Head',
                qualification: 'M.Sc. Mathematics, IIT Kanpur',
                experience: '28+ years of Mathematics teaching with expertise in advanced calculus and coordinate geometry for competitive exams.',
                philosophy: 'Mathematics is the language of the universe. I believe in developing logical thinking and problem-solving skills in students.',
                achievements: [
                    'National Mathematics Teacher Award (2019)',
                    'Co-authored JEE Mathematics series',
                    '600+ IIT selections in Mathematics',
                    'Mathematics Olympiad trainer'
                ]
            }
        };
    }

    setupDepartmentTabs() {
        const tabButtons = document.querySelectorAll('.dept-tab-btn');
        const deptContents = document.querySelectorAll('.dept-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetDept = button.getAttribute('data-dept');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                deptContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetDept).classList.add('active');

                // Animate department content
                this.animateDepartmentContent(targetDept);
            });
        });
    }

    animateDepartmentContent(deptId) {
        const deptContent = document.getElementById(deptId);
        const facultyCards = deptContent.querySelectorAll('.faculty-card');

        facultyCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupAnimations() {
        // Animate faculty stats
        const facultyStats = document.querySelectorAll('.faculty-stat');
        facultyStats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'scale(0.8)';
            stat.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'scale(1)';
            }, index * 150);
        });

        // Animate department heads
        const headsCards = document.querySelectorAll('.heads-grid .faculty-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        });

        headsCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Animate achievement cards
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-50px)';
            card.style.transition = 'all 0.6s ease';

            const achievementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, index * 150);
                    }
                });
            });

            achievementObserver.observe(card);
        });
    }

    setupFacultyCards() {
        const facultyCards = document.querySelectorAll('.faculty-card');

        facultyCards.forEach(card => {
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateY(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(214, 40, 40, 0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });

            // Add click effect for featured cards
            if (card.classList.contains('featured')) {
                card.addEventListener('click', () => {
                    const facultyName = card.querySelector('h3').textContent;
                    this.showFacultyProfile(facultyName);
                });
            }
        });

        // Setup view profile buttons
        const viewProfileBtns = document.querySelectorAll('.view-profile-btn');
        viewProfileBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const facultyCard = btn.closest('.faculty-card');
                const facultyName = facultyCard.querySelector('h3').textContent;
                this.showFacultyProfile(facultyName);
            });
        });
    }

    showFacultyProfile(facultyName) {
        const faculty = this.facultyData[facultyName];
        if (!faculty) return;

        const modal = document.getElementById('facultyModal');
        const modalName = document.getElementById('modalFacultyName');
        const modalTitle = document.getElementById('modalFacultyTitle');
        const modalDesignation = document.getElementById('modalFacultyDesignation');
        const modalQualification = document.getElementById('modalFacultyQualification');
        const modalExperience = document.getElementById('modalFacultyExperience');
        const modalPhilosophy = document.getElementById('modalFacultyPhilosophy');
        const modalAchievements = document.getElementById('modalFacultyAchievements');
        const modalImage = document.getElementById('modalFacultyImage');

        // Populate modal content
        modalName.textContent = faculty.name;
        modalTitle.textContent = faculty.name;
        modalDesignation.textContent = faculty.designation;
        modalQualification.textContent = faculty.qualification;
        modalExperience.textContent = faculty.experience;
        modalPhilosophy.textContent = faculty.philosophy;

        // Set faculty image
        const facultyCard = Array.from(document.querySelectorAll('.faculty-card')).find(card => 
            card.querySelector('h3').textContent === facultyName
        );
        if (facultyCard) {
            const imgSrc = facultyCard.querySelector('img').src;
            modalImage.src = imgSrc;
            modalImage.alt = faculty.name;
        }

        // Populate achievements
        modalAchievements.innerHTML = '';
        faculty.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            modalAchievements.appendChild(li);
        });

        // Show modal
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }

    setupModal() {
        const modal = document.getElementById('facultyModal');
        const closeBtn = modal.querySelector('.close-modal');

        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('facultyModal');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StaffPage();
});

// Add CSS styles for staff page
const staffStyles = `
    .faculty-overview {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .faculty-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .faculty-stat {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .faculty-stat:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(214, 40, 40, 0.15);
    }

    .faculty-stat .stat-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .faculty-stat .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: #d62828;
        margin-bottom: 0.5rem;
    }

    .faculty-stat .stat-label {
        color: #666;
        font-weight: 500;
    }

    .department-heads {
        padding: 5rem 0;
        background: white;
    }

    .heads-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .faculty-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
    }

    .faculty-card.featured {
        border: 3px solid #d62828;
    }

    .faculty-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(214, 40, 40, 0.2);
    }

    .faculty-image {
        position: relative;
        overflow: hidden;
        height: 250px;
    }

    .faculty-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .faculty-card:hover .faculty-image img {
        transform: scale(1.1);
    }

    .faculty-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(214, 40, 40, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .faculty-card:hover .faculty-overlay {
        opacity: 1;
    }

    .view-profile-btn {
        background: white;
        color: #d62828;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .view-profile-btn:hover {
        background: #d62828;
        color: white;
        transform: scale(1.05);
    }

    .faculty-info {
        padding: 1.5rem;
    }

    .faculty-info h3,
    .faculty-info h4 {
        color: #d62828;
        margin-bottom: 0.5rem;
    }

    .faculty-designation {
        color: #666;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }

    .faculty-qualification {
        color: #888;
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }

    .experience-badge {
        background: #d62828;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    .faculty-specialization {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .specialization-tag {
        background: #f5f5f5;
        color: #d62828;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .faculty-departments {
        padding: 5rem 0;
        background: #f5f5f5;
    }

    .department-tabs {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
    }

    .dept-tab-btn {
        padding: 0.75rem 1.5rem;
        border: 2px solid #d62828;
        background: white;
        color: #d62828;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .dept-tab-btn:hover,
    .dept-tab-btn.active {
        background: #d62828;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(214, 40, 40, 0.3);
    }

    .dept-content {
        display: none;
    }

    .dept-content.active {
        display: block;
    }

    .faculty-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }

    .faculty-achievements {
        padding: 5rem 0;
        background: white;
    }

    .achievements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .achievement-card {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        transition: all 0.3s ease;
    }

    .achievement-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(214, 40, 40, 0.15);
        background: white;
    }

    .achievement-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .achievement-card h4 {
        color: #d62828;
        margin-bottom: 1rem;
    }

    .achievement-card p {
        color: #666;
        line-height: 1.6;
    }

    .faculty-modal-content {
        max-width: 800px;
        width: 90%;
    }

    .faculty-profile {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 2rem;
        align-items: start;
    }

    .profile-image {
        border-radius: 15px;
        overflow: hidden;
    }

    .profile-image img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .profile-details h3 {
        color: #d62828;
        margin-bottom: 0.5rem;
    }

    .profile-details p {
        color: #666;
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    .profile-info h4 {
        color: #d62828;
        margin: 1.5rem 0 0.5rem 0;
        font-size: 1.1rem;
    }

    .profile-info ul {
        list-style: none;
        padding: 0;
    }

    .profile-info li {
        padding: 0.25rem 0;
        color: #666;
        position: relative;
        padding-left: 1.5rem;
    }

    .profile-info li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #d62828;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        .faculty-stats {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
        
        .heads-grid {
            grid-template-columns: 1fr;
        }
        
        .faculty-grid {
            grid-template-columns: 1fr;
        }
        
        .achievements-grid {
            grid-template-columns: 1fr;
        }
        
        .department-tabs {
            flex-direction: column;
            align-items: center;
        }
        
        .dept-tab-btn {
            width: 200px;
        }
        
        .faculty-profile {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .profile-image {
            max-width: 200px;
            margin: 0 auto;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = staffStyles;
document.head.appendChild(styleSheet);