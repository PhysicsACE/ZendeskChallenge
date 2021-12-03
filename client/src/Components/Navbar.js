import React from "react";
import { Flex } from "@chakra-ui/layout";

const Navbar = () => {
    
    return (
        <Flex
        as="nav"
        align="center"
        alignContent="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        h="70px"
        mb={8}
        p={8}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
        color={["black", "black", "primary.700", "primary.700"]}
        fontSize="24"
        boxShadow="0px 3px 3px #888888">
            Zendesk Ticket Viewer
        </Flex>
    )
}

export default Navbar