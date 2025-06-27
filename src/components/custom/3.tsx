import React, { useEffect, useState } from 'react';
import CitySearch, { CityResult } from '@/components/apiTools/citySearch';
import {
  Box,
  Heading,
  Table
} from "@chakra-ui/react";



interface DebugPageProps3 {
  id: string;
}

const DebugPage3: React.FC<DebugPageProps3> = ({ id }) => {
  const [selectedCities, setSelectedCities] = useState<CityResult[]>([]);
  const [response, setResponse] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const BACKEND_API_ENDPOINT = 'https://wellness2195-98f4770822ff.herokuapp.com/api/aws-proxy';

  const fetchWeather = async (cities: CityResult[]) => {
    if (cities.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const cityNames = cities.map((c) => c.name);

      const res = await fetch(BACKEND_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, cities: cityNames }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const responseData = await res.json();
      const parsedBody = JSON.parse(responseData.body);

      setResponse(parsedBody);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city: CityResult) => {
    const alreadySelected = selectedCities.some(
      (c) => c.name === city.name && c.country === city.country
    );

    if (!alreadySelected) {
      const updatedCities = [...selectedCities, city];
      setSelectedCities(updatedCities);
      fetchWeather(updatedCities); // auto-fetch on each new selection
    }
  };

  type CityWeatherData = {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };

  type WeatherResponse = {
    [city: string]: CityWeatherData;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <CitySearch onCitySelect={handleCitySelect} />

      {selectedCities.length > 0 && (
        <div>
          <h4>Selected Cities:</h4>
          <ul>
            {selectedCities.map((c, i) => (
              <li key={i}>{c.name}, {c.country}</li>
            ))}
          </ul>
        </div>
      )}

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {response && (
        <Box mt={6}>
          <Heading as="h3" size="md" mb={4}>
            Weather Response
          </Heading>

          <Table.ScrollArea borderWidth="1px" rounded="md" height="240px">
            <Table.Root size="sm" stickyHeader>
              <Table.Header>
                <Table.Row bg="bg.subtle">
                  <Table.ColumnHeader>City</Table.ColumnHeader>
                  <Table.ColumnHeader>Time</Table.ColumnHeader>
                  <Table.ColumnHeader>Temperature (°C)</Table.ColumnHeader>
                  <Table.ColumnHeader>Humidity (%)</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Wind Speed (km/h)</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {Object.entries(response as WeatherResponse).map(([city, data]) => (
                  <Table.Row key={city}>
                    <Table.Cell>{city}</Table.Cell>
                    <Table.Cell>{data.time}</Table.Cell>
                    <Table.Cell>{data.temperature_2m}</Table.Cell>
                    <Table.Cell>{data.relative_humidity_2m}</Table.Cell>
                    <Table.Cell textAlign="end">{data.wind_speed_10m}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Box>
      )}
    </div>
  );
};

export default DebugPage3;
