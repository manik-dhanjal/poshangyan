import React,{useEffect,useState} from "react";
import axios from "axios";
import styled from 'styled-components';
import PostsList from '../../../molecules/admin.postsList'
import PostEdit from '../../../molecules/admin.postEdit'

const Div =styled.div`

`
const Posts = () => {

  const [activeView,setActiveView] = useState({view:"find",post:null})
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
          <PostsList handleEditClick={handleEditClick}/>
          :<PostEdit post={activeView.post} handleBackbutton={handleBackbutton}/>
      }
    </Div>
  )
}


export default Posts

