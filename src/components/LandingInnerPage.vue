<template>
  <div class='landingInnerPage'>
    <button id='show-modal' @click='toggleCreateGameModal'>Create Game</button>
    <!-- use the modal component, pass in the prop -->
    <modal v-if='showModal' @close='createGame' :show.sync='showCreateGameModal'>
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot='header'>custom header</h3>
    </modal>

    <transition name='modal'>
      <div class='modal-mask'>
        <div class='modal-wrapper'>
          <div class='modal-container'>

            <div class='modal-header'>
              <slot name='header'>
                default header
              </slot>
            </div>

            <div class='modal-body'>
              <slot name='body'>
                default body
              </slot>
            </div>

            <div class='modal-footer'>
              <slot name='footer'>
                default footer
                <button class='modal-default-button' @click='$emit('close')'>
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CreateGameModal from './CreateGameModal.vue'

export default {
  name: 'landingInnerPage',
  components: {
    CreateGameModal
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  },
  methods: {
    toggleCreateGameModal: function () {
      this.data.showCreateGameModal = !this.data.showCreateGameModal
    },
    createGame: function () {
      this.toggleCreateGameModal()
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
</style>
