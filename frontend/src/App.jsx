import DrawCanvas from "./components/DrawCanvas";

function App() {
  const handlePredict = (canvas) => {
    console.log("Canvas ready for prediction", canvas);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MNIST Draw App</h1>
      <DrawCanvas onPredict={handlePredict} />
    </div>
  );
}

export default App;
