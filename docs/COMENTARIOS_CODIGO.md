# 💬 Comentários e Explicações do Código

## 📝 Arquivos JavaScript Comentados

### 1. main-script.js (Página Principal)

```javascript
// ===== CONTROLE DA SIDEBAR =====
// Gerencia abertura/fechamento do menu lateral
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');

// Evento para alternar sidebar
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');        // Mostra/esconde sidebar
    mainContent.classList.toggle('shifted');   // Move conteúdo principal
});

// ===== CARROSSEL DE BAZARES =====
// Controla o carrossel de bazares em destaque
let currentSlide = 0;                          // Slide atual
const totalSlides = document.querySelectorAll('.carousel-card').length;

// Função para atualizar posição do carrossel
function updateCarousel() {
    const translateX = -currentSlide * 100;    // Calcula posição
    carousel.style.transform = `translateX(${translateX}%)`;
}

// Próximo slide (com loop infinito)
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// ===== SISTEMA DE FAVORITOS =====
// Gerencia bazares favoritos do usuário
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Função para mostrar notificação de favorito
function showFavoriteMessage(action, bazarName) {
    const message = document.createElement('div');
    message.className = 'favorite-message';
    // Cria elemento visual da notificação
    message.innerHTML = `<i class="fas fa-heart"></i> ${bazarName} ${action} favoritos!`;
    document.body.appendChild(message);
    
    // Remove notificação após 2 segundos
    setTimeout(() => message.remove(), 2000);
}

// ===== CARREGAMENTO DE BAZARES =====
// Carrega bazares salvos pelo usuário
function loadSavedBazares() {
    const bazares = JSON.parse(localStorage.getItem('fashionspace_bazares')) || [];
    const container = document.querySelector('.grid-container');
    
    // Para cada bazar salvo, cria um card
    bazares.forEach(bazar => {
        const bazarCard = document.createElement('div');
        bazarCard.className = 'bazar-card dynamic';
        
        // HTML do card com informações do bazar
        bazarCard.innerHTML = `
            <img src="${bazar.imagem || 'assets/OIP.webp'}" alt="${bazar.nome}">
            <div class="card-body">
                <h4>${bazar.nome}</h4>
                <p>${bazar.descricao}</p>
                <span class="location">${bazar.cidade}</span>
            </div>
        `;
        
        container.appendChild(bazarCard);
    });
}
```

### 2. login-script.js (Sistema de Login)

```javascript
// ===== ELEMENTOS DO DOM =====
// Referências aos elementos da página de login
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// ===== ALTERNÂNCIA ENTRE FORMULÁRIOS =====
// Permite trocar entre tela de login e cadastro
showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');      // Esconde cadastro
    loginForm.classList.remove('hidden');      // Mostra login
    clearError();                              // Limpa mensagens de erro
});

// ===== VALIDAÇÃO DE EMAIL =====
// Verifica se email tem formato válido
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== PROCESSO DE CADASTRO =====
registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Coleta dados do formulário
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    
    // Validações básicas
    if (!name || !email || !password) {
        showError('Todos os campos são obrigatórios');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Email inválido');
        return;
    }
    
    if (password.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres');
        return;
    }
    
    // Salva dados do usuário no localStorage
    const userData = {
        name: name,
        email: email,
        password: password,
        registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('fashionspace_user', JSON.stringify(userData));
    localStorage.setItem('fashionspace_logged_in', 'true');
    
    // Redireciona para página principal
    window.location.href = '../index.html';
});
```

### 3. script.js (Adicionar Bazar)

