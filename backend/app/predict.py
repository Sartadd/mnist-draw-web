from .schemas import PredictRequest

def predict_digit(data: PredictRequest):
    # Por enquanto é mock
    return {
        "prediction": 0,
        "confidence": 0.0
    }
