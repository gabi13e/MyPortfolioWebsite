// ============================================
// DOM ELEMENTS
// ============================================
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// ============================================
// HAMBURGER MENU
// ============================================

// Toggle menu with body scroll control
function toggleMenu() {
    const isOpen = navMenu.classList.contains('active');
    
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

// Close menu
function closeMenu() {
    burgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById("contactForm").addEventListener("submit", function(event){
    event.preventDefault(); // prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then(function(response) {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
    }, function(error) {
        alert("Failed to send message. Please try again.");
        console.log("FAILED...", error);
    });
});


// Event Listeners
burgerMenu.addEventListener('click', toggleMenu);

// Close menu when clicking navigation links
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!burgerMenu.contains(event.target) && !navMenu.contains(event.target)) {
        closeMenu();
    }
});

// Close menu when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, main');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});

// ============================================
// TYPING ANIMATION WITH LOOPING
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    const prefix = "Hello, I am ";
    const name = "Gab";
    const text = prefix + name;
    const typedEl = document.getElementById("typed");

    const typingSpeed = 90;
    const erasingSpeed = 60;
    const delayBetween = 1200;

    let i = 0;
    let typing = true;

    function typeLoop() {
        if (typing) {
            if (i < text.length) {
                if (i === prefix.length) {
                    typedEl.innerHTML += `<span class="highlight">`;
                }
                typedEl.innerHTML += text.charAt(i);
                i++;

                if (i === text.length) {
                    typedEl.innerHTML += `</span>`;
                }

                setTimeout(typeLoop, typingSpeed);
            } else {
                typing = false;
                setTimeout(typeLoop, delayBetween);
            }
        } else {
            if (i > 0) {
                if (i === text.length) {
                    typedEl.innerHTML = typedEl.innerHTML.replace(/<\/span>$/, "");
                }

                i--;
                let currentText = text.substring(0, i);

                if (i <= prefix.length) {
                    typedEl.textContent = currentText;
                } else {
                    typedEl.innerHTML =
                        prefix +
                        `<span class="highlight">` +
                        currentText.substring(prefix.length) +
                        `</span>`;
                }

                setTimeout(typeLoop, erasingSpeed);
            } else {
                typing = true;
                setTimeout(typeLoop, delayBetween);
            }
        }
    }

    setTimeout(typeLoop, 500);
});

// ============================================
// PARALLAX EFFECTS
// ============================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Background circles parallax
    const circles = document.querySelectorAll('.bg-circle');
    circles.forEach((circle, index) => {
        const speed = 0.1 + (index * 0.05);
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Hero image parallax
    const heroImage = document.querySelector('.profile-image');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-card')) {
                animateSkillBar(entry.target);
            }
            
            // Trigger stat counter animations
            if (entry.target.classList.contains('stat-item')) {
                animateStatCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        'section, .skill-card, .project-card, .stat-item, .about-content, .contact-content'
    );
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(el);
    });
});

// ============================================
// SKILL BAR ANIMATIONS
// ============================================

function animateSkillBar(skillCard) {
    const progressBar = skillCard.querySelector('.progress-fill');
    if (progressBar && !progressBar.classList.contains('animated')) {
        progressBar.classList.add('animated');
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0';
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 200);
    }
}

// ============================================
// STATISTICS COUNTER ANIMATION
// ============================================

function animateStatCounter(statItem) {
    const statNumber = statItem.querySelector('h4');
    if (statNumber && !statNumber.classList.contains('counted')) {
        statNumber.classList.add('counted');
        const targetText = statNumber.textContent;
        const targetValue = parseInt(targetText);
        
        if (!isNaN(targetValue)) {
            let currentValue = 0;
            const increment = Math.ceil(targetValue / 50);
            const duration = 1500;
            const stepTime = duration / (targetValue / increment);
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    statNumber.textContent = targetText;
                    clearInterval(counter);
                } else {
                    statNumber.textContent = currentValue + (targetText.includes('+') ? '+' : '');
                }
            }, stepTime);
        }
    }
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    }
});

// ============================================
// PROJECT CARD HOVER EFFECTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showNotification(`Thank you, ${name}! Your message has been received. I'll get back to you soon!`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 1500);
        
        // REAL IMPLEMENTATION:
        // Replace the setTimeout above with actual API call like:
        /*
        fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
        */
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1.5rem 2rem',
        background: type === 'success' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(239, 68, 68, 0.95)',
        color: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        fontSize: '1rem',
        fontWeight: '600',
        maxWidth: '400px',
        animation: 'slideInRight 0.4s ease',
        backdropFilter: 'blur(10px)',
        border: `2px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ============================================
// SMOOTH PAGE LOAD
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ============================================
// CONSOLE LOG
// ============================================

console.log('%c🚀 Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
console.log('%cDeveloped by GAB', 'color: #a855f7; font-size: 14px;');

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const slider = card.querySelector('.project-slider');
        if (!slider) return;
        
        const images = slider.querySelectorAll('.slider-img');
        const dots = card.querySelectorAll('.dot');
        const prevBtn = card.querySelector('.prev');
        const nextBtn = card.querySelector('.next');
        
        let currentSlide = 0;
        let autoSlideInterval;
        
        // Show slide function
        function showSlide(index) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (index >= images.length) currentSlide = 0;
            if (index < 0) currentSlide = images.length - 1;
            
            images[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Next slide
        function nextSlide() {
            currentSlide++;
            if (currentSlide >= images.length) currentSlide = 0;
            showSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide--;
            if (currentSlide < 0) currentSlide = images.length - 1;
            showSlide(currentSlide);
        }
        
        // Auto slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 3000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoSlide();
                startAutoSlide();
            });
        });
        
        // Pause auto-slide on hover
        card.addEventListener('mouseenter', stopAutoSlide);
        card.addEventListener('mouseleave', startAutoSlide);
        
        // Start auto-sliding
        if (images.length > 1) {
            startAutoSlide();
        }
    });

});
