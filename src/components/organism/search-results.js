import React,{useEffect,useState} from 'react'
import styled from "styled-components";
import {Container} from "@material-ui/core"
import Cards from "../molecules/cards-sm"
import axios from "axios";
const Div = styled.div`
padding:60px 0px;
h2{
    text-align:center;
}
.grid-search{
    display:flex;
    flex-wrap:wrap;
    justify-content:start;
    gap:10px;
}
`
const SearchResults = ({query}) => {
    const [data, setData] = useState({})
    useEffect(()=>{
        var FilterData = {
            themes:         query.Themes?query.Themes.toString():null,
            languages:      query.Languages?query.Languages.toString():null,
            targetAudience: query.TargetAudience?query.TargetAudience.toString():null,
            mediaType:      query.MediaType? query.MediaType.toString():null,
            source:         query.Source?query.Source.toString():null,
          }
          axios.post("/getFilteredInfo", FilterData).then((res) => {
              
              var l = res.data.length;
              var ans=0;
              if(l%8) ans++;
              ans+=Math.floor(l/8);
              console.log(res)
                setData({
                   post:res.data,
                   pageno:1,
                   totalpage:ans, 
                })
            })
    },[])  
    return (
        <Div>
            <Container>
                <div className="grid-search">
                    {data.post&&data.post.length>0? 
                        data.post.map(post=> <Cards post={post} key={post.postId} />)
                    :<h2>Sorry We are not able to find Data</h2>}
                </div>
            </Container>
        </Div>
    )
}

export default SearchResults
