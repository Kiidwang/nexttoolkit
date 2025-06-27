import React, { useEffect, useState } from 'react';

interface DebugPageProps {
  id: string; // Define the id prop in the interface
}

const DebugPage: React.FC<DebugPageProps> = ({ id }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Replace with your actual token
  const AUTHORIZATION_TOKEN_ENCODED = '==';
  const AUTHORIZATION_TOKEN = atob(AUTHORIZATION_TOKEN_ENCODED);
  const API_ENDPOINT = 'https://itfxkykvlh.execute-api.us-east-2.amazonaws.com/DEV/'+id

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': AUTHORIZATION_TOKEN, // Add the Authorization header
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.text(); // Use `text()` in case the response isn't JSON
        setResponse(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Debug Page</h1>
      <p><strong>Endpoint:</strong> {API_ENDPOINT} </p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Response:</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default DebugPage;
