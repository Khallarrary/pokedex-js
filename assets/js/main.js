console.log("JS carregou");

const pokemonOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const maxRedcord = 151
const limit = 10;
let offset = 0;



function loadPokemonsItens(offset, limit){
    pokeApi.getPokenons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>

        <div class="extra">
            <div class="info">
                <p><strong>Height:</strong> ${pokemon.height}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
                <p>
                    <strong>Powers:</strong>
                    <span class="abilities">
                        ${pokemon.abilities
                            .map((abilitie) => `<span class="ability">${abilitie}</span>`)
                            .join('')}
                    </span>
                </p>
            </div>
        </div>
    </li>
`).join('')
      pokemonOl.innerHTML += newHtml
        
})
}
 
loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsNextPage = offset + limit

    if(qtdRecordsNextPage >= maxRedcord){
        const newLimit = maxRedcord - offset 
        loadPokemonsItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItens(offset, limit)
    }
})

pokemonOl.addEventListener('click', (event) => {
    const pokemon = event.target.closest('.pokemon')

    if (!pokemon) return

    const pokemonsOpen = document.querySelectorAll('.pokemon.open')

    pokemonsOpen.forEach(p => {
        if(p!== pokemon){
            p.classList.remove('open')
        }
    })

    pokemon.classList.toggle('open')

    const hasOpen = document.querySelector('.pokemon.open')

    if(hasOpen){
        document.body.classList.add('modal-open')
    } else {
        document.body.classList.remove('modal-open')
    }

})



