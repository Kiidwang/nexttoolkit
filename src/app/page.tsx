  "use client"
  import React, { useState } from "react";
  import styles from "./page.module.css";
  import {
    DrawerRoot,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerActionTrigger,
  } from "@/components/ui/drawer";
  import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
  import { Avatar, AvatarGroup } from "@/components/ui/avatar"
  import { Button, VStack, HStack, Flex, Text, Box, Separator, IconButton } from "@chakra-ui/react";
  import { useRouter } from "next/navigation"; // If using Next.js for navigation

  type Tool = {
    id: number;
    title: string;  
    description: string;
    buttonLabel: string;
    href: string;
  };

  // Define the tools as an array of objects
  const tools: Tool[] = [
    {
      id: 1,
      title: "PNG to PDF Converter",
      description: "This app converts all your PNG files to PDF.",
      buttonLabel: "Open PNG to PDF Converter",
      href: "/tools/1",
    },
    {
      id: 2,
      title: "PDF to Excel Converter",
      description: "This app converts PDF to Excel.",
      buttonLabel: "Open PDF to Excel Converter",
      href: "/tools/2",
    },
    {
      id: 3,
      title: "Latest Weather",
      description: "This app grabs latest weather from three countries of your choosing.",
      buttonLabel: "Open Latest Weather",
      href: "/tools/3",
    },
    {
      id: 4,
      title: "Crypto Currency Price Pull",
      description: "This app pull in Crypto Currency Prices from three Currencies of your choosing.",
      buttonLabel: "Open Crypto Currency Price Pull",
      href: "/tools/4",
    },
    {
      id: 5,
      title: "Check Crypto Wallets",
      description: "This app allows you to view Ethereum tokens of three Ethereum Wallets of your choosing.",
      buttonLabel: "Open Tool Check Crypto Wallets",
      href: "/tools/5",
    },
    {
      id: 6,
      title: "Kaggle AI Prediction",
      description: "This app allows you to upload Kaggle Data and have AI predict the outcome of that said Data",
      buttonLabel: "Open Kaggle Data and have AI create prediciton after prompt (Open AI API Calls, please login)",
      href: "/tools/6",
    },
  ];

  export default function Home() {
    type OpenChangeDetails = {
      open: boolean;
      // ... any other properties
    };
    
    const handleOpenChange = (details: OpenChangeDetails) => {
      setIsDrawerOpen(details.open);
    };
    
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // New state for sidebar toggle
    const router = useRouter(); // For navigation

    // Handler to open Drawer with selected tool
    const handleOpenDrawer = (tool: Tool) => {
      setSelectedTool(tool);
      setIsDrawerOpen(true);
    };

    // Handler to close Drawer
    const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
      setSelectedTool(null);
    };

    // Handler for Save button navigation
    const handleSave = () => {
      if (selectedTool) {
        router.push(selectedTool.href);
      }
    };

    // Toggle Sidebar Function
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    return (
      <Box className={styles.page}>
      {isSidebarOpen && (
      <Flex
        direction="column"
        align="flex-start"
        p={isSidebarOpen ? 4 : 2} // Adjust padding to make the transition smoother
        w={{
          base: isSidebarOpen ? '80%' : '50px', // For mobile devices (base and small screens)
          md: isSidebarOpen ? '25%' : '50px',   // For medium screens and above (e.g., tablets, desktops)
        }}
        h="100vh"
        boxShadow="md"
        transform={isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'}
        opacity={isSidebarOpen ? 1 : 0.5} // Reduced opacity when closed for a soft effect
        transition="all 1.5s ease-in-out" // Increased duration for smooth, gradual transition
      >
        {/* Logo Section */}
        <HStack gap={5} mb={5} whiteSpace="normal" textAlign="center" paddingRight={'25%'}>
          {/* Replace with your logo image if available */}
          <Avatar size="md" src="/assets/avatar/avatar.webp" />
          <Text fontSize="xl" fontWeight="bold">
            development@deoxp.ca
          </Text>
        </HStack>
        {/* Separator */}
        <Separator marginBottom={'10%'}/>
        <VStack gap={4} align="stretch">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant="outline"
              size="sm"
              onClick={() => handleOpenDrawer(tool)}
              justifyContent="flex-start"
            >
              {tool.title}
            </Button>
          ))}
        </VStack>
        </Flex>
      )}

      <IconButton
        aria-label="Toggle Sidebar"
        position="fixed"
        bottom="50%"
        left={{base: isSidebarOpen ? '80%' : '10px', // For mobile devices (base and small screens)
          md: isSidebarOpen ? '25%' : '10px',}}   // For medium screens and above (e.g., tablets, desktops)
        zIndex="30" // Ensure button is above the sidebar
        size="md"
        borderRadius="full"
        onClick={toggleSidebar}
        bg="gray.700"
        color="white"
        _hover={{ bg: 'gray.600' }}
        boxShadow="lg"
        transition="left 0.3s ease-in-out" // Smooth transition for button movement
      >
        {isSidebarOpen ? <FiChevronLeft /> : <FiChevronRight />} {/* Correct usage: icon as child */}
      </IconButton>
        {/* Single Drawer Instance */}
        <DrawerRoot open={isDrawerOpen} onOpenChange={handleOpenChange}>
          <DrawerBackdrop />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{selectedTool?.title}</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <p>{selectedTool?.description}</p>
            </DrawerBody>
            <DrawerFooter justifyContent="space-between">
              <DrawerActionTrigger asChild onClick={handleCloseDrawer}>
                <Button variant="outline" paddingTop={'10%'} paddingBottom={'10%'}>Cancel</Button>
              </DrawerActionTrigger>
              <Button colorScheme="blue" paddingTop={'10%'} paddingBottom={'10%'} flex="1" whiteSpace="normal" wordBreak="break-word" textAlign="center"  onClick={handleSave}>
                {selectedTool?.buttonLabel}
              </Button>
            </DrawerFooter>
            <DrawerCloseTrigger onClick={handleCloseDrawer} />
          </DrawerContent>
        </DrawerRoot>
      </Box>
    );
  }
