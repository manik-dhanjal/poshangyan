import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"

const Div = styled.div`
    padding-right:20px;
    text-align:right;
    margin-top:10px;
    a{
        color:black;
    }
`
const ViewAllBtn = ({url}) => {
    return (
        <Div>
            <Link to={url}>View All <i className="chevron right icon"></i></Link>
        </Div>
    )
}

export default ViewAllBtn
