import React ,{useState,useEffect}from 'react'
import styled from 'styled-components'
import PostCards from '../atom/admin.PostCards'
import { Icon,Pagination} from "semantic-ui-react"
import { formatMs } from '@material-ui/core'

const Div = styled.div`
.show-post{
  padding:20px 0px;
}
.search-cont{
  border:1px solid #bbb;
  display:inline-flex;
  border-radius:5px;
  overflow:hidden;
  margin-top:10px;
  input{
    border:none;
    padding: 8px 10px;
    font-size:1.05em;
  }
  button{
    border:none;
    cursor:pointer;
    font-size:18px;
  }

}
  .single-post{
    display:flex;
    justify-content:space-between;
    padding:10px 20px;
    background:#f4d6cc;
    border-radius:8px;
    margin:15px 0px;
    align-items:center;
    button{
      cursor:pointer;
      border:0px;
      background:#ff425e;
      padding:10px;
      margin-left:15px;
      border-radius:5px;
      color:white;
      i{
        margin:0;
      }
    }
  }
`

const PostsList = ({allPost,handleEditClick}) => {
    const [searchVal,setSearchVal] = useState('');
    const [filteredPost,setFilteredPost] = useState( {
        post:[],
        pageno:1,
        totalpage:1, 
        status:"pending"
      });
      const handlePageChange = (e,i) =>{
        setFilteredPost({...filteredPost,pageno:i.activePage}) 
      }
      const handleSearch = (e) =>{
        setSearchVal(e.target.value.toLowerCase())
      }
      const handleSearchBtn = (e) =>{
        e.preventDefault();
        console.log(e)
        const SearchResult = allPost.status==='success'?allPost.posts.filter((post)=>{
          if(post.Key.toLowerCase().includes(searchVal)||searchVal===''){
            return post;
          }
        }):[];
        var l = SearchResult.length;
        var ans=0;
        if(l%10) ans++;
          ans+=Math.floor(l/10);
        setFilteredPost({
          post:SearchResult,
          pageno:1,
          totalpage:ans, 
          status:allPost.status})
      }
      useEffect(()=>{
        var l = allPost.posts.length;
        var ans=0;
        if(l%10) ans++;
          ans+=Math.floor(l/10);
        setFilteredPost({
          post:allPost.posts,
          pageno:1,
          totalpage:ans, 
          status:allPost.status})
      },[allPost])
    return (
        <Div>
                <form className='search-cont' onSubmit={handleSearchBtn}>
                    <input type='text' name='search' placeholder='Search' onChange={handleSearch} value={searchVal}/>
                    <button type='submit'><i className="search icon"></i></button>
                </form>
                <div className='show-post'>
                {
                                
                filteredPost.status==="pending"?
                <h3>Searching</h3>
                :(
                (filteredPost.status==="success"&&filteredPost.post.length)?
                    <>
                    <div className="grid-search">
                        { 
                           filteredPost.post.slice((filteredPost.pageno-1)*10,filteredPost.pageno*10).map(post=> (
                            <PostCards 
                                post={post} 
                                key={post.postId} 
                                handleEditClick={handleEditClick}
                            />
                        ))}
                        </div>  
                            <div className="pagination-custom">
                            <Pagination
                                defaultActivePage={filteredPost.pageno}
                                firstItem={null}
                                lastItem={null}
                                ellipsisItem={null}
                                secondary
                                siblingRange={1}
                                totalPages={filteredPost.totalpage}
                                onPageChange={handlePageChange}
                                prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                nextItem={{ content: <Icon name='angle right' />, icon: true }}
                            />
                            </div>
                        </>
                        : <h3 className="message"> No files found for selected filters ...</h3>
                    )
                }
                {/* {
                    filteredPost.length?filteredPost.map((post)=>(
                    )):null
                }     */}
                </div>
        </Div>
    )
}

export default PostsList
