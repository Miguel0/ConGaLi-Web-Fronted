<template>
  <div class='landing-inner-page'>
    <article class="landingPageArticle" itemprop="text">
      <h1>Conway's Web Game</h1>
      <p>This implementation is ment to be used with <a href="https://github.com/Miguel0/conwaysGame-Backend">Conway's Game Backend</a>.</p>
      <p><a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Conway’s Game of Life</a> is a famous simulation that demonstrates cellular automaton. It is modeled as a grid with 4 simple rules:</p>
      <ol>
        <li>Any live cell with fewer than two live neighbours dies, as if caused by under-population.</li>
        <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbours dies, as if by overcrowding.</li>
        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
      </ol>
      <p>This particular implementation creates a Multiplayer app version of Game of Life, with the following instructions as a foundational stone and premises:</p>
      <ul>
        <li>The game should tick automatically at a predefined interval, at say, 1 step per second.</li>
        <li>This client allows multiple clients to share the same, synchronized world view.</li>
        <li>Each client is assigned a random color on initialization.</li>
        <li>Creating a point on any grid will create a live cell on that grid with the client’s color. This change should be synchronized across all connected clients. (You can use any mechanism to achieve this, such as polling, comet or WebSocket).</li>
        <li>When a dead cell revives by rule #4 , it will be given a color that is the average of its neighbours (that revive it).</li>
        <li>Include a toolbar that places some predefined patterns at random places with the player’s color, such as those found at [here] (<a href="https://en.wikipedia.org/wiki/Conway%E2%80%99s_Game_of_Life#Examples_of_patterns">https://en.wikipedia.org/wiki/Conway’s_Game_of_Life#Examples_of_patterns</a>) (not necessary to implement all, just 3 - 4 is fine).</li>
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
  }
}
</script>

<style scoped>
.landingPageArticle {
  text-align: left;
}

.landingPageArticle h1{
  text-align: center;
}

.landingPageArticle ol {
  list-style-type: decimal;
  padding-left: 40px;
}

.landingPageArticle ul {
  list-style-type: circle;
  padding-left: 40px;
}

.landingPageArticle li {
  display: list-item;
}
</style>
