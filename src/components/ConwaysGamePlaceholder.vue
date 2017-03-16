<template>
  <div class='conwaysGamePlaceholder'>
    <transition name="fade">
      <canvas id='boardCanvas'></canvas>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'conwaysGamePlaceholder',
  methods: {
    add () {
      // Emit the server side
      this.$socket.emit('add', { a: 5, b: 3 })
    },
    get () {
      this.$socket.emit('get', { id: 12 }, (response) => {
      })
    },
    drawBoard (elementId) {
      /* // Box width
      let bw = 760
      // Box height
      let bh = 760
      // Padding
      let p = 10 */

      let canvas = document.getElementById(elementId)
      canvas.height = 1600
      canvas.width = 1600
      let context = canvas.getContext('2d')

      context.strokeStyle = 'black'
      context.fillStyle = 'darkGreen'
      context.lineWidth = 0.5

      /* for (let x = 0; x <= bw; x += 9) {
        context.moveTo(0.5 + x + p, p)
        context.lineTo(0.5 + x + p, bh + p)
      }

      for (let y = 0; y <= bh; y += 5) {
        context.moveTo(p, 0.5 + y + p)
        context.lineTo(bw + p, 0.5 + y + p)
      } */

      for (let x = 1; x <= (canvas.height / 20); x++) {
        for (let y = 1; y <= (canvas.width / 20); y++) {
          if ((x + y) % 2 === 0) {
            // Draw the outline of a square
            context.strokeRect(Math.floor(10 * (x - 1)) + 1, Math.floor(10 * (y - 1)) + 1, 9, 9)
          } else {
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
    this.drawBoard('boardCanvas')
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#boardCanvas {
  /*width: 800;
  height: 800;*/
}

.conwaysGamePlaceholder {
  overflow: auto;
}
</style>
