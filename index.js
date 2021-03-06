async function sortear() {
  document.getElementById("spinner").classList.remove("invisible")
  document.getElementById("pokeDiv").classList.add("invisible");
  var img = document.getElementById("pokemon-foto");
  img.src = null;
  img.alt = "Carregando...";
  let id = parseInt((Math.random() * (1117 - 0) + 0).toFixed(0));
  let pokemon = await pokeInfo(id);
  pokemon = pokeObj(pokemon, id + 1);
  exibir(pokemon);
}

async function pokeInfo(id) {
  try {
    let resp = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118"
    );
    let data = await resp.json();
    let pokemons = data.results;
    let pokemonURL = pokemons[id].url;
    let pokeResp = await fetch(pokemonURL);
    let pokemon = await pokeResp.json();
    return pokemon;
  } catch (err) {
    console.error(err);
  }
}

function pokeObj(pokemon, id) {
  let obj = {
    id,
    nome: pokemon.name,
    imgURL: pokemon.sprites.front_default,
  };
  return obj;
}

function exibir(pokemon) {
  var img = document.getElementById("pokemon-foto");
  img.src = pokemon.imgURL;
  img.alt = pokemon.nome;
  document.getElementById("pokemon-id").innerText = `Poke ID = ${pokemon.id}`;
  document.getElementById("pokemon-nome").innerText = `Poke Name = ${pokemon.nome}`;
  document.getElementById("spinner").classList.add("invisible");
  document.getElementById("pokeDiv").classList.remove("invisible");
}
