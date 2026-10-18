
import { useState } from 'react';

export function TransactionValidator({ onTransactionSaved }) {
    const [transactionId, setTransactionId] = useState('');
    const [amount, setAmount] = useState('');
    const [merchant, setMerchant] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/transactions/validate`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        transaction_id: transactionId,
                        amount: Number(amount),
                        merchant: merchant,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error(
                        'This transaction ID already exists. Please use a unique ID.'
                    );
                }

                throw new Error(
                    data.detail
                        ? JSON.stringify(data.detail)
                        : 'Request failed'
                );
            }

            setMessage(
                `Success: ${data.message} | Transaction ID: ${data.transaction.transaction_id}`
            );
            onTransactionSaved();
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <h3>Validate a Transaction</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="transaction-id">Transaction ID</label>
                    <input
                        id="transaction-id"
                        value={transactionId}
                        onChange={(event) =>
                            setTransactionId(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label htmlFor="transaction-amount">Amount</label>
                    <input
                        id="transaction-amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="transaction-merchant">Merchant</label>
                    <input
                        id="transaction-merchant"
                        value={merchant}
                        onChange={(event) => setMerchant(event.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Validating...' : 'Validate Transaction'}
                </button>
            </form>

            {message && <p role="status">{message}</p>}
        </section>
    );
}
