import React, { useState } from 'react';

interface DebugPageProps {
  id: string;
}

const DebugPage1: React.FC<DebugPageProps> = ({ id }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const API_ENDPOINT =
    'https://wellness2195-98f4770822ff.herokuapp.com/api/aws-proxy';

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

<<<<<<< Updated upstream
        const data = await res.text(); // Use `text()` in case the response isn't JSON
        setResponse(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
=======
    if (file.type !== 'image/png') {
      setError('Only PNG files are allowed.');
      return;
    }
>>>>>>> Stashed changes

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    setLoading(true);
    setError(null);
    setPdfBlobUrl(null);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get('Content-Type');
      if (contentType !== 'application/pdf') {
        throw new Error(`Expected PDF file, but got: ${contentType}`);
      }

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);
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
      <h1>API Debug Page (PNG → PDF)</h1>
      <p>
        <strong>Endpoint:</strong> {API_ENDPOINT}
      </p>

      <input
        type="file"
        accept="image/png"
        onChange={handleFileChange}
        disabled={loading}
      />

      {loading && <p>Uploading and processing...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {pdfBlobUrl && (
        <div style={{ marginTop: '20px' }}>
          <a href={pdfBlobUrl} download="output.pdf">
            Download PDF File
          </a>
        </div>
      )}
    </div>
  );
};

export default DebugPage1;
