/* eslint no-unused-vars: 1 */
/* eslint-disable */

module.exports.syncCanvasData = function (canvasData, aDocument) {
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

module.exports.undrawCell = function (cellDefinition, canvasData, context) {
  let calculatedContext = context || canvasData.canvas.getContext('2d')

  calculatedContext.clearRect(cellDefinition.gridPosition.x, cellDefinition.gridPosition.y, canvasData.resolution, canvasData.resolution)
}

module.exports.drawCell = function (cellDefinition, canvasData, context) {
  let calculatedContext = context || canvasData.canvas.getContext('2d')

  calculatedContext.fillStyle = cellDefinition.getUserColor.apply()
  calculatedContext.strokeStyle = calculatedContext.fillStyle

  calculatedContext.fillRect(cellDefinition.gridPosition.x, cellDefinition.gridPosition.y, canvasData.resolution, canvasData.resolution)
}

module.exports.drawCanvas = function (canvasData, context) {
  let calculatedContext = context || canvasData.canvas.getContext('2d')

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
module.exports.normalizeGridPosition = function (position, canvasData) {
  return {
    x: Math.round((position.x - (canvasData.resolution / 2)) / canvasData.resolution) * canvasData.resolution,
    y: Math.round((position.y - (canvasData.resolution / 2)) / canvasData.resolution) * canvasData.resolution
  }
}
