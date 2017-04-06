<template>
  <div class='conwaysGamePlaceholder'>
    <div id="fake-nav" class='toolbar'>
      <a class='toolbar-button actionButton' @click.prevent='startGame'>Start Game</a>
      <a class='toolbar-button actionButton' @click.prevent='pauseGame'>Pause Game</a>
      <a class='toolbar-button actionButton' @click.prevent='killGame'>Kill Game</a>
    </div>
    <cells-template-bar />
    <canvas id='boardCanvas' class='noselect' @click.left.prevent='addCell' @dragover.prevent @drop="receivedDroppedElement"></canvas>
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

      canvasUtils.syncCanvasData(canvasData, document)

      this.$data.canvasDataObject[elementId] = canvasData
    },
    getGameName () {
      return this.$route.params.gameId
    },
    getUserLocalColor () {
      return this.cgStorage.readGameData(this.getGameName()).color
    },
    getResolution () {
      let resolution = this.cgStorage.readGameData(this.getGameName()).resolution
      return resolution || 10
    },
    getCanvasData (canvasId) {
      return this.$data.canvasDataObject[canvasId]
    },
    drawBoard (data) {
      let canvasData = this.getCanvasData('boardCanvas')
      canvasData.resolution = data.resolution
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

      this.$socket.emit('startGame', {cellsGridId: 0})
    },
    pauseGame () {
    },
    killGame () {
    },
    createCell (position, canvasData) {
      let gridPosition = canvasUtils.normalizeGridPosition(position, canvasData)
      let cellData = null

      if (!canvasData.cells[gridPosition.x]) {
        canvasData.cells[gridPosition.x] = {}
      }

      if (!canvasData.cells[gridPosition.x][gridPosition.y]) {
        cellData = {
          eventPosition: position,
          gridPosition: gridPosition
        }
        cellData.getUserColor = this.getUserLocalColor
        cellData.game = {
          id: this.cgStorage.getGameName(),
          user: {
            id: this.cgStorage.readUserData().id
          }
        }

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
        position: position
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
      appException (err) {
        console.error(err)
      }
    }
  },
  data () {
    return {
      canvasDataObject: {}
    }
  },
  mounted () {
    this.initializeCanvas('boardCanvas')
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

#boardCanvas {
  border: 1px solid black;
}

.conwaysGamePlaceholder {
  overflow: auto;
}
</style>
