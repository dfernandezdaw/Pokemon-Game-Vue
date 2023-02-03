import pokemonAPI from '../api/pokemonAPI'
/* // Generate four random numbers and push them to an array
const pokemons = []

const getPokemonOptions = () => {
  while (pokemons.length < 4) {
    const randomIndex = Math.floor(Math.random() * 650 + 1)
    if (!pokemons.includes(randomIndex)) {
      pokemons.push(randomIndex)
    }
  }
  return pokemons
}

// Get pokemons from the API using the pokemons array with axios
const getPokemonsNames = async () => {
  const promisesArray = pokemons.map(pokemon =>
    pokemonAPI.get(`/pokemon/${pokemon}`)
  )

  const [pokemon1, pokemon2, pokemon3, pokemon4] = await Promise.all(
    promisesArray
  )
  return [
    { name: pokemon1.data.name, id: pokemon1.data.id },
    { name: pokemon2.data.name, id: pokemon2.data.id },
    { name: pokemon3.data.name, id: pokemon3.data.id },
    { name: pokemon4.data.name, id: pokemon4.data.id },
  ]
} */

const getPokemons = () => {
  const pokemonArr = Array.from(Array(650))
  return pokemonArr.map((_, index) => index + 1)
}

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)
  return await getPokemonNames(mixedPokemons.splice(0, 4))
}

const getPokemonNames = async ([pk1, pk2, pk3, pk4] = []) => {
  const promisesArr = [
    pokemonAPI.get(`/pokemon/${pk1}`),
    pokemonAPI.get(`/pokemon/${pk2}`),
    pokemonAPI.get(`/pokemon/${pk3}`),
    pokemonAPI.get(`/pokemon/${pk4}`),
  ]
  const [pokemon1, pokemon2, pokemon3, pokemon4] = await Promise.all(
    promisesArr
  )
  return [
    { name: pokemon1.data.name, id: pokemon1.data.id },
    { name: pokemon2.data.name, id: pokemon2.data.id },
    { name: pokemon3.data.name, id: pokemon3.data.id },
    { name: pokemon4.data.name, id: pokemon4.data.id },
  ]
}

export { getPokemonOptions, getPokemonNames, getPokemons }
