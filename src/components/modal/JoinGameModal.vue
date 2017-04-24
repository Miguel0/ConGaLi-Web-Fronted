<template>
  <generic-modal v-on:modalBackgroundClicked='cancel'>
    <h2 slot='header'>{{ $t("joinGameModal.title") }}</h2>

    <div slot="body">

      <div class="form-group" v-bind:class="{ 'form-group--error': $v.color.$error }">
        <label class="form__label">{{ $t("label.userColor") }}</label>
        <color-picker v-model="color" @change-color="onChangeColor"/>
      </div>
      <span class="form-group__message" v-if="!$v.color.required">{{ $t("validation.fieldRequired") }}</span>

    </div>

    <div slot="footer" class="noselect">
      <a class='modal-default-button actionButton' @click.prevent='cancel'>{{ $t("label.cancel") }}</a>
      <a class='modal-default-button actionButton' @click.prevent='propagateData'>{{ $t("joinGameModal.joinIt") }}</a>
    </div>
  </generic-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { Chrome } from 'vue-color'
import GenericModal from './GenericModal.vue'

export default {
  name: 'join-game-modal',
  components: {
    'color-picker': Chrome,
    'generic-modal': GenericModal
  },
  methods: {
    propagateData () {
      this.$emit('accepted', this.$data)
    },
    onChangeColor (colorSelected) {
      this.$data.color = colorSelected
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  validations: {
    color: {
      required
    }
  },
  data () {
    return {
      color: {
        hex: ('#' + (Math.floor(Math.random() * parseInt('FFFFFF', 16)) + 1).toString(16))
      }
    }
  }
}
</script>

<style scoped>
</style>
