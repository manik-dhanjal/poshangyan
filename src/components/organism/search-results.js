import React,{useEffect,useState} from 'react'
import styled from "styled-components";
import {Container} from "@material-ui/core"
import Cards from "../molecules/cards-sm"
import axios from "axios";
const Div = styled.div`
padding:60px 0px;

.grid-search{
    display:flex;
    flex-wrap:wrap;
    justify-content:start;
    h2{
        text-align:center;
    }
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
              var sortedRes;
              
              switch(query.sort?query.sort[0]:""){
                case "download":{
                    sortedRes = res.data.sort((a,b)=> b.downloadsCount-a.downloadsCount)
                    break;
                }
                case "date":{
                    sortedRes = res.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt) )
                    break;
                }
                default:{
                    sortedRes = res.data.sort((a,b)=> b.downloadsCount-a.downloadsCount)
                }
            }
                setData({
                   post:sortedRes,
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
                        data.post.map(post=> <Cards post={post} key={post.postId} fromPos={true}/>)
                    :<h2>Getting Search results ...</h2>}
                </div>
            </Container>
        </Div>
    )
}

export default SearchResults
