<template>
  <div class='cells-template-bar'>
    <ul class='group-selection-bar noselect'>
      <template v-for='(cellsTemplateGroup, key) in tabsDef'>
        <li class='toolbar-button actionButton' v-bind:class="{ 'unactive': current !== cellsTemplateGroup }" @click.prevent ='selectTab(key)'>{{ $t("cellsTemplatesBar.templateGroup." + cellsTemplateGroup.name.replace(/\s/g, "_").replace(/[()]/g, "")) }}</li>
      </template>
    </ul>
    <div class='groups-template-bar'>
      <template v-for="cellsTemplateGroup in tabsDef">
        <div class='group-template-container' v-show='current === cellsTemplateGroup'>
          <template v-for="cellTemplate in cellsTemplateGroup.templates">
            <div class='template-container' draggable='true' @dragstart='startTemplateDrag(cellTemplate, $event)'>
              <img :src="cellTemplate.imgSrc" />
              <p>{{ $t("cellsTemplatesBar.template." + cellTemplate.name.replace(/\s/g, "_").replace(/[()]/g, "")) }}</p>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cells-template-bar',
  methods: {
    getGameOwnerId () {
      return this.$route.params.userId
    },
    getGameId () {
      return this.$route.params.gameId
    },
    selectTab (key) {
      let tab = this.$data.tabsDef[key || 0]
      if (tab && tab !== this.$data.current) {
        this.$data.current = tab
      }
    },
    startTemplateDrag (cellTemplate, event) {
      event.dataTransfer.setData('text/json', JSON.stringify(cellTemplate))
    }
  },
  socket: {
    events: {
      setTemplateCellsOptions (data) {
        console.debug('Refreshing templateCellsOptions with data: ' + JSON.stringify(data))
        this.$data.tabsDef = data
        this.selectTab()
      }
    }
  },
  data () {
    return {
      tabsDef: [],
      current: null
    }
  },
  mounted () {
    this.selectTab()
    this.$socket.emit('getTemplateCellsOptions', {
      game: {
        id: this.getGameId(),
        ownerId: this.getGameOwnerId()
      }
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.group-selection-bar {
  margin-bottom: 0px;
}

.groups-template-bar {
  color: #f6f6f6;
  border: 0;
  background-color: #3fb67b;
  padding: 0.8em;
}

.group-template-container {
  display: inline-flex;
}

.group-template-container div {
  margin-right: 0.1em;
  margin-left: 0.1em;
}

.template-container p {
  line-height: 0.01em;
  font-size: .75rem;
}

.unactive {
  color: #000000;
  background-color: #f6f6f6;
}
</style>
