// Sistema de Analytics por Bazar
function loadBazarAnalytics() {
    const userBazares = JSON.parse(localStorage.getItem('fashionspace_bazares') || '[]');
    const reviews = JSON.parse(localStorage.getItem('bazar_reviews') || '[]');
    const container = document.getElementById('bazarAnalytics');
    
    if (userBazares.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Você não tem nenhum bazar</p>';
        return;
    }
    
    container.innerHTML = userBazares.map(bazar => {
        console.log('Checking reviews for bazar:', bazar.nome);
        const bazarReviews = reviews.filter(r => r.bazar === bazar.nome);
        console.log('Found reviews:', bazarReviews);
        const avgRating = bazarReviews.length > 0 ? 
            (bazarReviews.reduce((sum, r) => sum + r.rating, 0) / bazarReviews.length).toFixed(1) : '0.0';
        
        // Simular dados de analytics
        const views = Math.floor(Math.random() * 500) + 100;
        const favorites = Math.floor(Math.random() * 50) + 10;
        const visitors = Math.floor(Math.random() * 100) + 20;
        
        return `
            <div class="bazar-analytics-item">
                <div class="bazar-analytics-header">
                    <div class="bazar-analytics-title">${bazar.nome}</div>
                    <button class="bazar-analytics-toggle" onclick="toggleBazarAnalytics(${bazar.id})">
                        Ver Análise
                    </button>
                </div>
                <div class="bazar-analytics-content" id="analytics-${bazar.id}">
                    <div class="bazar-stats">
                        <div class="bazar-stat">
                            <span class="bazar-stat-number">${views}</span>
                            <span class="bazar-stat-label">Visualizações</span>
                        </div>

                        <div class="bazar-stat">
                            <span class="bazar-stat-number">${bazarReviews.length}</span>
                            <span class="bazar-stat-label">Avaliações</span>
                        </div>
                        <div class="bazar-stat">
                            <span class="bazar-stat-number">${avgRating}</span>
                            <span class="bazar-stat-label">Nota Média</span>
                        </div>
                        <div class="bazar-stat">
                            <span class="bazar-stat-number">${favorites}</span>
                            <span class="bazar-stat-label">Favoritos</span>
                        </div>
                        <div class="bazar-stat">
                            <span class="bazar-stat-number">${visitors}</span>
                            <span class="bazar-stat-label">Visitantes</span>
                        </div>
                    </div>
                    
                    <div class="charts-section">
                        <div class="chart-container">
                            <h4>Visualizações dos Últimos 7 Dias</h4>
                            <div class="chart">
                                <div class="chart-bars">
                                    ${generateRandomBars()}
                                </div>
                                <div class="chart-labels">
                                    <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="chart-container">
                            <h4>Avaliações Recentes</h4>
                            <div class="reviews-summary">
                                ${bazarReviews.sort((a, b) => b.id - a.id).slice(0, 3).map(review => `
                                    <div style="padding: 10px; border-bottom: 1px solid #f1f3f4;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                            <strong>${review.user}</strong>
                                            <span style="color: #ffd700;">${'★'.repeat(review.rating)}</span>
                                        </div>
                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #666;">${review.text}</p>
                                        <small style="color: #999; font-size: 12px;">${review.date}</small>
                                    </div>
                                `).join('') || '<p style="text-align: center; color: #666; padding: 20px;">Nenhuma avaliação ainda</p>'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="reports-section">
                        <h4>Relatórios</h4>
                        <div class="reports-grid">
                            <button class="report-btn" onclick="generateBazarReport('${bazar.nome}', 'views')">
                                <i class="fas fa-chart-line"></i>
                                <span>Relatório de Visualizações</span>
                            </button>

                            <button class="report-btn" onclick="generateBazarReport('${bazar.nome}', 'reviews')">
                                <i class="fas fa-star"></i>
                                <span>Relatório de Avaliações</span>
                            </button>
                            <button class="report-btn" onclick="exportBazarData('${bazar.nome}')">
                                <i class="fas fa-download"></i>
                                <span>Exportar Dados</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateRandomBars() {
    let bars = '';
    for (let i = 0; i < 7; i++) {
        const height = Math.floor(Math.random() * 80) + 20;
        const value = Math.floor(Math.random() * 50) + 10;
        bars += `<div class="bar" style="height: ${height}%" data-value="${value}"><span>${value}</span></div>`;
    }
    return bars;
}

function toggleBazarAnalytics(bazarId) {
    const content = document.getElementById(`analytics-${bazarId}`);
    const button = content.previousElementSibling.querySelector('.bazar-analytics-toggle');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        button.textContent = 'Ver Análise';
    } else {
        content.classList.add('active');
        button.textContent = 'Ocultar Análise';
    }
}

function generateBazarReport(bazarName, type) {
    const reportTypes = {
        'views': 'Visualizações',
        'reviews': 'Avaliações'
    };
    
    showMessage(`Relatório de ${reportTypes[type]} para "${bazarName}" gerado com sucesso!`, 'success');
}

function exportBazarData(bazarName) {
    const data = {
        bazar: bazarName,
        views: Math.floor(Math.random() * 500) + 100,
        reviews: JSON.parse(localStorage.getItem('bazar_reviews') || '[]').filter(r => r.bazar === bazarName),
        favorites: Math.floor(Math.random() * 50) + 10,
        visitors: Math.floor(Math.random() * 100) + 20,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bazarName.replace(/\s+/g, '_')}_analytics.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showMessage(`Dados de "${bazarName}" exportados com sucesso!`, 'success');
}

function showMessage(text, type) {
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-family: 'Poppins', sans-serif;
    `;
    msg.textContent = text;
    document.body.appendChild(msg);
    
    setTimeout(() => msg.remove(), 3000);
}

// Atualizar analytics quando nova avaliação é feita
function updateBazarAnalytics(bazarName) {
    // Recarregar analytics se estiver na página de perfil
    if (document.getElementById('bazarAnalytics')) {
        setTimeout(() => {
            loadBazarAnalytics();
        }, 500); // Delay para garantir que a avaliação foi salva
    }
}

// Listener para evento de nova avaliação
window.addEventListener('reviewAdded', (event) => {
    console.log('Review added event received:', event.detail);
    if (document.getElementById('bazarAnalytics')) {
        setTimeout(() => {
            loadBazarAnalytics();
        }, 500);
    }
});

// Exportar funções globais
window.toggleBazarAnalytics = toggleBazarAnalytics;
window.generateBazarReport = generateBazarReport;
window.exportBazarData = exportBazarData;
window.updateBazarAnalytics = updateBazarAnalytics;