import React, { useEffect, useState } from 'react';

interface DebugPageProps2 {
  id: string; // Define the id prop in the interface
}

const DebugPage2: React.FC<DebugPageProps2> = ({ id }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const BACKEND_API_ENDPOINT = 'https://wellness2195-98f4770822ff.herokuapp.com/api/aws-proxy'; // Local backend route

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(BACKEND_API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), // Send ID to the backend
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const responseData = await res.json(); // Parse the JSON response
        const bodyContent = JSON.parse(responseData.body); // Parse the body content (since it's a stringified JSON)
        
        setResponse(bodyContent); // Set the extracted content in state
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Unknown error');
          }
        }
    };

    fetchData();
  }, [id]); // Include `id` as a dependency for useEffect

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Debug Page</h1>
      <p><strong>Backend Endpoint:</strong> {BACKEND_API_ENDPOINT} </p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Response:</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default DebugPage2;
