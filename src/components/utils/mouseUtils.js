/* eslint no-unused-vars: 1 */
/* eslint-disable */

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
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft
      offsetY += element.offsetTop
    } while ((element = element.offsetParent))
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar (like the stumbleupon bar)
  // This part is not strictly necessary, it depends on your styling
  offsetX += elementData.stylePaddingLeft + elementData.styleBorderLeft + elementData.htmlLeft
  offsetY += elementData.stylePaddingTop + elementData.styleBorderTop + elementData.htmlTop

  mx = e.pageX - offsetX
  my = e.pageY - offsetY

  // We return a simple javascript object with x and y defined
  return {x: mx, y: my}
}
