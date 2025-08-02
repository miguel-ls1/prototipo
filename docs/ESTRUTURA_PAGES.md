# 📄 Documentação das Páginas HTML

## Estrutura das Páginas

### 📁 pages/

#### 1. **login.html**
- **Função**: Página de autenticação (login e cadastro)
- **Componentes**:
  - Logo e branding do FashionSpace
  - Formulário de cadastro (nome, email, senha)
  - Formulário de login (email, senha)
  - Alternância entre formulários
  - Validação de campos
  - Mensagens de erro
- **Scripts**: `js/login-script.js`
- **Estilos**: `css/login-style.css`

**Funcionalidades**:
- Cadastro de novos usuários
- Login com credenciais existentes
- Validação de email e senha
- Redirecionamento automático após login

#### 2. **adicionar-bazar.html**
- **Função**: Formulário para criar novos bazares
- **Componentes**:
  - Sidebar de navegação
  - Header com título
  - Upload de imagem do bazar
  - Campos de informações básicas (nome, descrição)
  - Campos de endereço (CEP, rua, número, bairro, cidade)
  - Campos adicionais (telefone, horário)
  - Seleção de categoria
  - Botões de ação (cancelar, salvar)
- **Scripts**: `js/script.js`
- **Estilos**: `css/style3.css`

**Funcionalidades**:
- Upload e preview de imagens
- Busca automática de endereço por CEP
- Máscaras para CEP e telefone
- Validação de campos obrigatórios
- Salvamento no localStorage

#### 3. **bazar-detalhes.html**
- **Função**: Exibe informações detalhadas de um bazar específico
- **Componentes**:
  - Sidebar de navegação
  - Header com navegação
  - Imagem principal do bazar
  - Informações detalhadas (nome, descrição, endereço)
  - Informações de contato (telefone, horário)
  - Botão de favoritar
  - Botões de ação (editar, voltar)
- **Scripts**: `js/bazar-detalhes-script.js`
- **Estilos**: `css/bazar-detalhes-style.css`

**Funcionalidades**:
- Carregamento dinâmico de dados do bazar
- Sistema de favoritos
- Navegação para edição
- Responsividade completa

#### 4. **editar-bazar.html**
- **Função**: Permite editar informações de bazares existentes
- **Componentes**:
  - Formulário pré-preenchido com dados atuais
  - Todos os campos editáveis
  - Preview da imagem atual
  - Opção de alterar imagem
  - Botões de salvar/cancelar
- **Scripts**: `js/editar-bazar-script.js`
- **Estilos**: `css/editar-bazar-style.css`

**Funcionalidades**:
- Carregamento de dados existentes
- Edição de todos os campos
- Validação de alterações
- Atualização no localStorage

#### 5. **favoritos.html**
- **Função**: Lista todos os bazares marcados como favoritos
- **Componentes**:
  - Sidebar de navegação
  - Header com título
  - Grid de bazares favoritos
  - Cards com informações resumidas
  - Botões de ação em cada card
  - Estado vazio (quando não há favoritos)
- **Scripts**: `js/favoritos-script.js`
- **Estilos**: `css/favoritos-style.css`

**Funcionalidades**:
- Carregamento de favoritos do localStorage
- Remoção de favoritos
- Navegação para detalhes
- Interface responsiva

#### 6. **perfil.html**
- **Função**: Página de perfil e configurações do usuário
- **Componentes**:
  - Sidebar de navegação
  - Informações do usuário
  - Foto de perfil
  - Dados pessoais (nome, email)
  - Configurações da conta
  - Estatísticas (bazares criados, favoritos)
  - Botão de logout
- **Scripts**: `js/perfil-script.js`
- **Estilos**: `css/perfil-style.css`

**Funcionalidades**:
- Exibição de dados do usuário
- Edição de informações pessoais
- Configurações de preferências
- Logout do sistema

## 🏠 Página Principal (index.html)

### Localização: Raiz do projeto
- **Função**: Página inicial da aplicação
- **Componentes**:
  - Sidebar de navegação completa
  - Header com busca e ações
  - Seção hero com call-to-action
  - Carrossel de bazares em destaque
  - Seção de categorias
  - Grid principal de bazares
  - Seções de bazares populares e novos
  - Seção de contato
  - Footer
- **Scripts**: `js/main-script.js`
- **Estilos**: `css/style-main.css`

**Funcionalidades**:
- Dashboard principal da aplicação
- Navegação completa
- Sistema de busca
- Carrosséis interativos
- Filtros por categoria
- Sistema de favoritos integrado

## 🔗 Navegação Entre Páginas

### Fluxo Principal:
1. **login.html** → **index.html** (após autenticação)
2. **index.html** → **pages/adicionar-bazar.html** (criar bazar)
3. **index.html** → **pages/bazar-detalhes.html** (ver detalhes)
4. **pages/bazar-detalhes.html** → **pages/editar-bazar.html** (editar)
5. **index.html** → **pages/favoritos.html** (ver favoritos)
6. **index.html** → **pages/perfil.html** (perfil do usuário)

### Links de Navegação:
- Sidebar presente em todas as páginas (exceto login)
- Botões "Voltar" nas páginas internas
- Links contextuais entre páginas relacionadas

## 📱 Responsividade

Todas as páginas incluem:
- Meta tag viewport para mobile
- CSS responsivo com media queries
- JavaScript adaptativo para diferentes telas
- Sidebar colapsável em dispositivos móveis

## 🔒 Controle de Acesso

- **Página pública**: `pages/login.html`
- **Páginas protegidas**: Todas as outras (requerem login)
- **Verificação**: JavaScript verifica localStorage para status de login
- **Redirecionamento**: Usuários não logados são redirecionados para login

## 🎨 Consistência Visual

Todas as páginas mantêm:
- Mesma estrutura de sidebar
- Header padronizado
- Paleta de cores consistente
- Tipografia uniforme (Poppins)
- Ícones do Font Awesome
- Animações e transições suaves