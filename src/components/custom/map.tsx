import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

interface Well {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
  production_rate: number;
  emissions: number;
}

const MapComponent: React.FC = () => {
  const [wells, setWells] = useState<Well[]>([]);
  const [selectedWell, setSelectedWell] = useState<Well | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch API without Base64 encoding
  const callLambdaAPI = async () => {
    const rawToken = process.env.NEXT_PUBLIC_AUTHORIZED_TOKEN || '';

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
        method: 'GET',
        mode: 'cors', // Important for CORS
        headers: {
          'Authorization': `Bearer ${rawToken}`, // Try adding 'Bearer'
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
      });

      if (response.ok) {
        const result: Well[] = await response.json();
        console.log('Lambda API response:', result);
        setWells(result); // Update wells state with the fetched data
        setError(null); // Clear any previous errors
      } else {
        const errorText = await response.text();
        console.error('Error from Lambda:', errorText);
        setError(`Error: ${errorText}`);
      }
    } catch (err) {
      console.error('Failed to call Lambda API:', err);
      setError('Failed to connect to the API.');
    } finally {
      setLoading(false); // Always stop loading regardless of success/failure
    }
  };

  useEffect(() => {
    // Call the Lambda API
    callLambdaAPI();
  }, []);

  if (loading) {
    return <div>Loading map data...</div>;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <Map
      initialViewState={{
        longitude: -96.7969,
        latitude: 32.7767,
        zoom: 6,
      }}
      style={{ width: '100%', height: '500px' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      {wells.map((well) => (
        <Marker
          key={well.id}
          longitude={well.longitude}
          latitude={well.latitude}
          onClick={() => setSelectedWell(well)}
        >
          <div role="img" aria-label="Well Marker">
            📍
          </div>
        </Marker>
      ))}

      {selectedWell && (
        <Popup
          longitude={selectedWell.longitude}
          latitude={selectedWell.latitude}
          closeOnClick={false}
          onClose={() => setSelectedWell(null)}
        >
          <div>
            <h3>{selectedWell.name}</h3>
            <p>Status: {selectedWell.status}</p>
            <p>Production: {selectedWell.production_rate} bbl/day</p>
            <p>Emissions: {selectedWell.emissions} tons CO₂</p>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default MapComponent;
