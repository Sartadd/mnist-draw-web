import { useRef, useState, useEffect } from "react";

export default function DrawCanvas({ onPredict }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // Preenche o canvas de preto ao carregar
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (event.touches) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    }

    return {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };
  };

  const startDrawing = (event) => {
    event.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPosition(event);

    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    event.preventDefault();

    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPosition(event);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (event) => {
    event.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        style={{
          background: "black",
          border: "1px solid #444",
          touchAction: "none", // impede scroll no mobile
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={() => onPredict(canvasRef.current)}>
          Predict
        </button>
      </div>
    </div>
  );
}
