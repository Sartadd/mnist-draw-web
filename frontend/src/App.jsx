import DrawCanvas from "./components/DrawCanvas";
import { canvasToBase64 } from "./services/api";

function App() {
  const handlePredict = (canvas) => {
    const imageBase64 = canvasToBase64(canvas);
    console.log("Base64 image:", imageBase64.substring(0, 100));
    const img = new Image();
    img.src = "data:image/png;base64," + imageBase64;
    document.body.appendChild(img);
  };



  return (
    <div style={{ padding: "20px" }}>
      <h1>MNIST Draw App</h1>
      <DrawCanvas onPredict={handlePredict} />
    </div>
  );
}

export default App;
