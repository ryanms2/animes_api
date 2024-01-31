async function showInfoAccount() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('infoAccount').style.display = 'block';
    document.getElementById("redefinir").style.display = '';

    const apiUrl = "http://localhost:3000/api/usuario/logado";
    
    const configuracaoRequisicao = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenBearer}`
        }
    };

    try {
        const resp = await fetch(apiUrl, configuracaoRequisicao);

        const data = await resp.json();
        console.log(data)
        if (data.message) {
        exibirAlerta(data.message);
            
        };
        
        const infosUser = document.getElementById("infoUser");
        infosUser.innerHTML = `<img src="" alt="">
        <h2>${data[0].nome}</h2>
        <p>${data[0].email}</p>`;
    } catch (error) {
        console.log(error);
        exibirAlerta("Erro ao redefinir nome, tente novamente.");
    };
};
const tokenBearer = sessionStorage.getItem('token');
if (tokenBearer !== null) {
    showInfoAccount()
};

function showLogin() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('infoAccount').style.display = 'none';
    document.getElementById("redefinir").style.display = 'none';
};

if (tokenBearer === null) {
    showLogin()
};

const btnMudaNome = document.getElementById("mudaNome");
const btnMudaSenha = document.getElementById("mudaSenha");

btnMudaNome.addEventListener("click", ()=> redefinirNome());
btnMudaSenha.addEventListener("click", ()=> redefinirSenha());
async function redefinirNome() {
    const apiUrl = "http://localhost:3000/api/usuario/redefinirNome";
    const inputNome = document.getElementById("nome").value;
    const inputRNome = document.getElementById("repita-nome").value;

    const corpoRequisicao = {
        nome: inputNome,
        repitaNome: inputRNome
    };
    const configuracaoRequisicao = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenBearer}`
        },
        body: JSON.stringify(corpoRequisicao)
    };

    try {
        const resp = await fetch(apiUrl, configuracaoRequisicao);

        const data = await resp.json();
        console.log(data)
        exibirAlerta(data.message);
    } catch (error) {
        console.log(error);
        exibirAlerta("Erro ao redefinir nome, tente novamente.");
    };
};

async function redefinirSenha() {
    const apiUrl = "http://localhost:3000/api/usuario/redefinirSenha";
    const inputSenha = document.getElementById("redefinir-senha").value;
    const inputRSenha = document.getElementById("repita-redSenha").value;
    const inputNovaSenha = document.getElementById("novaSenha").value;

    const corpoRequisicao = {
        senha: inputSenha,
        novaSenha: inputNovaSenha,
        repitaSenha: inputRSenha
    };
    const configuracaoRequisicao = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenBearer}`
        },
        body: JSON.stringify(corpoRequisicao)
    };

    try {
        const resp = await fetch(apiUrl, configuracaoRequisicao);

        const data = await resp.json();
        exibirAlerta(data.message);
    } catch (error) {
        console.log(error);
        exibirAlerta("Erro ao redefinir a senha, tente novamente.");
    };
};

function showSignUpForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = '';
};

function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = '';
};

async function login() {

    const apiUrl = "http://localhost:3000/api/usuario/login";
    const inputEmail = document.getElementById("email").value;
    const inputSenha = document.getElementById("senha").value;

    if (!inputEmail || inputEmail === undefined || inputEmail == "" || inputEmail === null) {
        return exibirAlerta("Insira um email");
    };

    if (!inputSenha || inputSenha === undefined || inputSenha == "" || inputSenha === null) {
        return exibirAlerta("Insira uma senha");
    };

    
    const corpoRequisicao = {
        email: inputEmail,
        senha: inputSenha
    };
    const configuracaoRequisicao = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(corpoRequisicao)
    };

    try {
        const resp = await fetch(apiUrl, configuracaoRequisicao);

        const data = await resp.json();
        const token = data.token;
        sessionStorage.setItem('token', token);

        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
        exibirAlerta("Erro ao fazer o login, tente novamente.");
    };
};

async function signUp() {
    
    const apiUrl = "http://localhost:3000/api/usuario/registro";
    const inputNome = document.getElementById("novo-nome").value;
    const inputEmail = document.getElementById("novo-email").value;
    const inputSenha = document.getElementById("nova-senha").value;
    const inputRSenha = document.getElementById("Rnova-senha").value;

    if (!inputNome || inputNome === null || inputNome === undefined || inputNome == "") {
        return exibirAlerta("Insira um nome válido");
    };

    if (!inputEmail || inputEmail === null || inputNominputEmail === undefined || inputEmail == "") {
        return exibirAlerta("Insira um email válido");
    };

    if (!inputSenha || inputNominputSenha === null || inputSenha === undefined || inputSenha == "") {
        return exibirAlerta("Insira uma senha válida");
    };

    if (!inputRSenha || inputRSenha === null || inputRSenha === undefined || inputRSenha == "") {
        return exibirAlerta("Insira uma senha válida");
    };
    
    const corpoRequisicao = {
        nome: inputNome,
        email: inputEmail,
        senha: inputSenha,
        repitaSenha: inputRSenha
    };
    const configuracaoRequisicao = {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(corpoRequisicao)
    };
        
    try {
        const resp = await fetch(apiUrl, configuracaoRequisicao);

        const data = await resp.json();
        document.getElementById("novo-nome").value = "";
        document.getElementById("novo-email").value = "";
        document.getElementById("nova-senha").value = "";
        document.getElementById("Rnova-senha").value = "";
        exibirAlerta(data.message);
    } catch (error) {
      console.log(error);
      exibirAlerta("Erro ao criar conta. Por favor, tente novamente.");
    };
};

function exibirAlerta(mensagem) {
    
    const alerta = document.createElement("div");
    alerta.className = "alerta";
    const mensagensErro = [
        "esse anime já foi adicionado",
        "Erro ao adicionar o anime.",
        "Erro ao adicionar anime favorito",
        "Erro ao exibir animes favoritos",
        "Insira um email válido!",
        "O usuário já existe.",
        "Insira uma senha válida!",
        "As senhas estão diferentes, tente novamente.",
        "O nome não pode ser vazio.",
        "O nome deve ter os caracteres minimos.",
        "O usuário não foi encontrado.",
        "Senha incorreta",
        "Insira uma nova senha válida.",
        "As senhas devem ser iguais.",
        "Erro ao fazer o login, tente novamente.",
        "Erro ao criar conta. Por favor, tente novamente.",
        "Os nomes estão diferentes, tente novamente.",
        "Insira um email",
        "Insira uma senha",
        "Insira um nome válido",
        "Insira um email válido",
        "Insira uma senha válida"
      ];
      
      if (mensagensErro.includes(mensagem)) {
        alerta.id = "add";
      };
      
    alerta.className = "alerta animate__animated animate__jello";
    alerta.textContent = mensagem;
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        document.body.removeChild(alerta);
    }, 2500);
};
