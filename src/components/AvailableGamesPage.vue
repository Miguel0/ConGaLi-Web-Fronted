<template>
  <div class='available-games-page'>
    <div id="fake-nav">
      <a @click.prevent='toggleCreateGameModal'>Create a new game</a>
      <create-game-modal v-if='showCreateGameModal' v-on:createGame='createGame' v-on:cancel='toggleCreateGameModal'/>
    </div>

    <div id="available-games-toolbar">
      <a class='available-games-toolbar-action actionButton' @click.prevent='refreshAvailableGamesList'>Refresh list</a>
    </div>

    <table class='game-selection-table noselect' draggable='false'>
      <tr class='game-selection-header noselect'>
        <th>Game Name</th>
        <th>Creation Date</th> 
        <th>Owner Id</th>
        <th>Users connected</th>
      </tr>
      <template v-for="(gameDescriptor, key, index) in gameList">
        <tr class='game-selection-item' :class="{'unevenItem': key % 2 === 0}" draggable='false'>
          <td>{{gameDescriptor.name}}</td>
          <td>{{gameDescriptor.createdOn}}</td>
          <td>{{gameDescriptor.ownerId}}</td>
          <td>{{gameDescriptor.users.length}}</td>
          <td>
            <a class='game-selection-item-button actionButton' @click.prevent='joinGame(gameDescriptor)'>Join game</a>
          </td>
        </tr>
      </template>
    </table>
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
        user: {
          id: this.cgStorage.readUserData().id,
          color: newGameSubComponentData.color.hex.substr(1)
        }
      }

      this.$socket.emit('createGame', newGameData)

      console.log('data sent to server: ' + JSON.stringify(newGameData))
    },
    saveDataIntoLocalStorage: function (data) {
      this.cgStorage.saveGameData({
        name: data.gameName,
        refreshInterval: data.refreshInterval,
        resolution: data.resolution
      })
    },
    joinGame: function (gameDescriptor) {
      gameDescriptor.user = {
        id: this.cgStorage.readUserData().id
      }

      this.$socket.emit('joinGame', gameDescriptor)
    },
    refreshAvailableGamesList: function () {
      this.$socket.emit('getAvailableGames', {user: { id: this.cgStorage.readUserData().id }})
    }
  },
  socket: {
    events: {
      gameCreated (data) {
        console.log('Game creation confirmed with id: ' + data.gameName)

        console.log('Saving data into storage...')
        this.saveDataIntoLocalStorage(data)

        console.log('Redirecting to game page')
        this.$router.push('/game/' + data.gameName)
      },
      joinedToGame (data) {
        console.log(`Successful joined game ${JSON.stringify(data)}`)

        console.log('Saving data into storage...')
        this.saveDataIntoLocalStorage(data)

        console.log('Redirecting to game page')
        this.$router.push('/game/' + data.gameName)
      },
      receiveAvailableGames (gameDescriptors) {
        this.$data.gameList = gameDescriptors
      }
    }
  },
  data () {
    return {
      showCreateGameModal: false,
      gameList: []
    }
  },
  mounted () {
    this.refreshAvailableGamesList()
  }
}
</script>

<style scoped>
.game-selection-table {
  width: 100%;
}

.game-selection-table th {
  padding: 0.5em;
  vertical-align: middle;
  background-color: darkGrey;
  cursor: default;
  color: #FFFFFF;
}

.game-selection-item {
  width: 96%;
  text-align: left;
  padding: 0.5em;
  vertical-align: middle;
}

.game-selection-item td {
  padding: 0.5em;
}

.unevenItem {
  background-color: lightGray;
}

.game-selection-item-button {
  float:right;
  margin-top:-8px;
  margin-bottom:-8px;
  margin-right:-8px;
}

.available-games-toolbar {
  width: 96%;
  padding: 2em;
}

.available-games-toolbar-action {
  float: right;
}
</style>
