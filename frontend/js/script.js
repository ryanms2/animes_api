// Função para carregar a lista de animes com base na categoria
function carregarListaPorCategoria(categoria) {
    fetch(`https://kitsu.io/api/edge/anime?filter[categories]=${categoria}&page[limit]=20&page[offset]=0`)
        .then((resp) => resp.json())
        .then((dados) => {
            const animes = dados.data;
            const col = document.getElementById("animes");
            col.innerHTML= "";
            renderizarListaDeAnimes(animes);
        })
        .catch((erro) => console.error(erro));
}

// Adiciona um ouvinte de evento ao botão "Aventura"
const btnAventura = document.getElementById("btnAventura");
btnAventura.addEventListener("click", () => carregarListaPorCategoria("adventure"));



let offset = 0; // Variável para controlar o offset na API

// Função para carregar a lista de animes com um offset específico
function carregarLista(offsetValue) {
    offset = offsetValue;
    fetch(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${offset}`)
        .then((resp) => resp.json())
        .then((dados) => {
            const animes = dados.data;
            const col = document.getElementById("animes");
            col.innerHTML= "";
            renderizarListaDeAnimes(animes);
        })
        .catch((erro) => console.error(erro));
}

// Função para carregar a próxima lista de animes
function carregarProximaLista() {
    offset += 20; // Incrementa o offset para obter a próxima página
    carregarLista(offset);
}

// Função para carregar a lista anterior de animes
function carregarListaAnterior() {
    offset -= 20; // Decrementa o offset para obter a lista anterior
    if (offset < 0) {
        offset = 0; // Garante que o offset não seja negativo
    }
    carregarLista(offset);
}

// Adiciona ouvintes de eventos aos botões "Próximo" e "Anterior"
const btnNext = document.getElementById("btnNext");
const btnPrevious = document.getElementById("btnPrevious");

btnNext.addEventListener("click", carregarProximaLista);
btnPrevious.addEventListener("click", carregarListaAnterior);


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
fetch("https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0")
    .then((resp) => resp.json())
    .then((dados) => {
        const animes = dados.data;
        renderizarListaDeAnimes(animes);
    })
    .catch((erro) => console.error(erro));
