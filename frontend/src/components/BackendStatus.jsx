
import { useEffect, useState } from 'react';

export function BackendStatus() {
    const [status, setStatus] = useState('Checking backend...');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/health')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Backend request failed');
                }
                return response.json();
            })
            .then((data) => {
                setStatus(data.status === 'ok' ? 'Backend connected' : 'Unexpected response');
            })
            .catch(() => {
                setStatus('Backend disconnected');
            });
    }, []);

    return (
        <div style={{ padding: '8px 12px', fontSize: '14px' }}>
            API status: {status}
        </div>
    );
}
