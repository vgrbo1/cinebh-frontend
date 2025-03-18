import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiRoute = import.meta.env.VITE_API_ROUTE || 'http://localhost:8080';

  useEffect(() => {
    fetch(`${apiRoute}/hello`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setStatus(data);
      })
      .catch((err: any) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiRoute]);

  return (
    <div>
      <h1>Backend Status:</h1>
      {loading ? (
        <p>Waiting...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Message from backend: {status}</p>
      )}
    </div>
  );
}

export default App
