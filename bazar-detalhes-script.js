// Verificar se está logado
const isLoggedIn = localStorage.getItem('fashionspace_logged_in');
if (isLoggedIn !== 'true') {
    window.location.href = 'login.html';
}

// Obter ID do bazar da URL
const urlParams = new URLSearchParams(window.location.search);
const bazarId = urlParams.get('id');
const bazarName = urlParams.get('name');

let currentBazar = null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let slideIndex = 1;

// Carregar dados do bazar
document.addEventListener('DOMContentLoaded', () => {
    loadBazarDetails();
    setupFavoriteButton();
    setupCarousel();
});

function loadBazarDetails() {
    if (bazarId) {
        // Bazar criado pelo usuário
        const bazares = JSON.parse(localStorage.getItem('fashionspace_bazares')) || [];
        currentBazar = bazares.find(b => b.id == bazarId);
        
        if (currentBazar) {
            displayBazarDetails(currentBazar);
        } else {
            showError('Bazar não encontrado');
        }
    } else if (bazarName) {
        // Bazar padrão do sistema
        const defaultBazares = {
            'Bazar Sustentável': {
                nome: 'Bazar Sustentável',
                descricao: 'Moda consciente e sustentável com peças selecionadas que respeitam o meio ambiente. Encontre roupas de qualidade com preços justos.',
                endereco: 'Rua das Flores, 123',
                bairro: 'Asa Norte',
                cidade: 'Brasília',
                imagem: 'assets/OIP.webp'
            },
            'Feira de Artesãos': {
                nome: 'Feira de Artesãos',
                descricao: 'Peças artesanais únicas feitas à mão por artesãos locais. Cada peça conta uma história especial.',
                endereco: 'Pelourinho, Centro Histórico',
                bairro: 'Centro',
                cidade: 'Salvador',
                telefone: '(71) 99999-9999',
                imagem: 'assets/OIP.webp'
            },
            'Moda Jovem': {
                nome: 'Moda Jovem',
                descricao: 'Tendências para o público jovem com as últimas novidades da moda. Estilo e atitude em cada peça.',
                endereco: 'Av. Beira Mar, 456',
                bairro: 'Meireles',
                cidade: 'Fortaleza',
                horario: '09:00 - 19:00',
                imagem: 'assets/OIP.webp'
            },
            'Bazar da Moda Vintage': {
                nome: 'Bazar da Moda Vintage',
                descricao: 'Peças únicas e exclusivas dos anos 80 e 90. Encontre roupas vintage autênticas com história e personalidade.',
                endereco: 'Rua Augusta, 789',
                bairro: 'Vila Madalena',
                cidade: 'São Paulo',
                telefone: '(11) 98888-7777',
                horario: '10:00 - 20:00',
                imagem: 'assets/OIP.webp'
            },
            'Outlet Independente': {
                nome: 'Outlet Independente',
                descricao: 'Marcas nacionais com até 70% de desconto. Qualidade e preço justo para você renovar o guarda-roupa.',
                endereco: 'Av. Copacabana, 321',
                bairro: 'Copacabana',
                cidade: 'Rio de Janeiro',
                telefone: '(21) 97777-6666',
                imagem: 'assets/OIP.webp'
            },
            'Garimpo Fashion': {
                nome: 'Garimpo Fashion',
                descricao: 'Brechó online com peças selecionadas. Moda sustentável e consciente direto na sua casa.',
                endereco: 'Loja Virtual',
                cidade: 'Online',
                telefone: '(11) 96666-5555',
                horario: '24 horas',
                imagem: 'assets/OIP.webp'
            },
            'Bazar Premium': {
                nome: 'Bazar Premium',
                descricao: 'Roupas de grife com preços acessíveis. Luxo e sofisticação ao alcance de todos.',
                endereco: 'Rua XV de Novembro, 654',
                bairro: 'Centro',
                cidade: 'Curitiba',
                telefone: '(41) 95555-4444',
                horario: '09:00 - 18:00',
                imagem: 'assets/OIP.webp'
            }
        };
        
        currentBazar = defaultBazares[bazarName];
        if (currentBazar) {
            displayBazarDetails(currentBazar);
        } else {
            showError('Bazar não encontrado');
        }
    } else {
        showError('Bazar não especificado');
    }
}

