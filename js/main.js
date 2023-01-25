var pokemonArray = ['bulbasaur',
                   'ivysaur',
                   'venusaur',
                   'squirtle',
                   'wartortle',
                   'blastoise',
                   'charmander',
                   'charmeleon',
                   'charizard',];

var pokemonList = document.querySelector('.pokemon-list');

for (var i in pokemonArray) {
  var liNode = document.createElement('li');
  var pokemonNode = document.createTextNode(pokemonArray[i]);
  liNode.appendChild(pokemonNode);
  pokemonList.appendChild(liNode);
}

var pokedex = {
  known_pokemon: pokemonArray,
  add_new: function(addPokemon) {
    addNewPokemonToList(addPokemon);
  },
  discovered: function() {
    document.querySelector('#pokedex-count').innerHTML = pokedex.known_pokemon.length;
  },
  undiscovered: function() {
    var undiscPokemon = 151 - pokedex.known_pokemon.length;
    document.querySelector('#pokedex-undisc').innerHTML = undiscPokemon;
  }
};

pokedex.add_new('beedrill');

pokedex.discovered();
pokedex.undiscovered();

function addNewPokemonToList(newPokemon) {
  pokedex.known_pokemon.push(newPokemon);
 pokemonList.appendChild(document.createElement('li')).appendChild(document.createTextNode(pokedex.known_pokemon[pokedex.known_pokemon.length-1]));
}

const lists__pokemons = document.getElementById('lists__pokemons')
const buttons = document.getElementById('buttons')
let urlPokemon = ' https://pokeapi.co/api/v2/pokemon'
let btnNext;
let btnPrevious;
let templateHtml;
console.log('⏮⏩')

const GetPokemons = async (url) => {
    try {
        const response = await fetch(url)
        const results = await response.json();
        console.log(results)
        DataPokemons(results.results)

        btnNext=results.next ? `<button class="btn" data-url=${results.next}>⏩</button>` : ''
        btnPrevious=results.previous ? `<button class="btn" data-url=${results.previous}>⏮</button>` : ''
        buttons.innerHTML=btnPrevious + " " + btnNext
        

    } catch (error) {
        console.log(error)
    }
}
GetPokemons(urlPokemon)

const DataPokemons = async (data) => {
    lists__pokemons.innerHTML = '';
    try {
        for (let index of data) {

            const resp = await fetch(index.url)
            const resul = await resp.json();
            console.log(resul)
            templateHtml=`
            <div class="pokemon__img">
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
            <p>${resul.name}</p>
            </div>
            `
            lists__pokemons.innerHTML+=templateHtml
        }
        
    } catch (error) {
        console.log(error)
    }
}

buttons.addEventListener('click',(e)=>{
    if(e.target.matches('.btn')){
        let value=e.target.dataset.url
        console.log(value)
        GetPokemons(value)
    }
})