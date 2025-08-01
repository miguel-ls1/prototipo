// Status toggle functionality
const statusToggle = document.getElementById('statusToggle');
const statusLabel = document.getElementById('statusLabel');

statusToggle.addEventListener('change', function() {
    if (this.checked) {
        statusLabel.textContent = 'Ativo';
        statusLabel.style.color = '#4CAF50';
    } else {
        statusLabel.textContent = 'Inativo';
        statusLabel.style.color = '#f39c12';
    }
});

// Image upload functionality
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

// CEP mask
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }
});

// Phone mask
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

// CEP lookup
document.getElementById('cep').addEventListener('blur', function(e) {
    const cep = e.target.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro || document.getElementById('endereco').value;
                    document.getElementById('bairro').value = data.bairro || document.getElementById('bairro').value;
                    document.getElementById('cidade').value = data.localidade || document.getElementById('cidade').value;
                }
            })
            .catch(error => {
                console.log('Erro ao buscar CEP:', error);
            });
    }
});

// Form submission
document.getElementById('editBazarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['nome', 'cep', 'endereco', 'bairro', 'cidade', 'descricao'];
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
    
    // Simulate saving
    const saveBtn = document.querySelector('.save-btn');
    const originalText = saveBtn.innerHTML;
    
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    saveBtn.disabled = true;
    
    setTimeout(() => {
        showMessage('Bazar atualizado com sucesso!', 'success');
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'perfil.html';
        }, 2000);
    }, 1500);
});

// Delete bazar function
function deletarBazar() {
    if (confirm('Tem certeza que deseja excluir este bazar? Esta ação não pode ser desfeita.')) {
        const deleteBtn = document.querySelector('.delete-btn');
        const originalText = deleteBtn.innerHTML;
        
        deleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Excluindo...';
        deleteBtn.disabled = true;
        
        setTimeout(() => {
            showMessage('Bazar excluído com sucesso!', 'success');
            
            setTimeout(() => {
                window.location.href = 'perfil.html';
            }, 1500);
        }, 1000);
    }
}

// Show message function
function showMessage(text, type) {
    // Remove existing messages
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
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Click on image preview to upload
document.getElementById('imagePreview').addEventListener('click', function() {
    document.getElementById('imageInput').click();
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial status
    statusLabel.style.color = statusToggle.checked ? '#4CAF50' : '#f39c12';
    
    // Add hover effects to stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});