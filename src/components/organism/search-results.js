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
        totalPost:0,
        status:"pending",
    })
    const handlePageChange = (e,i) =>{
      fetchPage(query,i.activePage)
    //   setData({...data,pageno:i.activePage}) 
    }
    const AllToAnyHandler = (query) =>{
        const newQuery = {};
        for(const key in query){
             newQuery[key] = [];
            for(const arrItem of query[key]){

                if( arrItem.includes("All") ){
                    newQuery[key].push('Any')
                }else if(arrItem.includes("Other")){
                    newQuery[key].push('others')
                }
                else{
                    newQuery[key].push(arrItem)
                }
            }
        }
        return newQuery;
    }
    const fetchPage = async (rawQuery,pageNo=1) =>{

        const newQuery = AllToAnyHandler(rawQuery);
        var FilterData = {
            themes:         newQuery.Themes?newQuery.Themes.toString():null,
            languages:      newQuery.Languages?newQuery.Languages.toString():null,
            targetAudience: newQuery.TargetAudiences?newQuery.TargetAudiences.toString():null,
            mimetype:       newQuery.MediaType? newQuery.MediaType.toString():null,
            source:         newQuery.Sources?newQuery.Sources.toString():null,
          }
          try{
            setData({
                post:[],
                pageno:pageNo,
                totalpage:data.totalpage, 
                totalPost:data.totalPost,
                status:"pending"
             })

            const res = await axios.post("/getFilteredInfo", {filter:FilterData,page:pageNo,sort:rawQuery.sort})
              
              setData({
                 post:res.data.post,
                 pageno:res.data.currentPage,
                 totalpage:res.data.totalPage, 
                 totalPost:res.data.totalPost,
                 status:"success"
              })
            }
            catch(error){
                console.log(error)
                setData({
                    status:"failed",
                })
            }
        }
        useEffect(()=>{
            console.log(data)
        },[data])
    useEffect(()=>{ 
        console.log("trigered",query)
        fetchPage(query)
    },[query])  
    return (
        <Div>
            <Container>
                <ShowSearchResult query={query} postNo={data.totalPost}/>
                    {
                        
                        data.status==="pending"?
                        <PreSearchPost dummy={12}/>
                        :(
                          (data.status==="success"&&data.post.length)?
                          <>
                            <div className="grid-search">
                            { data.post.map(post => <Cards post={post} key={post.postId} fromPos={true} />)}
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
