export function canvasToBase64(canvas) {
  const dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/png;base64,/, "");
}
