import React from 'react'
import styled from "styled-components"
import MuiGrid from "@material-ui/core/Grid";

const Div = styled.div`
width:50%;
margin:30px 0;
padding:30px 0;
h3{
  text-align:center;
  margin-bottom:30px;
}
`
const LatestBehaveChild = ({title,data}) => {
    return (

            <Div className="child">
                  <h3><strong>{title}</strong></h3>
                  <MuiGrid container xs={12} sm={12} lg={12} >
                    {data}
                  </MuiGrid>
            </Div>
    )
}

export default LatestBehaveChild
