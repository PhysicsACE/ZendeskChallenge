import React from "react";
import {Select} from '@chakra-ui/react'

const PageSelect = ({dic, setPage}) => {
    return (
        <Select w="15%" ml="5%" onChange={(e) => setPage(e.target.value)}>
            {Object.keys(dic).map((k) => {
                if (dic[k].length > 0) {
                    return <option value={k}>{"Page " + k}</option>
                }
            })}
        </Select>
    )
}

export default PageSelect