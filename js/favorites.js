// Sistema de Favoritos
class FavoritesManager {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('fashionspace_favorites') || '[]');
        this.init();
    }

    init() {
        this.addFavoriteButtons();
        this.loadFavoriteStates();
        this.setupEventListeners();
    }

    // Adicionar botões de favorito em todos os cards que não têm
    addFavoriteButtons() {
        // Cards do carousel
        document.querySelectorAll('.carousel-card').forEach(card => {
            if (!card.querySelector('.favorite-btn')) {
                const bazarName = card.querySelector('h3').textContent;
                const img = card.querySelector('img');
                
                const favoriteBtn = document.createElement('button');
                favoriteBtn.className = 'favorite-btn';
                favoriteBtn.setAttribute('data-bazar', bazarName);
                favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
                
                // Inserir após a imagem
                img.parentNode.insertBefore(favoriteBtn, img.nextSibling);
            }
        });

        // Cards da grid de bazares
        document.querySelectorAll('.bazar-card').forEach(card => {
            if (!card.querySelector('.favorite-btn')) {
                const bazarName = card.querySelector('h4').textContent;
                const img = card.querySelector('img');
                
                const favoriteBtn = document.createElement('button');
                favoriteBtn.className = 'favorite-btn';
                favoriteBtn.setAttribute('data-bazar', bazarName);
                favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
                
                // Inserir após a imagem
                img.parentNode.insertBefore(favoriteBtn, img.nextSibling);
            }
        });
    }

    // Carregar estados dos favoritos
    loadFavoriteStates() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const bazarName = btn.getAttribute('data-bazar');
            if (this.favorites.some(fav => fav.name === bazarName)) {
                btn.classList.add('favorited');
                btn.querySelector('i').className = 'fas fa-heart';
            }
        });
    }

    // Configurar event listeners
    setupEventListeners() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFavorite(btn);
            });
        });
    }

    // Alternar favorito
    toggleFavorite(button) {
        const bazarName = button.getAttribute('data-bazar');
        const icon = button.querySelector('i');
        const card = button.closest('.bazar-card, .carousel-card');
        
        // Coletar dados do bazar
        const bazarData = this.extractBazarData(card, bazarName);
        
        const existingIndex = this.favorites.findIndex(fav => fav.name === bazarName);
        
        if (existingIndex !== -1) {
            // Remover dos favoritos
            this.favorites.splice(existingIndex, 1);
            button.classList.remove('favorited');
            icon.className = 'far fa-heart';
            this.showMessage(`${bazarName} removido dos favoritos`, 'remove');
        } else {
            // Adicionar aos favoritos
            this.favorites.push(bazarData);
            button.classList.add('favorited');
            icon.className = 'fas fa-heart';
            this.showMessage(`${bazarName} adicionado aos favoritos!`, 'success');
        }
        
        this.saveFavorites();
    }

    // Extrair dados do bazar do card
    extractBazarData(card, bazarName) {
        const img = card.querySelector('img');
        const description = card.querySelector('p')?.textContent || '';
        const location = card.querySelector('.location')?.textContent || card.querySelector('.card-info span')?.textContent || '';
        const category = card.getAttribute('data-category') || 'geral';
        
        return {
            name: bazarName,
            description: description,
            location: location.replace(/.*\s/, ''), // Remove ícone do texto
            image: img ? img.src : 'assets/OIP.webp',
            category: category,
            addedAt: new Date().toISOString()
        };
    }

    // Salvar favoritos
    saveFavorites() {
        localStorage.setItem('fashionspace_favorites', JSON.stringify(this.favorites));
    }

    // Mostrar mensagem
    showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `favorite-message ${type}`;
        message.innerHTML = `
            <i class="fas fa-heart"></i>
            <span>${text}</span>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 2000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // Obter favoritos
    getFavorites() {
        return this.favorites;
    }
}

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar sistema de favoritos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.favoritesManager = new FavoritesManager();
});

// Função global para obter favoritos (para usar na página de favoritos)
window.getFavorites = () => {
    return JSON.parse(localStorage.getItem('fashionspace_favorites') || '[]');
};