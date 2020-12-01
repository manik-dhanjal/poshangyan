import React from 'react'
import styled from "styled-components"
import ViewAllBtn from "../atom/view-all-btn"
import Cards from "../molecules/cards-sm"
import { Grid, Image } from 'semantic-ui-react'
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
const LatestBehaveChild = ({title,data,status,url}) => {
    return (

            <Div className="child">
                  <h3><strong>{title}</strong></h3>
                  {
                    status==="pending"?
                    <Grid columns='two' divided style={{padding:"30px 40px"}}>
                      <Grid.Row>
                        <Grid.Column>
                          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                        </Grid.Column>
                        <Grid.Column>
                          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                   

                       :(
                           status==="success"?
                            <div className="child-grid">
                                { data.map((a,i)=> <Cards post={a} key={i}/>) }
                            </div>
                            :<h3 className="message">Unable to find Your Data ...</h3>
                       ) 
                }
                  <ViewAllBtn url={url}/>
            </Div>
    )
}

export default LatestBehaveChild
