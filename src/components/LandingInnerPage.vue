<template>
  <div class='landingInnerPage'>
    <button @click='toggleCreateGameModal'>Create Game</button>
    <create-game-modal v-if='showCreateGameModal' v-on:createGame='createGame' />
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
    toggleCreateGameModal: function () {
      this.$data.showCreateGameModal = !this.$data.showCreateGameModal
    },
    createGame: function (newGameSubComponentData) {
      this.toggleCreateGameModal()
      let newGameData = {
        gameName: newGameSubComponentData.name,
        refreshInterval: newGameSubComponentData.refreshInterval,
        userData: {
          name: 'name',
          color: newGameSubComponentData.color.hex.substr(1)
        }
      }

      this.$socket.emit('createGame', newGameData)

      console.log('data sent to server: ' + JSON.stringify(newGameData))
    },
    saveDataIntoLocalStorage: function (data) {
      /* TODO check this: if (!supportsLocalStorage()) */

      if (!localStorage['user.name']) {
        localStorage['user.name'] = data.userData.name
      }

      if (!localStorage[`user.room.${data.gameName}`]) {
        localStorage[`user.room.${data.gameName}`] = data.gameName
      }

      localStorage[`user.room.${data.gameName}.color`] = '#' + data.userData.color

      localStorage[`user.room.${data.gameName}.refreshInterval`] = data.refreshInterval
    }
  },
  socket: {
    events: {
      error (err) {
        console.error('Websocket error!', err)
      },
      gameCreated (data) {
        console.log('Game creation confirmed with id: ' + data.gameName)

        console.log('Saving data into localStorage...')
        this.saveDataIntoLocalStorage(data)

        console.log('Redirecting to game page')
        this.$router.push('/game/' + data.gameName)
      }
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
