import React,{useEffect,useState} from 'react'
import styled from "styled-components";
import {Container} from "@material-ui/core"
import Cards from "../molecules/cards-sm"
import axios from "axios";
import PreSearchPost from "../molecules/searching-post"
import {Pagination} from "semantic-ui-react"
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
.message{
    text-align:center;
}
`
const SearchResults = ({query}) => {
    const [data, setData] = useState({
        post:[],
        pageno:1,
        totalpage:1, 
        status:"pending"
    })
    const handlePageChange = (e) =>{
        console.log(e)
    }
    useEffect(()=>{
        (async ()=>{
            var FilterData = {
                themes:         query.Themes?query.Themes.toString():null,
                languages:      query.Language?query.Language.toString():null,
                targetAudience: query.TargetAudience?query.TargetAudience.toString():null,
                mediaType:      query.MediaType? query.MediaType.toString():null,
                source:         query.Source?query.Source.toString():null,
              }
              try{
                const res = await axios.post("/getFilteredInfo", FilterData)
                  
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
                     status:"success"
                  })
              }
              catch{
                  setData({
                      status:"fail",
                      post:[],
                      pageno:1,
                      totalpage:1, 
                  })
              }
        })()
    },[])  
    return (
        <Div>
            <Container>

                {console.log(data)}
                    {
                        // data.post&&data.post.length>0? 
                        //     data.post.map(post=> <Cards post={post} key={post.postId} fromPos={true}/>)
                        // :<h2>Getting Search results ...</h2>
                        
                        data.status==="pending"?
                        <PreSearchPost row={3}/>
                        :(
                          (data.status==="success"&&data.post.length)?
                          <>
                            <div className="grid-search">
                            { data.post.map(post=> <Cards post={post} key={post.postId} fromPos={true}/>)}
                            </div>  
                            <Pagination
                            boundaryRange={0}
                                defaultActivePage={data.pageNo}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={data.totalPage}
                                onPageChange={handlePageChange}
                            />
                         </>
                          : <h3 className="message"> Unable to Find your post ...</h3>
                        )
                    }
            </Container>
        </Div>
    )
}

export default SearchResults
