// SISTEMA DE ANIMAÇÕES E MELHORIAS

class AnimationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageTransitions();
        this.setupParallax();
        this.setupEnhancedCards();
        this.setupSearchAutocomplete();
        this.setupHistorySystem();
        this.setupLoadingStates();
    }

    // TRANSIÇÕES ENTRE PÁGINAS
    setupPageTransitions() {
        document.addEventListener('DOMContentLoaded', () => {
            // Só adicionar transição se não estiver em modo escuro
            if (!document.body.classList.contains('dark-mode')) {
                document.body.classList.add('page-transition');
            }
        });

        // Interceptar cliques em links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && !link.target && link.href.includes(window.location.origin)) {
                e.preventDefault();
                this.navigateWithTransition(link.href);
            }
        });
    }

    navigateWithTransition(url) {
        document.body.classList.add('page-exit');
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    // PARALLAX SCROLLING
    setupParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('parallax-hero');
            
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxBg = hero.querySelector('.parallax-bg');
                if (parallaxBg) {
                    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }
    }

    // CARDS APRIMORADOS
    setupEnhancedCards() {
        const cards = document.querySelectorAll('.bazar-card, .favorite-card');
        cards.forEach(card => {
            card.classList.add('enhanced-card');
        });
    }

    // AUTOCOMPLETE DE BUSCA
    setupSearchAutocomplete() {
        const searchInput = document.querySelector('.search-bar input');
        if (!searchInput) return;

        const suggestions = this.createSuggestionsDropdown(searchInput);
        const bazares = this.getBazaresSuggestions();

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                suggestions.classList.remove('show');
                return;
            }

            const filtered = bazares.filter(bazar => 
                bazar.nome.toLowerCase().includes(query) ||
                bazar.categoria.toLowerCase().includes(query)
            );

            this.showSuggestions(suggestions, filtered, query);
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
                suggestions.classList.remove('show');
            }
        });
    }

    createSuggestionsDropdown(input) {
        const container = input.closest('.search-bar');
        container.style.position = 'relative';
        
        const suggestions = document.createElement('div');
        suggestions.className = 'search-suggestions';
        container.appendChild(suggestions);
        
        return suggestions;
    }

    getBazaresSuggestions() {
        return [
            { nome: 'Bazar da Moda Vintage', categoria: 'vintage' },
            { nome: 'Alta Costura', categoria: 'luxo' },
            { nome: 'Casual Wear', categoria: 'casual' },
            { nome: 'Festa Glamour', categoria: 'festa' },
            { nome: 'Outlet Fashion', categoria: 'outlet' },
            { nome: 'Artesanal Único', categoria: 'artesanal' },
            { nome: 'Kids Fashion', categoria: 'infantil' },
            { nome: 'Fitness Style', categoria: 'fitness' }
        ];
    }

    showSuggestions(container, suggestions, query) {
        container.innerHTML = '';
        
        suggestions.slice(0, 5).forEach(item => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `
                <i class="fas fa-search suggestion-icon"></i>
                <span>${item.nome}</span>
            `;
            
            div.addEventListener('click', () => {
                document.querySelector('.search-bar input').value = item.nome;
                container.classList.remove('show');
                this.addToHistory(item.nome);
            });
            
            container.appendChild(div);
        });
        
        container.classList.add('show');
    }

    // SISTEMA DE HISTÓRICO
    setupHistorySystem() {
        const searchInput = document.querySelector('.search-bar input');
        if (!searchInput) return;

        searchInput.addEventListener('focus', () => {
            this.showHistory(searchInput);
        });
    }

    showHistory(input) {
        const history = this.getSearchHistory();
        if (history.length === 0) return;

        let historyDropdown = input.parentElement.querySelector('.history-dropdown');
        if (!historyDropdown) {
            historyDropdown = this.createHistoryDropdown(input);
        }

        historyDropdown.innerHTML = '';
        
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <i class="fas fa-history history-icon"></i>
                <span class="history-text">${item}</span>
            `;
            
            div.addEventListener('click', () => {
                input.value = item;
                historyDropdown.classList.remove('show');
            });
            
            historyDropdown.appendChild(div);
        });

        const clearBtn = document.createElement('div');
        clearBtn.className = 'clear-history';
        clearBtn.textContent = 'Limpar histórico';
        clearBtn.addEventListener('click', () => {
            this.clearHistory();
            historyDropdown.classList.remove('show');
        });
        historyDropdown.appendChild(clearBtn);
        
        historyDropdown.classList.add('show');
    }

    createHistoryDropdown(input) {
        const container = input.closest('.search-bar');
        const dropdown = document.createElement('div');
        dropdown.className = 'history-dropdown';
        container.appendChild(dropdown);
        return dropdown;
    }

    addToHistory(term) {
        let history = this.getSearchHistory();
        history = history.filter(item => item !== term);
        history.unshift(term);
        history = history.slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    getSearchHistory() {
        return JSON.parse(localStorage.getItem('searchHistory') || '[]');
    }

    clearHistory() {
        localStorage.removeItem('searchHistory');
    }

    // LOADING STATES
    setupLoadingStates() {
        this.createLoadingOverlay();
    }

    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(overlay);
    }

    showLoading() {
        document.querySelector('.loading-overlay').classList.add('show');
    }

    hideLoading() {
        document.querySelector('.loading-overlay').classList.remove('show');
    }

    // SKELETON SCREENS
    showSkeleton(container) {
        const skeletonHTML = `
            <div class="skeleton-card">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-text title"></div>
                <div class="skeleton skeleton-text subtitle"></div>
                <div class="skeleton skeleton-text content"></div>
            </div>
        `.repeat(3);
        
        container.innerHTML = skeletonHTML;
    }

    hideSkeleton(container, content) {
        container.innerHTML = content;
    }
}

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    new AnimationSystem();
});

// Exportar para uso global
window.AnimationSystem = AnimationSystem;