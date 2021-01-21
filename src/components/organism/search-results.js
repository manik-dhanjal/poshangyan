import React,{useEffect,useState} from 'react'
import styled from "styled-components";
import {Container} from "@material-ui/core"
import Cards from "../molecules/cards-sm"
import axios from "axios";
import PreSearchPost from "../molecules/searching-post"
import { Icon,Pagination} from "semantic-ui-react"
import ShowSearchResult from "../molecules/show-search-result"
import SortFilterBtn from "../molecules/sort-filter-btn"
const Div = styled.div`
padding:60px 0px;
justify-content:space-between;
.grid-search,.arrange-me{
    display:grid;
    justify-content:center;
    grid-template-columns:repeat(4,300px);
    h2{
        text-align:center;
    }
}
.message{
    text-align:center;
}
.pagination-custom>div{
    margin:30px auto !important;
    display: -webkit-box!important;
    width: min-content;
    &>a[type="prevItem"],&>a[type="nextItem"]{
        background: #ff425e80 !important;
        width: 20px;
        padding: 0px;
        color: white;
        &:hover{
            background: #ff425e !important;
            color:white!important;
        }
    }
    &>a{
        border-radius: 50%!important;
        justify-content:center;
        cursor:pointer;
        &.active{
            background:none!important;
            color: #ff425e!important;
        }
        &:hover{
            background:none !important;
        }
    }

}
@media screen and (max-width:1024px){
    .grid-search,.arrange-me{
        grid-template-columns:repeat(3,300px);
    }
}
@media screen and (max-width:991px){
    .grid-search,.arrange-me{
        grid-template-columns:repeat(2,300px);
    }
}
@media screen and (max-width:630px){
    .grid-search,.arrange-me{
        grid-template-columns:repeat(1,300px);
    }
}
`
const SearchResults = ({query}) => {
    const [data, setData] = useState({
        post:[],
        pageno:1,
        totalpage:1, 
        status:"pending"
    })
    const handlePageChange = (e,i) =>{
      setData({...data,pageno:i.activePage}) 
    }
    const AllToAnyHandler = (query) =>{
        const newQuery = {};
        // console.log(query);
        for(const key in query){
             newQuery[key] = [];
            for(const arrItem of query[key]){

                if( arrItem.includes("All") ){
                    newQuery[key].push('Any')
                }else if(arrItem.includes("Other")){
                    console.log(arrItem)
                    newQuery[key].push('others')
                }
                else{
                    newQuery[key].push(arrItem)
                }
            }
        }
        return newQuery;
    }
    useEffect(()=>{
        (async ()=>{
            const newQuery = AllToAnyHandler(query);
            console.log(newQuery)
            var FilterData = {
                themes:         newQuery.Themes?newQuery.Themes.toString():null,
                languages:      newQuery.Languages?newQuery.Languages.toString():null,
                targetAudience: newQuery.TargetAudiences?newQuery.TargetAudiences.toString():null,
                mimetype:       newQuery.MediaTypes? newQuery.MediaTypes.toString():null,
                source:         newQuery.Sources?newQuery.Sources.toString():null,
              }
              try{
                setData({
                    post:[],
                    pageno:1,
                    totalpage:1, 
                    status:"pending"
                 })
                const res = await axios.post("/getFilteredInfo", FilterData)
                  
                var l = res.data.length;
                var ans=0;
                if(l%12) ans++;
                ans+=Math.floor(l/12);
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
    },[query])  
    return (
        <Div>
            <Container>
                <ShowSearchResult query={query} postNo={data.post.length}/>
                    {
                        
                        data.status==="pending"?
                        <PreSearchPost dummy={12}/>
                        :(
                          (data.status==="success"&&data.post.length)?
                          <>
                            <div className="grid-search">
                            { data.post.slice((data.pageno-1)*12,data.pageno*12).map(post=> <Cards post={post} key={post.postId} fromPos={true}/>)}
                            </div>  
                            <div className="pagination-custom">
                                <Pagination
                                    boundaryRange={0}
                                    defaultActivePage={data.pageno}
                                    firstItem={null}
                                    lastItem={null}
                                    ellipsisItem={null}
                                    secondary
                                    siblingRange={1}
                                    totalPages={data.totalpage}
                                    onPageChange={handlePageChange}
                                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                />
                            </div>
                         </>
                          : <h3 className="message"> No files found for selected filters ...</h3>
                        )
                    }
            </Container>
            <SortFilterBtn query={query}/>
        </Div>
    )
}

export default SearchResults
