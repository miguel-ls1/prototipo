// Manipulação da imagem
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            preview.classList.add('has-image');
        };
        reader.readAsDataURL(file);
    }
});

// Máscara para CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }
});

// Máscara para telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
        }
        e.target.value = value;
    }
});

// Buscar endereço pelo CEP
document.getElementById('cep').addEventListener('blur', function(e) {
    const cep = e.target.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
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

// Submissão do formulário
document.getElementById('bazarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica
    const requiredFields = ['nome', 'cep', 'endereco', 'bairro', 'cidade', 'descricao', 'categoria'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336';
            isValid = false;
        } else {
            input.style.borderColor = '#e1e5e9';
        }
    });
    
    if (!isValid) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Coletar dados do formulário
    const formData = {
        id: Date.now(), // ID único baseado no timestamp
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
        imagem: null,
        criadoEm: new Date().toISOString()
    };
    
    // Capturar imagem se houver
    const imagePreview = document.getElementById('imagePreview');
    const img = imagePreview.querySelector('img');
    if (img) {
        formData.imagem = img.src;
        formData.image = img.src;
    }
    
    // Salvar no localStorage
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Obter bazares existentes
        let bazares = JSON.parse(localStorage.getItem('fashionspace_bazares')) || [];
        
        // Adicionar novo bazar
        bazares.push(formData);
        
        // Salvar no localStorage
        localStorage.setItem('fashionspace_bazares', JSON.stringify(bazares));
        localStorage.setItem('userBazares', JSON.stringify(bazares));
        
        showMessage('Bazar adicionado com sucesso!', 'success');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirecionar para página principal após 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 1500);
});

// Função para mostrar mensagens
function showMessage(text, type) {
    // Remove mensagens existentes
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${text}
    `;
    messageDiv.style.display = 'flex';
    
    const form = document.querySelector('.bazar-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Função para voltar à página principal
function voltarPagina() {
    if (confirm('Tem certeza que deseja sair? Os dados não salvos serão perdidos.')) {
        window.location.href = 'index.html';
    }
}

// Adicionar click no preview da imagem
document.getElementById('imagePreview').addEventListener('click', function() {
    document.getElementById('imageInput').click();
});

// Verificar se está logado
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('fashionspace_logged_in');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
});