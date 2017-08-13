<template>
  <div class='conwaysGamePlaceholder'>
    <div class = 'gamePlaceholderDataDescriptorContainer'>
      <div class = 'userDataDescriptorContainer'>
        <p>
          <label class="descriptorLabel">{{ $t("label.user") }} id: </label>
          <span class="descriptorValue">{{getUserLocalData().id}}</span>
        </p>
        <p>
          <label class="descriptorLabel">{{ $t("label.name") }}: </label>
          <span class="descriptorValue">"{{getUserLocalData().name}}"</span>
        </p>
        <p>
          <label class="descriptorLabel">{{ $t("label.userColor") }}: </label>
          <span class="descriptorValue colorContainer" v-bind:style="{ 'background-color': userColor }"></span>
        </p>      
      </div>
      <div class = 'gameDataDescriptorContainer'>
        <p>
          <label class="descriptorLabel">{{ $t("availableGames.gameName") }}</label>
          <span class="descriptorValue">{{ getGameData().name }}</span>
        </p>
        <p>
          <label class="descriptorLabel">{{ $t("label.game.id") }}</label>
          <span class="descriptorValue">{{ getGameData().id }}</span>
        </p>
        <p>
          <label class="descriptorLabel">{{ $t("availableGames.ownerId") }}</label>
          <span class="descriptorValue">{{ getGameData().ownerId }}</span>
        </p>
        <p>
          <label class="descriptorLabel">{{ $t("label.creationDate") }}</label>
          <span class="descriptorValue">{{ getGameData().createdOn }}</span>
        </p>
      </div>
    </div>
    <div id="fake-nav" class='toolbar'>
      <a class='toolbar-button actionButton' @click.prevent='startGame'>{{ $t("conwaysGamePlaceHolder.startGame") }}</a>
      <!-- <a class='toolbar-button actionButton' @click.prevent='pauseGame'>{{ $t("conwaysGamePlaceHolder.pauseGame") }}</a>
      <a class='toolbar-button actionButton' @click.prevent='killGame'>{{ $t("conwaysGamePlaceHolder.killGame") }}</a> -->
    </div>
    <cells-template-bar />
    <div class = 'canvasContainer' @scroll='syncCanvasData'>
      <canvas id='boardCanvas' class='noselect' @click.left.prevent='addCell' @dragover.prevent @drop='receivedDroppedElement'></canvas>
    </div>
  </div>
</template>

<script>
let mouseUtils = require('./utils/mouseUtils')
let canvasUtils = require('./utils/canvasUtils')

import CellsTemplateBar from './CellsTemplateBar.vue'

