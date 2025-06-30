import React, { useState } from 'react';

interface DebugPageProps {
  id: string;
}

const DebugPage2: React.FC<DebugPageProps> = ({ id }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [excelBlobUrl, setExcelBlobUrl] = useState<string | null>(null);

  const API_ENDPOINT =
    'https://wellness2195-98f4770822ff.herokuapp.com/api/aws-proxy';

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

<<<<<<< Updated upstream
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
=======
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }
>>>>>>> Stashed changes

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    setLoading(true);
    setError(null);
    setExcelBlobUrl(null);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get('Content-Type');
      if (
        contentType !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        throw new Error(
          `Expected Excel file, but got: ${contentType}`
        );
      }

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      setExcelBlobUrl(blobUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Debug Page (PDF → Excel)</h1>
      <p>
        <strong>Endpoint:</strong> {API_ENDPOINT}
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={loading}
      />

      {loading && <p>Uploading and processing...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {excelBlobUrl && (
        <div style={{ marginTop: '20px' }}>
          <a href={excelBlobUrl} download="output.xlsx">
            Download Excel File
          </a>
        </div>
      )}
    </div>
  );
};

export default DebugPage2;
