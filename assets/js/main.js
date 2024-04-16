const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5;
let offset = 0;
const maxrecord = 151;


function loadMorePokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => 
         `  <li class="pokemon ${pokemon.type}">

                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                    <div class="detail">
                    
                        <ol class="types">
                    
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            
                    
                        </ol>
                    
                        <img src="${pokemon.image}" 
                            alt="${pokemon.name}">
                    </div>


            </li>
`).join('') 
     pokemonList.innerHTML += newHtml
        
    })
}

loadMorePokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {

    offset += limit
    const qntdRecordNexPage = offset + limit

    if(qntdRecordNexPage >= maxrecord){
        const newLimit = maxrecord - offset

        loadMorePokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        
        loadMorePokemonItens(offset, limit)
    }

    
})