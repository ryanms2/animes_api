function showSignUpForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
};

function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
};

async function login() {

    const apiUrl = "http://localhost:3000/api/usuario/login";
    const inputEmail = document.getElementById("email").value;
    const inputSenha = document.getElementById("senha").value;

    
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

        exibirAlerta(data.message);
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


let categoriaAtual = "aventura"; // Inicializa com a categoria "Aventura"
let offset = 20; // Variável para controlar o offset na API
let searchTerm = ""; // Variável para armazenar o termo de pesquisa

// Função para carregar a lista de animes com base na categoria, offset e termo de pesquisa
function carregarListaPorCategoriaEOffset(categoria, offsetValue, term) {
    const baseurl = "https://kitsu.io/api/edge/anime";
    const limit = 20;

    const searchTermParam = term ? `&filter[text]=${term}` : ""; 
    const url = `${baseurl}?filter[categories]=${categoria}&page[limit]=${limit}&page[offset]=${Math.max(offsetValue, 0)}${searchTermParam}`;
    console.log("URL:", url);

    
    fetch(url)
        .then((resp) => resp.json())
        .then((dados) => {
            const animes = dados.data;
            const col = document.getElementById("animes");
            col.innerHTML = "";
            btnNext.style.display = "";
            btnPrevious.style.display = "";
            renderizarListaDeAnimes(animes);
        })
        .catch((erro) => console.error(erro));
};

// Função para carregar a próxima lista de animes mantendo a categoria e a pesquisa
function carregarProximaLista() {
    console.log(offset)
    offset += 20; // Incrementa o offset para obter a próxima página
    carregarListaPorCategoriaEOffset(categoriaAtual, offset, searchTerm);
};

// Função para carregar a lista anterior de animes mantendo a categoria e a pesquisa
function carregarListaAnterior() {
    offset -= 20; // Decrementa o offset para obter a lista anterior
    if (offset < 0) {
        offset = 0; // Garante que o offset não seja negativo
    };
    carregarListaPorCategoriaEOffset(categoriaAtual, offset, searchTerm);
};

// Função para pesquisar ao clicar no botão "Pesquisar"
function pesquisar() {
    searchTerm = document.getElementById("searchInput").value;
    offset = 0;
    carregarListaPorCategoriaEOffset(categoriaAtual, offset, searchTerm);
};

// Adiciona ouvinte de evento ao botão "Pesquisar"
const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", pesquisar);

// Adiciona ouvintes de eventos aos botões "Próximo" e "Anterior"
const btnNext = document.getElementById("btnNext");
const btnPrevious = document.getElementById("btnPrevious");
const inputText = document.getElementById("searchInput");
const btnInicio = document.getElementById("inicio");

btnInicio.addEventListener("click", renderizarListaDeAnimes);

btnNext.addEventListener("click", carregarProximaLista);
btnPrevious.addEventListener("click", carregarListaAnterior);
inputText.addEventListener("keypress", (event) => {
    
        if (event.key == 'Enter') {
            pesquisar()
        };
});


// Adiciona um ouvinte de evento para cada botão de categoria
const btnAventura = document.getElementById("btnAventura");
btnAventura.addEventListener("click", () => {
    categoriaAtual = "aventura";
    offset = 0;
    carregarListaPorCategoriaEOffset(categoriaAtual, offset);
});

const btnAcao = document.getElementById("btnAcao");
btnAcao.addEventListener("click", () => {
    categoriaAtual = "acao";
    offset = 0;
    carregarListaPorCategoriaEOffset(categoriaAtual, offset);
});

const btnRomance = document.getElementById("btnRomance");
btnRomance.addEventListener("click", () => {
    categoriaAtual = "romance";
    offset = 0;
    carregarListaPorCategoriaEOffset(categoriaAtual, offset);
});



// Adiciona um ouvinte de evento para todos os botões "Adicionar"
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btnAdicionar")) {
        const nomeAnime = event.target.dataset.nome;
        const imagemAnime = event.target.dataset.imagem;
        adicionarAnimeFavorito(nomeAnime, imagemAnime);
    };
});

