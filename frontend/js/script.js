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
}

// Função para carregar a próxima lista de animes mantendo a categoria e a pesquisa
function carregarProximaLista() {
    offset += 20; // Incrementa o offset para obter a próxima página
    carregarListaPorCategoriaEOffset(categoriaAtual, offset, searchTerm);
}

// Função para carregar a lista anterior de animes mantendo a categoria e a pesquisa
function carregarListaAnterior() {
    offset -= 20; // Decrementa o offset para obter a lista anterior
    if (offset < 0) {
        offset = 0; // Garante que o offset não seja negativo
    }
    carregarListaPorCategoriaEOffset(categoriaAtual, offset, searchTerm);
}

// Função para pesquisar ao clicar no botão "Pesquisar"
function pesquisar() {
    searchTerm = document.getElementById("searchInput").value;
    offset = 0;
    carregarListaPorCategoriaEOffset(categoriaAtual, offset, searchTerm);
}

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



// Função para adicionar anime aos favoritos
/*function adicionarAosFavoritos(animeId, titulo) {
    // Implemente a lógica para adicionar ao banco de dados ou à API de favoritos
    console.log(`Adicionando ${titulo} aos favoritos com ID ${animeId}`);
} */

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
                    <a href="#" class="btn btn-primary" onclick="adicionarAosFavoritos(${animes[i].id}, '${anime.titles.en_jp}')">Adicionar</a>
                </div>
            </div>`;

        col.appendChild(card);
    }
};


// Chamada à API e renderização da lista de animes
fetch("https://kitsu.io/api/edge/anime?filter[categories]=${categoria}&page[limit]=20&page[offset]=${offsetValue}")
    .then((resp) => resp.json())
    .then(async(dados) => {
        const animes = await dados.data;
        renderizarListaDeAnimes(animes);
    })
    .catch((erro) => console.error(erro));
