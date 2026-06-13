/**
 * Main JavaScript for PJJ Challenge
 * Features: Component Loader, Carousel, FAQ Accordion
 */

document.addEventListener("DOMContentLoaded", function() {
    loadAllComponents();
});

/**
 * Load all HTML components and initialize scripts after loading
 */
async function loadAllComponents() {
    const components = [
        { id: 'header-component', path: 'components/header.html' },
        { id: 'banner-component', path: 'components/banner.html' },
        { id: 'about-component', path: 'components/about.html' },
        { id: 'events-component', path: 'components/events.html' },
        { id: 'timeline-component', path: 'components/timeline.html' },
        { id: 'faq-component', path: 'components/faq.html' },
        { id: 'update-component', path: 'components/update.html' },
        { id: 'footer-component', path: 'components/footer.html' }
    ];

    // Load each component using fetch
    const loadPromises = components.map(async (comp) => {
        const element = document.getElementById(comp.id);
        if (element) {
            try {
                const response = await fetch(comp.path);
                if (response.ok) {
                    const html = await response.text();
                    element.innerHTML = html;
                } else {
                    console.error(`Failed to load ${comp.path}: ${response.statusText}`);
                }
            } catch (error) {
                console.error(`Error fetching ${comp.path}:`, error);
            }
        }
    });

    // Wait for all components to be injected before initializing logic
    await Promise.all(loadPromises);
    
    // Initialize components logic
    initCarousel();
    initTimer();
}

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
 * Simple placeholder for timer initialization
 */
function initTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        // You can add actual timer logic here if needed
        console.log("Timer initialized");
    }
}

/**
 * Move carousel slide by index
 * @param {number} index - Index of the slide to move to
 */
window.moveSlide = function(index) {
    const track = document.getElementById('eventTrack');
    const cards = track.querySelectorAll('.events-card-container');
    
    if (!track || cards.length <= 3) return; 

    const dots = document.querySelectorAll('.dot');
    const slideDistance = 348; 
    
    track.style.transform = `translateX(-${index * slideDistance}px)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
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