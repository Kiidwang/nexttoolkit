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
  import { Separator } from "@chakra-ui/react"
  import {MenuSeparator} from "@/components/ui/menu"
  import { Avatar, AvatarGroup } from "@/components/ui/avatar"
  import { Button, VStack, HStack, Flex, Text,  } from "@chakra-ui/react";
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
      title: "Check Crypto Wallets",
      description: "This app allows you to view Ethereum tokens of three Ethereum Wallets of your choosing.",
      buttonLabel: "Open Tool Check Crypto Wallets",
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

    return (
      <div className={styles.page}>
      <Flex
        direction="column"
        align="flex-start"
        p={4}
        w="250px"
        h="100vh"
        boxShadow="md"
        position="fixed"
      >
        {/* Logo Section */}
        <HStack gap={3} mb={4} >
          {/* Replace with your logo image if available */}
          <Avatar size="md" src="/path-to-logo.png" />
          <Text fontSize="xl" fontWeight="bold">
            MyApp
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
      </div>
    );
  }
