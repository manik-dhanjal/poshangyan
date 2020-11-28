import React from 'react'
import styled from "styled-components"
import MuiGrid from "@material-ui/core/Grid";

const Div = styled.div`
width:50%;
margin:30px 0;
padding:30px 0;
h3{
  text-align:center;
  margin-bottom:10px;
}
.child-grid{
  display:flex;
  justify-content:center;
}
`
const LatestBehaveChild = ({title,data}) => {
    return (

            <Div className="child">
                  <h3><strong>{title}</strong></h3>
                  <div className="child-grid">
                    {data}
                  </div>
            </Div>
    )
}

export default LatestBehaveChild
