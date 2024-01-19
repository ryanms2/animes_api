let categoriaAtual = "aventura"; // Inicializa com a categoria "Aventura"
let offset = 0; // Variável para controlar o offset na API
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
            renderizarListaDeAnimes(animes);
        })
        .catch((erro) => console.error(erro));
};

// Função para carregar a próxima lista de animes mantendo a categoria e a pesquisa
function carregarProximaLista() {
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
    const tokenBearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBsYXlAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcwNTM0Nzc4Mn0.gjOfST5ebUlmr-jBTeJcFRNlaTvvXBuF7MH1xbdhVpM"; // Substitua pelo seu token
    
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
        console.log(data)
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
    const tokenBearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBsYXlAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcwNTM0Nzc4Mn0.gjOfST5ebUlmr-jBTeJcFRNlaTvvXBuF7MH1xbdhVpM"; // Substitua pelo seu token
    
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
    
    if (mensagem === "esse anime já foi adicionado" || "Erro ao adicionar o anime.") {
        alerta.id = "add"
    };
    alerta.className = "alerta animate__animated animate__jello";
    alerta.textContent = mensagem;
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        document.body.removeChild(alerta);
    }, 2000);
};

async function animesFavoritos() {
    
}


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
