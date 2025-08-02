// Sistema Simples de Notificações
let notifications = [];

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    loadNotifications();
    simulateNotifications();
});

// Carregar notificações
function loadNotifications() {
    const saved = localStorage.getItem('fs_notifications');
    if (saved) {
        notifications = JSON.parse(saved);
    } else {
        notifications = [
            {
                id: 1,
                type: 'new-bazar',
                title: 'Novo bazar na sua área!',
                message: 'Vintage Paradise foi adicionado em Salvador',
                time: new Date(Date.now() - 2 * 60 * 60 * 1000),
                read: false
            },
            {
                id: 2,
                type: 'favorite',
                title: 'Bazar favorito atualizado!',
                message: 'Fashion Week tem novas peças',
                time: new Date(Date.now() - 5 * 60 * 60 * 1000),
                read: false
            },
            {
                id: 3,
                type: 'promotion',
                title: 'Promoção especial!',
                message: 'Mega Outlet - 50% OFF até amanhã',
                time: new Date(Date.now() - 24 * 60 * 60 * 1000),
                read: false
            }
        ];
        saveNotifications();
    }
}

// Salvar notificações
function saveNotifications() {
    localStorage.setItem('fs_notifications', JSON.stringify(notifications));
}

// Mostrar toast
function showToast(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-left: 4px solid #5f81a5;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        padding: 15px 20px;
        max-width: 350px;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Poppins', sans-serif;
    `;
    
    const colors = {
        'new-bazar': '#1976d2',
        'favorite': '#e91e63',
        'promotion': '#f57c00',
        'event': '#4caf50'
    };
    
    if (colors[type]) {
        toast.style.borderLeftColor = colors[type];
    }
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: ${colors[type] || '#5f81a5'}; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-${getIcon(type)}" style="color: white; font-size: 10px;"></i>
            </div>
            <strong style="font-size: 14px; color: #333;">${title}</strong>
            <button onclick="this.parentElement.parentElement.remove()" style="margin-left: auto; background: none; border: none; color: #999; cursor: pointer; font-size: 16px;">&times;</button>
        </div>
        <p style="margin: 0; font-size: 13px; color: #666; line-height: 1.4;">${message}</p>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Obter ícone
function getIcon(type) {
    const icons = {
        'new-bazar': 'store',
        'favorite': 'heart',
        'promotion': 'tag',
        'event': 'calendar'
    };
    return icons[type] || 'bell';
}

// Adicionar notificação
function addNotification(type, title, message) {
    const notification = {
        id: Date.now(),
        type,
        title,
        message,
        time: new Date(),
        read: false
    };
    
    notifications.unshift(notification);
    saveNotifications();
    showToast(title, message, type);
    updateNotificationCount();
}

// Simular notificações
function simulateNotifications() {
    const messages = {
        'new-bazar': [
            { title: 'Novo bazar na sua área!', message: 'Estilo Único abriu em São Paulo' },
            { title: 'Novo bazar próximo!', message: 'Moda Jovem chegou em Curitiba' }
        ],
        'favorite': [
            { title: 'Favorito atualizado!', message: 'Fashion Week tem novidades' },
            { title: 'Bazar favorito!', message: 'Outlet Fashion atualizou estoque' }
        ],
        'promotion': [
            { title: 'Promoção relâmpago!', message: '40% OFF em todos os produtos' },
            { title: 'Oferta especial!', message: 'Liquidação até domingo' }
        ],
        'event': [
            { title: 'Evento amanhã!', message: 'Feira de Artesãos no centro' },
            { title: 'Workshop de moda!', message: 'Inscrições abertas' }
        ]
    };
    
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance
            const types = Object.keys(messages);
            const randomType = types[Math.floor(Math.random() * types.length)];
            const randomMessage = messages[randomType][Math.floor(Math.random() * messages[randomType].length)];
            
            addNotification(randomType, randomMessage.title, randomMessage.message);
        }
    }, 45000); // A cada 45 segundos
}

// Mostrar centro de notificações
function showNotificationCenter() {
    const unread = notifications.filter(n => !n.read).length;
    const recent = notifications.slice(0, 5);
    
    let html = '<h3>Notificações Recentes</h3>';
    
    if (recent.length === 0) {
        html += '<p style="color: #666; text-align: center; padding: 20px;">Nenhuma notificação</p>';
    } else {
        recent.forEach(n => {
            html += `
                <div style="padding: 10px; border-bottom: 1px solid #eee; ${!n.read ? 'background: #f0f8ff;' : ''}">
                    <strong style="color: #333; font-size: 14px;">${n.title}</strong><br>
                    <span style="color: #666; font-size: 12px;">${n.message}</span><br>
                    <small style="color: #999;">${formatTime(n.time)}</small>
                </div>
            `;
        });
    }
    
    showToast('Centro de Notificações', html, 'info');
    
    // Marcar como lidas
    notifications.forEach(n => n.read = true);
    saveNotifications();
    updateNotificationCount();
}

// Formatar tempo
function formatTime(time) {
    const now = new Date();
    const diff = now - new Date(time);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 60) return `${minutes}min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
}

// Atualizar contador
function updateNotificationCount() {
    const count = notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notificationCount');
    
    if (badge) {
        if (count > 0) {
            badge.textContent = count > 99 ? '99+' : count;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Exportar funções globais
window.addNotification = addNotification;
window.showNotificationCenter = showNotificationCenter;

// Atualizar contador ao carregar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateNotificationCount, 500);
});