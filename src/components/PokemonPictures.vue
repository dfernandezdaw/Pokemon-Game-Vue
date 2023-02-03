<template>
  <div class="pokemon-container">
    <img class="hidden-pokemon" :src="imgSource" alt="" />
    <img class="fade-in" :src="imgSource" alt="" v-if="showPokemon" />
  </div>
</template>

<script>
export default {
  props: {
    pokemonID: {
      type: Number,
      required: true,
    },
    showPokemon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imgSource() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonID}.svg`
    },
  },
}
</script>

<style>
.pokemon-container {
  height: 200px;
  position: relative;
}

img {
  height: 200px;
  position: absolute;
  left: 50%;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;

  transform: translateX(-50%);
}
.hidden-pokemon {
  filter: brightness(0);
}
</style>
