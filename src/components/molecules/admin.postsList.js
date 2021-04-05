import React ,{useState,useEffect}from 'react'
import styled from 'styled-components'
import PostCards from '../atom/admin.PostCards'
import { Icon,Pagination} from "semantic-ui-react"
import DeleteModal from "./admin.delete-modal"
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
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

const PostsList = ({allPost,handleEditClick,setAllPost}) => {
    const [searchVal,setSearchVal] = useState('');
    const [deletePopup,setDeletePopup] = useState({
      state:false,
      post:{}
    })
    const [filteredPost,setFilteredPost] = useState( {
        post:[],
        pageno:1,
        totalpage:1, 
        status:"pending"
      });
      const [snackState,setSnackState] = useState(0);



      const handleDeleteClick = (post) => {
        setDeletePopup({
          post:post,
          status:true
        });
      }
      const handlePageChange = (e,i) =>{
        setFilteredPost({...filteredPost,pageno:i.activePage}) 
      }
   
      const handleSearch = (e) =>{
        setSearchVal(e.target.value.toLowerCase())
      }
      const handleDelete = (post) =>{
        const tempPost = allPost.posts.filter((item)=>{
          if(item._id!==post._id) return item; 
        })
      
        setAllPost({...allPost,posts:tempPost})
      }
      const handleSearchBtn = (e) =>{
        e.preventDefault();
        const SearchResult = allPost.status==='success'?allPost.posts.filter((post)=>{
          if(post.label.toLowerCase().includes(searchVal)||searchVal===''){
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
                <form className='search-cont' onSubmit={handleSearchBtn} >
                    <input type='text' name='search' placeholder='Search' onChange={handleSearch} value={searchVal}/>
                    <button type='submit'><i className="search icon"></i></button>
                </form>
                <DeleteModal setOpen = {setDeletePopup} open={deletePopup} setSnackState={setSnackState} handleDelete={handleDelete}/>
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
                                handleDeleteClick = {handleDeleteClick}
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
                </div>
                <Snackbar open={snackState === 1} autoHideDuration={3000} onClose={()=>setSnackState(0)}>
                  <Alert onClose={()=>setSnackState(0)} severity="success">
                    Creative deleted successfully.
                  </Alert>
                  </Snackbar>
                  <Snackbar open={snackState === 2} autoHideDuration={3000} onClose={()=>setSnackState(0)}>
                    <Alert onClose={()=>setSnackState(0)} severity="error">
                       Please try again later!
                  </Alert>
                </Snackbar>
        </Div>
    )
}

export default PostsList
