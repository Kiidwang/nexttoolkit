import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Chakra from "@chakra-ui/react";
import { Avatar, Button, Card, Heading } from "@chakra-ui/react"

export interface CityResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}

interface CitySearchProps {
  onCitySelect: (city: CityResult) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<{ results: CityResult[] }>(
          'https://geocoding-api.open-meteo.com/v1/search',
          {
            params: {
              name: query,
              count: 5,
              language: 'en',
            },
          }
        );

        setResults(response.data.results || []);
      } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
}
    }, 300); // debounce delay in ms

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <Chakra.Box mb={5} position="relative" maxW="400px">
<Card.Root size="sm">
        <Card.Header>
          <Heading size="md"> Latest Weather </Heading>
        </Card.Header>
        <Card.Body color="fg.muted">
          This app grabs latest weather from three cities of your choosing.
        </Card.Body>
      </Card.Root>
      <Chakra.Input
        placeholder="Search City"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && (
        <Chakra.Text fontSize="sm" mt={2}>
          Searching...
        </Chakra.Text>
      )}

      {error && (
        <Chakra.Text fontSize="sm" color="red.500" mt={2}>
          Error: {error}
        </Chakra.Text>
      )}

      {results.length > 0 && (
        <Chakra.Stack
            mt={2}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            bg="blackAlpha.50"
            shadow="md"
            zIndex="popover"
            width="100%"
        >

          {results.map((city, i) => (
            <Chakra.Box
              key={i}
              px={4}
              py={2}
              _hover={{ bg: "gray.500" }}
              cursor="pointer"
              onClick={() => {
                onCitySelect(city);
                setQuery('');
                setResults([]);
              }}
            >
              <Chakra.Text>{city.name}, {city.country}</Chakra.Text>
            </Chakra.Box>
          ))}
        </Chakra.Stack>
      )}
    </Chakra.Box>
  );
};

export default CitySearch;
