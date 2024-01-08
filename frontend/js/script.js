const teste = fetch("https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0").then((resp) => resp.json()).then((dados) => {
    const col = document.querySelector(".row");
    const animes = dados.data
    for (let i = 0; i < animes.length; i++) {
        col.innerHTML+= `
        <div class="col">
            <div class="card">
                <img class="card-img-top" alt="..." src="${animes[i].attributes.posterImage.original}" style="height: 250px;" >
                <div class="card-body">
                <h5 class="card-title">${animes[i].attributes.titles.en_jp}</h5>
                <a href="#" class="btn btn-primary">Adicionar</a>
                </div>
            </div>
        </div>`
        
    }
    
    console.log(animes)            
});

