/* Creates an object with x and y defined,
 * set to the mouse position relative to the element state
 * If you wanna be super-correct this can be tricky,
 * we have to worry about padding and borders
 * takes an event and a reference to the element
 */
function getMouse (e, elementData, element) {
  let offsetX = 0
  let offsetY = 0
  let mx
  let my

  // Compute the total offset. It's possible to cache this if you want
  let intermediateElement = element
  if (intermediateElement.offsetParent !== undefined) {
    do {
      offsetX += intermediateElement.offsetLeft
      offsetY += intermediateElement.offsetTop
    } while ((intermediateElement = intermediateElement.offsetParent))
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar (like the stumbleupon bar)
  // This part is not strictly necessary, it depends on your styling
  offsetX += elementData.stylePaddingLeft + elementData.styleBorderLeft + elementData.htmlLeft
  offsetY += elementData.stylePaddingTop + elementData.styleBorderTop + elementData.htmlTop

  mx = e.pageX - offsetX + element.parentElement.scrollLeft
  my = e.pageY - offsetY + element.parentElement.scrollTop

  // We return a simple javascript object with x and y defined
  return {x: mx, y: my}
}

this.getMouse = getMouse
