// Sidebar Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        mainContent.classList.remove('shifted');
    }
});

// Carousel Functionality
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.carousel-card').length;

function updateCarousel() {
    const translateX = -currentSlide * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play carousel
setInterval(nextSlide, 5000);

// Profile access functionality
const profileBtn = document.querySelector('.profile-btn');
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        window.location.href = 'perfil.html';
    });
}

// Search functionality
document.querySelector('.search-bar input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const bazarCards = document.querySelectorAll('.bazar-card');
    
    bazarCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = searchTerm === '' ? 'block' : 'none';
        }
    });
});

// Favorite functionality
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

document.querySelectorAll('.favorite-btn').forEach(btn => {
    const bazarName = btn.getAttribute('data-bazar');
    
    // Check if already favorited
    if (favorites.includes(bazarName)) {
        btn.classList.add('favorited');
        btn.querySelector('i').className = 'fas fa-heart';
    }
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isFavorited = btn.classList.contains('favorited');
        const icon = btn.querySelector('i');
        
        if (isFavorited) {
            // Remove from favorites
            btn.classList.remove('favorited');
            icon.className = 'far fa-heart';
            favorites = favorites.filter(fav => fav !== bazarName);
        } else {
            // Add to favorites
            btn.classList.add('favorited');
            icon.className = 'fas fa-heart';
            favorites.push(bazarName);
        }
        
        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Show feedback
        showFavoriteMessage(isFavorited ? 'removido dos' : 'adicionado aos', bazarName);
    });
});

// Show favorite message
function showFavoriteMessage(action, bazarName) {
    const message = document.createElement('div');
    message.className = 'favorite-message';
    message.innerHTML = `
        <i class="fas fa-heart"></i>
        ${bazarName} ${action} favoritos!
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e91e63;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 2000;
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 2000);
}

// Smooth scrolling for sidebar links
document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's a page link, don't prevent default
        if (href.includes('.html')) {
            return;
        }
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    });
});

// Add hover effects to cards
document.querySelectorAll('.bazar-card, .carousel-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Responsive carousel for mobile
function handleResize() {
    if (window.innerWidth <= 768) {
        // Mobile adjustments
        document.querySelectorAll('.carousel-card').forEach(card => {
            card.style.minWidth = '100%';
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on load