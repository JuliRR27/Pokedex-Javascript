const pokemons = [{
    id: 3,
    name: 'Venusaur',
    cp: 525
},
{
    id: 38,
    name: 'Ninetales',
    cp: 505
},
{
    id: 134,
    name: 'Vaporeon',
    cp: 525
},
{
    id: 130,
    name: 'Gyarados',
    cp: 540
},
{
    id: 26,
    name: 'Raichu',
    cp: 485
},
{
    id: 28,
    name: 'Sandslash',
    cp: 450
},
{
    id: 53,
    name: 'Persian',
    cp: 440
},
] ; 

let chosenPokemons= []; 

update();


function Pokemon() {
    let pokemonsCards = document.querySelectorAll('#available__cards .card');
    let chosenCards = document.querySelectorAll('#chosen__cards .card');
    pokemonsCards.forEach(el => {
        el.addEventListener('click', () => {
            moveArrayToArray(parseInt(el.id),pokemons,chosenPokemons);
            update();
        });
    });
    
    
    chosenCards.forEach(card => {
        card.addEventListener('click', () => {
            moveArrayToArray(parseInt(card.id),chosenPokemons,pokemons);
            update();
        });
    });
  
}

function update(){
    updatePokemons(pokemons,'available'); 
    updatePokemons(chosenPokemons,'chosen'); 
    updateTotalCP(chosenPokemons);
    Pokemon();
}
function moveArrayToArray(id,arr1,arr2){
    arr1.forEach(el => {
        if(id === el.id){
            arr2.push(el);
            arr1.splice(arr1.indexOf(el), 1);
        }
    });
    
}

function updateTotalCP(arr){
    let total = 0;
    arr.forEach(element => {
        total += element.cp;
    });
    document.querySelector('.chosen__totalCP').innerText = 'Total CP: ' + total; 
}

function updatePokemons(arr,cardsPalceString){
    let domElement = cardsPalceString === 'available' ? document.querySelector('#available__cards') : document.querySelector('#chosen__cards'); 
        domElement.innerHTML = '';
    arr.forEach(element => {
        renderCardUI(domElement, element);
    });
}

function renderCardUI(place,card) {
    let el = document.createElement('article');
    el.classList.add('card');
    el.setAttribute('id',card.id);
    el.innerHTML = `
        <img class="card__img" src="https://images.wikidexcdn.net/mwuploads/wikidex/0/02/latest/20090125150654/Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png" alt="">
        <section class="card__info">
            <h2>${card.name}</h2>
            <p>${card.cp} CP</p>
        </section>
    
    ` ;

    place.appendChild(el);
 }