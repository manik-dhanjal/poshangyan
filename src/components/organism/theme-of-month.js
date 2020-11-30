import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import { Container } from '@material-ui/core';
import ViewAllBtn from "../atom/view-all-btn"
import axios from "axios"
import Cards from "../molecules/cards-sm"
const Div = styled.div`
background:rgb(234,231,199);
padding:60px 0;
h2{
    margin-bottom:20px;
    text-align:center;
}
.grid{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
}
.view{
    text-align:right;
    color:black;
}
`
const ThemeOfMonth = () => {
    var [post,setPost] = useState({
        status:"pending"
    });
       

    useEffect(() => {
        (async () => {
            try{
                var {data} = await   axios.get("/getThemesOfTheMonth");
                setPost({
                    data:data.slice(0,4),
                    status:"success"
                })
            }
             catch(e){
                setPost({
                    data:[],
                    status:"fail"
                })
            }
        })()
      },[])
    return (
        <Div>
            <Container>
                <h2>Theme of the month</h2>
                {
                    post.status==="pending"?
                        <h3 className="message">We Are Getting Your data ...</h3>
                       :(
                           post.status==="success"?
                            <div className="grid">
                                { post.data.map((a,i)=> <Cards post={a} key={i}/>) }
                            </div>
                            :<h3 className="message">Unable to find Your Data ...</h3>
                       ) 
                }
                <ViewAllBtn url={"/search?Theme=any"}/>
            </Container>
        </Div>
    )
}

export default ThemeOfMonth
