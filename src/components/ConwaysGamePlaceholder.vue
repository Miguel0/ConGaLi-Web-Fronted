<template>
  <div class='conwaysGamePlaceholder'>
    <div class='toolbar'>
      <button class='toolbar-button' @click='startGame'>Start Game</button>
      <button class='toolbar-button' @click='pauseGame'>Pause Game</button>
      <button class='toolbar-button' @click='killGame'>Kill Game</button>
    </div>
    <canvas id='boardCanvas' @click.left.prevent='addCell'></canvas>
    <div class='cellsTemplateBar'>
    </div>
  </div>
</template>

<script>
export default {
  name: 'conways-game-placeholder',
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
      return localStorage[`user.room.${this.getGameId()}.color`]
    },
    getCanvasData (canvasId) {
      return this.$data.canvasDataObject[canvasId]
    },
    undrawCell (cellDefinition, canvas, context) {
      context.clearRect(cellDefinition.gridPosition.x, cellDefinition.gridPosition.y, 10, 10)
    },
    drawCell (cellDefinition, canvas, context) {
      let calculatedContext = context || canvas.getContext('2d')

      calculatedContext.fillStyle = cellDefinition.getUserColor.apply()
      calculatedContext.strokeStyle = calculatedContext.fillStyle

      calculatedContext.fillRect(cellDefinition.gridPosition.x, cellDefinition.gridPosition.y, 10, 10)
    },
    drawBoard (data) {
      let canvasData = this.getCanvasData('boardCanvas')
      let context = canvasData.canvas.getContext('2d')
      canvasData.cells = data.boards[0].cells

      context.clearRect(0, 0, canvasData.canvas.width, canvasData.canvas.height)

      for (let x in canvasData.cells) {
        for (let y in canvasData.cells[x]) {
          let color = canvasData.cells[x][y].color

          canvasData.cells[x][y].getUserColor = () => color

          this.drawCell(canvasData.cells[x][y], canvasData.canvas, context)
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
      if (!this.$socket.option) {
        // Initialize the queryString to play with a particular room always
        this.$socket.option = { query: `gameId=${this.getGameId()}` }
      }

      this.$socket.emit('startGame', {boardId: 0})
    },
    pauseGame () {
    },
    killGame () {
    },
    addCell (event) {
      let canvasData = this.getCanvasData('boardCanvas')
      let position = this.getMouse(event, canvasData)

      let gridPosition = {x: Math.round((position.x - 5) / 10) * 10, y: Math.round((position.y - 5) / 10) * 10}

      if (!canvasData.cells[gridPosition.x]) {
        canvasData.cells[gridPosition.x] = {}
      }

      let cellData = {
        eventPosition: position,
        gridPosition: gridPosition,
        getUserColor: this.getUserLocalColor
      }

      console.log('new Cell created: ' + JSON.stringify(cellData))
      canvasData.cells[gridPosition.x][gridPosition.y] = cellData

      this.drawCell(cellData, canvasData.canvas)

      this.$socket.emit('createCell', gridPosition)
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
      refreshBoard (data) {
        console.error('Refreshing board with data: ' + JSON.stringify(data))
        this.drawBoard(data)
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
  /*width: 800;
  height: 800;*/
}

.conwaysGamePlaceholder {
  overflow: auto;
}
</style>
