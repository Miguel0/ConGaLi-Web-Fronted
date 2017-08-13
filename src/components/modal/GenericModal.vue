<template>
  <div class='genericModal' id='genericModal'>
    <transition name='modal'>
      <div class='modal-mask'>
        <div class='modal-wrapper' id='modal-wrapper' @click.prevent="modalBackgroundClicked">
          <div class='modal-container'>

            <div class='modal-header'>
              <h2>
                <slot name='header'>Header title</slot>
              </h2>
            </div>

            <div class='modal-body'>
              <slot name='body'>Body content</slot>
            </div>

            <div class='modal-footer'>
              <slot name='footer'>Footer content</slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'session-manager-modal',
  methods: {
    modalBackgroundClicked (e) {
      if (e.target.id === 'modal-wrapper') {
        this.$emit('modalBackgroundClicked')
      }
    }
  }
}
</script>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  padding: 2em;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-header h2 {
  margin-top: 0;
}
.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.form-group {
  margin-bottom: 0.8em;
}

.form-group--error {
  margin-bottom: 2em;
}

.form-group--error+.form-group__message {
  display: block;
  color: #f57f6c;
}

.form-group__message {
  font-size: .75rem;
  line-height: 1;
  display: none;
  margin-left: 14px;
  margin-top: -1.6875rem;
  margin-bottom: .9375rem;
}
</style>
