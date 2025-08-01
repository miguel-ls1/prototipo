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

// Bazar actions
document.querySelectorAll('.action-btn.edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'editar-bazar.html';
    });
});

document.querySelectorAll('.action-btn.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Tem certeza que deseja excluir este bazar?')) {
            const bazarItem = btn.closest('.bazar-item');
            bazarItem.style.opacity = '0';
            bazarItem.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                bazarItem.remove();
                showMessage('Bazar excluído com sucesso!', 'success');
                updateStats();
            }, 300);
        }
    });
});

// Update statistics
function updateStats() {
    const bazarCount = document.querySelectorAll('.bazar-item').length;
    document.querySelector('.stat-number').textContent = bazarCount;
}

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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
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