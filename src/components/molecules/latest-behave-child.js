import React from 'react'
import styled from "styled-components"
import ViewAllBtn from "../atom/view-all-btn"
import Cards from "../molecules/cards-sm"
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
const LatestBehaveChild = ({title,data,status}) => {
    return (

            <Div className="child">
                  <h3><strong>{title}</strong></h3>
                  {
                    status==="pending"?
                        <h3 className="message">We Are Getting Your data ...</h3>
                       :(
                           status==="success"?
                            <div className="child-grid">
                                { data.map((a,i)=> <Cards post={a} key={i}/>) }
                            </div>
                            :<h3 className="message">Unable to find Your Data ...</h3>
                       ) 
                }
                  <ViewAllBtn url={"/search?Theme=any"}/>
            </Div>
    )
}

export default LatestBehaveChild
