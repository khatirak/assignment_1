// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Animate words in story section
    setTimeout(() => {
        animateWords('animated-text', 80);
    }, 2000); // Start after the story section fades in
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar and update active navigation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
    
    // Update active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Word animation functionality
function animateWords(elementId, delay = 100) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const text = element.textContent;
    const words = text.split(' ');
    
    // Clear the element
    element.innerHTML = '';
    
    // Create spans for each word
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.classList.add('word-animate');
        span.style.animationDelay = `${index * delay}ms`;
        element.appendChild(span);
    });
}

// Photo modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
    
    // Create audio object for pastry sound
    const pastrySound = new Audio('sounds/pastry.mp3');
    
    // Open modal when clicking on gallery photos
    galleryPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            // Play the pastry sound
            pastrySound.currentTime = 0; // Reset to beginning in case it's already playing
            pastrySound.play().catch(e => {
                console.log('Audio play failed:', e);
            });
            
            modal.style.display = 'block';
            modalImg.src = this.getAttribute('data-full');
            modalCaption.textContent = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
});
