
from pathlib import Path
import json

import numpy as np
import pandas as pd


# Project root: D:\E-commerce Fraud Detection
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Input files
DATA_PATH = PROJECT_ROOT / "data" / "processed" / "transactions.csv"
SPLIT_PATH = PROJECT_ROOT / "experiments" / "temporal_split.json"

# Output directory for GraphSAGE experiment data
OUTPUT_DIR = PROJECT_ROOT / "experiments" / "graphsage" / "prepared"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("Project root:", PROJECT_ROOT)
print("Dataset exists:", DATA_PATH.exists())
print("Temporal split exists:", SPLIT_PATH.exists())
print("Output directory:", OUTPUT_DIR)

# Load the temporal split configuration
with SPLIT_PATH.open("r", encoding="utf-8") as file:
    split_config = json.load(file)

# Load the processed transaction dataset
df = pd.read_csv(
    DATA_PATH,
    usecols=[
        "TransactionID",
        "isFraud",
        "TransactionDT",
        "card1",
        "card2",
        "addr1",
    ],
)

# Validate the dataset before preparing graph data
required_columns = {
    "TransactionID",
    "isFraud",
    "TransactionDT",
    "card1",
    "card2",
    "addr1",
}

assert required_columns.issubset(df.columns), "Required columns are missing"
assert df["TransactionID"].is_unique, "Duplicate transaction IDs found"
assert df["TransactionDT"].notna().all(), "Missing timestamps found"
assert set(df["isFraud"].unique()).issubset({0, 1}), "Invalid fraud labels"

# Sort chronologically for consistent processing
df = df.sort_values(
    ["TransactionDT", "TransactionID"]
).reset_index(drop=True)

# Verify the expected dataset size
assert len(df) == 590_540, f"Unexpected row count: {len(df)}"

print("\nDataset validation passed!")
print("Transactions:", len(df))
print("Fraud cases:", int(df["isFraud"].sum()))
print("Fraud rate:", round(df["isFraud"].mean() * 100, 3), "%")
print("Unique transaction IDs:", df["TransactionID"].nunique())
print("Chronologically sorted:", df["TransactionDT"].is_monotonic_increasing)
print("Missing values by column:")
print(df[["card1", "card2", "addr1"]].isna().sum())

# Assign each transaction to its saved chronological partition
partitions = split_config["partitions"]

train_end = partitions["train"]["last_transaction_id"]
validation_end = partitions["validation"]["last_transaction_id"]
test_end = partitions["test"]["last_transaction_id"]

df["partition"] = np.select(
    [
        df["TransactionID"] <= train_end,
        df["TransactionID"] <= validation_end,
        df["TransactionID"] <= test_end,
    ],
    ["train", "validation", "test"],
    default="invalid",
)

# Verify partition assignments
assert (df["partition"] != "invalid").all(), "Unassigned transactions found"

for name, expected in partitions.items():
    subset = df[df["partition"] == name]

    assert len(subset) == expected["rows"], (
        f"{name}: expected {expected['rows']} rows, got {len(subset)}"
    )

    assert subset["TransactionID"].min() == expected["first_transaction_id"]
    assert subset["TransactionID"].max() == expected["last_transaction_id"]

    assert subset["TransactionDT"].min() == expected["first_timestamp"]
    assert subset["TransactionDT"].max() == expected["last_timestamp"]

    print(
        f"{name}: {len(subset):,} transactions, "
        f"{int(subset['isFraud'].sum()):,} fraud cases, "
        f"timestamps {subset['TransactionDT'].min():,}–"
        f"{subset['TransactionDT'].max():,}"
    )

print("\nChronological partition validation passed!")
print(df["partition"].value_counts().to_string())

# Save the validated partitioned dataset
prepared_path = OUTPUT_DIR / "transactions_partitioned.csv"

output_columns = [
    "TransactionID",
    "TransactionDT",
    "isFraud",
    "card1",
    "card2",
    "addr1",
    "partition",
]

df[output_columns].to_csv(prepared_path, index=False)

# Save a summary of the actual partition counts and fraud labels
summary = {}

for name in ["train", "validation", "test"]:
    subset = df[df["partition"] == name]

    summary[name] = {
        "transactions": int(len(subset)),
        "fraud_cases": int(subset["isFraud"].sum()),
        "fraud_rate": float(subset["isFraud"].mean()),
        "min_timestamp": int(subset["TransactionDT"].min()),
        "max_timestamp": int(subset["TransactionDT"].max()),
    }

summary_path = OUTPUT_DIR / "partition_summary.json"
summary_path.write_text(
    json.dumps(summary, indent=2),
    encoding="utf-8",
)

print("\nPrepared dataset saved:", prepared_path)
print("Partition summary saved:", summary_path)
print("Prepared file size:", round(prepared_path.stat().st_size / (1024 ** 2), 2), "MB")
