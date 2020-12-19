import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import { Container } from '@material-ui/core';
import ViewAllBtn from "../atom/view-all-btn"
import axios from "axios"
import Cards from "../molecules/cards-sm"
import PreSearchPost from "../molecules/searching-post"
const Div = styled.div`
background:white;
padding:60px 0;
&>div>.head{
    margin-bottom:20px;
    text-align:center;
    p{
        margin-top:10px;
        margin-bottom:0;
        font-size:1.3em;
        font-weight:600;
    }
    h2{
        margin-top:10px;
    }
}

.grid-custom{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    &>div{
        justify-self:center;
    }
}
.view{
    text-align:right;
    color:black;
}
@media screen and (max-width:1024px){
    .grid-custom{
        grid-template-columns:repeat(2,300px);
        justify-content:center;
    }
}
@media screen and (max-width:700px){
    .grid-custom{
        grid-template-columns:repeat(1,1fr);
        &>div{
            &:nth-of-type(4),:nth-of-type(3){
                display:none;
            }
        }
    }
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
      const getMonth = () =>{
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        const d = new Date();
        return monthNames[d.getMonth()];
      }
    return (
        <Div>
            <Container>
                <div className='head'>
                    <p>{getMonth()} is the month for Ante Natal Care (ANC) </p>
                    <h2> Theme of The Month: Ante Natal Care (ANC) </h2>
                </div>
                {
                    post.status==="pending"?
                    <PreSearchPost/>
                       :(
                           post.status==="success"?
                            <div className="grid-custom">
                                { post.data.map( ( a,i ) => <Cards post={a} key={i} /> ) }
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
