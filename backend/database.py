
import sqlite3
from pathlib import Path

DATABASE_PATH = Path(__file__).resolve().parent / "transactions.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS transactions (
                transaction_id TEXT PRIMARY KEY,
                amount REAL NOT NULL,
                merchant TEXT NOT NULL
            )
        """)
