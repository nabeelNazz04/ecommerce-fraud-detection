
from fastapi import FastAPI

app = FastAPI(
    title="E-Commerce Fraud Detection API",
    description="API for the explainable fraud detection project",
    version="0.1.0",
)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "fraud-detection-api",
        "stage": "initial-backend",
    }
