import joblib
import pandas as pd

MODEL_PATH = "model/churn_model.pkl"
model = joblib.load(MODEL_PATH)


def predict_churn(data: dict) -> dict:
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return {
        "churn_prediction": "Yes" if prediction == 1 else "No",
        "churn_probability": round(float(probability), 4),
    }
