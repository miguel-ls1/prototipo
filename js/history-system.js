// SISTEMA DE HISTÓRICO DE BAZARES VISITADOS

class HistorySystem {
    constructor() {
        this.maxHistoryItems = 20;
        this.init();
    }

    init() {
        this.setupHistoryTracking();
        this.setupHistoryDisplay();
    }

    // Rastrear visitas aos bazares
    setupHistoryTracking() {
        // Interceptar cliques em links de detalhes
        document.addEventListener('click', (e) => {
            const detailsBtn = e.target.closest('.details-btn, .card-btn');
            if (detailsBtn) {
                const card = detailsBtn.closest('.bazar-card, .carousel-card');
                if (card) {
                    const bazarName = card.querySelector('h3, h4')?.textContent;
                    const bazarImage = card.querySelector('img')?.src;
                    const bazarLocation = card.querySelector('.location')?.textContent || 'Localização não informada';
                    
                    if (bazarName) {
                        this.addToHistory({
                            name: bazarName,
                            image: bazarImage,
                            location: bazarLocation,
                            visitedAt: new Date().toISOString(),
                            url: detailsBtn.onclick ? detailsBtn.onclick.toString() : window.location.href
                        });
                    }
                }
            }
        });
    }

    // Adicionar item ao histórico
    addToHistory(bazarData) {
        let history = this.getHistory();
        
        // Remove item existente se já estiver no histórico
        history = history.filter(item => item.name !== bazarData.name);
        
        // Adiciona no início
        history.unshift(bazarData);
        
        // Limita o número de itens
        history = history.slice(0, this.maxHistoryItems);
        
        localStorage.setItem('bazarHistory', JSON.stringify(history));
        
        // Atualiza displays se existirem
        this.updateHistoryDisplays();
    }

    // Obter histórico
    getHistory() {
        return JSON.parse(localStorage.getItem('bazarHistory') || '[]');
    }

    // Limpar histórico
    clearHistory() {
        localStorage.removeItem('bazarHistory');
        this.updateHistoryDisplays();
    }

    // Configurar exibição do histórico
    setupHistoryDisplay() {
        // Criar seção de histórico se não existir
        this.createHistorySection();
    }

