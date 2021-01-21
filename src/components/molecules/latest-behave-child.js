import React from 'react'
import styled from "styled-components"
import ViewAllBtn from "../atom/view-all-btn"
import Cards from "../molecules/cards-sm"
import PreSearchPost from "../molecules/searching-post"

const Div = styled.div`
width:50%;
margin:30px 0;
padding:30px 0;
h3{
  text-align:center;
  margin-bottom:10px;
}
.child-grid,.arrange-me{
  display:flex;
  justify-content:center;
  &>div{
    margin:20px 10px;
  }
}
@media screen and (max-width: 1024px){
  width:100%;
  .child-grid,.arrange-me{
    display:flex;
    justify-content:center;
  }
}
@media screen and (max-width:700px){
  .child-grid>div:nth-child(2),.arrange-me>div:nth-child(2){
    display:none
  }
}
`
const LatestBehaveChild = ({title,data,status,url}) => {
    return (

            <Div className="child">
                  <h3><strong>{title}</strong></h3>
                  {
                    status==="pending"?
                    <PreSearchPost dummy={2}/>
                       :(
                           status==="success"?
                            <div className="child-grid">
                                { data.map((a,i)=> <Cards post={a} key={i}/>) }
                            </div>
                            :<h3 className="message">No files found for selected filters ...</h3>
                       ) 
                }
                  <ViewAllBtn url={url}/>
            </Div>
    )
}

export default LatestBehaveChild
