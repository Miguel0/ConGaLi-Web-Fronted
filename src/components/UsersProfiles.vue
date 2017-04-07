<template>
  <div class='users-page'>

    <div id="users-toolbar">
      <a class='users-toolbar-action actionButton' @click.prevent='refreshUsersList'>Refresh list</a>
    </div>

    <table class='users-table noselect' draggable='false'>
      <tr class='users-header noselect'>
        <th>User Name</th>
        <th>Profile Creation Date</th> 
        <th>Id</th>
        <th>Email</th>
      </tr>
      <template v-for="(userDescriptor, key, index) in list">
        <tr class='user-item' :class="{'unevenItem': key % 2 === 0}" draggable='false'>
          <td>{{userDescriptor.name}}</td>
          <td>{{userDescriptor.createdOn}}</td>
          <td>{{userDescriptor.id}}</td>
          <td>{{userDescriptor.email}}</td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>

export default {
  name: 'users-page',
  methods: {
    refreshUsersList: function () {
      this.$socket.emit('getUserProfiles', {user: { id: this.cgStorage.readUserData().id }})
    }
  },
  socket: {
    events: {
      receiveUsersData (userDescriptors) {
        this.$data.list = userDescriptors
      }
    }
  },
  data () {
    return {
      userDescriptor: {}
    }
  },
  mounted () {
    this.refreshUsersList()
  }
}
</script>

<style scoped>
.users-table {
  width: 100%;
}

.users-table th {
  padding: 0.5em;
  vertical-align: middle;
  background-color: darkGrey;
  cursor: default;
  color: #FFFFFF;
}

.users-item {
  width: 96%;
  text-align: left;
  padding: 0.5em;
  vertical-align: middle;
}

.users-item td {
  padding: 0.5em;
}

.unevenItem {
  background-color: lightGray;
}

.users-item-button {
  float:right;
  margin-top:-8px;
  margin-bottom:-8px;
  margin-right:-8px;
}

.users-toolbar {
  width: 96%;
  padding: 2em;
}

.users-toolbar-action {
  float: right;
}
</style>
