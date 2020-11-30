import React from 'react'
import styled from "styled-components"
import ViewAllBtn from "../atom/view-all-btn"
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
                  <ViewAllBtn url={"/search?Theme=any"}/>
            </Div>
    )
}

export default LatestBehaveChild
