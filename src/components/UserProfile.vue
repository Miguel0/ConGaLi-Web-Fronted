<template>
  <ul class='user-item' draggable='false'>
    <li>{{userDescriptor.name}}</li>
    <li>{{userDescriptor.createdOn}}</li>
    <li>{{userDescriptor.id}}</li>
    <li>{{userDescriptor.email}}</li>
  </ul>
</template>

<script>

export default {
  name: 'user-page',
  data () {
    return {
      userDescriptor: {}
    }
  }
}
</script>

<style scoped>
</style>
