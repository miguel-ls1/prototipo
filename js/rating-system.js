// Sistema de Avaliações
let currentRating = 0;
let currentBazarName = '';

// Inicializar sistema de avaliações
function initRatingSystem() {
    const urlParams = new URLSearchParams(window.location.search);
    currentBazarName = urlParams.get('name') || urlParams.get('id') || 'Bazar';
    
    loadReviews();
    setupStarRating();
    setupReviewForm();
}

// Configurar sistema de estrelas
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            updateStarDisplay();
        });
        
        star.addEventListener('mouseover', () => {
            highlightStars(index + 1);
        });
    });
    
    document.getElementById('starRating').addEventListener('mouseleave', () => {
        updateStarDisplay();
    });
}

// Destacar estrelas
function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

// Atualizar display das estrelas
function updateStarDisplay() {
    highlightStars(currentRating);
}

// Configurar formulário de avaliação
function setupReviewForm() {
    document.getElementById('reviewForm').addEventListener('submit', (e) => {
        e.preventDefault();
        submitReview();
    });
}

// Abrir modal de avaliação
function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'flex';
    currentRating = 0;
    updateStarDisplay();
    document.getElementById('reviewText').value = '';
}

// Fechar modal de avaliação
function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
}

// Enviar avaliação
function submitReview() {
    if (currentRating === 0) {
        alert('Por favor, selecione uma avaliação!');
        return;
    }
    
    const reviewText = document.getElementById('reviewText').value.trim();
    if (!reviewText) {
        alert('Por favor, escreva um comentário!');
        return;
    }
    
    const review = {
        id: Date.now(),
        bazarName: currentBazarName,
        rating: currentRating,
        text: reviewText,
        userName: localStorage.getItem('fashionspace_user_name') || 'Usuário Anônimo',
        date: new Date().toLocaleDateString('pt-BR')
    };
    
    saveReview(review);
    closeReviewModal();
    loadReviews();
    showMessage('Avaliação enviada com sucesso!', 'success');
}

// Salvar avaliação
function saveReview(review) {
    const reviews = JSON.parse(localStorage.getItem('fashionspace_reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('fashionspace_reviews', JSON.stringify(reviews));
}

// Carregar avaliações
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('fashionspace_reviews') || '[]');
    const bazarReviews = reviews.filter(r => r.bazarName === currentBazarName);
    
    // Adicionar avaliações fictícias se não houver nenhuma
    if (bazarReviews.length === 0) {
        addDefaultReviews();
        return;
    }
    
    displayReviews(bazarReviews);
    updateRatingSummary(bazarReviews);
}

// Adicionar avaliações padrão
function addDefaultReviews() {
    const defaultReviews = [
        {
            id: 1,
            bazarName: currentBazarName,
            rating: 5,
            text: 'Excelente bazar! Encontrei peças únicas e o atendimento foi maravilhoso.',
            userName: 'Maria Silva',
            date: '15/12/2024'
        },
        {
            id: 2,
            bazarName: currentBazarName,
            rating: 4,
            text: 'Boa variedade de produtos e preços justos. Recomendo!',
            userName: 'João Santos',
            date: '10/12/2024'
        },
        {
            id: 3,
            bazarName: currentBazarName,
            rating: 5,
            text: 'Lugar incrível! Sempre encontro o que procuro aqui.',
            userName: 'Ana Costa',
            date: '05/12/2024'
        }
    ];
    
    displayReviews(defaultReviews);
    updateRatingSummary(defaultReviews);
}

// Exibir avaliações
function displayReviews(reviews) {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
            <div class="review-header-info">
                <span class="reviewer-name">${review.userName}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <div class="review-text">${review.text}</div>
        `;
        reviewsList.appendChild(reviewElement);
    });
}

// Atualizar resumo das avaliações
function updateRatingSummary(reviews) {
    if (reviews.length === 0) return;
    
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const roundedAverage = Math.round(average * 10) / 10;
    
    document.getElementById('averageRating').textContent = roundedAverage;
    document.getElementById('summaryStars').textContent = '★'.repeat(Math.round(average)) + '☆'.repeat(5 - Math.round(average));
    document.getElementById('ratingCount').textContent = `Baseado em ${reviews.length} avaliação${reviews.length > 1 ? 'ões' : ''}`;
}

// Gerar estrelas para exibição
function generateStars(rating) {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '★' : '') + '☆'.repeat(5 - Math.ceil(rating));
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initRatingSystem, 500); // Aguardar carregamento dos dados do bazar
});

// Fechar modal clicando fora
document.addEventListener('click', (e) => {
    const modal = document.getElementById('reviewModal');
    if (e.target === modal) {
        closeReviewModal();
    }
});