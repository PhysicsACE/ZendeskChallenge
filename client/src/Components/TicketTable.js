import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th
  } from '@chakra-ui/react'

const TicketTable = ({dic, page, setDetails}) => {

    const getLocalDate = (d) => {
        const event = new Date(d)
        return event.toLocaleDateString()
    }

    return (
        <Table variant='simple' style={{width: "90%", margin: 'auto', marginBottom: '5%', marginTop: "3%"}}>
            <Thead>
            <Tr>
                <Th>ID</Th>
                <Th>Subject</Th>
                <Th isNumeric>Updated</Th>
            </Tr>
            </Thead>
            <Tbody>
            {dic[page].map((info) => {
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
    )
}


export default TicketTable