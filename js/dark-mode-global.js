// Sistema Global de Dark Mode
function toggleDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    localStorage.setItem('darkMode', !isDark);
    applyDarkMode();
}

function applyDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDark);
    updateDarkModeText();
}

function updateDarkModeText() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    const darkModeText = document.getElementById('darkModeText');
    if (darkModeText) {
        darkModeText.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
    }
}

// Menu toggle global
function setupMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (menuToggle && sidebar && mainContent) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('shifted');
        });
    }
}

// Aplicar ao carregar qualquer página
document.addEventListener('DOMContentLoaded', () => {
    applyDarkMode();
    setupMenuToggle();
});