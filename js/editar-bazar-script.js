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

// Submissão do formulário de edição
document.getElementById('editBazarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bazarId = localStorage.getItem('editBazarId');
    const userBazares = JSON.parse(localStorage.getItem('userBazares') || '[]');
    const bazarIndex = userBazares.findIndex(b => b.id == bazarId);
    
    if (bazarIndex === -1) {
        alert('Bazar não encontrado!');
        return;
    }
    
    // Coletar dados do formulário
    const formData = {
        id: parseInt(bazarId),
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
        image: null,
        criadoEm: userBazares[bazarIndex].criadoEm,
        editadoEm: new Date().toISOString()
    };
    
    // Capturar imagem se houver
    const imagePreview = document.getElementById('imagePreview');
    const img = imagePreview.querySelector('img');
    if (img) {
        formData.image = img.src;
        formData.imagem = img.src;
    }
    
    // Atualizar bazar
    userBazares[bazarIndex] = formData;
    localStorage.setItem('userBazares', JSON.stringify(userBazares));
    
    // Também atualizar em fashionspace_bazares se existir
    const allBazares = JSON.parse(localStorage.getItem('fashionspace_bazares') || '[]');
    const allBazarIndex = allBazares.findIndex(b => b.id == bazarId);
    if (allBazarIndex !== -1) {
        allBazares[allBazarIndex] = formData;
        localStorage.setItem('fashionspace_bazares', JSON.stringify(allBazares));
    }
    
    showNotification('Bazar atualizado com sucesso!', 'success');
    setTimeout(() => {
        window.location.href = 'perfil.html';
    }, 2000);
});

// Adicionar click no preview da imagem
document.getElementById('imagePreview').addEventListener('click', function() {
    document.getElementById('imageInput').click();
});

// Função de notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Verificar se está logado
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('fashionspace_logged_in');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
});