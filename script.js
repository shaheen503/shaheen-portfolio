document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Project Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.opacity = '1';
                    card.style.visibility = 'visible';
                    card.style.display = 'block';
                } else {
                    card.style.opacity = '0';
                    card.style.visibility = 'hidden';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields before submitting.');
            return;
        }

        console.log({ name, email, message });
        alert('Form submitted successfully!');
        contactForm.reset();
    });

    // Certifications Carousel
    const carousel = document.getElementById('ltrCarousel');
    const track = carousel.querySelector('.carousel-track');
    const cards = Array.from(track.children);
    const prevButton = carousel.querySelector('.prev-button');
    const nextButton = carousel.querySelector('.next-button');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');

    let cardWidth = cards[0].offsetWidth;
    let currentIndex = 0;

    function updateTrack() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateIndicators();
    }

    function updateIndicators() {
        const indicators = Array.from(indicatorsContainer.children);
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    cards.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.classList.add('carousel-indicator');
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateTrack();
        });
        indicatorsContainer.appendChild(indicator);
    });

    updateIndicators();

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateTrack();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateTrack();
        }
    });

    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth;
        updateTrack();
    });

    // Auto-scroll for Certification Carousel
    setInterval(() => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateTrack();
    }, 3000);

    // Achievements Carousel (Manual Scroll Only)
    const achievementsCarousel = document.getElementById('achievementsCarousel');
    if (achievementsCarousel) {
        const achievementTrack = achievementsCarousel.querySelector('.carousel-track');
        const achievementCards = Array.from(achievementTrack.children);
        const achievementPrevButton = achievementsCarousel.querySelector('.prev-button');
        const achievementNextButton = achievementsCarousel.querySelector('.next-button');

        let achievementCardWidth = achievementCards[0].offsetWidth;
        let achievementCurrentIndex = 0;

        function updateAchievementTrack() {
            achievementTrack.style.transform = `translateX(-${achievementCurrentIndex * achievementCardWidth}px)`;
        }

        achievementNextButton.addEventListener('click', () => {
            if (achievementCurrentIndex < achievementCards.length - 1) {
                achievementCurrentIndex++;
                updateAchievementTrack();
            }
        });

        achievementPrevButton.addEventListener('click', () => {
            if (achievementCurrentIndex > 0) {
                achievementCurrentIndex--;
                updateAchievementTrack();
            }
        });

        window.addEventListener('resize', () => {
            achievementCardWidth = achievementCards[0].offsetWidth;
            updateAchievementTrack();
        });
    }

    // Lucide Icons
    lucide.createIcons();
});