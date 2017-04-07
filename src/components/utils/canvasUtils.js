function syncCanvasData (canvasData, aDocument) {
  // initializating position variables
  let computedStyle = aDocument.defaultView.getComputedStyle(canvasData.canvas, null)

  canvasData.stylePaddingLeft = parseInt(computedStyle['paddingLeft'], 10) || 0
  canvasData.stylePaddingTop = parseInt(computedStyle['paddingTop'], 10) || 0
  canvasData.styleBorderLeft = parseInt(computedStyle['borderLeftWidth'], 10) || 0
  canvasData.styleBorderTop = parseInt(computedStyle['borderTopWidth'], 10) || 0

  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  let html = aDocument.body.parentNode
  canvasData.htmlTop = html.offsetTop
  canvasData.htmlLeft = html.offsetLeft

  return canvasData
}

function undrawCell (cellDefinition, canvasData, context) {
  let calculatedContext = context || canvasData.canvas.getContext('2d')

  calculatedContext.clearRect(cellDefinition.gridPosition.x, cellDefinition.gridPosition.y, canvasData.resolution, canvasData.resolution)
}

function drawCell (cellDefinition, canvasData, context) {
  let calculatedContext = context || canvasData.canvas.getContext('2d')

  calculatedContext.fillStyle = cellDefinition.getUserColor.apply()
  calculatedContext.strokeStyle = calculatedContext.fillStyle

  calculatedContext.fillRect(cellDefinition.gridPosition.x, cellDefinition.gridPosition.y, canvasData.resolution, canvasData.resolution)
}

function drawCanvas (canvasData, context) {
  let calculatedContext = context || canvasData.canvas.getContext('2d')
  console.log(`painting with canvasData = ${JSON.stringify(canvasData)}`)

  calculatedContext.clearRect(0, 0, canvasData.canvas.width, canvasData.canvas.height)

  for (let x in canvasData.cells) {
    for (let y in canvasData.cells[x]) {
      let color = canvasData.cells[x][y].color

      canvasData.cells[x][y].getUserColor = () => color

      drawCell(canvasData.cells[x][y], canvasData, calculatedContext)
    }
  }
}

/**
 * This will normalize the given coordinates to they possible positions in the grid, to allow the client to draw the cell
 * in that position as the server allegedly will do
 */
function normalizeGridPosition (position, resolution) {
  return {
    x: Math.round((position.x - (resolution / 2)) / resolution) * resolution,
    y: Math.round((position.y - (resolution / 2)) / resolution) * resolution
  }
}

this.syncCanvasData = syncCanvasData
this.undrawCell = undrawCell
this.drawCell = drawCell
this.drawCanvas = drawCanvas
this.normalizeGridPosition = normalizeGridPosition
