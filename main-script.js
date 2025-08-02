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

// Carregar nome do usuário no header
function loadUserName() {
    const userData = localStorage.getItem('fashionspace_user');
    if (userData) {
        const user = JSON.parse(userData);
        const profileBtn = document.querySelector('.profile-btn');
        if (profileBtn) {
            profileBtn.innerHTML = `
                <i class="fas fa-user-circle"></i>
                ${user.name.split(' ')[0]}
            `;
        }
    }
}

// Carregar bazares salvos
function loadSavedBazares() {
    const bazares = JSON.parse(localStorage.getItem('fashionspace_bazares')) || [];
    const gridContainer = document.querySelector('.grid-container');
    
    // Remover apenas os bazares dinâmicos (manter os padrões)
    const dynamicCards = gridContainer.querySelectorAll('.bazar-card.dynamic');
    dynamicCards.forEach(card => card.remove());
    
    bazares.forEach(bazar => {
        const bazarCard = document.createElement('div');
        bazarCard.className = 'bazar-card dynamic';
        
        const imageSrc = bazar.imagem || 'assets/OIP.webp';
        const location = bazar.numero ? 
            `${bazar.endereco}, ${bazar.numero} - ${bazar.bairro}, ${bazar.cidade}` : 
            `${bazar.endereco} - ${bazar.bairro}, ${bazar.cidade}`;
        
        bazarCard.innerHTML = `
            <img src="${imageSrc}" alt="${bazar.nome}">
            <button class="favorite-btn" data-bazar="${bazar.nome}">
                <i class="far fa-heart"></i>
            </button>
            <div class="card-body">
                <h4>${bazar.nome}</h4>
                <p>${bazar.descricao}</p>
                <span class="location"><i class="fas fa-map-marker-alt"></i> ${location}</span>
                ${bazar.telefone ? `<span class="phone"><i class="fas fa-phone"></i> ${bazar.telefone}</span>` : ''}
                ${bazar.horario ? `<span class="hours"><i class="fas fa-clock"></i> ${bazar.horario}</span>` : ''}
            </div>
        `;
        
        // Adicionar click para abrir detalhes
        bazarCard.addEventListener('click', (e) => {
            if (!e.target.closest('.favorite-btn')) {
                window.open(`bazar-detalhes.html?id=${bazar.id}`, '_blank');
            }
        });
        bazarCard.style.cursor = 'pointer';
        
        gridContainer.appendChild(bazarCard);
    });
    
    // Reconfigurar eventos de favoritos para todos os cards
    setupFavoriteButtons();
    
    // Adicionar efeitos hover aos novos cards
    setupHoverEffects();
    
    // Adicionar cliques nos bazares padrão
    setupDefaultBazarClicks();
}

// Configurar botões de favoritos
function setupFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const bazarName = btn.getAttribute('data-bazar');
        
        // Verificar se já está favoritado
        if (favorites.includes(bazarName)) {
            btn.classList.add('favorited');
            btn.querySelector('i').className = 'fas fa-heart';
        }
        
        // Remover listeners antigos e adicionar novos
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Reconfigurar eventos
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const bazarName = btn.getAttribute('data-bazar');
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isFavorited = btn.classList.contains('favorited');
            const icon = btn.querySelector('i');
            
            if (isFavorited) {
                btn.classList.remove('favorited');
                icon.className = 'far fa-heart';
                favorites = favorites.filter(fav => fav !== bazarName);
            } else {
                btn.classList.add('favorited');
                icon.className = 'fas fa-heart';
                favorites.push(bazarName);
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
            showFavoriteMessage(isFavorited ? 'removido dos' : 'adicionado aos', bazarName);
        });
    });
}

// Configurar efeitos hover
function setupHoverEffects() {
    document.querySelectorAll('.bazar-card, .carousel-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Configurar cliques nos bazares padrão
function setupDefaultBazarClicks() {
    document.querySelectorAll('.bazar-card:not(.dynamic)').forEach(card => {
        const bazarName = card.querySelector('h4').textContent;
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.favorite-btn')) {
                window.open(`bazar-detalhes.html?name=${encodeURIComponent(bazarName)}`, '_blank');
            }
        });
        card.style.cursor = 'pointer';
    });
}

// Carregar dados do usuário ao inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadUserName();
    loadSavedBazares();
});

// Detectar mudanças no localStorage para recarregar bazares
window.addEventListener('storage', (e) => {
    if (e.key === 'fashionspace_bazares') {
        loadSavedBazares();
    }
});

// Para detectar mudanças na mesma aba
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    if (key === 'fashionspace_bazares') {
        setTimeout(() => loadSavedBazares(), 100);
    }
};