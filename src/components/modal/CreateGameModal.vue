<template>
  <generic-modal v-on:modalBackgroundClicked='cancel'>
    <h2 slot='header'>{{ $t("createGameModal.title") }}</h2>

    <div slot="body">

      <div class="form-group" v-bind:class="{ 'form-group--error': $v.name.$error }">
        <label class="form__label">{{ $t("label.name") }}</label>
        <input class="form__input" v-model.trim="name" @input="$v.name.$touch()">
      </div>
      <span class="form-group__message" v-if="!$v.name.required">{{ $t("validation.fieldRequired", {element: $t("label.name")}) }}</span>
      <span class="form-group__message" v-if="!$v.name.minLength">{{ $t("validation.atLeast", {characterCount: $v.name.$params.minLength.min}) }}</span>

      <div class="form-group" v-bind:class="{ 'form-group--error': $v.refreshInterval.$error }">
        <label class="form__label">{{ $t("createGameModal.refreshInterval") }}</label>
        <input class="form__input" v-model="refreshInterval" @input="$v.refreshInterval.$touch()">
      </div>
      <span class="form-group__message" v-if="!$v.refreshInterval.between">{{ $t("validation.between", {min: $v.refreshInterval.$params.between.min, max: $v.refreshInterval.$params.between.max}) }}</span>

      <div class="form-group" v-bind:class="{ 'form-group--error': $v.resolution.$error }">
        <label class="form__label">{{ $t("createGameModal.gridResolution") }}</label>
        <input class="form__input" v-model="resolution" @input="$v.resolution.$touch()">
      </div>
      <span class="form-group__message" v-if="!$v.resolution.between">{{ $t("validation.between", { min: $v.resolution.$params.between.min, max: $v.resolution.$params.between.max}) }}</span>

      <div class="form-group" v-bind:class="{ 'form-group--error': $v.color.$error }">
        <label class="form__label">{{ $t("label.userColor") }}</label>
        <color-picker v-model="color" @change-color="onChangeColor"/>
      </div>
      <span class="form-group__message" v-if="!$v.color.required">{{ $t("validation.fieldRequired") }}</span>

    </div>

    <div slot="footer" class="noselect">
      <a class='modal-default-button actionButton' @click.prevent='cancel'>{{ $t("label.cancel") }}</a>
      <a class='modal-default-button actionButton' :class="{'inactive': $v.color.$invalid && $v.resolution.$invalid && $v.refreshInterval.$invalid && $v.name.$invalid}" @click.prevent='propagateData'>{{ $t("createGameModal.createIt") }}</a>
    </div>
  </generic-modal>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'
import { Chrome } from 'vue-color'
import GenericModal from './GenericModal.vue'

export default {
  name: 'create-game-modal',
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
    name: {
      required,
      minLength: minLength(4)
    },
    refreshInterval: {
      between: between(500, 10000)
    },
    resolution: {
      between: between(10, 10000)
    },
    color: {
      required
    }
  },
  data () {
    return {
      name: '',
      refreshInterval: 1000,
      resolution: 10,
      color: {
        hex: ('#' + (Math.floor(Math.random() * parseInt('FFFFFF', 16)) + 1).toString(16))
      }
    }
  }
}
</script>

<style scoped>

.inactive {
  color: #666666;
  background-color: #dddddd;
}
</style>
