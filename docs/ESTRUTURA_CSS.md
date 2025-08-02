# 🎨 Documentação dos Arquivos CSS

## Estrutura dos Estilos

### 📁 css/

#### 1. **resset.css**
- **Função**: Reset CSS global para normalizar estilos entre navegadores
- **Conteúdo**: Remove margens, paddings padrão e define box-sizing
- **Uso**: Importado em todas as páginas como base

#### 2. **style-main.css**
- **Função**: Estilos principais da página inicial (index.html)
- **Componentes**:
  - Sidebar de navegação
  - Header com busca
  - Carrossel de bazares em destaque
  - Grid de bazares
  - Seção de categorias
  - Footer
- **Responsividade**: Media queries para mobile e tablet

#### 3. **login-style.css**
- **Função**: Estilos específicos da página de login/cadastro
- **Componentes**:
  - Formulários de login e registro
  - Animações de transição
  - Validação visual de campos
  - Design responsivo

#### 4. **style3.css**
- **Função**: Estilos para página de adicionar bazar
- **Componentes**:
  - Formulário de criação de bazar
  - Upload de imagens
  - Validação de campos
  - Botões de ação

#### 5. **bazar-detalhes-style.css**
- **Função**: Estilos para página de detalhes do bazar
- **Componentes**:
  - Layout de detalhes
  - Galeria de imagens
  - Informações do bazar
  - Botões de ação

#### 6. **editar-bazar-style.css**
- **Função**: Estilos para página de edição de bazar
- **Componentes**:
  - Formulário de edição
  - Campos pré-preenchidos
  - Validação visual

#### 7. **favoritos-style.css**
- **Função**: Estilos para página de favoritos
- **Componentes**:
  - Lista de bazares favoritos
  - Cards de bazar
  - Estados vazios

#### 8. **perfil-style.css**
- **Função**: Estilos para página de perfil do usuário
- **Componentes**:
  - Informações do usuário
  - Configurações
  - Histórico de atividades

## 🎨 Padrões de Design

### Cores Principais
```css
:root {
  --primary-color: #6c5ce7;
  --secondary-color: #a29bfe;
  --accent-color: #fd79a8;
  --background-light: #f8f9fa;
  --background-dark: #2d3436;
  --text-light: #2d3436;
  --text-dark: #ddd;
}
```

### Tipografia
- **Fonte Principal**: Poppins (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800
- **Tamanhos**: 12px a 48px (responsivos)

### Componentes Reutilizáveis
- **Botões**: .btn-primary, .btn-secondary
- **Cards**: .bazar-card, .carousel-card
- **Formulários**: .form-group, .input-group
- **Sidebar**: .sidebar, .sidebar-menu

### Responsividade
- **Mobile**: até 768px
- **Tablet**: 769px a 1024px
- **Desktop**: acima de 1024px

## 🌙 Modo Escuro
Todos os arquivos CSS incluem suporte ao modo escuro através da classe `.dark-mode` aplicada ao body.

## 📱 Mobile-First
Os estilos seguem a abordagem mobile-first, com media queries para telas maiores.