    // Criar seção de histórico na página principal
    createHistorySection() {
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            const history = this.getHistory();
            if (history.length === 0) return;

            const bazaresGrid = document.querySelector('.bazares-grid');
            if (!bazaresGrid) return;

            const historySection = document.createElement('section');
            historySection.className = 'bazares-grid history-section';
            historySection.innerHTML = `
                <div class="history-header">
                    <h2><i class="fas fa-history"></i> Visitados Recentemente</h2>
                    <button class="clear-history-btn" onclick="historySystem.clearHistory()">
                        <i class="fas fa-trash"></i> Limpar Histórico
                    </button>
                </div>
                <div class="carousel-wrapper">
                    <button class="carousel-nav prev" id="prevHistory">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="grid-container" id="historyContainer">
                        ${this.generateHistoryCards()}
                    </div>
                    <button class="carousel-nav next" id="nextHistory">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            `;

            // Inserir antes da primeira seção de bazares
            bazaresGrid.parentNode.insertBefore(historySection, bazaresGrid);

            // Configurar carrossel do histórico
            this.setupHistoryCarousel();
        }
    }

    // Gerar cards do histórico
    generateHistoryCards() {
        const history = this.getHistory();
        return history.map(item => `
            <div class="bazar-card history-card enhanced-card" onclick="window.location.href='pages/bazar-detalhes.html?name=${encodeURIComponent(item.name)}'">
                <img src="${item.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop'}" alt="${item.name}">
                <div class="history-badge">
                    <i class="fas fa-history"></i>
                    <span>${this.formatDate(item.visitedAt)}</span>
                </div>
                <button class="favorite-btn" data-bazar="${item.name}" onclick="event.stopPropagation();">
                    <i class="far fa-heart"></i>
                </button>
                <div class="card-body">
                    <h4>${item.name}</h4>
                    <p>Visitado em ${this.formatDate(item.visitedAt)}</p>
                    <span class="location">${item.location}</span>
                    <button class="details-btn" onclick="event.stopPropagation(); window.location.href='pages/bazar-detalhes.html?name=${encodeURIComponent(item.name)}'">
                        <i class="fas fa-eye"></i> Ver Novamente
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Formatar data
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'hoje';
        if (diffDays === 2) return 'ontem';
        if (diffDays <= 7) return `${diffDays - 1} dias atrás`;
        
        return date.toLocaleDateString('pt-BR');
    }

    // Configurar carrossel do histórico
    setupHistoryCarousel() {
        let currentSlideHistory = 0;
        const cardsPerView = 3;

        const updateHistoryCarousel = () => {
            const container = document.getElementById('historyContainer');
            if (!container) return;
            
            const cards = container.querySelectorAll('.bazar-card');
            const maxSlide = Math.max(0, cards.length - cardsPerView);
            
            if (currentSlideHistory > maxSlide) currentSlideHistory = maxSlide;
            if (currentSlideHistory < 0) currentSlideHistory = 0;
            
            const translateX = -(currentSlideHistory * (300 + 30));
            container.style.transform = `translateX(${translateX}px)`;
        };

        const nextBtn = document.getElementById('nextHistory');
        const prevBtn = document.getElementById('prevHistory');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const container = document.getElementById('historyContainer');
                const cards = container.querySelectorAll('.bazar-card');
                const maxSlide = Math.max(0, cards.length - cardsPerView);
                
                if (currentSlideHistory < maxSlide) {
                    currentSlideHistory++;
                    updateHistoryCarousel();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentSlideHistory > 0) {
                    currentSlideHistory--;
                    updateHistoryCarousel();
                }
            });
        }

        updateHistoryCarousel();
    }

    // Atualizar todas as exibições do histórico
    updateHistoryDisplays() {
        // Atualizar seção principal se existir
        const historySection = document.querySelector('.history-section');
        if (historySection) {
            const container = document.getElementById('historyContainer');
            if (container) {
                container.innerHTML = this.generateHistoryCards();
                this.setupHistoryCarousel();
            }
        }

        // Atualizar dropdown de busca se existir
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput && document.activeElement === searchInput) {
            // Recriar dropdown se estiver ativo
            const existingDropdown = searchInput.parentElement.querySelector('.history-dropdown');
            if (existingDropdown && existingDropdown.classList.contains('show')) {
                this.showSearchHistory(searchInput);
            }
        }
    }

    // Mostrar histórico na busca
    showSearchHistory(input) {
        const history = this.getHistory();
        if (history.length === 0) return;

        let historyDropdown = input.parentElement.querySelector('.history-dropdown');
        if (!historyDropdown) {
            historyDropdown = this.createHistoryDropdown(input);
        }

        historyDropdown.innerHTML = '';
        
        // Adicionar título
        const title = document.createElement('div');
        title.className = 'history-title';
        title.innerHTML = '<i class="fas fa-history"></i> Visitados Recentemente';
        historyDropdown.appendChild(title);
        
        // Adicionar itens do histórico (máximo 5)
        history.slice(0, 5).forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <i class="fas fa-history history-icon"></i>
                <span class="history-text">${item.name}</span>
                <span class="history-date">${this.formatDate(item.visitedAt)}</span>
            `;
            
            div.addEventListener('click', () => {
                window.location.href = `pages/bazar-detalhes.html?name=${encodeURIComponent(item.name)}`;
            });
            
            historyDropdown.appendChild(div);
        });

        // Botão limpar
        const clearBtn = document.createElement('div');
        clearBtn.className = 'clear-history';
        clearBtn.innerHTML = '<i class="fas fa-trash"></i> Limpar histórico';
        clearBtn.addEventListener('click', () => {
            this.clearHistory();
            historyDropdown.classList.remove('show');
        });
        historyDropdown.appendChild(clearBtn);
        
        historyDropdown.classList.add('show');
    }

    // Criar dropdown do histórico
    createHistoryDropdown(input) {
        const container = input.closest('.search-bar');
        const dropdown = document.createElement('div');
        dropdown.className = 'history-dropdown';
        container.appendChild(dropdown);
        return dropdown;
    }
}

// CSS adicional para o histórico
const historyCSS = `
.history-section {
    background: #f8f9fa;
    border-top: 2px solid #e9ecef;
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.clear-history-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
}

.clear-history-btn:hover {
    background: #c82333;
    transform: translateY(-1px);
}

.history-card {
    position: relative;
    opacity: 0.9;
}

.history-card:hover {
    opacity: 1;
}

.history-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 5;
}

.history-title {
    padding: 10px 15px;
    font-weight: 600;
    color: #666;
    font-size: 12px;
    border-bottom: 1px solid #f8f9fa;
    display: flex;
    align-items: center;
    gap: 8px;
}

.history-date {
    font-size: 10px;
    color: #999;
    margin-left: auto;
}

.dark-mode .history-section {
    background: #2d2d2d;
    border-color: #4d4d4d;
}

.dark-mode .history-title {
    color: #e0e0e0;
    border-color: #4d4d4d;
}
`;

// Adicionar CSS
const style = document.createElement('style');
style.textContent = historyCSS;
document.head.appendChild(style);

// Inicializar sistema
let historySystem;
document.addEventListener('DOMContentLoaded', () => {
    historySystem = new HistorySystem();
});

// Exportar para uso global
window.HistorySystem = HistorySystem;