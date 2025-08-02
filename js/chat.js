// Sistema de Chat
let chatData = [];
let currentChat = null;

// Inicializar chat
document.addEventListener('DOMContentLoaded', () => {
    loadChatData();
    createChatElements();
    updateChatCount();
});

// Carregar dados do chat
function loadChatData() {
    const saved = localStorage.getItem('fs_chat_data');
    if (saved) {
        chatData = JSON.parse(saved);
    } else {
        // Dados iniciais
        chatData = [
            {
                id: 1,
                name: 'Maria Silva',
                avatar: 'MS',
                lastMessage: 'Olá! Tenho interesse no bazar vintage',
                time: '14:30',
                unread: true,
                messages: [
                    { text: 'Olá! Vi seu bazar vintage e fiquei interessada', sent: false, time: '14:25' },
                    { text: 'Vocês têm peças dos anos 80?', sent: false, time: '14:26' },
                    { text: 'Olá Maria! Sim, temos várias peças dos anos 80', sent: true, time: '14:28' },
                    { text: 'Que tipo de peça você procura?', sent: true, time: '14:29' },
                    { text: 'Estou procurando jaquetas e vestidos', sent: false, time: '14:30' }
                ]
            },
            {
                id: 2,
                name: 'João Santos',
                avatar: 'JS',
                lastMessage: 'Obrigado pela informação!',
                time: '12:15',
                unread: true,
                messages: [
                    { text: 'Oi! Qual o horário de funcionamento?', sent: false, time: '12:10' },
                    { text: 'Funcionamos de segunda a sábado, 9h às 18h', sent: true, time: '12:12' },
                    { text: 'Perfeito! Obrigado pela informação!', sent: false, time: '12:15' }
                ]
            },
            {
                id: 3,
                name: 'Ana Costa',
                avatar: 'AC',
                lastMessage: 'Vou passar aí amanhã',
                time: '11:45',
                unread: false,
                messages: [
                    { text: 'Vocês aceitam cartão?', sent: false, time: '11:40' },
                    { text: 'Sim, aceitamos cartão e PIX', sent: true, time: '11:42' },
                    { text: 'Ótimo! Vou passar aí amanhã', sent: false, time: '11:45' }
                ]
            }
        ];
        saveChatData();
    }
}

// Salvar dados do chat
function saveChatData() {
    localStorage.setItem('fs_chat_data', JSON.stringify(chatData));
}

// Criar elementos do chat
function createChatElements() {
    const chatHTML = `
        <!-- Painel de Chat -->
        <div class="chat-panel" id="chatPanel">
            <div class="chat-header">
                <h3>Mensagens</h3>
                <button class="chat-close" onclick="toggleChat()">&times;</button>
            </div>
            <div class="chat-list" id="chatList">
                <!-- Lista de chats será carregada aqui -->
            </div>
        </div>
        
        <!-- Janela de Chat -->
        <div class="chat-window" id="chatWindow">
            <div class="chat-window-header">
                <div class="chat-window-title" id="chatWindowTitle">Chat</div>
                <button class="chat-window-close" onclick="closeChatWindow()">&times;</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <!-- Mensagens serão carregadas aqui -->
            </div>
            <div class="chat-input">
                <input type="text" id="messageInput" placeholder="Digite sua mensagem..." onkeypress="handleEnter(event)">
                <button class="chat-send" onclick="sendMessage()">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    loadChatList();
}

// Alternar painel de chat
function toggleChat() {
    const panel = document.getElementById('chatPanel');
    panel.classList.toggle('active');
    if (panel.classList.contains('active')) {
        loadChatList();
    }
}

// Carregar lista de chats
function loadChatList() {
    const container = document.getElementById('chatList');
    container.innerHTML = '';
    
    chatData.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = `chat-item ${chat.unread ? 'unread' : ''}`;
        chatItem.onclick = () => openChat(chat.id);
        
        chatItem.innerHTML = `
            <div class="chat-avatar">${chat.avatar}</div>
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-preview">${chat.lastMessage}</div>
            </div>
            <div class="chat-time">${chat.time}</div>
        `;
        
        container.appendChild(chatItem);
    });
}

// Abrir chat específico
function openChat(chatId) {
    currentChat = chatData.find(c => c.id === chatId);
    if (!currentChat) return;
    
    // Marcar como lido
    currentChat.unread = false;
    saveChatData();
    updateChatCount();
    loadChatList();
    
    // Abrir janela de chat
    const chatWindow = document.getElementById('chatWindow');
    const chatTitle = document.getElementById('chatWindowTitle');
    
    chatTitle.textContent = currentChat.name;
    chatWindow.classList.add('active');
    
    loadMessages();
    
    // Fechar painel no mobile
    if (window.innerWidth <= 768) {
        toggleChat();
    }
}

// Carregar mensagens
function loadMessages() {
    if (!currentChat) return;
    
    const container = document.getElementById('chatMessages');
    container.innerHTML = '';
    
    currentChat.messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sent ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            ${message.text}
            <div class="message-time">${message.time}</div>
        `;
        container.appendChild(messageDiv);
    });
    
    // Scroll para baixo
    container.scrollTop = container.scrollHeight;
}

// Enviar mensagem
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (!text || !currentChat) return;
    
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    // Adicionar mensagem
    const message = {
        text: text,
        sent: true,
        time: time
    };
    
    currentChat.messages.push(message);
    currentChat.lastMessage = text;
    currentChat.time = time;
    
    saveChatData();
    loadMessages();
    loadChatList();
    
    input.value = '';
    
    // Simular resposta automática
    setTimeout(() => {
        simulateResponse();
    }, 2000);
}

// Simular resposta
function simulateResponse() {
    if (!currentChat) return;
    
    const responses = [
        'Obrigado pela mensagem!',
        'Vou verificar isso para você',
        'Pode passar aqui quando quiser',
        'Temos sim! Venha dar uma olhada',
        'Fico no aguardo da sua visita'
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    const message = {
        text: randomResponse,
        sent: false,
        time: time
    };
    
    currentChat.messages.push(message);
    currentChat.lastMessage = randomResponse;
    currentChat.time = time;
    currentChat.unread = true;
    
    saveChatData();
    loadMessages();
    loadChatList();
    updateChatCount();
}

// Fechar janela de chat
function closeChatWindow() {
    document.getElementById('chatWindow').classList.remove('active');
    currentChat = null;
}

// Handle Enter key
function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Atualizar contador de mensagens
function updateChatCount() {
    const unreadCount = chatData.filter(c => c.unread).length;
    const badge = document.getElementById('chatCount');
    
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Exportar funções globais
window.toggleChat = toggleChat;
window.openChat = openChat;
window.closeChatWindow = closeChatWindow;
window.sendMessage = sendMessage;
window.handleEnter = handleEnter;