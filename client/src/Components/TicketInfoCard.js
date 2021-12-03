import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button
  } from '@chakra-ui/react'

const TicketInfoCard = ({isOpen, onClose, ticketInfo}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {"Assignee: " + ticketInfo.assignee}
                </ModalHeader>
                <ModalBody>
                    {"Organization: " + ticketInfo.organization}
                </ModalBody>
                <ModalBody>
                    {"Subject: " + ticketInfo.subject}
                </ModalBody>
                <ModalBody>
                    {ticketInfo.description}
                </ModalBody>
                <ModalFooter>
                    <Button bg="#A0AEC0" onClick={onClose} mr={3} style={{marginBottom: "5%"}}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default TicketInfoCard