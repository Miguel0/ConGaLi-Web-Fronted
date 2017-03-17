<template>
  <div class='landingInnerPage'>
    <button @click='toggleCreateGameModal'>Create Game</button>
    <create-game-modal v-if='showCreateGameModal' @close='createGame' :show.sync='newGameData' />
  </div>
</template>

<script>
import CreateGameModal from './CreateGameModal.vue'

export default {
  name: 'landingInnerPage',
  components: {
    CreateGameModal
  },
  props: {
    newGameData: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  methods: {
    toggleCreateGameModal: function () {
      this.$data.showCreateGameModal = !this.$data.showCreateGameModal
    },
    createGame: function () {
      this.toggleCreateGameModal()
    }
  },
  data () {
    return {
      showCreateGameModal: false
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
