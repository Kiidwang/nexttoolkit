"use client";

import { useParams, useRouter } from 'next/navigation';
import { Box, Badge, Separator, Text, Button  } from "@chakra-ui/react";
import MapComponent from '@/components/custom/7';
import DebugPage1 from '@/components/custom/1';
import DebugPage2 from '@/components/custom/2';
import DebugPage3 from '@/components/custom/3'; 

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
     {  
      id === '3' ? (
        <>
      <Badge colorPalette='pink'>TESTING API</Badge><DebugPage3 id = {id}/>
      </>
      ):
      id === '2' ? (
        <>
      <Badge colorPalette='pink'>TESTING API</Badge><DebugPage2 id = {id}/>
      </>
      ):
      id === '1' ? (
        <>
      <Badge colorPalette='pink'>TESTING API</Badge><DebugPage1 id = {id}/>
      </>
      ):
      <>
      <Badge colorPalette='pink'>WORK IN PROGRESS</Badge>
      <Text margin={'1%'}>You are viewing the tool with ID: {id}, this is still being worked on. Please come back later</Text>
      <Button 
        mt={4} // Add margin to the top of the button
        colorScheme="blue" // Chakra's color scheme for the button
        onClick={handleGoBack} // Navigate back when clicked
      >
        Back to Home
      </Button>
      </>
      }
    </Box>
  );
};

export default ToolPage;
