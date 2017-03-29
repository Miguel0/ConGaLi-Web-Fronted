<template>
  <div class='available-games-page'>
    <div id="fake-nav">
      <a class='noselect' @click.prevent='toggleCreateGameModal'>New game</a>
      <create-game-modal v-if='showCreateGameModal' v-on:createGame='createGame' />
    </div>

    <ul class='game-selection-list' v-for="(cellsTemplateGroup, key, index) in tabsDef">
      <li class='toolbar-button' @click='selectTab(key)'>{{cellsTemplateGroup.title}}</li>
    </ul>
  </div>
</template>

<script>
import CreateGameModal from './modal/CreateGameModal.vue'

export default {
  name: 'available-games-page',
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
        resolution: newGameSubComponentData.resolution,
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

      if (!sessionStorage['user.name']) {
        sessionStorage['user.name'] = data.userData.name
      }

      if (!sessionStorage[`user.room.${data.gameName}`]) {
        sessionStorage[`user.room.${data.gameName}`] = data.gameName
      }

      sessionStorage[`user.room.${data.gameName}.color`] = '#' + data.userData.color
      sessionStorage[`user.room.${data.gameName}.refreshInterval`] = data.refreshInterval
      sessionStorage[`user.room.${data.gameName}.resolution`] = data.resolution
    }
  },
  socket: {
    events: {
      error (err) {
        console.error('Websocket error!', err)
      },
      appException (err) {
        console.log(err)
      },
      gameCreated (data) {
        console.log('Game creation confirmed with id: ' + data.gameName)

        console.log('Saving data into sessionStorage...')
        this.saveDataIntoLocalStorage(data)

        console.log('Redirecting to game page')
        this.$router.push('/game/' + data.gameName)
      }
    }
  },
  data () {
    return {
      showCreateGameModal: false,
      gameList: [
        { name: 'A game',
          users: [
            {
              id: 'anId',
              name: 'AUsername',
              color: '#000000'
            },
            {
              id: 'anId',
              name: 'AUsername',
              color: '#000000'
            }
          ]
        }
      ]
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
