// Sistema de Avaliações
let currentRating = 0;
let currentBazarName = '';

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentBazarName = urlParams.get('name') || urlParams.get('id') || 'Bazar';
    
    setupStarRating();
    loadReviews();
});

// Configurar estrelas
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            updateStars();
        });
        
        star.addEventListener('mouseover', () => {
            highlightStars(index + 1);
        });
    });
    
    document.getElementById('starRating').addEventListener('mouseleave', updateStars);
}

// Destacar estrelas
function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

// Atualizar estrelas
function updateStars() {
    highlightStars(currentRating);
}

// Abrir modal
function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'flex';
    currentRating = 0;
    updateStars();
    document.getElementById('reviewText').value = '';
}

// Fechar modal
function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
}

// Enviar avaliação
function submitReview() {
    if (currentRating === 0) {
        alert('Selecione uma avaliação!');
        return;
    }
    
    const text = document.getElementById('reviewText').value.trim();
    if (!text) {
        alert('Escreva um comentário!');
        return;
    }
    
    const review = {
        id: Date.now(),
        bazar: currentBazarName,
        rating: currentRating,
        text: text,
        user: localStorage.getItem('fashionspace_user_name') || 'Usuário',
        date: new Date().toLocaleDateString('pt-BR')
    };
    
    saveReview(review);
    closeReviewModal();
    loadReviews();
    showMessage('Avaliação enviada!');
    
    // Atualizar analytics se disponível
    if (typeof updateBazarAnalytics === 'function') {
        console.log('Updating analytics for:', currentBazarName);
        setTimeout(() => {
            updateBazarAnalytics(currentBazarName);
        }, 1000);
    }
    
    // Disparar evento personalizado para atualizar analytics
    window.dispatchEvent(new CustomEvent('reviewAdded', { 
        detail: { bazarName: currentBazarName, review: review } 
    }));
}

// Salvar avaliação
function saveReview(review) {
    const reviews = JSON.parse(localStorage.getItem('bazar_reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('bazar_reviews', JSON.stringify(reviews));
}

// Carregar avaliações
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('bazar_reviews') || '[]');
    console.log('Current bazar name:', currentBazarName);
    console.log('All reviews:', reviews);
    const bazarReviews = reviews.filter(r => r.bazar === currentBazarName);
    console.log('Filtered reviews:', bazarReviews);
    
    // Adicionar avaliações padrão se não houver
    if (bazarReviews.length === 0) {
        const defaultReviews = [
            {
                id: 1,
                bazar: currentBazarName,
                rating: 5,
                text: 'Excelente bazar! Encontrei peças únicas.',
                user: 'Maria Silva',
                date: '15/12/2024'
            },
            {
                id: 2,
                bazar: currentBazarName,
                rating: 4,
                text: 'Boa variedade e preços justos.',
                user: 'João Santos',
                date: '10/12/2024'
            }
        ];
        bazarReviews.push(...defaultReviews);
    }
    
    displayReviews(bazarReviews);
    updateSummary(bazarReviews);
}

// Exibir avaliações
function displayReviews(reviews) {
    const container = document.getElementById('reviewsList');
    container.innerHTML = '';
    
    reviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
            <div class="review-header">
                <span class="reviewer-name">${review.user}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <div class="review-text">${review.text}</div>
        `;
        container.appendChild(div);
    });
}

// Atualizar resumo
function updateSummary(reviews) {
    if (reviews.length === 0) return;
    
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const rounded = Math.round(avg * 10) / 10;
    
    document.getElementById('avgRating').textContent = rounded;
    document.getElementById('avgStars').textContent = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));
    document.getElementById('reviewCount').textContent = `${reviews.length} avaliação${reviews.length > 1 ? 'ões' : ''}`;
}

// Mostrar mensagem
function showMessage(text) {
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    msg.textContent = text;
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.remove();
    }, 3000);
}

// Fechar modal clicando fora
document.addEventListener('click', (e) => {
    const modal = document.getElementById('reviewModal');
    if (e.target === modal) {
        closeReviewModal();
    }
});