import { useState } from "react";
import DrawCanvas from "./components/DrawCanvas";
import { predictDigit } from "./services/api";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (canvas) => {
    setLoading(true);
    try {
      const data = await predictDigit(canvas);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error while predicting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MNIST Draw App</h1>

      <DrawCanvas onPredict={handlePredict} />

      {loading && <p>Predicting...</p>}

      {result && (
        <div style={{ marginTop: "10px" }}>
          <p>
            <strong>Prediction:</strong> {result.prediction}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
