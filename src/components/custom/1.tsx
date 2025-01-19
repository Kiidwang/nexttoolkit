import React, { useEffect, useState } from 'react';

const DebugPage: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Replace with your actual token
  const AUTHORIZATION_TOKEN = 'AgsGFSVkZqcoTcaz6EiavPgQLZ1mv72agwFlJGSo2oT1BXxUZoi7gidRMx6wu5gR';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://z4lz1meli0.execute-api.us-east-2.amazonaws.com/crbonLabsTest', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': AUTHORIZATION_TOKEN, // Add the Authorization header
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
      <p><strong>Endpoint:</strong> https://z4lz1meli0.execute-api.us-east-2.amazonaws.com/crbonLabsTest</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Response:</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default DebugPage;
