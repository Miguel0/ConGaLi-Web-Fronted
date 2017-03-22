<template>
  <div class='conwaysGamePlaceholder'>
    <div class='toolbar'>
      <button class='toolbar-button' @click='startGame'>Start Game</button>
      <button class='toolbar-button' @click='pauseGame'>Pause Game</button>
      <button class='toolbar-button' @click='killGame'>Kill Game</button>
    </div>
    <canvas id='boardCanvas' @click.left='addCell'></canvas>
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
      this.drawBoard(canvas)

      this.$data.canvasDataObject[elementId] = {canvas: canvas}
    },
    getGameId () {
      return this.$route.params.gameId
    },
    drawCell (position, canvas, context, dontApplyStroke) {
      let calculatedContext = context || canvas.getContext('2d')

      if (!context) {
        calculatedContext.strokeStyle = 'black'
        calculatedContext.fillStyle = localStorage[`user.room.${this.getGameId()}.color`]
        calculatedContext.lineWidth = 0.5
      }

      // Draw a square using the fillRect() method and fill it with the colour specified by the fillStyle attribute
      calculatedContext.fillRect(Math.floor(10 * (position.x - 1)), Math.floor(10 * (position.y - 1)), 10, 10)

      if (!dontApplyStroke) {
        calculatedContext.stroke()
      }
    },
    drawBoard (canvas) {
      let context = canvas.getContext('2d')

      for (let x = 1; x <= (canvas.height / 20); x++) {
        for (let y = 1; y <= (canvas.width / 20); y++) {
          if ((x + y) % 2 !== 0) {
            this.drawCell({x: x, y: y}, canvas, context, false)
          }
        }
      }

      context.stroke()
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
    initializePositionVariables (canvasId) {
      let canvasData = this.$data.canvasDataObject[canvasId]
      let canvas = canvasData.canvas

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
      let canvasData = this.$data.canvasDataObject['boardCanvas']
      let position = this.getMouse(event, canvasData)
      console.log('click on position ' + JSON.stringify(position))

      this.drawCell(position, canvasData.canvas)
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
    this.initializePositionVariables('boardCanvas')
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
