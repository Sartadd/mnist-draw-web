import base64
import io
import numpy as np
from PIL import Image, ImageOps

from .schemas import PredictRequest


def preprocess_image(image_base64: str) -> np.ndarray:
    # Decodifica base64
    image_bytes = base64.b64decode(image_base64)
    image = Image.open(io.BytesIO(image_bytes))

    # Converte para grayscale
    image = image.convert("L")

    # Inverte cores (MNIST: fundo preto, número branco)
    image = ImageOps.invert(image)

    # Redimensiona para 28x28
    image = image.resize((28, 28))

    # Converte para numpy array
    image_array = np.array(image)

    # Normaliza (0–1)
    image_array = image_array / 255.0

    # Ajusta shape (1, 28, 28, 1)
    image_array = image_array.reshape(1, 28, 28, 1)

    return image_array


def predict_digit(data: PredictRequest):
    processed_image = preprocess_image(data.image)

    # Mock por enquanto
    return {
        "prediction": 0,
        "confidence": 0.0,
        "shape": processed_image.shape,
    }
