<template>
  <div class='conwaysGamePlaceholder'>
    <div id="fake-nav" class='toolbar noselect'>
      <a class='toolbar-button actionButton noselect' @click.prevent='startGame'>Start Game</a>
      <a class='toolbar-button actionButton noselect' @click.prevent='pauseGame'>Pause Game</a>
      <a class='toolbar-button actionButton noselect' @click.prevent='killGame'>Kill Game</a>
    </div>
    <cells-template-bar />
    <canvas id='boardCanvas' class='noselect' @click.left.prevent='addCell' @dragover.prevent @drop="receivedDroppedElement"></canvas>
  </div>
</template>

<script>
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

      // initializating position variables
      let computedStyle = document.defaultView.getComputedStyle(canvas, null)

      canvasData.stylePaddingLeft = parseInt(computedStyle['paddingLeft'], 10) || 0
      canvasData.stylePaddingTop = parseInt(computedStyle['paddingTop'], 10) || 0
      canvasData.styleBorderLeft = parseInt(computedStyle['borderLeftWidth'], 10) || 0
      canvasData.styleBorderTop = parseInt(computedStyle['borderTopWidth'], 10) || 0

      // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
      // They will mess up mouse coordinates and this fixes that
      let html = document.body.parentNode
      canvasData.htmlTop = html.offsetTop
      canvasData.htmlLeft = html.offsetLeft

      this.$data.canvasDataObject[elementId] = canvasData
    },
    getGameId () {
      return this.$route.params.gameId
    },
    getUserLocalColor () {
      return sessionStorage[`user.room.${this.getGameId()}.color`]
    },
    getResolution () {
      let resolution = sessionStorage[`user.room.${this.getGameId()}.resolution`]
      return resolution || 10
    },
    getCanvasData (canvasId) {
      return this.$data.canvasDataObject[canvasId]
    },
    undrawCell (cellDefinition, canvasData, context) {
      context.clearRect(cellDefinition.gridPosition.x, cellDefinition.gridPosition.y, canvasData.resolution, canvasData.resolution)
    },
    drawCell (cellDefinition, canvasData, context) {
      let calculatedContext = context || canvasData.canvas.getContext('2d')

      calculatedContext.fillStyle = cellDefinition.getUserColor.apply()
      calculatedContext.strokeStyle = calculatedContext.fillStyle

      calculatedContext.fillRect(cellDefinition.gridPosition.x, cellDefinition.gridPosition.y, this.getResolution(), this.getResolution())
    },
    drawBoard (data) {
      let canvasData = this.getCanvasData('boardCanvas')
      canvasData.resolution = data.resolution
      let context = canvasData.canvas.getContext('2d')
      canvasData.cells = data.cellsGrids[0].cells

      context.clearRect(0, 0, canvasData.canvas.width, canvasData.canvas.height)

      for (let x in canvasData.cells) {
        for (let y in canvasData.cells[x]) {
          let color = canvasData.cells[x][y].color

          canvasData.cells[x][y].getUserColor = () => color

          this.drawCell(canvasData.cells[x][y], canvasData, context)
        }
      }
    },
    /* Creates an object with x and y defined,
     * set to the mouse position relative to the state's canvas
     * If you wanna be super-correct this can be tricky,
     * we have to worry about padding and borders
     * takes an event and a reference to the canvas
     */
    getMouse (e, canvasData) {
      let element = canvasData.canvas
      let offsetX = 0
      let offsetY = 0
      let mx
      let my

      // Compute the total offset. It's possible to cache this if you want
      if (element.offsetParent !== undefined) {
        do {
          offsetX += element.offsetLeft
          offsetY += element.offsetTop
        } while ((element = element.offsetParent))
      }

      // Add padding and border style widths to offset
      // Also add the <html> offsets in case there's a position:fixed bar (like the stumbleupon bar)
      // This part is not strictly necessary, it depends on your styling
      offsetX += canvasData.stylePaddingLeft + canvasData.styleBorderLeft + canvasData.htmlLeft
      offsetY += canvasData.stylePaddingTop + canvasData.styleBorderTop + canvasData.htmlTop

      mx = e.pageX - offsetX
      my = e.pageY - offsetY

      // We return a simple javascript object with x and y defined
      return {x: mx, y: my}
    },
    startGame () {
      if (this.$socket.option) {
        // Initialize the queryString to play with a particular room always
        // this.$socket.option.query+= `,gameId=${this.getGameId()}`
        console.log(JSON.stringify(this.$socket.option.query))
      }

      this.$socket.emit('startGame', {cellsGridId: 0})
    },
    pauseGame () {
    },
    killGame () {
    },
    /*
     * This will normalize the given coordinates to they possible positions in the grid, to allow the client to draw the cell
     * in that position as the server allegedly will do
     */
    normalizeGridPosition (position, canvasData) {
      return {
        x: Math.round((position.x - (this.getResolution() / 2)) / this.getResolution()) * this.getResolution(),
        y: Math.round((position.y - (this.getResolution() / 2)) / this.getResolution()) * this.getResolution()}
    },
    createCell (position, canvasData) {
      let gridPosition = this.normalizeGridPosition(position, canvasData)
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

        console.log('new Cell created: ' + JSON.stringify(cellData))
        canvasData.cells[gridPosition.x][gridPosition.y] = cellData
      }

      return cellData
    },
    addCell (event) {
      let canvasData = this.getCanvasData('boardCanvas')
      let cellData = this.createCell(this.getMouse(event, canvasData), canvasData)

      this.drawCell(cellData, canvasData)

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
        let position = this.getMouse(event, canvasData)

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
        console.error('Refreshing board with data: ' + JSON.stringify(data))
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
