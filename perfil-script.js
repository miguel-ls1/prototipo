// Avatar upload functionality
document.getElementById('avatarEdit').addEventListener('click', () => {
    document.getElementById('avatarInput').click();
});

document.getElementById('avatarInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarImg').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Edit modal functionality
const editBtn = document.getElementById('editBtn');
const editModal = document.getElementById('editModal');
const closeModal = document.getElementById('closeModal');
const cancelEdit = document.getElementById('cancelEdit');

editBtn.addEventListener('click', () => {
    editModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    editModal.style.display = 'none';
});

cancelEdit.addEventListener('click', () => {
    editModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        editModal.style.display = 'none';
    }
});

// Edit form submission
document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('editFullName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const location = document.getElementById('editLocation').value;
    
    // Update profile display
    document.getElementById('fullName').textContent = fullName;
    document.getElementById('email').textContent = email;
    document.getElementById('userEmail').textContent = email;
    document.getElementById('phone').textContent = phone;
    document.getElementById('location').textContent = location;
    
    // Update header name
    const firstName = fullName.split(' ')[0];
    document.getElementById('userName').textContent = firstName;
    
    // Show success message
    showMessage('Perfil atualizado com sucesso!', 'success');
    
    // Close modal
    editModal.style.display = 'none';
});





// Show message function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${text}
    `;
    
    // Add message styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
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
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Phone mask
document.getElementById('editPhone').addEventListener('input', function(e) {
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

// Carregar dados do usuário
function loadUserData() {
    const userData = localStorage.getItem('fashionspace_user');
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById('userName').textContent = user.name.split(' ')[0];
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('fullName').textContent = user.name;
        document.getElementById('email').textContent = user.email;
        document.getElementById('editFullName').value = user.name;
        document.getElementById('editEmail').value = user.email;
    }
    loadUserBazares();
}

// Carregar bazares do usuário
function loadUserBazares() {
    const bazares = JSON.parse(localStorage.getItem('fashionspace_bazares')) || [];
    const bazaresList = document.querySelector('.bazares-list');
    const statNumber = document.querySelector('.stat-number');
    
    // Atualizar contador
    statNumber.textContent = bazares.length;
    
    // Limpar lista atual
    bazaresList.innerHTML = '';
    
    if (bazares.length === 0) {
        bazaresList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Nenhum bazar criado ainda.</p>';
        return;
    }
    
    bazares.forEach(bazar => {
        const bazarItem = document.createElement('div');
        bazarItem.className = 'bazar-item';
        bazarItem.innerHTML = `
            <img src="${bazar.imagem || 'assets/OIP.webp'}" alt="${bazar.nome}">
            <div class="bazar-info">
                <h4>${bazar.nome}</h4>
                <p>${bazar.descricao}</p>
                <span class="status active">Ativo</span>
            </div>
            <div class="bazar-actions">
                <button class="action-btn delete" onclick="deleteBazar(${bazar.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        bazaresList.appendChild(bazarItem);
    });
}

// Excluir bazar
function deleteBazar(bazarId) {
    if (confirm('Tem certeza que deseja excluir este bazar?')) {
        let bazares = JSON.parse(localStorage.getItem('fashionspace_bazares')) || [];
        bazares = bazares.filter(bazar => bazar.id !== bazarId);
        localStorage.setItem('fashionspace_bazares', JSON.stringify(bazares));
        
        showMessage('Bazar excluído com sucesso!', 'success');
        loadUserBazares();
    }
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('fashionspace_logged_in');
        window.location.href = 'login.html';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se está logado
    const isLoggedIn = localStorage.getItem('fashionspace_logged_in');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // Carregar dados do usuário
    loadUserData();
    
    // Add hover effects to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add smooth transitions to bazar items
    document.querySelectorAll('.bazar-item').forEach(item => {
        item.style.transition = 'all 0.3s ease';
    });
});