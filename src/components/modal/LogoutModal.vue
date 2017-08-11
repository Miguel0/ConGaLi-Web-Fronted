<template>
  <generic-modal v-on:modalBackgroundClicked='cancel'>
    <h2 slot='header'>{{ $t("logoutGameModal.title") }}</h2>

    <div slot="body">
      {{ $t("logoutGameModal.bodyText") }}
    </div>

    <div slot="footer" class="noselect">
      <a class='modal-default-button actionButton' @click.prevent='cancel'>{{ $t("label.cancel") }}</a>
      <a class='modal-default-button actionButton' @click.prevent='propagateData'>{{ $t("label.logOut") }}</a>
    </div>
  </generic-modal>
</template>

<script>
import GenericModal from './GenericModal.vue'

export default {
  name: 'logout-modal',
  components: {
    'generic-modal': GenericModal
  },
  methods: {
    propagateData () {
      this.$emit('confirmed')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
