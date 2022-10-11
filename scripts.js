
// API url
const url= 'https://pokeapi.co/api/v2/pokemon/';

let pokedexContainer = document.getElementsByClassName('.pokedex-container');
let pokeName = document.querySelector('.poke-name');
let pokeId = document.querySelector('.poke-id');
let pokeImg = document.querySelector('.poke-img');
let pokeStats = document.querySelector('.poke-stats');
let pokeTypes = document.querySelector('.poke-types');

const searchBtn = document.getElementById('searchBtn');
const input = document.getElementById('input');

// Colors
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

searchBtn.addEventListener ('click',  e => {
    e.preventDefault();
    let inputValue = (input.value).toLowerCase();
    getInfo(url, inputValue);
})


const getInfo = async (url, name) => {
    try {
        const response = await fetch (`${url}${name}`);
        const data = await response.json();
        pokemonRender (data);
    }
    catch (err) {
        renderNotFound();
    }
};

const pokemonRender = (data) =>  {
    const dataImg = data.sprites.front_default;
    const {stats, types} = data;

    pokeName.textContent = data.name.toUpperCase();
    pokeImg.setAttribute('src', dataImg);
    pokeId.textContent = `Nº: ${data.id}`;
    setCardColor (types);
    renderPokemonTypes (types);
    renderPokemonStats (stats);
}

const setCardColor = (types) => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = (types) => {
    types.forEach (type => {
        pokeTypes.innerHTML ='';
        const typeTextElement = document.createElement ('div');
        typeTextElement.style.color = typeColors[type.type.name];
        // typeTextElement.style.boderColor= 'black';
        typeTextElement.textContent = type.type.name;
        pokeTypes.style.border = '1px dashed black';
        pokeTypes.appendChild(typeTextElement);
    })
}

const renderPokemonStats = (stats) => {
    pokeStats.innerHTML ='';
    stats.forEach (stat => {
        const statElement = document.createElement ('div');
        const statElementName = document.createElement ('div');
        const statElementAmount = document.createElement ('div');

        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;

        statElement.appendChild (statElementName);
        statElement.appendChild (statElementAmount)
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound =()=> {
    pokeName.textContent = 'Not found';
    pokeImg.setAttribute('src', './images/poke-shadow.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeTypes.style.border = 'white';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}