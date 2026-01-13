from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import PredictRequest
from .predict import predict_digit

app = FastAPI(title="MNIST Draw API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
def predict(request: PredictRequest):
    return predict_digit(request)
