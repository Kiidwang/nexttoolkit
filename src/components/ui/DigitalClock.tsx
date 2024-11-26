import React from "react";
import { Box, Text } from "@chakra-ui/react";

const DigitalClock = () => {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock(); // Initial call
    const timerId = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);

  return (
  <Box
    position="fixed"
    top={{ base: "auto", md: "50%" }} // At the bottom for mobile, centered for larger screens
    bottom={{ base: "10%", md: "auto" }} // 10% from the bottom for mobile
    left="50%" // Horizontally centered for all screen sizes
    transform={{ base: "translateX(-50%)", md: "translate(-50%, -50%)" }} // Adjust transform based on screen size
    bg="black"
    color="limegreen"
    px={4}
    py={2}
    fontFamily="'Pixelify Sans', monospace" // Apply Pixelify Sans here
    fontSize="4xl"
    fontWeight="bold"
    borderRadius="md"
    boxShadow="lg"
    zIndex={1000}
    border="2px solid limegreen"
  >
    <Text>{time}</Text>
  </Box>
  );
};

export default React.memo(DigitalClock);
