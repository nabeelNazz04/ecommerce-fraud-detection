
import { useEffect, useState } from 'react';

export function SavedTransactions({ refreshTrigger }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/transactions`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }

                const data = await response.json();
                setTransactions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTransactions();
    }, [refreshTrigger]);

    if (loading) {
        return <p>Loading saved transactions...</p>;
    }

    if (error) {
        return <p role="alert">Error: {error}</p>;
    }

    return (
        <section style={{ padding: '24px' }}>
            <h2>Saved Transactions (SQLite)</h2>

            {transactions.length === 0 ? (
                <p>No transactions have been saved yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Merchant</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.transaction_id}>
                                <td>{transaction.transaction_id}</td>
                                <td>{Number(transaction.amount).toFixed(2)}</td>
                                <td>{transaction.merchant}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
