<template>
  <generic-modal>
    <h2 slot='header'>Create Game</h2>

    <div slot="body">

      <div class="form-group" v-bind:class="{ 'form-group--error': $v.name.$error }">
        <label class="form__label">Name</label>
        <input class="form__input" v-model.trim="name" @input="$v.name.$touch()">
      </div>
      <span class="form-group__message" v-if="!$v.name.required">Field is required</span>
      <span class="form-group__message" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</span>
      
      <div class="form-group" v-bind:class="{ 'form-group--error': $v.refreshInterval.$error }">
        <label class="form__label">Refresh Interval (in milliseconds)</label>
        <input class="form__input" v-model="refreshInterval" @input="$v.refreshInterval.$touch()">
      </div>
      <span class="form-group__message" v-if="!$v.refreshInterval.between">Must be between {{$v.refreshInterval.$params.between.min}} and {{$v.refreshInterval.$params.between.max}}</span>

      <div class="form-group" v-bind:class="{ 'form-group--error': $v.resolution.$error }">
        <label class="form__label">Grid resolution (in pixels)</label>
        <input class="form__input" v-model="resolution" @input="$v.resolution.$touch()">
      </div>
      <span class="form-group__message" v-if="!$v.resolution.between">Must be between {{$v.resolution.$params.between.min}} and {{$v.resolution.$params.between.max}}</span>

      <div class="form-group" v-bind:class="{ 'form-group--error': $v.color.$error }">
        <label class="form__label">User Color</label>
        <color-picker v-model="color" @change-color="onChangeColor"/>
      </div>
      <span class="form-group__message" v-if="!$v.color.required">Field is required</span>

    </div>

    <div slot="footer" class="noselect">
      <a class='modal-default-button actionButton' @click.prevent='$emit("close")'>Cancel</a>
      <a class='modal-default-button actionButton' @click.prevent='propagateNewGameInitialData'>Create Game</a>
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
    propagateNewGameInitialData () {
      this.$emit('createGame', this.$data)
    },
    onChangeColor (colorSelected) {
      this.$data.color = colorSelected
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

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
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
