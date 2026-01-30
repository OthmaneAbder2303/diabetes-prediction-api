import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import joblib

app = FastAPI()

# Configuration CORS pour Lovable
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chargement sécurisé
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = tf.keras.models.load_model(os.path.join(BASE_DIR, 'model_diabete.keras'))
scaler = joblib.load(os.path.join(BASE_DIR, 'scaler.pkl'))

class DiabetesData(BaseModel):
    pregnancies: float
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    dpf: float
    age: float

@app.post("/predict")
async def predict(data: DiabetesData):
    input_data = np.array([[ 
        data.pregnancies, data.glucose, data.blood_pressure, 
        data.skin_thickness, data.insulin, data.bmi, 
        data.dpf, data.age 
    ]])
    input_scaled = scaler.transform(input_data)
    prediction = model.predict(input_scaled)
    probability = float(prediction[0][0])
    result = 1 if probability > 0.5 else 0
    
    return {
        "prediction": result,
        "probability": round(probability, 4),
        "status": "Diabétique" if result == 1 else "Non-Diabétique"
    }

# --- AJOUT CRUCIAL : Lancement du serveur ---
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)