function displayBazarDetails(bazar) {
    document.getElementById('bazarTitle').textContent = bazar.nome;
    
    // Atualizar primeira imagem do carrossel se houver imagem personalizada
    if (bazar.imagem) {
        const firstSlide = document.querySelector('.carousel-slide img');
        firstSlide.src = bazar.imagem;
    }
    
    document.getElementById('bazarDescription').textContent = bazar.descricao;
    
    // Endereço
    let address = bazar.endereco;
    if (bazar.numero) address += `, ${bazar.numero}`;
    if (bazar.bairro) address += ` - ${bazar.bairro}`;
    if (bazar.cidade) address += `, ${bazar.cidade}`;
    document.getElementById('bazarAddress').textContent = address;
    
    // Telefone
    if (bazar.telefone) {
        document.getElementById('phoneInfo').style.display = 'flex';
        document.getElementById('bazarPhone').textContent = bazar.telefone;
    }
    
    // Horário
    if (bazar.horario) {
        document.getElementById('hoursInfo').style.display = 'flex';
        document.getElementById('bazarHours').textContent = bazar.horario;
    }
}

function setupFavoriteButton() {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const bazarNameForFavorite = currentBazar?.nome;
    
    if (favorites.includes(bazarNameForFavorite)) {
        favoriteBtn.classList.add('favorited');
        favoriteBtn.querySelector('i').className = 'fas fa-heart';
    }
    
    favoriteBtn.addEventListener('click', () => {
        const isFavorited = favoriteBtn.classList.contains('favorited');
        const icon = favoriteBtn.querySelector('i');
        
        if (isFavorited) {
            favoriteBtn.classList.remove('favorited');
            icon.className = 'far fa-heart';
            favorites = favorites.filter(fav => fav !== bazarNameForFavorite);
            showMessage('Removido dos favoritos!', 'removed');
        } else {
            favoriteBtn.classList.add('favorited');
            icon.className = 'fas fa-heart';
            favorites.push(bazarNameForFavorite);
            showMessage('Adicionado aos favoritos!', 'success');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
}

function shareBazar() {
    const shareText = `Confira este bazar incrível: ${currentBazar.nome} - ${window.location.href}`;
    
    if (navigator.share && navigator.canShare) {
        navigator.share({
            title: currentBazar.nome,
            text: `Confira este bazar incrível: ${currentBazar.nome}`,
            url: window.location.href
        }).catch(() => {
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showMessage('Link copiado para a área de transferência!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showMessage('Link copiado para a área de transferência!', 'success');
    } catch (err) {
        showMessage('Erro ao copiar link', 'error');
    }
    document.body.removeChild(textArea);
}

function goBack() {
    window.location.href = 'index.html';
}

// Funções do carrossel
function setupCarousel() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        changeSlide(-1);
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        changeSlide(1);
    });
    
    // Auto-play
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[slideIndex - 1].classList.remove('active');
    dots[slideIndex - 1].classList.remove('active');
    
    slideIndex += direction;
    
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex < 1) slideIndex = slides.length;
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

function currentSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[slideIndex - 1].classList.remove('active');
    dots[slideIndex - 1].classList.remove('active');
    
    slideIndex = n;
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

function getDirections() {
    const address = encodeURIComponent(`${currentBazar.endereco}, ${currentBazar.cidade}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, '_blank');
}

function showError(message) {
    document.getElementById('bazarTitle').textContent = 'Erro';
    document.getElementById('bazarDescription').textContent = message;
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
        case 'error':
            bgColor = '#f44336';
            icon = 'fa-exclamation-circle';
            break;
        default:
            bgColor = '#2196F3';
            icon = 'fa-info-circle';
    }
    
    message.innerHTML = `<i class="fas ${icon}"></i> ${text}`;
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

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);