```javascript
// ===== PREVIEW DE IMAGEM =====
// Mostra preview da imagem selecionada
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];            // Arquivo selecionado
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();        // Leitor de arquivo
        reader.onload = function(e) {
            // Mostra imagem no preview
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            preview.classList.add('has-image');
        };
        reader.readAsDataURL(file);             // Converte para base64
    }
});

// ===== MÁSCARAS DE ENTRADA =====
// Máscara para CEP (formato: 00000-000)
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');  // Remove não-números
    if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona hífen
        e.target.value = value;
    }
});

// Máscara para telefone (formato: (00) 00000-0000)
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');  // Remove não-números
    if (value.length <= 11) {
        if (value.length <= 10) {
            // Telefone fixo: (00) 0000-0000
            value = value.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3');
        } else {
            // Celular: (00) 00000-0000
            value = value.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
        }
        e.target.value = value;
    }
});

// ===== BUSCA DE ENDEREÇO POR CEP =====
// Usa API ViaCEP para preencher endereço automaticamente
document.getElementById('cep').addEventListener('blur', function(e) {
    const cep = e.target.value.replace(/\D/g, '');  // Remove formatação
    
    if (cep.length === 8) {                         // CEP válido tem 8 dígitos
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {                   // Se CEP existe
                    // Preenche campos automaticamente
                    document.getElementById('endereco').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                }
            })
            .catch(error => {
                console.log('Erro ao buscar CEP:', error);
            });
    }
});

// ===== SUBMISSÃO DO FORMULÁRIO =====
document.getElementById('bazarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lista de campos obrigatórios
    const requiredFields = ['nome', 'cep', 'endereco', 'bairro', 'cidade', 'descricao', 'categoria'];
    let isValid = true;
    
    // Valida cada campo obrigatório
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336';    // Borda vermelha para erro
            isValid = false;
        } else {
            input.style.borderColor = '#e1e5e9';    // Borda normal
        }
    });
    
    if (!isValid) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Coleta todos os dados do formulário
    const formData = {
        id: Date.now(),                             // ID único baseado em timestamp
        nome: document.getElementById('nome').value.trim(),
        cep: document.getElementById('cep').value.trim(),
        endereco: document.getElementById('endereco').value.trim(),
        numero: document.getElementById('numero').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        horario: document.getElementById('horario').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        categoria: document.getElementById('categoria').value,
        criadoEm: new Date().toISOString()
    };
    
    // Captura imagem se houver
    const imagePreview = document.getElementById('imagePreview');
    const img = imagePreview.querySelector('img');
    if (img) {
        formData.imagem = img.src;                  // Salva imagem em base64
        formData.image = img.src;
    }
    
    // Simula loading no botão
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    submitBtn.disabled = true;
    
    // Salva no localStorage após delay (simula processamento)
    setTimeout(() => {
        // Obtém bazares existentes
        let bazares = JSON.parse(localStorage.getItem('fashionspace_bazares')) || [];
        
        // Adiciona novo bazar
        bazares.push(formData);
        
        // Salva no localStorage
        localStorage.setItem('fashionspace_bazares', JSON.stringify(bazares));
        localStorage.setItem('userBazares', JSON.stringify(bazares));
        
        showMessage('Bazar adicionado com sucesso!', 'success');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redireciona após 2 segundos
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    }, 1500);
});
```

## 🎨 Arquivos CSS Comentados

### style-main.css (Estilos Principais)

