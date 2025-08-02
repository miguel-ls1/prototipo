// Verificar se está logado
const isLoggedIn = localStorage.getItem('fashionspace_logged_in');
if (isLoggedIn !== 'true') {
    window.location.href = 'login.html';
}

// Obter ID do bazar da URL
const urlParams = new URLSearchParams(window.location.search);
const bazarId = urlParams.get('id');
const bazarName = urlParams.get('name');

let currentBazar = null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let slideIndex = 1;

// Carregar dados do bazar
document.addEventListener('DOMContentLoaded', () => {
    loadBazarDetails();
    setupFavoriteButton();
    setupCarousel();
});

function loadBazarDetails() {
    if (bazarId) {
        // Bazar criado pelo usuário
        const bazares = JSON.parse(localStorage.getItem('fashionspace_bazares')) || [];
        const userBazares = JSON.parse(localStorage.getItem('userBazares')) || [];
        
        // Procurar em ambos os arrays
        currentBazar = bazares.find(b => b.id == bazarId) || userBazares.find(b => b.id == bazarId);
        
        if (currentBazar) {
            displayBazarDetails(currentBazar);
        } else {
            showError('Bazar não encontrado');
        }
    } else if (bazarName) {
        // Bazar padrão do sistema
        const defaultBazares = {
            'Bazar Sustentável': {
                nome: 'Bazar Sustentável',
                descricao: 'Moda consciente e sustentável com peças selecionadas que respeitam o meio ambiente.',
                endereco: 'Rua das Flores, 123',
                bairro: 'Asa Norte',
                cidade: 'Brasília',
                telefone: '(61) 99999-9999',
                imagem: '../assets/OIP.webp'
            },
            'Feira de Artesãos': {
                nome: 'Feira de Artesãos',
                descricao: 'Peças artesanais únicas feitas à mão por artesãos locais.',
                endereco: 'Pelourinho, Centro Histórico',
                bairro: 'Centro',
                cidade: 'Salvador',
                telefone: '(71) 99999-9999',
                imagem: '../assets/OIP.webp'
            },
            'Moda Jovem': {
                nome: 'Moda Jovem',
                descricao: 'Tendências para o público jovem com as últimas novidades da moda.',
                endereco: 'Av. Beira Mar, 456',
                bairro: 'Meireles',
                cidade: 'Fortaleza',
                telefone: '(85) 99999-9999',
                horario: '09:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Vintage Store': {
                nome: 'Vintage Store',
                descricao: 'Peças vintage autênticas dos anos 70-90.',
                endereco: 'Rua da Praia, 789',
                bairro: 'Centro Histórico',
                cidade: 'Porto Alegre',
                telefone: '(51) 99999-9999',
                horario: '10:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Outlet Fashion': {
                nome: 'Outlet Fashion',
                descricao: 'Marcas famosas com até 80% de desconto.',
                endereco: 'Av. Afonso Pena, 1500',
                bairro: 'Centro',
                cidade: 'Belo Horizonte',
                telefone: '(31) 99999-9999',
                horario: '09:00 - 21:00',
                imagem: '../assets/OIP.webp'
            },
            'Brechó Chique': {
                nome: 'Brechó Chique',
                descricao: 'Roupas de grife seminovas com qualidade.',
                endereco: 'Rua do Bom Jesus, 234',
                bairro: 'Recife Antigo',
                cidade: 'Recife',
                telefone: '(81) 99999-9999',
                horario: '10:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Moda Plus Size': {
                nome: 'Moda Plus Size',
                descricao: 'Moda inclusiva e estilosa para todos os tamanhos.',
                endereco: 'Av. T-4, 890',
                bairro: 'Setor Bueno',
                cidade: 'Goiânia',
                telefone: '(62) 99999-9999',
                horario: '09:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Street Fashion': {
                nome: 'Street Fashion',
                descricao: 'Moda urbana e streetwear para estilo despojado.',
                endereco: 'Rua das Rendeiras, 456',
                bairro: 'Lagoa da Conceição',
                cidade: 'Florianópolis',
                telefone: '(48) 99999-9999',
                horario: '09:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Moda Infantil': {
                nome: 'Moda Infantil',
                descricao: 'Roupas fofas e confortáveis para crianças.',
                endereco: 'Av. Eduardo Ribeiro, 678',
                bairro: 'Centro',
                cidade: 'Manaus',
                telefone: '(92) 99999-9999',
                horario: '08:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Moda Executiva': {
                nome: 'Moda Executiva',
                descricao: 'Roupas sociais e profissionais de alta qualidade.',
                endereco: 'Av. Jerônimo Monteiro, 321',
                bairro: 'Centro',
                cidade: 'Vitória',
                telefone: '(27) 99999-9999',
                horario: '08:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Boho Style': {
                nome: 'Boho Style',
                descricao: 'Estilo boêmio e hippie chic com peças únicas.',
                endereco: 'Rua das Trincheiras, 159',
                bairro: 'Centro Histórico',
                cidade: 'João Pessoa',
                telefone: '(83) 99999-9999',
                horario: '10:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Bazar da Moda Vintage': {
                nome: 'Bazar da Moda Vintage',
                descricao: 'Peças únicas e exclusivas dos anos 80 e 90.',
                endereco: 'Rua Augusta, 789',
                bairro: 'Vila Madalena',
                cidade: 'São Paulo',
                telefone: '(11) 99999-9999',
                horario: '10:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Outlet Independente': {
                nome: 'Outlet Independente',
                descricao: 'Marcas nacionais com até 70% de desconto.',
                endereco: 'Av. Copacabana, 321',
                bairro: 'Copacabana',
                cidade: 'Rio de Janeiro',
                telefone: '(21) 99999-9999',
                horario: '09:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Garimpo Fashion': {
                nome: 'Garimpo Fashion',
                descricao: 'Brechó online com peças selecionadas.',
                endereco: 'Loja Virtual',
                cidade: 'Online',
                telefone: '(11) 99999-9999',
                horario: '24 horas',
                imagem: '../assets/OIP.webp'
            },
            'Bazar Premium': {
                nome: 'Bazar Premium',
                descricao: 'Roupas de grife com preços acessíveis.',
                endereco: 'Rua XV de Novembro, 654',
                bairro: 'Centro',
                cidade: 'Curitiba',
                telefone: '(41) 99999-9999',
                horario: '09:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Fashion Market': {
                nome: 'Fashion Market',
                descricao: 'Feira de moda com marcas independentes e designers locais.',
                endereco: 'Av. Afonso Pena, 1200',
                bairro: 'Centro',
                cidade: 'Belo Horizonte',
                telefone: '(31) 99999-9999',
                horario: '09:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Vintage Paradise': {
                nome: 'Vintage Paradise',
                descricao: 'Paraíso das roupas vintage e retrô dos anos 60, 70 e 80.',
                endereco: 'Rua Chile, 456',
                bairro: 'Pelourinho',
                cidade: 'Salvador',
                telefone: '(71) 99999-9999',
                horario: '10:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Street Style Expo': {
                nome: 'Street Style Expo',
                descricao: 'Exposição de moda urbana e streetwear com tênis exclusivos.',
                endereco: 'Av. Boa Viagem, 789',
                bairro: 'Boa Viagem',
                cidade: 'Recife',
                telefone: '(81) 99999-9999',
                horario: '09:00 - 21:00',
                imagem: '../assets/OIP.webp'
            },
            'Plus Size Fashion': {
                nome: 'Plus Size Fashion',
                descricao: 'Moda inclusiva e diversidade de tamanhos com roupas modernas.',
                endereco: 'Av. Beira Mar, 321',
                bairro: 'Aldeota',
                cidade: 'Fortaleza',
                telefone: '(85) 99999-9999',
                horario: '10:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Fitness Fashion': {
                nome: 'Fitness Fashion',
                descricao: 'Roupas esportivas e moda fitness com equipamentos e acessórios.',
                endereco: 'SQS 308, Bloco B',
                numero: '25',
                bairro: 'Asa Sul',
                cidade: 'Brasília',
                telefone: '(61) 99999-9999',
                horario: '06:00 - 22:00',
                imagem: '../assets/OIP.webp'
            },
            'Designer Outlet': {
                nome: 'Designer Outlet',
                descricao: 'Roupas de designers famosos com desconto e peças exclusivas.',
                endereco: 'Rua da Praia, 890',
                bairro: 'Centro Histórico',
                cidade: 'Porto Alegre',
                telefone: '(51) 99999-9999',
                horario: '10:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Boho Market': {
                nome: 'Boho Market',
                descricao: 'Estilo boêmio e hippie chic com vestidos fluidos e acessórios.',
                endereco: 'Rua das Rendeiras, 159',
                bairro: 'Lagoa da Conceição',
                cidade: 'Florianópolis',
                telefone: '(48) 99999-9999',
                horario: '10:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Kids Fashion': {
                nome: 'Kids Fashion',
                descricao: 'Moda infantil criativa e divertida para crianças de todas as idades.',
                endereco: 'Av. Jerônimo Monteiro, 678',
                bairro: 'Centro',
                cidade: 'Vitória',
                telefone: '(27) 99999-9999',
                horario: '08:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Executive Style': {
                nome: 'Executive Style',
                descricao: 'Moda executiva e profissional com ternos e roupas sociais.',
                endereco: 'Av. T-4, 321',
                bairro: 'Setor Bueno',
                cidade: 'Goiânia',
                telefone: '(62) 99999-9999',
                horario: '08:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Beach Fashion': {
                nome: 'Beach Fashion',
                descricao: 'Moda praia e verão com biquínis, sungas e roupas leves.',
                endereco: 'Rua das Trincheiras, 159',
                bairro: 'Centro Histórico',
                cidade: 'João Pessoa',
                telefone: '(83) 99999-9999',
                horario: '09:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Luxury Bazaar': {
                nome: 'Luxury Bazaar',
                descricao: 'Roupas de luxo e alta qualidade com marcas premium.',
                endereco: 'Av. das Amoreiras, 654',
                bairro: 'Cambuí',
                cidade: 'Campinas',
                telefone: '(19) 99999-9999',
                horario: '10:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Trendy Market': {
                nome: 'Trendy Market',
                descricao: 'Últimas tendências da moda mundial com peças exclusivas.',
                endereco: 'Av. Nove de Julho, 890',
                bairro: 'Centro',
                cidade: 'Ribeirão Preto',
                telefone: '(16) 99999-9999',
                horario: '09:00 - 21:00',
                imagem: '../assets/OIP.webp'
            },
            'Artisan Fair': {
                nome: 'Artisan Fair',
                descricao: 'Feira de artesãos e peças únicas feitas à mão com tradição local.',
                endereco: 'Praça Tiradentes, 123',
                bairro: 'Centro Histórico',
                cidade: 'Ouro Preto',
                telefone: '(31) 99999-9999',
                horario: '08:00 - 17:00',
                imagem: '../assets/OIP.webp'
            },
            'Youth Style': {
                nome: 'Youth Style',
                descricao: 'Moda jovem e descontraída para adolescentes e jovens adultos.',
                endereco: 'Av. Higienópolis, 456',
                bairro: 'Centro',
                cidade: 'Londrina',
                telefone: '(43) 99999-9999',
                horario: '10:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Mega Sale': {
                nome: 'Mega Sale',
                descricao: 'Liquidação com até 90% de desconto em roupas de marca.',
                endereco: 'Rua XV de Novembro, 789',
                bairro: 'Centro',
                cidade: 'Santos',
                telefone: '(13) 99999-9999',
                horario: '09:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Mega Outlet': {
                nome: 'Mega Outlet',
                descricao: 'Maior outlet de roupas da região com variedade incrível.',
                endereco: 'Av. das Amoreiras, 1000',
                bairro: 'Cambuí',
                cidade: 'Campinas',
                telefone: '(19) 99999-9999',
                horario: '09:00 - 22:00',
                imagem: '../assets/OIP.webp'
            },
            'Fashion Week': {
                nome: 'Fashion Week',
                descricao: 'Tendências direto das passarelas com peças de alta costura.',
                endereco: 'Rua Oscar Freire, 500',
                bairro: 'Jardins',
                cidade: 'São Paulo',
                telefone: '(11) 99999-9999',
                horario: '10:00 - 21:00',
                imagem: '../assets/OIP.webp'
            },
            'Luxo Acessível': {
                nome: 'Luxo Acessível',
                descricao: 'Marcas de luxo com preços justos e qualidade garantida.',
                endereco: 'Av. Atlântica, 200',
                bairro: 'Copacabana',
                cidade: 'Rio de Janeiro',
                telefone: '(21) 99999-9999',
                horario: '10:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Estilo Único': {
                nome: 'Estilo Único',
                descricao: 'Peças exclusivas e personalizadas para um visual único.',
                endereco: 'Rua das Flores, 300',
                bairro: 'Batel',
                cidade: 'Curitiba',
                telefone: '(41) 99999-9999',
                horario: '09:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Casual Chic': {
                nome: 'Casual Chic',
                descricao: 'Elegância para o dia a dia com peças confortáveis e estilosas.',
                endereco: 'Rua Chile, 400',
                bairro: 'Pelourinho',
                cidade: 'Salvador',
                telefone: '(71) 99999-9999',
                horario: '09:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Eco Fashion': {
                nome: 'Eco Fashion',
                descricao: 'Moda sustentável e ecológica com materiais orgânicos.',
                endereco: 'Rua das Rendeiras, 500',
                bairro: 'Lagoa da Conceição',
                cidade: 'Florianópolis',
                telefone: '(48) 99999-9999',
                horario: '10:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Retro Style': {
                nome: 'Retro Style',
                descricao: 'Moda retrô dos anos 50 e 60 com peças autênticas.',
                endereco: 'Rua da Praia, 600',
                bairro: 'Centro Histórico',
                cidade: 'Porto Alegre',
                telefone: '(51) 99999-9999',
                horario: '10:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Teen Fashion': {
                nome: 'Teen Fashion',
                descricao: 'Moda jovem e descolada para adolescentes modernos.',
                endereco: 'Av. Beira Mar, 700',
                bairro: 'Meireles',
                cidade: 'Fortaleza',
                telefone: '(85) 99999-9999',
                horario: '10:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Glamour Night': {
                nome: 'Glamour Night',
                descricao: 'Roupas para festas e eventos com vestidos deslumbrantes.',
                endereco: 'Rua do Bom Jesus, 800',
                bairro: 'Recife Antigo',
                cidade: 'Recife',
                telefone: '(81) 99999-9999',
                horario: '14:00 - 22:00',
                imagem: '../assets/OIP.webp'
            },
            'Comfort Zone': {
                nome: 'Comfort Zone',
                descricao: 'Roupas confortáveis para casa e lazer com tecidos macios.',
                endereco: 'Av. Afonso Pena, 900',
                bairro: 'Centro',
                cidade: 'Belo Horizonte',
                telefone: '(31) 99999-9999',
                horario: '09:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Urban Style': {
                nome: 'Urban Style',
                descricao: 'Estilo urbano e moderno para quem vive na cidade.',
                endereco: 'Av. T-4, 1000',
                bairro: 'Setor Bueno',
                cidade: 'Goiânia',
                telefone: '(62) 99999-9999',
                horario: '10:00 - 21:00',
                imagem: '../assets/OIP.webp'
            },
            'Moda Sustentável': {
                nome: 'Moda Sustentável',
                descricao: 'Roupas ecológicas e sustentáveis com algodão orgânico.',
                endereco: 'Av. Getúlio Vargas, 200',
                bairro: 'Centro',
                cidade: 'Cuiabá',
                telefone: '(65) 99999-9999',
                horario: '09:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Retrô Chic': {
                nome: 'Retrô Chic',
                descricao: 'Moda retrô dos anos 60 e 70 com estilo sofisticado.',
                endereco: 'Rua 14 de Julho, 300',
                bairro: 'Centro',
                cidade: 'Campo Grande',
                telefone: '(67) 99999-9999',
                horario: '10:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Alta Costura': {
                nome: 'Alta Costura',
                descricao: 'Peças exclusivas de alta costura com acabamento impecável.',
                endereco: 'Rua do Comércio, 400',
                bairro: 'Centro',
                cidade: 'Maceió',
                telefone: '(82) 99999-9999',
                horario: '10:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Casual Wear': {
                nome: 'Casual Wear',
                descricao: 'Roupas casuais para o dia a dia com conforto e estilo.',
                endereco: 'Rua João Pessoa, 500',
                bairro: 'Centro',
                cidade: 'Aracaju',
                telefone: '(79) 99999-9999',
                horario: '09:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Festa Glamour': {
                nome: 'Festa Glamour',
                descricao: 'Vestidos e roupas para festas com muito brilho e elegância.',
                endereco: 'Rua Álvaro Mendes, 600',
                bairro: 'Centro',
                cidade: 'Teresina',
                telefone: '(86) 99999-9999',
                horario: '14:00 - 21:00',
                imagem: '../assets/OIP.webp'
            },
            'Urban Fashion': {
                nome: 'Urban Fashion',
                descricao: 'Moda urbana e contemporânea para o estilo de vida moderno.',
                endereco: 'Rua Grande, 700',
                bairro: 'Centro',
                cidade: 'São Luís',
                telefone: '(98) 99999-9999',
                horario: '10:00 - 20:00',
                imagem: '../assets/OIP.webp'
            },
            'Night Fashion': {
                nome: 'Night Fashion',
                descricao: 'Roupas para baladas e eventos noturnos com muito estilo.',
                endereco: 'Av. Presidente Vargas, 800',
                bairro: 'Campina',
                cidade: 'Belém',
                telefone: '(91) 99999-9999',
                horario: '18:00 - 02:00',
                imagem: '../assets/OIP.webp'
            },
            'Discount Store': {
                nome: 'Discount Store',
                descricao: 'Roupas de marca com preços incríveis e promoções diárias.',
                endereco: 'Av. Teotônio Segurado, 900',
                bairro: 'Centro',
                cidade: 'Palmas',
                telefone: '(63) 99999-9999',
                horario: '09:00 - 19:00',
                imagem: '../assets/OIP.webp'
            },
            'Premium Collection': {
                nome: 'Premium Collection',
                descricao: 'Coleção premium de roupas exclusivas com qualidade superior.',
                endereco: 'Rua Epaminondas Jácome, 100',
                bairro: 'Centro',
                cidade: 'Rio Branco',
                telefone: '(68) 99999-9999',
                horario: '10:00 - 18:00',
                imagem: '../assets/OIP.webp'
            },
            'Handmade Market': {
                nome: 'Handmade Market',
                descricao: 'Roupas artesanais feitas à mão com técnicas tradicionais.',
                endereco: 'Av. Ville Roy, 200',
                bairro: 'Centro',
                cidade: 'Boa Vista',
                telefone: '(95) 99999-9999',
                horario: '08:00 - 17:00',
                imagem: '../assets/OIP.webp'
            },
            'Teen Store': {
                nome: 'Teen Store',
                descricao: 'Loja especializada em moda teen com as últimas tendências.',
                endereco: 'Rua Cândido Mendes, 300',
                bairro: 'Centro',
                cidade: 'Macapá',
                telefone: '(96) 99999-9999',
                horario: '10:00 - 20:00',
                imagem: '../assets/OIP.webp'
            }
        };
        
        currentBazar = defaultBazares[bazarName];
        if (currentBazar) {
            displayBazarDetails(currentBazar);
        } else {
            showError('Bazar não encontrado');
        }
    } else {
        showError('Bazar não especificado');
    }
}

function displayBazarDetails(bazar) {
    document.getElementById('bazarTitle').textContent = bazar.nome;
    
    // Atualizar primeira imagem do carrossel
    const firstSlide = document.querySelector('.carousel-slide img');
    if (firstSlide) {
        if (bazar.imagem || bazar.image) {
            firstSlide.src = bazar.imagem || bazar.image;
        } else {
            firstSlide.src = '../assets/OIP.webp';
        }
    }
    
    document.getElementById('bazarDescription').textContent = bazar.descricao;
    
    // Categoria
    const categoryNames = {
        'luxo': 'Bazar de Luxo',
        'sebo': 'Sebo',
        'vintage': 'Vintage',
        'outlet': 'Outlet',
        'artesanal': 'Artesanal',
        'infantil': 'Infantil',
        'fitness': 'Fitness'
    };
    
    if (bazar.categoria) {
        const categoryBadge = document.getElementById('bazarCategory');
        if (categoryBadge) {
            categoryBadge.textContent = categoryNames[bazar.categoria] || bazar.categoria;
            categoryBadge.className = `category-badge ${bazar.categoria}`;
        }
    }
    
    // Endereço
    let address = bazar.endereco || '';
    if (bazar.numero) address += `, ${bazar.numero}`;
    if (bazar.bairro) address += ` - ${bazar.bairro}`;
    if (bazar.cidade) address += `, ${bazar.cidade}`;
    if (bazar.cep) address += ` - CEP: ${bazar.cep}`;
    document.getElementById('bazarAddress').textContent = address;
    
    // Telefone
    if (bazar.telefone) {
        document.getElementById('phoneInfo').style.display = 'flex';
        document.getElementById('bazarPhone').textContent = bazar.telefone;
    }
    
    // Horário
    if (bazar.horario) {
        document.getElementById('hoursInfo').style.display = 'flex';
        document.getElementById('bazarHours').textContent = bazar.horario;
    }
}

function setupFavoriteButton() {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const bazarNameForFavorite = currentBazar?.nome;
    
    if (favorites.includes(bazarNameForFavorite)) {
        favoriteBtn.classList.add('favorited');
        favoriteBtn.querySelector('i').className = 'fas fa-heart';
    }
    
    favoriteBtn.addEventListener('click', () => {
        const isFavorited = favoriteBtn.classList.contains('favorited');
        const icon = favoriteBtn.querySelector('i');
        
        if (isFavorited) {
            favoriteBtn.classList.remove('favorited');
            icon.className = 'far fa-heart';
            favorites = favorites.filter(fav => fav !== bazarNameForFavorite);
            showMessage('Removido dos favoritos!', 'removed');
        } else {
            favoriteBtn.classList.add('favorited');
            icon.className = 'fas fa-heart';
            favorites.push(bazarNameForFavorite);
            showMessage('Adicionado aos favoritos!', 'success');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
}

function shareBazar() {
    const shareText = `Confira este bazar incrível: ${currentBazar.nome} - ${window.location.href}`;
    
    if (navigator.share && navigator.canShare) {
        navigator.share({
            title: currentBazar.nome,
            text: `Confira este bazar incrível: ${currentBazar.nome}`,
            url: window.location.href
        }).catch(() => {
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showMessage('Link copiado para a área de transferência!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showMessage('Link copiado para a área de transferência!', 'success');
    } catch (err) {
        showMessage('Erro ao copiar link', 'error');
    }
    document.body.removeChild(textArea);
}

function goBack() {
    window.location.href = '../index.html';
}

// Funções do carrossel
function setupCarousel() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        changeSlide(-1);
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        changeSlide(1);
    });
    
    // Auto-play
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[slideIndex - 1].classList.remove('active');
    dots[slideIndex - 1].classList.remove('active');
    
    slideIndex += direction;
    
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex < 1) slideIndex = slides.length;
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

function currentSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[slideIndex - 1].classList.remove('active');
    dots[slideIndex - 1].classList.remove('active');
    
    slideIndex = n;
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

function getDirections() {
    const address = encodeURIComponent(`${currentBazar.endereco}, ${currentBazar.cidade}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, '_blank');
}

function showError(message) {
    document.getElementById('bazarTitle').textContent = 'Erro';
    document.getElementById('bazarDescription').textContent = message;
}

function showMessage(text, type) {
    const message = document.createElement('div');
    message.className = 'message';
    
    let bgColor, icon;
    switch(type) {
        case 'removed':
            bgColor = '#f44336';
            icon = 'fa-heart-broken';
            break;
        case 'success':
            bgColor = '#4CAF50';
            icon = 'fa-check-circle';
            break;
        case 'error':
            bgColor = '#f44336';
            icon = 'fa-exclamation-circle';
            break;
        default:
            bgColor = '#2196F3';
            icon = 'fa-info-circle';
    }
    
    message.innerHTML = `<i class="fas ${icon}"></i> ${text}`;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
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
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);