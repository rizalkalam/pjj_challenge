/**
 * Main JavaScript for PJJ Challenge
 * Features: Component Loader, Carousel, FAQ Accordion
 */

document.addEventListener("DOMContentLoaded", function() {
    // Initialize components logic directly
    initCarousel();
    initTimer();
});

/**
 * Initialize Carousel for Events Section
 */
function initCarousel() {
    const track = document.getElementById('eventTrack');
    if (!track) return;

    const cards = track.querySelectorAll('.events-card-container');
    const indicators = document.querySelector('.carousel-indicators');

    if (cards.length <= 3) {
        track.style.justifyContent = 'center';             
        if (indicators) indicators.style.display = 'none';     
    } else {
        track.style.justifyContent = 'flex-start'; 
        if (indicators) indicators.style.display = 'flex';         
    }
}

/**
 * Initialize and start the countdown timer
 */
function initTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;

    // Set the target date: June 17, 2026 00:00:00
    const targetDate = new Date("June 17, 2026 00:00:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            timerElement.innerHTML = "00:00:00:00";
            clearInterval(timerInterval);
            return;
        }

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format with leading zeros
        const format = (num) => num.toString().padStart(2, '0');

        timerElement.innerHTML = `${format(days)}:${format(hours)}:${format(minutes)}:${format(seconds)}`;
    };

    // Run once immediately to avoid 1s delay
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

/**
 * Move carousel slide by index
 * @param {number} index - Index of the slide to move to
 */
window.moveSlide = function(index) {
    const track = document.getElementById('eventTrack');
    const cards = track.querySelectorAll('.events-card-container');
    const dots = document.querySelectorAll('.dot');
    
    if (!track || cards.length <= 3) return; 

    // Hitung jarak geser (lebar container + gap)
    const cardWidth = cards[0].offsetWidth;
    const gap = 28; // Sesuai CSS gap: 28px
    const slideDistance = cardWidth + gap;
    
    track.style.transform = `translateX(-${index * slideDistance}px)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
}
/**
 * Toggle Mobile Menu (Hamburger)
 */
window.toggleMobileMenu = function() {
    const navMobile = document.getElementById('nav-mobile');
    if (navMobile) {
        navMobile.classList.toggle('active');
    }
}

/**
 * Toggle FAQ accordion
 * @param {HTMLElement} card - The FAQ card element being clicked
 */
window.toggleFAQ = function(card) {
    const allCards = document.querySelectorAll(".card-faq");

    // Close all other FAQ cards
    allCards.forEach((c) => {
        if (c !== card) {
            const textContent = c.querySelector(".text-faq");
            const icon = c.querySelector("iconify-icon");
            
            if (textContent) textContent.style.display = "none";
            if (icon) icon.classList.remove("rotate180");
        }
    });

    const textFAQ = card.querySelector(".text-faq");
    const chevronIcon = card.querySelector("iconify-icon");

    if (textFAQ.style.display === "none" || !textFAQ.style.display) {
        textFAQ.style.display = "block";
        if (chevronIcon) chevronIcon.classList.add("rotate180");
    } else {
        textFAQ.style.display = "none";
        if (chevronIcon) chevronIcon.classList.remove("rotate180");
    }
}

/**
 * Update Journey Year Display and Selection
 */
window.toggleYearDropdown = function() {
    const list = document.getElementById('year-options');
    const icon = document.getElementById('dropdown-icon');
    if (list) {
        list.classList.toggle('active');
        if (icon) {
            icon.style.transform = list.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            icon.style.transition = '0.3s ease';
        }
    }
}

window.selectYear = function(year) {
    const display = document.getElementById('display-year');
    const list = document.getElementById('year-options');
    const icon = document.getElementById('dropdown-icon');
    
    if (display) display.textContent = year;
    if (list) list.classList.remove('active');
    if (icon) icon.style.transform = 'rotate(0deg)';
    
    // Logika tambahan untuk ganti data journey per tahun bisa ditaruh di sini
    console.log("Tahun dipilih:", year);
}

/**
 * Event Detail Popup Logic
 */
window.openEventPopup = function(title, description, regLink, guidebookLink) {
    const popup = document.getElementById('event-popup');
    const titleEl = document.getElementById('popup-title');
    const descEl = document.getElementById('popup-description');
    const linkEl = document.getElementById('popup-reg-link');
    const guideEl = document.getElementById('popup-guidebook-link');
    
    if (popup && titleEl && descEl) {
        titleEl.textContent = title;
        descEl.textContent = description;
        if (linkEl) {
            if (regLink) {
                linkEl.href = regLink;
                linkEl.style.display = '';
            } else {
                linkEl.style.display = 'none';
            }
        }
        if (guideEl) {
            if (guidebookLink) {
                guideEl.href = guidebookLink;
                guideEl.style.display = '';
            } else {
                guideEl.style.display = 'none';
            }
        }
        popup.style.display = 'flex';
        // Force reflow for transition
        popup.offsetHeight;
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock vertical scroll
    }
}

window.closeEventPopup = function(event) {
    const popup = document.getElementById('event-popup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
}

// Close popup with Esc key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeEventPopup();
    }
});