export default {
  name: 'conways-game-placeholder',
  components: {
    CellsTemplateBar
  },
  methods: {
    initializeCanvas (elementId) {
      let canvas = document.getElementById(elementId)
      canvas.height = 3200
      canvas.width = 3200

      let canvasData = {
        canvas: canvas,
        cells: {}
      }
      this.$data.canvasDataObject[elementId] = canvasData
      this.syncCanvasData()
    },
    syncCanvasData () {
      let canvasData = this.getCanvasData('boardCanvas')
      canvasUtils.syncCanvasData(canvasData, document)
    },
    getGameOwnerId () {
      return this.$route.params.userId
    },
    getGameId () {
      return this.$route.params.gameId
    },
    getGameData () {
      return this.cgStorage.readGameData(this.getGameOwnerId(), this.getGameId())
    },
    getUserLocalData () {
      return this.cgStorage.readLocalUserData()
    },
    getUserLocalColor () {
      return this.getGameData().users[this.getUserLocalData().id].color
    },
    getHexUserLocalColor () {
      return '#' + this.getUserLocalColor()
    },
    getResolution () {
      let resolution = this.cgStorage.readGameData(this.getGameOwnerId(), this.getGameId()).resolution
      return resolution || 10
    },
    getCanvasData (canvasId) {
      return this.$data.canvasDataObject[canvasId]
    },
    drawBoard (data) {
      let canvasData = this.getCanvasData('boardCanvas')
      canvasData.resolution = data.cellsGrids[0].resolution
      canvasData.cells = data.cellsGrids[0].cells

      for (let x in canvasData.cells) {
        for (let y in canvasData.cells[x]) {
          let color = canvasData.cells[x][y].color
          canvasData.cells[x][y].getUserColor = () => color
        }
      }

      canvasUtils.drawCanvas(canvasData)
    },
    startGame () {
      if (this.$socket.option) {
        // Initialize the queryString to play with a particular room always
        console.log(JSON.stringify(this.$socket.option.query))
      }

      this.$socket.emit('startGame', {
        cellsGridId: 0,
        game: {
          id: this.getGameId(),
          ownerId: this.getGameOwnerId()
        },
        user: {
          id: this.cgStorage.readLocalUserData().id
        }
      })
    },
    /* pauseGame () {
    },
    killGame () {
    }, */
    createCell (position, canvasData) {
      console.log(`Creating cell for ${JSON.stringify(position)} in ${JSON.stringify(canvasData)}`)

      let gridPosition = canvasUtils.normalizeGridPosition(position, this.getResolution())
      let cellData = null

      if (!canvasData.cells[gridPosition.x]) {
        canvasData.cells[gridPosition.x] = {}
      }

      if (!canvasData.cells[gridPosition.x][gridPosition.y]) {
        cellData = {
          eventPosition: position,
          gridPosition: gridPosition
        }

        cellData.game = {
          id: this.getGameId(),
          ownerId: this.getGameOwnerId()
        }

        cellData.user = {
          id: this.cgStorage.readLocalUserData().id
        }

        cellData.getUserColor = this.getUserLocalColor

        console.log('new Cell created: ' + JSON.stringify(cellData))
        canvasData.cells[gridPosition.x][gridPosition.y] = cellData
      }

      return cellData
    },
    addCell (event) {
      let canvasData = this.getCanvasData('boardCanvas')
      let cellData = this.createCell(mouseUtils.getMouse(event, canvasData, canvasData.canvas), canvasData)

      canvasUtils.drawCell(cellData, canvasData)

      this.$socket.emit('createCell', cellData)
    },
    addTemplateCells (configurationToAdd, position) {
      this.$socket.emit('createTemplate', {
        name: configurationToAdd.name,
        position: position,
        game: {
          id: this.getGameId(),
          ownerId: this.getGameOwnerId()
        },
        user: {
          id: this.cgStorage.readLocalUserData().id
        }
      })
    },
    receivedDroppedElement (event) {
      if (event.isTrusted) {
        let canvasData = this.getCanvasData('boardCanvas')
        let configurationToAdd = JSON.parse(event.dataTransfer.getData('text/json'))
        let position = mouseUtils.getMouse(event, canvasData, canvasData.canvas)

        this.addTemplateCells(configurationToAdd, position)
      } else {
        console.error('Received a non trusted drop!!!')
      }
    }
  },
  socket: {
    events: {
      connect () {
        console.log('Websocket connected to ' + this.$socket.nsp)
      },
      disconnect () {
        console.log('Websocket disconnected from ' + this.$socket.nsp)
      },
      error (err) {
        console.error('Websocket error!', err)
      },
      refreshCellsGrid (data) {
        console.log('Refreshing board with data: ' + JSON.stringify(data))
        this.drawBoard(data)
      },
      ownershipChanged (gameData) {
        console.log('Changing location of board with data: ' + JSON.stringify(gameData))

        if (gameData.ownerId === this.getUserLocalData().id) {
          this.cgStorage.saveOwnGameData(gameData)
        } else {
          this.cgStorage.saveAlienGameData(gameData)
        }

        this.cgStorage.deleteGameForUser(gameData.id, gameData.previousOwnerId)

        this.$router.push(`/user/${gameData.ownerId}/game/${gameData.id}`)
      },
      appException (err) {
        console.error(err)
      }
    }
  },
  data () {
    return {
      canvasDataObject: {},
      userColor: '#000000'
    }
  },
  mounted () {
    this.initializeCanvas('boardCanvas')
    this.$data.userColor = this.getHexUserLocalColor()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

#boardCanvas {
}

.canvasContainer {
  position: relative;
  overflow: auto;
  margin: 0px;
  padding: 0px;
  background-color: #3fb67b;
  height: 400px;
  width: 100%;
}

#boardCanvas {
  /* border: 1px solid black; */
  background-color: white;
}

.gamePlaceholderDataDescriptorContainer {
  background-color: #3fb67b;
  color: #f6f6f6;
  border: 0;
  padding: 0.8em;
  position: relative;
  width: 100%;
  height: 100px;
}

.gamePlaceholderDataDescriptorContainer p {
  margin-top: 0px;
  margin-bottom: 0.2em;
  width: 100%;
  height: 18px;
  position: relative;
}
.userDataDescriptorContainer {
  float: left;
  position: relative;
  width: 50%;
}

.descriptorLabel {
  font-size: small;
  font-weight: bold;
  float: left;
  margin-right: 10px;
}

.colorContainer {
  border: solid 1px white;
  height: 15px;
  width: 15px;
}

.descriptorValue {
  font-size: smaller;
  float: left;
}

.gameDataDescriptorContainer {
  float: right;
  position: relative;
  width: 50%;
}
</style>
