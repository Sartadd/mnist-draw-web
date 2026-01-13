const API_URL = "http://127.0.0.1:8000";

export function canvasToBase64(canvas) {
  const dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/png;base64,/, "");
}

export async function predictDigit(canvas) {
  const image = canvasToBase64(canvas);

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}
