import React,{useEffect,useState} from "react";
import axios from "axios";
import styled from 'styled-components';
import PostsList from '../../../molecules/admin.postsList'
import PostEdit from '../../../molecules/admin.postEdit'

const Div =styled.div`

`
const Posts = () => {
  const [allPost,setAllPost] = useState({posts:[],status:"pending"});
  const [activeView,setActiveView] = useState({view:"find",post:null})
  useEffect(() => {
    (async()=>{
      try{
        const posts = await axios.post("/getFilteredInfo")
        setAllPost({posts:posts.data,status:"success"});
      }
      catch(e){
        console.log('error occured while fetching all post')
        setAllPost({posts:[],status:"failed"});
      }
    })()
  }, [])
const handleEditClick = (post) =>{
  setActiveView({view:"edit",post:post});
}
const handleBackbutton = () =>{
  setActiveView({view:"find",post:null});
}
  return (
    <Div>
      {
        activeView.view==="find"?
          <PostsList allPost={allPost} setAllPost={setAllPost} handleEditClick={handleEditClick}/>
          :<PostEdit post={activeView.post} handleBackbutton={handleBackbutton}/>
      }
    </Div>
  )
}


export default Posts

