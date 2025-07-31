document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('cadastroEmail').value.trim();
            const senha = document.getElementById('cadastroSenha').value;

            if (!nome || !email || !senha) {
                alert('Preencha todos os campos do cadastro.');
                return;
            }

            const usuario = {
                nome: nome,
                senha: senha
            };
            localStorage.setItem(email, JSON.stringify(usuario));

            alert('Cadastro realizado com sucesso!');
            // Redireciona para login.html para que o usuário faça login com os dados recém-cadastrados
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const senha = document.getElementById('loginSenha').value;

            if (!email || !senha) {
                alert('Preencha todos os campos do login.');
                return;
            }

            const dadosSalvos = localStorage.getItem(email);

            if (!dadosSalvos) {
                alert('Usuário não encontrado. Faça o cadastro.');
                return;
            }

            const usuario = JSON.parse(dadosSalvos);
            if (senha === usuario.senha) {
                alert(`Bem-vindo, ${usuario.nome}!`);
                // Redireciona para index.html após login bem-sucedido
                window.location.href = 'index.html';
            } else {
                alert('Senha incorreta.');
            }
        });
    }
});
