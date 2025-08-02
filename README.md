# FashionSpace - Plataforma de Bazares Online

## 📋 Descrição do Projeto
FashionSpace é uma plataforma web que conecta usuários aos melhores bazares e experiências de moda únicas. O sistema permite descobrir peças exclusivas, criar bazares personalizados e gerenciar favoritos.

## 🏗️ Estrutura do Projeto

```
prototipo/
├── assets/                 # Imagens e recursos visuais
│   ├── Image.png          # Logo principal do FashionSpace
│   ├── OIP.webp          # Imagem padrão para bazares
│   └── depositphotos_*.jpg # Imagens adicionais
├── css/                   # Arquivos de estilo
├── js/                    # Scripts JavaScript
├── pages/                 # Páginas HTML (exceto index)
├── docs/                  # Documentação do projeto
├── index.html            # Página principal
└── README.md             # Este arquivo
```

## 🚀 Funcionalidades Principais

### 1. Sistema de Autenticação
- **Login**: Acesso seguro com email e senha
- **Cadastro**: Registro de novos usuários
- **Validação**: Verificação de dados e segurança

### 2. Gerenciamento de Bazares
- **Visualização**: Lista completa de bazares disponíveis
- **Criação**: Adicionar novos bazares com informações detalhadas
- **Edição**: Modificar informações de bazares existentes
- **Categorização**: Organização por tipos (luxo, vintage, outlet, etc.)

### 3. Sistema de Favoritos
- **Adicionar/Remover**: Gerenciar bazares favoritos
- **Persistência**: Dados salvos localmente
- **Notificações**: Feedback visual das ações

### 4. Interface Responsiva
- **Design Moderno**: Interface limpa e intuitiva
- **Modo Escuro**: Alternância entre temas claro/escuro
- **Mobile-First**: Otimizado para dispositivos móveis

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas
- **CSS3**: Estilização e layout responsivo
- **JavaScript**: Funcionalidades interativas
- **LocalStorage**: Armazenamento local de dados
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia (Poppins)

## 📱 Páginas do Sistema

1. **index.html** - Página principal com lista de bazares
2. **pages/login.html** - Autenticação de usuários
3. **pages/adicionar-bazar.html** - Formulário para criar bazares
4. **pages/bazar-detalhes.html** - Detalhes específicos de cada bazar
5. **pages/editar-bazar.html** - Edição de bazares existentes
6. **pages/favoritos.html** - Lista de bazares favoritos
7. **pages/perfil.html** - Perfil do usuário

## 🎨 Recursos de Design

- **Cores Principais**: 
  - Primária: #6c5ce7 (roxo)
  - Secundária: #a29bfe (roxo claro)
  - Destaque: #fd79a8 (rosa)
- **Tipografia**: Poppins (Google Fonts)
- **Ícones**: Font Awesome 6.0
- **Layout**: Grid e Flexbox para responsividade

## 💾 Armazenamento de Dados

O sistema utiliza LocalStorage para persistir:
- Dados do usuário logado
- Lista de bazares criados
- Favoritos do usuário
- Preferências (modo escuro)

## 🔧 Como Executar

1. Abra o arquivo `index.html` em um navegador web
2. Para primeira utilização, acesse a página de login
3. Crie uma conta ou faça login
4. Explore os bazares disponíveis
5. Adicione seus próprios bazares
6. Gerencie seus favoritos

## 📝 Notas Importantes

- O projeto funciona completamente offline
- Dados são salvos localmente no navegador
- Interface otimizada para desktop e mobile
- Suporte a modo escuro/claro
- Validação de formulários em tempo real

## 🔄 Atualizações Futuras

- Integração com APIs externas
- Sistema de avaliações
- Chat entre usuários
- Geolocalização
- Notificações push