```css
/* ===== VARIÁVEIS CSS ===== */
:root {
  /* Cores principais do sistema */
  --primary-color: #6c5ce7;      /* Roxo principal */
  --secondary-color: #a29bfe;    /* Roxo claro */
  --accent-color: #fd79a8;       /* Rosa destaque */
  
  /* Backgrounds para modo claro/escuro */
  --background-light: #f8f9fa;
  --background-dark: #2d3436;
  
  /* Cores de texto */
  --text-light: #2d3436;
  --text-dark: #ddd;
}

/* ===== RESET E BASE ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;         /* Inclui padding/border no tamanho */
}

body {
  font-family: 'Poppins', sans-serif;  /* Fonte principal */
  background: var(--background-light);  /* Fundo padrão */
  color: var(--text-light);            /* Cor do texto */
  transition: all 0.3s ease;           /* Transição suave para mudanças */
}

/* ===== SIDEBAR ===== */
.sidebar {
  position: fixed;                /* Fixo na tela */
  left: 0;
  top: 0;
  width: 280px;                   /* Largura da sidebar */
  height: 100vh;                  /* Altura total da tela */
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  transform: translateX(-100%);    /* Escondida por padrão (mobile) */
  transition: transform 0.3s ease;
  z-index: 1000;                  /* Acima de outros elementos */
}

.sidebar.active {
  transform: translateX(0);       /* Mostra sidebar quando ativa */
}

/* ===== CARROSSEL ===== */
.carousel {
  display: flex;                  /* Layout flexível */
  transition: transform 0.5s ease; /* Transição suave */
  width: 100%;
}

.carousel-card {
  min-width: 100%;               /* Cada card ocupa largura total */
  padding: 20px;
  background: white;
  border-radius: 15px;           /* Bordas arredondadas */
  box-shadow: 0 10px 30px rgba(0,0,0,0.1); /* Sombra sutil */
}

/* ===== MODO ESCURO ===== */
.dark-mode {
  background: var(--background-dark);  /* Fundo escuro */
  color: var(--text-dark);            /* Texto claro */
}

.dark-mode .bazar-card {
  background: #3d4147;               /* Cards escuros */
  color: white;
}

/* ===== RESPONSIVIDADE ===== */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;                   /* Sidebar ocupa tela toda no mobile */
  }
  
  .main-content {
    margin-left: 0;                /* Remove margem no mobile */
  }
  
  .carousel-card {
    padding: 15px;                 /* Menos padding no mobile */
  }
}

@media (min-width: 1024px) {
  .sidebar {
    transform: translateX(0);      /* Sempre visível no desktop */
  }
  
  .main-content {
    margin-left: 280px;            /* Espaço para sidebar */
  }
}
```

## 🔧 Funções Utilitárias Comentadas

### Gerenciamento de Estado

```javascript
// ===== VERIFICAÇÃO DE LOGIN =====
// Verifica se usuário está logado antes de acessar páginas protegidas
function checkLogin() {
    const isLoggedIn = localStorage.getItem('fashionspace_logged_in');
    if (isLoggedIn !== 'true') {
        window.location.href = 'pages/login.html';  // Redireciona para login
        return false;
    }
    return true;
}

// ===== APLICAÇÃO DE MODO ESCURO =====
// Aplica tema escuro/claro baseado na preferência salva
function applyDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDark);
    
    // Atualiza texto do botão
    const darkModeText = document.getElementById('darkModeText');
    if (darkModeText) {
        darkModeText.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
    }
}

// ===== NOTIFICAÇÕES =====
// Mostra mensagens de feedback para o usuário
function showMessage(text, type) {
    // Remove mensagens existentes
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Cria nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${text}
    `;
    
    // Adiciona à página
    const form = document.querySelector('.bazar-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remove após 5 segundos
    setTimeout(() => messageDiv.remove(), 5000);
}
```

## 📱 Responsividade Comentada

```css
/* ===== ESTRATÉGIA MOBILE-FIRST ===== */
/* Estilos base para mobile (padrão) */
.container {
  padding: 15px;                 /* Padding menor no mobile */
  max-width: 100%;              /* Largura total */
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr;   /* 1 coluna no mobile */
  gap: 20px;
}

/* ===== TABLET ===== */
@media (min-width: 768px) {
  .container {
    padding: 30px;              /* Mais padding no tablet */
    max-width: 1200px;          /* Largura máxima */
    margin: 0 auto;             /* Centralizado */
  }
  
  .grid-container {
    grid-template-columns: repeat(2, 1fr); /* 2 colunas no tablet */
  }
}

/* ===== DESKTOP ===== */
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr); /* 3 colunas no desktop */
  }
  
  .sidebar {
    position: relative;         /* Não mais fixo */
    transform: none;            /* Sempre visível */
  }
}
```

Estes comentários explicam a lógica por trás de cada função e estilo, facilitando a manutenção e compreensão do código.