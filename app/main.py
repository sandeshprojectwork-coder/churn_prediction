import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schema import ChurnRequest
from app.predict import predict_churn

load_dotenv()
app = FastAPI(title="Customer Churn Prediction API", version="1.0")
frontEnd_url = os.getenv("FRONTEND_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", frontEnd_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Welcome to the Customer Churn Prediction API!"}


@app.post("/predict")
def predict(request: ChurnRequest):
    result = predict_churn(request.dict())
    return result
