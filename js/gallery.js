// Sistema de Galeria Expandida
let galleryImages = [
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800'
];

let currentImageIndex = 0;
let selectedFiles = [];

// Abrir modal de upload
function openUploadModal() {
    document.getElementById('uploadModal').style.display = 'flex';
    setupDragAndDrop();
}

// Fechar modal de upload
function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
    selectedFiles = [];
    document.getElementById('previewArea').innerHTML = '';
}

// Configurar drag and drop
function setupDragAndDrop() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    });
}

// Processar arquivos selecionados
function handleFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
        if (selectedFiles.length < 10) { // Limite de 10 imagens
            selectedFiles.push(file);
            createPreview(file);
        }
    });
}

// Criar preview das imagens
function createPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const previewArea = document.getElementById('previewArea');
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.innerHTML = `
            <img src="${e.target.result}" alt="Preview">
            <button class="remove-preview" onclick="removePreview(this, '${file.name}')">×</button>
        `;
        previewArea.appendChild(previewItem);
    };
    reader.readAsDataURL(file);
}

// Remover preview
function removePreview(button, fileName) {
    selectedFiles = selectedFiles.filter(file => file.name !== fileName);
    button.parentElement.remove();
}

// Upload das imagens
function uploadImages() {
    if (selectedFiles.length === 0) {
        alert('Selecione pelo menos uma imagem!');
        return;
    }
    
    selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            galleryImages.push(e.target.result);
            addImageToGallery(e.target.result);
        };
        reader.readAsDataURL(file);
    });
    
    showMessage('Imagens adicionadas com sucesso!');
    closeUploadModal();
}

// Adicionar imagem à galeria
function addImageToGallery(imageSrc) {
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.onclick = () => openImageModal(imageSrc);
    galleryItem.innerHTML = `
        <img src="${imageSrc}" alt="Galeria">
        <div class="gallery-overlay">
            <i class="fas fa-search-plus"></i>
        </div>
    `;
    galleryGrid.appendChild(galleryItem);
}

// Abrir modal de visualização
function openImageModal(imageSrc) {
    currentImageIndex = galleryImages.indexOf(imageSrc);
    document.getElementById('imageModal').style.display = 'flex';
    updateModalImage();
}

// Fechar modal de visualização
function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Atualizar imagem no modal
function updateModalImage() {
    const modalImage = document.getElementById('modalImage');
    const imageCounter = document.getElementById('imageCounter');
    
    modalImage.src = galleryImages[currentImageIndex];
    imageCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

// Imagem anterior
function prevImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
    updateModalImage();
}

// Próxima imagem
function nextImage() {
    currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
    updateModalImage();
}

// Mostrar mensagem
function showMessage(text) {
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 4000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    msg.textContent = text;
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.remove();
    }, 3000);
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    const imageModal = document.getElementById('imageModal');
    if (imageModal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeImageModal();
    }
    
    const uploadModal = document.getElementById('uploadModal');
    if (uploadModal.style.display === 'flex' && e.key === 'Escape') {
        closeUploadModal();
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar modais ao final da página
    const modals = `
        <!-- Modal Upload -->
        <div class="upload-modal" id="uploadModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Adicionar Fotos</h3>
                    <button class="close-btn" onclick="closeUploadModal()">&times;</button>
                </div>
                <div class="upload-area" id="uploadArea">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Arraste as imagens aqui ou clique para selecionar</p>
                    <input type="file" id="fileInput" multiple accept="image/*" hidden>
                    <button onclick="document.getElementById('fileInput').click()">Selecionar Arquivos</button>
                </div>
                <div class="preview-area" id="previewArea"></div>
                <div class="modal-actions">
                    <button onclick="closeUploadModal()">Cancelar</button>
                    <button onclick="uploadImages()">Adicionar Fotos</button>
                </div>
            </div>
        </div>
        
        <!-- Modal Visualização -->
        <div class="image-modal" id="imageModal">
            <div class="modal-backdrop" onclick="closeImageModal()"></div>
            <div class="image-container">
                <button class="close-btn" onclick="closeImageModal()">&times;</button>
                <button class="nav-btn prev" onclick="prevImage()">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <img id="modalImage" src="" alt="">
                <button class="nav-btn next" onclick="nextImage()">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="image-info">
                    <span id="imageCounter">1 / 6</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modals);
});