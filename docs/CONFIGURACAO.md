# ⚙️ Configuração do Projeto FashionSpace

## 🔧 Configurações Gerais

### Estrutura de Pastas
```
prototipo/
├── assets/          # Recursos visuais (imagens, logos)
├── css/            # Arquivos de estilo CSS
├── js/             # Scripts JavaScript
├── pages/          # Páginas HTML (exceto index)
├── docs/           # Documentação do projeto
├── index.html      # Página principal
└── README.md       # Documentação principal
```

### Arquivos Principais

#### 🏠 Página Principal
- **Arquivo**: `index.html`
- **Função**: Dashboard principal da aplicação
- **CSS**: `css/style-main.css`
- **JS**: `js/main-script.js`

#### 🔐 Sistema de Login
- **Arquivo**: `pages/login.html`
- **Função**: Autenticação de usuários
- **CSS**: `css/login-style.css`
- **JS**: `js/login-script.js`

## 🎨 Configurações de Design

### Paleta de Cores
```css
:root {
  /* Cores Principais */
  --primary-color: #6c5ce7;      /* Roxo principal */
  --secondary-color: #a29bfe;    /* Roxo claro */
  --accent-color: #fd79a8;       /* Rosa destaque */
  
  /* Backgrounds */
  --background-light: #f8f9fa;   /* Fundo claro */
  --background-dark: #2d3436;    /* Fundo escuro */
  
  /* Textos */
  --text-light: #2d3436;         /* Texto modo claro */
  --text-dark: #ddd;             /* Texto modo escuro */
  
  /* Estados */
  --success-color: #00b894;      /* Verde sucesso */
  --error-color: #e17055;        /* Vermelho erro */
  --warning-color: #fdcb6e;      /* Amarelo aviso */
}
```

### Tipografia
- **Fonte**: Poppins (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800
- **CDN**: `https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap`

### Ícones
- **Biblioteca**: Font Awesome 6.0
- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css`

## 💾 Configurações de Armazenamento

### LocalStorage Keys
```javascript
// Dados do usuário
'fashionspace_user'         // Informações do usuário logado
'fashionspace_logged_in'    // Status de login (true/false)

// Dados dos bazares
'fashionspace_bazares'      // Todos os bazares do sistema
'userBazares'              // Bazares criados pelo usuário

// Preferências
'favorites'                // Lista de bazares favoritos
'darkMode'                // Modo escuro (true/false)

// Edição
'editBazarId'             // ID do bazar sendo editado
```

### Estrutura de Dados

#### Usuário
```javascript
{
  name: "Nome do Usuário",
  email: "email@exemplo.com",
  password: "senha_hash",
  registeredAt: "2024-01-01T00:00:00.000Z"
}
```

#### Bazar
```javascript
{
  id: 1234567890,           // Timestamp único
  nome: "Nome do Bazar",
  descricao: "Descrição...",
  categoria: "vintage",
  cep: "00000-000",
  endereco: "Rua Exemplo",
  numero: "123",
  bairro: "Centro",
  cidade: "São Paulo",
  telefone: "(11) 99999-9999",
  horario: "9h às 18h",
  image: "data:image/...",  // Base64 ou URL
  criadoEm: "2024-01-01T00:00:00.000Z"
}
```

## 🌐 APIs Externas

### ViaCEP
- **URL**: `https://viacep.com.br/ws/{cep}/json/`
- **Função**: Busca automática de endereço por CEP
- **Uso**: Formulários de cadastro/edição de bazar

### Unsplash (Imagens de Exemplo)
- **URL**: `https://images.unsplash.com/`
- **Função**: Imagens de exemplo para bazares
- **Parâmetros**: `?w=400&h=250&fit=crop`

## 📱 Configurações Responsivas

### Breakpoints
```css
/* Mobile */
@media (max-width: 768px) { ... }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }
```

### Sidebar Responsiva
- **Desktop**: Sempre visível
- **Mobile/Tablet**: Colapsável com overlay

## 🔒 Configurações de Segurança

### Validações
- **Email**: Regex pattern validation
- **CEP**: Formato brasileiro (00000-000)
- **Telefone**: Formato brasileiro com DDD
- **Campos obrigatórios**: Verificação client-side

### Sanitização
- **XSS Prevention**: Escape de HTML em inputs
- **Data Validation**: Validação de tipos de dados
- **File Upload**: Apenas imagens permitidas

## 🚀 Configurações de Performance

### Otimizações
- **Lazy Loading**: Imagens carregadas sob demanda
- **Minificação**: CSS e JS podem ser minificados
- **Caching**: LocalStorage para dados persistentes
- **Debounce**: Busca com delay para evitar spam

### Carregamento
- **Critical CSS**: Estilos principais inline
- **Async Scripts**: Scripts não-críticos assíncronos
- **Image Optimization**: Compressão automática de uploads

## 🛠️ Configurações de Desenvolvimento

### Estrutura de Arquivos
- **Separação de responsabilidades**: HTML, CSS, JS separados
- **Modularização**: Cada página tem seus próprios arquivos
- **Nomenclatura consistente**: Padrão kebab-case para arquivos

### Debugging
- **Console Logs**: Logs informativos em desenvolvimento
- **Error Handling**: Try-catch em operações críticas
- **Validation Feedback**: Mensagens visuais para usuário

## 📋 Lista de Verificação

### Antes de Usar
- [ ] Verificar se todas as pastas existem
- [ ] Confirmar caminhos dos arquivos CSS/JS
- [ ] Testar funcionalidades principais
- [ ] Verificar responsividade
- [ ] Validar formulários
- [ ] Testar modo escuro

### Manutenção Regular
- [ ] Limpar localStorage antigo
- [ ] Verificar links quebrados
- [ ] Atualizar dependências CDN
- [ ] Testar em diferentes navegadores
- [ ] Validar acessibilidade