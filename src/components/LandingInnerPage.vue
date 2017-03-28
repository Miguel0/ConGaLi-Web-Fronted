<template>
  <div class='landing-inner-page'>
    <button @click='goToGames'>Go to games</button>
    <article class="markdown-body entry-content" itemprop="text">
      <h1>
        Conway's Web Game
      </h1>
      <p>This implementation is ment to be used with <a href="https://github.com/Miguel0/conwaysGame-Backend">Conway's Game Backend</a>.</p>
      <p><a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Conway’s Game of Life</a> is a famous simulation that demonstrates cellular automaton. It is modeled as a grid with 4 simple rules:</p>
      <ol>
        <li><strong>Any live cell with fewer than two live neighbours dies, as if caused by under-population.</strong></li>
        <li><strong>Any live cell with two or three live neighbours lives on to the next generation.</strong></li>
        <li><strong>Any live cell with more than three live neighbours dies, as if by overcrowding.</strong></li>
        <li><strong>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</strong></li>
      </ol>
      <p>This particular implementation creates a Multiplayer app version of Game of Life, with the following instructions as a foundational stone and premises:</p>
      <ul>
        <li><strong>The game should tick automatically at a predefined interval, at say, 1 step per second.</strong></li>
        <li><strong>This client allows multiple clients to share the same, synchronized world view.</strong></li>
        <li><strong>Each client is assigned a random color on initialization.</strong></li>
        <li><strong>Creating a point on any grid will create a live cell on that grid with the client’s color. This change should be synchronized across all connected clients. (You can use any mechanism to achieve this, such as polling, comet or WebSocket).</strong></li>
        <li><strong>When a dead cell revives by rule #4 , it will be given a color that is the average of its neighbours (that revive it).</strong></li>
        <li><strong>Include a toolbar that places some predefined patterns at random places with the player’s color, such as those found at [here] (<a href="https://en.wikipedia.org/wiki/Conway%E2%80%99s_Game_of_Life#Examples_of_patterns">https://en.wikipedia.org/wiki/Conway’s_Game_of_Life#Examples_of_patterns</a>) (not necessary to implement all, just 3 - 4 is fine).</strong></li>
      </ul>
      </article>
  </div>
</template>

<script>
import CreateGameModal from './modal/CreateGameModal.vue'

export default {
  name: 'landing-inner-page',
  components: {
    CreateGameModal
  },
  methods: {
    goToGames: function () {
      console.log('Redirecting to games page')
      this.$router.push('/game/')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
