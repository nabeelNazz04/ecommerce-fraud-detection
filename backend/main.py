from contextlib import asynccontextmanager
import sqlite3
from database import get_connection, initialize_database
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_database()
    yield
app = FastAPI(
    title="E-Commerce Fraud Detection API",
    description="API for the explainable fraud detection project",
    version="0.1.0",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class TransactionRequest(BaseModel):
    transaction_id: str
    amount: float
    merchant: str

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "fraud-detection-api",
        "stage": "initial-backend",
    }
@app.post("/api/transactions/validate")
def validate_transaction(transaction: TransactionRequest):
    try:
        with get_connection() as connection:
            connection.execute(
                """
                INSERT INTO transactions
                    (transaction_id, amount, merchant)
                VALUES (?, ?, ?)
                """,
                (
                    transaction.transaction_id,
                    transaction.amount,
                    transaction.merchant,
                ),
            )

        return {
            "message": "Transaction validated and saved successfully",
            "transaction": transaction.model_dump(),
        }

    except sqlite3.IntegrityError:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=409,
            detail="A transaction with this ID already exists.",
        )

@app.get("/api/transactions")
def get_transactions():
    connection = get_connection()

    try:
        rows = connection.execute(
            """
            SELECT transaction_id, amount, merchant
            FROM transactions
            ORDER BY rowid ASC
            """
        ).fetchall()

        return [dict(row) for row in rows]

    finally:
        connection.close()
