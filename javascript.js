// Adiciona um ouvinte de evento ao botão com o ID "btnNewUser" e chama a função "cadastrarNovoUsuario" quando o botão é clicado.
document.getElementById("btnNewUser").addEventListener("click", cadastrarNovoUsuario);

// Função para cadastrar um novo usuário.
function cadastrarNovoUsuario() {
    // Obtém os valores dos campos de entrada do formulário.
    const novoUsuario = document.getElementById("cadastroUser").value;
    const novaSenha = document.getElementById("cadastroPwd").value;
    const confirmarSenha = document.getElementById("confPwd").value;

    // Verifica se os campos foram preenchidos corretamente.
    if (!validarCadastro(novoUsuario, novaSenha, confirmarSenha)) {
        alert("Preencha corretamente os campos.");
    } else {
        // Obtém a lista de usuários armazenada localmente ou inicializa uma lista vazia se não houver.
        const usuarios = obterUsuariosLocalStorage() || [];
        
        // Verifica se o novo usuário pode ser cadastrado.
        if (podeCadastrar(novoUsuario, usuarios)) {
            // Adiciona o novo usuário à lista de usuários.
            usuarios.push({ nome: novoUsuario, senha: novaSenha });
            // Atualiza a lista de usuários armazenada localmente.
            atualizarLocalStorage("usuarios", usuarios);
            alert("Usuário cadastrado com sucesso!");
        } else {
            // Se o usuário já existe, exibe uma mensagem de alerta.
            alert("Esse usuário já existe. Tente outro!");
        }
    }
}

// Função para validar o cadastro com base nos campos do formulário.
function validarCadastro(usuario, senha, confirmacao) {
    return usuario && senha && confirmacao && senha === confirmacao;
}

// Função para verificar se um novo usuário pode ser cadastrado.
function podeCadastrar(novoUsuario, usuarios) {
    return !usuarios.some(u => u.nome === novoUsuario);
}

// Função para obter a lista de usuários armazenada localmente.
function obterUsuariosLocalStorage() {
    return JSON.parse(localStorage.getItem("usuarios"));
}

// Função para atualizar a lista de usuários armazenada localmente.
function atualizarLocalStorage(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}
