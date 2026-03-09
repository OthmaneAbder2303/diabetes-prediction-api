import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import joblib
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

NEWS_API_KEY = os.getenv("NEWS_API_KEY")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = tf.keras.models.load_model(os.path.join(BASE_DIR, 'diabetes_model.keras'))
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
        "status": "Risque Élevé" if result == 1 else "Risque Faible"
    }

@app.get("/health-content")
async def get_health_content():
    url = f"https://newsapi.org/v2/everything?q=diabète+santé&language=fr&sortBy=relevancy&pageSize=3&apiKey={NEWS_API_KEY}"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            news_data = response.json()
            
            articles = []
            if news_data.get("status") == "ok":
                for art in news_data.get("articles", []):
                    articles.append({
                        "title": art["title"],
                        "summary": art["description"],
                        "link": art["url"],
                        "source": art["source"]["name"]
                    })
    except Exception as e:
        articles = [{"title": "Erreur news", "summary": str(e), "link": "#"}]

    return {
        "daily_tip": "Réduire le sucre ajouté diminue la fatigue pancréatique.",
        "news": articles,
        "preventions": [
            {"topic": "Sport", "advice": "30 min de marche active réduit la glycémie."},
            {"topic": "Fibres", "advice": "Mangez des légumes verts à chaque repas."}
        ]
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))

    uvicorn.run(app, host="0.0.0.0", port=port)
