<template>
  <pulse-loader v-if="!pokemon"></pulse-loader>
  <div v-else="pokemon" pokemon-container>
    <h1>Who's that Pokémon?</h1>
    <PokemonPictures :pokemonID="pokemonID" :showPokemon="showPokemon" />
    <!--If user select an answer, hide buttons to prevent infinite points bug-->
    <PokemonOptions
      v-if="!showAnswers"
      :pokemonOptions="pokemonArray"
      @selection="checkPokemon"
    />
    <div v-if="showAnswers" class="answer-container">
      <h2 class="fade-in">{{ message }}</h2>
      <button class="button" @click="finishGame">Finish Game</button>
      <button class="button" @click="keepPlaying">Keep Playing</button>
    </div>
    <div class="score">Score: {{ score }} points</div>
    <div class="top-score">Top Score: {{ topScore }} points</div>
    <div v-if="leaderboard.length > 0" class="leaderboard">
      <h3>Leaderboard</h3>
      <ul>
        <li v-for="player in leaderboard" :key="player.name">
          {{ player.name }}: {{ player.score }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPictures from '@/components/PokemonPictures.vue'
import { getPokemonOptions } from '@/helpers/getPokemonOptions'
import PulseLoader from '/node_modules/vue-spinner/src/PulseLoader.vue'

export default {
  components: { PokemonPictures, PokemonOptions, PulseLoader },
  data() {
    return {
      name: '',
      pokemon: 0,
      pokemonID: 1,
      pokemonArray: [],
      showPokemon: false,
      showAnswers: false,
      message: null,
      score: 0,
      topScore: localStorage.getItem('topScore') || 0,
      leaderboard: JSON.parse(localStorage.getItem('leaderboard')) || [],
    }
  },
  methods: {
    async mixedPokemons() {
      this.pokemonArray = await getPokemonOptions()
      const randomInt = Math.floor(Math.random() * this.pokemonArray.length)
      this.pokemon = this.pokemonArray[randomInt]
      this.pokemonID = this.pokemon.id
    },
    checkPokemon(pokemonID) {
      this.showPokemon = true
      this.showAnswers = true
      if (pokemonID === this.pokemon.id) {
        this.message = `Correct! ${this.pokemon.name}`
        this.score++
      } else {
        this.message = `Opps... it was ${this.pokemon.name}`
        this.score--
      }
    },
    keepPlaying() {
      this.showPokemon = false
      this.showAnswers = false
      this.mixedPokemons()
    },
    finishGame() {
      this.showPokemon = false
      this.showAnswers = false
      this.message = `Game Over! Your score is ${this.score}`
      localStorage.getItem('topScore')
      if (this.score > this.topScore) {
        this.topScore = this.score
        localStorage.setItem('topScore', this.topScore)
      }
      this.mixedPokemons()
      this.$swal({
        title: 'Save your score?',
        input: 'text',
        inputPlaceholder: 'Enter your name',
        showCancelButton: true,
        confirmButtonText: 'Save',
        confirmButtonColor: '#3085d6',
      }).then(result => {
        if (result.value) {
          this.$swal({
            title: 'Saved!',
            text: `Your score is ${this.score}`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
          }).then(() => {
            this.leaderboard.push({
              name: result.value,
              score: this.score,
            })
            // Sort the leaderboard by score before saving it
            this.leaderboard.sort((a, b) => b.score - a.score)
            if (this.leaderboard.length > 10) {
              this.leaderboard.pop()
            }
            localStorage.setItem(
              'leaderboard',
              JSON.stringify(this.leaderboard)
            )
            this.score = 0
          })
        }
      })
    },
  },
  mounted() {
    this.mixedPokemons()
  },
}
</script>

<style scoped>
.score {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 0 0 0 10px;
}
.top-score {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 0 0 10px 0;
}
.button {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  padding: 10px;
}
.leaderboard {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px 0 0 0;
}
ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px;
}

li:nth-child(1)::before {
  content: '🥇';
}

li:nth-child(2)::before {
  content: '🥈';
}

li:nth-child(3)::before {
  content: '🥉';
}
</style>
