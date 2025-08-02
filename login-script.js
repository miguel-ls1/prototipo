// Elementos do DOM
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const showLoginBtn = document.getElementById('showLogin');
const showRegisterBtn = document.getElementById('showRegister');
const registerFormElement = document.getElementById('registerFormElement');
const loginFormElement = document.getElementById('loginFormElement');
const errorMessage = document.getElementById('errorMessage');

// Alternar entre formulários
showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    clearError();
});

showRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    clearError();
});

// Função para mostrar erro
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

// Função para limpar erro
function clearError() {
    errorMessage.classList.remove('show');
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Cadastro
registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    
    // Validações
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
    
    // Salvar dados no localStorage
    const userData = {
        name: name,
        email: email,
        password: password,
        registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('fashionspace_user', JSON.stringify(userData));
    localStorage.setItem('fashionspace_logged_in', 'true');
    
    // Redirecionar para página principal
    window.location.href = 'index.html';
});

// Login
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validações
    if (!email || !password) {
        showError('Email e senha são obrigatórios');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Email inválido');
        return;
    }
    
    // Verificar se usuário existe
    const savedUser = localStorage.getItem('fashionspace_user');
    
    if (!savedUser) {
        showError('Usuário não encontrado. Cadastre-se primeiro.');
        return;
    }
    
    const userData = JSON.parse(savedUser);
    
    // Verificar credenciais
    if (userData.email !== email || userData.password !== password) {
        showError('Email ou senha incorretos');
        return;
    }
    
    // Login bem-sucedido
    localStorage.setItem('fashionspace_logged_in', 'true');
    window.location.href = 'index.html';
});

// Verificar se já está logado ao carregar a página
window.addEventListener('load', () => {
    const isLoggedIn = localStorage.getItem('fashionspace_logged_in');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }
});