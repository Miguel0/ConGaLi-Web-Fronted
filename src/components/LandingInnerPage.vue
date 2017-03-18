<template>
  <div class='landingInnerPage'>
    <button @click='toggleCreateGameModal'>Create Game</button>
    <create-game-modal v-if='showCreateGameModal' v-on:createGame='createGame' />
  </div>
</template>

<script>
import CreateGameModal from './CreateGameModal.vue'

export default {
  name: 'landing-inner-page',
  components: {
    CreateGameModal
  },
  methods: {
    toggleCreateGameModal: function () {
      this.$data.showCreateGameModal = !this.$data.showCreateGameModal
    },
    createGame: function (newGameSubComponentData) {
      this.toggleCreateGameModal()
      let newGameData = {
        gameName: newGameSubComponentData.name,
        userData: {
          name: 'name',
          color: newGameSubComponentData.color.hex.substr(1)
        }
      }

      this.$socket.emit('createGame', newGameData)

      console.log('data sent to server: ' + JSON.stringify(newGameData))
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
