// Load favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Bazar data (in a real app, this would come from a database)
const bazarData = {
    'Bazar Sustentável': {
        image: '../assets/OIP.webp',
        description: 'Moda consciente e sustentável',
        location: 'Brasília, DF'
    },
    'Feira de Artesãos': {
        image: '../assets/OIP.webp',
        description: 'Peças artesanais únicas',
        location: 'Salvador, BA'
    },
    'Moda Jovem': {
        image: '../assets/OIP.webp',
        description: 'Tendências para o público jovem',
        location: 'Fortaleza, CE'
    },
    'Vintage Store': {
        image: '../assets/OIP.webp',
        description: 'Peças vintage autênticas dos anos 70-90',
        location: 'Porto Alegre, RS'
    },
    'Outlet Fashion': {
        image: '../assets/OIP.webp',
        description: 'Marcas famosas com até 80% de desconto',
        location: 'Belo Horizonte, MG'
    },
    'Brechó Chique': {
        image: '../assets/OIP.webp',
        description: 'Roupas de grife seminovas',
        location: 'Recife, PE'
    },
    'Moda Plus Size': {
        image: '../assets/OIP.webp',
        description: 'Moda inclusiva e estilosa',
        location: 'Goiânia, GO'
    },
    'Street Fashion': {
        image: '../assets/OIP.webp',
        description: 'Estilo urbano e streetwear',
        location: 'Florianópolis, SC'
    },
    'Moda Infantil': {
        image: '../assets/OIP.webp',
        description: 'Roupas fofas para crianças',
        location: 'Manaus, AM'
    },
    'Moda Executiva': {
        image: '../assets/OIP.webp',
        description: 'Roupas sociais e profissionais',
        location: 'Vitória, ES'
    },
    'Boho Style': {
        image: '../assets/OIP.webp',
        description: 'Estilo boêmio e hippie chic',
        location: 'João Pessoa, PB'
    },
    'Bazar da Moda Vintage': {
        image: '../assets/OIP.webp',
        description: 'Peças únicas e exclusivas dos anos 80 e 90',
        location: 'São Paulo, SP'
    },
    'Outlet Independente': {
        image: '../assets/OIP.webp',
        description: 'Marcas nacionais com até 70% de desconto',
        location: 'Rio de Janeiro, RJ'
    },
    'Garimpo Fashion': {
        image: '../assets/OIP.webp',
        description: 'Brechó online com peças selecionadas',
        location: 'Online'
    },
    'Bazar Premium': {
        image: '../assets/OIP.webp',
        description: 'Roupas de grife com preços acessíveis',
        location: 'Curitiba, PR'
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadFavorites();
});

function loadFavorites() {
    const emptyState = document.getElementById('emptyState');
    const favoritesGrid = document.getElementById('favoritesGrid');
    const favoritesCount = document.getElementById('favoritesCount');
    
    // Update count
    favoritesCount.textContent = favorites.length;
    
    if (favorites.length === 0) {
        emptyState.style.display = 'block';
        favoritesGrid.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        favoritesGrid.style.display = 'grid';
        
        // Clear existing content
        favoritesGrid.innerHTML = '';
        
        // Create cards for each favorite
        favorites.forEach(bazarName => {
            const bazar = bazarData[bazarName];
            if (bazar) {
                const card = createFavoriteCard(bazarName, bazar);
                favoritesGrid.appendChild(card);
            }
        });
    }
}

function createFavoriteCard(name, data) {
    const card = document.createElement('div');
    card.className = 'favorite-card';
    card.innerHTML = `
        <img src="${data.image}" alt="${name}">
        <div class="favorite-badge">
            <i class="fas fa-heart"></i>
            Favorito
        </div>
        <button class="remove-favorite" onclick="removeFavorite('${name}')">
            <i class="fas fa-times"></i>
        </button>
        <div class="card-body">
            <h4>${name}</h4>
            <p>${data.description}</p>
            <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                ${data.location}
            </div>
            <div class="card-actions">
                <button class="view-btn" onclick="viewBazar('${name}')">
                    <i class="fas fa-eye"></i>
                    Ver Detalhes
                </button>
                <button class="share-btn" onclick="shareBazar('${name}')">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    return card;
}

function removeFavorite(bazarName) {
    // Remove from favorites array
    favorites = favorites.filter(fav => fav !== bazarName);
    
    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Show message
    showMessage(`${bazarName} removido dos favoritos!`, 'removed');
    
    // Reload favorites
    setTimeout(() => {
        loadFavorites();
    }, 300);
}

function viewBazar(bazarName) {
    window.open(`bazar-detalhes.html?name=${encodeURIComponent(bazarName)}`, '_blank');
}

function shareBazar(bazarName) {
    if (navigator.share) {
        navigator.share({
            title: bazarName,
            text: `Confira este bazar incrível: ${bazarName}`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(`Confira este bazar incrível: ${bazarName} - ${url}`);
        showMessage('Link copiado para a área de transferência!', 'success');
    }
}

function showMessage(text, type) {
    const message = document.createElement('div');
    message.className = 'message';
    
    let bgColor, icon;
    switch(type) {
        case 'removed':
            bgColor = '#f44336';
            icon = 'fa-heart-broken';
            break;
        case 'success':
            bgColor = '#4CAF50';
            icon = 'fa-check-circle';
            break;
        case 'info':
            bgColor = '#2196F3';
            icon = 'fa-info-circle';
            break;
        default:
            bgColor = '#666';
            icon = 'fa-info-circle';
    }
    
    message.innerHTML = `
        <i class="fas ${icon}"></i>
        ${text}
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 2000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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