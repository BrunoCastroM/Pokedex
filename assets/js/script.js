// Selecionado elementos:
const pokemonImage = document.querySelector('.pokemon-image');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonName = document.querySelector('.pokemon-name');
const form = document.querySelector('.form');
const input = document.querySelector('.buscar');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let porkemonAtual = 1;

async function carregarDados(pokemon) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (resposta.status == 200) {
        const dados = await resposta.json();
        return dados;
    }
}

async function renderPokemon(pokemon) {
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const dados = await carregarDados(pokemon)

    if (dados) {
        pokemonImage.style.display = 'block';
        pokemonName.innerText = dados.name;
        pokemonNumber.innerText = dados.id;
        pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        porkemonAtual = dados.id;
    }
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerText = 'Não encontrado';
        pokemonNumber.innerText = ''
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

btnNext.addEventListener('click', () => {
    if (porkemonAtual < 649) {
        porkemonAtual++;
        renderPokemon(porkemonAtual);
        
    }
})

btnPrev.addEventListener('click', () => {
    if (porkemonAtual > 1) {
        porkemonAtual--;
        renderPokemon(porkemonAtual);
    }
})

renderPokemon(porkemonAtual);
