import React ,{useState,useEffect}from 'react'
import styled from 'styled-components'
import PostCards from '../atom/admin.PostCards'
import { Icon,Pagination} from "semantic-ui-react"

const Div = styled.div`
.show-post{
  padding:30px 0px;
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
    const [filteredPost,setFilteredPost] = useState( {
        post:[],
        pageno:1,
        totalpage:1, 
        status:"pending"});
      const handlePageChange = (e,i) =>{
        console.log(i)
        setFilteredPost({...filteredPost,pageno:i.activePage}) 
      }
      useEffect(()=>{
        var l = allPost.posts.length;
        var ans=0;
        if(l%10) ans++;
          ans+=Math.floor(l/10);
    
          console.log(ans)
        setFilteredPost({
          post:allPost.posts,
          pageno:1,
          totalpage:ans, 
          status:allPost.status})
      },[allPost])
    return (
        <Div>
             <div className='Search-cont'>
                    <input type='text' placeholder='Search'/>
                    <button>search</button>
                </div>
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
