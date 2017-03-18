<template>
  <div class='conwaysGamePlaceholder'>
    <canvas id='boardCanvas'></canvas>
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
    },
    drawBoard (canvas) {
      let context = canvas.getContext('2d')

      context.strokeStyle = 'black'
      context.fillStyle = 'darkGreen'
      context.lineWidth = 0.5

      for (let x = 1; x <= (canvas.height / 20); x++) {
        for (let y = 1; y <= (canvas.width / 20); y++) {
          if ((x + y) % 2 !== 0) {
            // Draw a square using the fillRect() method and fill it with the colour specified by the fillStyle attribute
            context.fillRect(Math.floor(10 * (x - 1)), Math.floor(10 * (y - 1)), 10, 10)
          }
        }
      }

      context.stroke()
    }
  },
  socket: {
    // Prefix for event names
    // prefix: '/counter/',

    // If you set `namespace`, it will create a new socket connection to the namespace instead of `/`
    // namespace: '/counter',

    events: {
      // Similar as this.$socket.on('changed', (msg) => { ... });
      // If you set `prefix` to `/counter/`, the event name will be `/counter/changed`
      //
      changed (msg) {
        console.log('Something changed: ' + msg)
      },
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
