import { Component, useEffect, useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  NavLink as RRNavLink,
} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import { socketContext } from './Context/socket';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Select,
  Container,
  Spinner,
  Box,
  Button
} from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

function App() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [page, setPage] = useState(1)
  const [message, setMessage] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ticketInfo, setTicketInfo] = useState({})

  const socket = useContext(socketContext)
  console.log(page)
  if (Object.keys(data).length > 0) {
    console.log(data[page])
  }

  useEffect(() => {

    socket.emit('fetchData')

    socket.on('retreiveData', ({d}) => {
      console.log(d)

      setData(d)
      setMessage('')
      setLoading(false)
    })

    socket.on('retreiveError', ({e}) => {
      console.log(e)
      setMessage(e)
      setLoading(false)
    })

  }, [])

  const setDetails = (assignee, id, subject, description, organization) => {

    const details = {
      "assignee": assignee,
      "id": id,
      "subject": subject,
      "description": description,
      "organization": organization
    }

    console.log(details)

    setTicketInfo(details)
    onOpen()
  }

  const getLocalDate = (d) => {
    const event = new Date(d)
    return event.toLocaleDateString()
  }

  console.log(ticketInfo)

  if (loading) {
    return (
      <>
        <Navbar />
        <Spinner style={{marginLeft: '2%'}} />
      </>
    )
  } else if (message) {
    return (
      <>
        <Navbar />
        <Box ml="2%">
          {message}
        </Box>
      </>
    )
  } else {
      return (
        <Router>
            <>
              <Navbar />
              <Box w="90%" m="auto" mt="4%">
                <Select w="15%" ml="5%" onChange={(e) => setPage(e.target.value)}>
                  {Object.keys(data).map((k) => {
                    if (data[k].length > 0) {
                      return <option value={k}>{"Page " + k}</option>
                    }
                  })}
                </Select>
                <Table variant='simple' style={{width: "90%", margin: 'auto', marginBottom: '5%', marginTop: "3%"}}>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Subject</Th>
                      <Th isNumeric>Updated</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data[page].map((info) => {
                      return (                    
                        <Tr 
                        onClick={() => setDetails(info.assignee_id, info.id, info.subject, info.description, info.organization_id)}
                        _hover={{
                          cursor: "pointer",
                          background: "#E2E8F0"
                        }}
                        >
                        <Th>{info.id}</Th>
                        <Th>{info.subject}</Th>
                        <Th isNumeric>{getLocalDate(info.updated_at)}</Th>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </Box>
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
            </>
        </Router>
      );
  }

  
}

export default App;
