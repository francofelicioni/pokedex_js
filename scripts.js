
// API url
const url= 'https://pokeapi.co/api/v2/pokemon/';

//Variables
let input = document.querySelector('#input');
let searchBtn = document.querySelector('#searchBtn');

let pokedexContainer = document.querySelector('.pokedex-container');
let pokeName = document.querySelector('.poke-name');
let pokeImg = document.querySelector('.poke-img');
let pokeId = document.querySelector('.poke-id');
let pokeTypes = document.querySelector('.poke-types');
let pokeStats = document.querySelector('.poke-stats');

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

searchBtn.addEventListener ('click', e => {
    e.preventDefault();
    searchPokemon (url, (input.value).toLowerCase())
})


const searchPokemon = (url, name) => {
    fetch (url+name)
        .then ((response) => response.json())
        .then ((data) => renderPokemon(data))
        .catch (renderError())
}


const renderPokemon = (data) => {
    const {types, stats} = data;

    pokeName.textContent = (data.name).toUpperCase();
    pokeImg.setAttribute ('src', data.sprites.front_default);
    pokeId.textContent = `Nº ${data.id}`;
    setColor (types);
    renderStats (stats);
    renderTypes (types);
}

const setColor = types => {
    const color1 = typeColors[types[0].type.name];
    const color2 = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${color1} 30%, ${color2} 100%)`;
}

const renderStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach  (stat => {
        let statContainer = document.createElement('div');
        let statName = document.createElement ('div');
        let statNumber = document.createElement ('div');

        statName.textContent = stat.stat.name;        
        statNumber.textContent = stat.base_stat;

        statContainer.appendChild(statName);
        statContainer.appendChild(statNumber);
        pokeStats.appendChild(statContainer);
    })
}


const renderTypes = types =>  {
    pokeTypes.innerHTML = '';
    types.forEach (type => {
        pokeTypes.style.border = '1px dotted black';
        let typeText = document.createElement ('div');
        typeText.style.color = typeColors[type.type.name];
        typeText.textContent = type.type.name;
        pokeTypes.appendChild(typeText);
    })
}

const renderError = () => {
    pokeName.textContent = 'Not Found!'
    pokeImg.setAttribute ('src', 'images/poke-shadow.png');
    pokeId.textContent = '';
    pokeStats.innerHTML = '';
    pokeTypes.innerHTML = '';
}