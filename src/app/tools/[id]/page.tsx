"use client";

import { useParams, useRouter } from 'next/navigation';
import { Box, Badge, Separator, Text, Button  } from "@chakra-ui/react";

const ToolPage = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const router = useRouter()
  
  const handleGoBack = () => {
    router.push('/'); // Navigate back to the root
  };
  return (
    
    <Box 
    
      rounded="md" // Add rounded corners
      borderWidth="1px" // Optional border
      p={4} // Padding inside the box
      boxShadow="md" // Add a shadow for depth
    >
      <Badge colorPalette='pink'>WORK IN PROGRESS</Badge>
      <Text margin={'1%'}>You are viewing the tool with ID: {id}, this is still being worked on. Please come back later</Text>
      <Button 
        mt={4} // Add margin to the top of the button
        colorScheme="blue" // Chakra's color scheme for the button
        onClick={handleGoBack} // Navigate back when clicked
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default ToolPage;
