document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const usuariosCadastrados = [
        { usuario: 'arthur', senha: 'swam198400' },
        { usuario: 'wagner', senha: 'b0opvrd2@' },
        { usuario: 'Arthur', senha: 'swam198400' },
        { usuario: 'bernarndo', senha: 'berd123' }
    ];

    const usuarioEncontrado = usuariosCadastrados.find(u => u.usuario === usuario && u.senha === senha);

    if (usuarioEncontrado) {
        localStorage.setItem('usuarioLogado', usuarioEncontrado.usuario);
        window.location.href = 'inde11111x1.html';
    } else {
    }
});
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const erroLogin = document.getElementById('erroLogin');

    // Exemplo com usuário fixo:
    const usuarioValido = 'admin';
    const senhaValida = '1234';

    if (usuario === usuarioValido && senha === senhaValida) {
        erroLogin.style.display = 'none';
        window.location.href = 'ind111ex1.html'; // Redireciona para a página principal
    } else {
        erroLogin.style.display = 'block';
    }
});

// Esconder a mensagem de erro quando o usuário começar a digitar de novo
document.getElementById('usuario').addEventListener('input', function() {
    document.getElementById('erroLogin').style.display = 'none';
});

document.getElementById('senha').addEventListener('input', function() {
    document.getElementById('erroLogin').style.display = 'none';
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const erroLogin = document.getElementById('erroLogin');

    const usuarioValido = 'admin';
    const senhaValida = '1234';

    if (usuario === usuarioValido && senha === senhaValida) {
        localStorage.setItem('usuarioLogado', usuario);
        window.location.href = 'inde111x1.html';
    } else {
        erroLogin.style.display = 'block';
    }
});
