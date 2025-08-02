# ⚡ Documentação dos Arquivos JavaScript

## Estrutura dos Scripts

### 📁 js/

#### 1. **main-script.js**
- **Função**: Script principal da página inicial (index.html)
- **Funcionalidades**:
  - Controle da sidebar (abrir/fechar)
  - Carrossel de bazares em destaque
  - Sistema de busca de bazares
  - Gerenciamento de favoritos
  - Carregamento de bazares salvos
  - Efeitos de hover e animações
  - Responsividade do carrossel

**Principais Funções**:
```javascript
// Controle da sidebar
menuToggle.addEventListener('click', () => {...})

// Carrossel automático
setInterval(nextSlide, 5000)

// Sistema de favoritos
function setupFavoriteButtons() {...}

// Carregamento de bazares
function loadSavedBazares() {...}
```

#### 2. **login-script.js**
- **Função**: Gerencia autenticação de usuários
- **Funcionalidades**:
  - Alternância entre formulários (login/cadastro)
  - Validação de email e senha
  - Armazenamento de dados do usuário
  - Verificação de login existente
  - Mensagens de erro

**Principais Funções**:
```javascript
// Validação de email
function isValidEmail(email) {...}

// Cadastro de usuário
registerFormElement.addEventListener('submit', ...)

// Login de usuário
loginFormElement.addEventListener('submit', ...)
```

#### 3. **script.js**
- **Função**: Script para página de adicionar bazar
- **Funcionalidades**:
  - Upload e preview de imagens
  - Máscaras para CEP e telefone
  - Busca automática de endereço via CEP
  - Validação de formulário
  - Salvamento no localStorage

**Principais Funções**:
```javascript
// Preview de imagem
document.getElementById('imageInput').addEventListener('change', ...)

// Máscara de CEP
document.getElementById('cep').addEventListener('input', ...)

// Busca de endereço
fetch(`https://viacep.com.br/ws/${cep}/json/`)
```

#### 4. **bazar-detalhes-script.js**
- **Função**: Script para página de detalhes do bazar
- **Funcionalidades**:
  - Carregamento de dados do bazar
  - Exibição de informações detalhadas
  - Sistema de favoritos
  - Navegação entre bazares

#### 5. **editar-bazar-script.js**
- **Função**: Script para edição de bazares
- **Funcionalidades**:
  - Carregamento de dados existentes
  - Atualização de informações
  - Validação de alterações
  - Salvamento das modificações

#### 6. **favoritos-script.js**
- **Função**: Gerencia página de favoritos
- **Funcionalidades**:
  - Carregamento de bazares favoritos
  - Remoção de favoritos
  - Navegação para detalhes
  - Estado vazio (sem favoritos)

#### 7. **perfil-script.js**
- **Função**: Gerencia perfil do usuário
- **Funcionalidades**:
  - Exibição de dados do usuário
  - Edição de informações pessoais
  - Configurações da conta
  - Logout do sistema

## 🔧 Funcionalidades Globais

### LocalStorage
Todos os scripts utilizam localStorage para persistir dados:
```javascript
// Dados do usuário
localStorage.setItem('fashionspace_user', JSON.stringify(userData))

// Status de login
localStorage.setItem('fashionspace_logged_in', 'true')

// Bazares criados
localStorage.setItem('fashionspace_bazares', JSON.stringify(bazares))

// Favoritos
localStorage.setItem('favorites', JSON.stringify(favorites))

// Modo escuro
localStorage.setItem('darkMode', 'true')
```

### Validações Comuns
- **Email**: Regex para formato válido
- **CEP**: Formato brasileiro (00000-000)
- **Telefone**: Formato brasileiro com DDD
- **Campos obrigatórios**: Verificação de preenchimento

### APIs Utilizadas
- **ViaCEP**: Busca automática de endereço por CEP
- **Unsplash**: Imagens de exemplo para bazares

### Eventos Principais
- **DOMContentLoaded**: Inicialização dos scripts
- **click**: Interações do usuário
- **input**: Validação em tempo real
- **submit**: Envio de formulários
- **storage**: Sincronização entre abas

## 🎯 Padrões de Código

### Nomenclatura
- **Variáveis**: camelCase (ex: `currentSlide`)
- **Funções**: camelCase (ex: `loadUserData`)
- **Constantes**: UPPER_CASE (ex: `API_URL`)

### Estrutura
- Declaração de variáveis no topo
- Event listeners organizados
- Funções auxiliares no final
- Comentários explicativos

### Tratamento de Erros
```javascript
try {
    // Código principal
} catch (error) {
    console.error('Erro:', error);
    showErrorMessage('Algo deu errado');
}
```

## 📱 Responsividade JavaScript
Scripts incluem verificações para diferentes tamanhos de tela:
```javascript
function handleResize() {
    if (window.innerWidth <= 768) {
        // Ajustes para mobile
    }
}
```