// Função para enviar dados do anime para a API
async function adicionarAnimeFavorito(nomeAnime, imagemAnime) {   
    const apiUrl = "http://localhost:3000/api/animes/";
    const tokenBearer = sessionStorage.getItem('token'); // Substitua pelo seu token
    console.log(tokenBearer)
    if (tokenBearer === null) {
        // Redirecionar para a página de login
        window.location.href = 'conta.html';
        return;
    };
    const corpoRequisicao = {
        titulo: nomeAnime,
        imagem: imagemAnime
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

        if (!resp.ok) {
            throw new Error("Erro ao adicionar anime favorito");
        };

        const data = await resp.json();
        if (!data.insertId) {
           exibirAlerta(data.message);
           return;
        }
        addFavorito(data.insertId);
        
    } catch (erro) {
        console.error(erro);
        exibirAlerta("Erro ao adicionar anime favorito");
    };
};

async function addFavorito(id) {
    const apiUrl = "http://localhost:3000/api/usuario/addAnime";
    const tokenBearer = sessionStorage.getItem('token'); // Substitua pelo seu token
    
    const corpoRequisicao = {
        idAnime: id
    };
    console.log(corpoRequisicao)
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

        if (!resp.ok) {
            throw new Error("Erro ao adicionar anime favorito");

        };
        const data = await resp.json();
        exibirAlerta(data.message);
    } catch (error) {
        console.error(error);
        exibirAlerta("Erro ao adicionar anime favorito");
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
        "Erro ao criar conta. Por favor, tente novamente."
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

const btnAnimesF = document.getElementById("animesFavoritos");
btnAnimesF.addEventListener("click", () => animesFavoritos());

async function animesFavoritos() {
    const apiUrl = "http://localhost:3000/api/animesFavoritos";
    const tokenBearer = sessionStorage.getItem('token'); // Substitua pelo seu token
    
    const configuracaoRequisicao = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenBearer}`
        }
    };

    try {
        const resp = await fetch(apiUrl, configuracaoRequisicao);

        if (!resp.ok) {
            throw new Error("Erro ao adicionar anime favorito");

        };
        const data = await resp.json();
        if (data.message) {
            return exibirAlerta(data.message);
        };
        const col = document.getElementById("animes");
        col.innerHTML = "";
        renderizarListaDeAnimesFavoritos(data);
    } catch (error) {
        console.log(error);
        exibirAlerta("Erro ao exibir animes favoritos");
    };
};

function renderizarListaDeAnimesFavoritos(animes) {
    const col = document.getElementById("animes");
    const animesF = animes;
    const btnNext = document.getElementById("btnNext");
    const btnPrevious = document.getElementById("btnPrevious");
    btnNext.style.display = "none";
    btnPrevious.style.display = "none";
    for (let i = 0; i < animesF.length; i++) {
        
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
            <div class="card">
                <img class="card-img-top" alt="..." src="${animesF[i].imagem}" style="height: 250px;" >
                <div class="card-body">
                    <h5 class="card-title">${animesF[i].titulo}</h5>
                </div>
            </div>`;

        col.appendChild(card);
    };
};


// Função para renderizar a lista de animes
function renderizarListaDeAnimes(animes) {
    const col = document.getElementById("animes");

    for (let i = 0; i < animes.length; i++) {
        const anime = animes[i].attributes;

        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
            <div class="card">
                <img class="card-img-top" alt="..." src="${anime.posterImage.original}" style="height: 250px;" >
                <div class="card-body">
                    <h5 class="card-title">${anime.titles.en || anime.titles.en_jp}</h5>
                    <button class="btn btn-primary btnAdicionar"
                    data-nome="${animes[i].attributes.titles.en || animes[i].attributes.titles.en_jp}"
                    data-imagem="${animes[i].attributes.posterImage.original}">
                Adicionar
            </button>
                </div>
            </div>`;

        col.appendChild(card);
    };
};


// Chamada à API e renderização da lista de animes
fetch("https://kitsu.io/api/edge/anime?filter[categories]=${categoria}&page[limit]=20&page[offset]=${offsetValue}")
    .then((resp) => resp.json())
    .then(async(dados) => {
        const animes = await dados.data;
        renderizarListaDeAnimes(animes);
    })
    .catch((erro) => console.error(erro));
