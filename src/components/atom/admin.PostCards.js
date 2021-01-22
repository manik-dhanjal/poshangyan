import Axios from 'axios'
import React from 'react'
import axios from 'axios'

const PostCards = ({post,handleEditClick}) =>{
  const Delete = () => {
    console.log({pos:post})
    let passkey = localStorage.getItem('passkey')
    console.log({passkey})
    axios.post(`/posts/${post._id}`,{passkey})
      .then((res)=>{
        console.log(res.data)
      })
      .catch(e=>{
        console.log(e);
      })
  }
    return(
      <div className='single-post'>
        <div className='title'>{post.label}</div >
        <div className='action-btn'>
          <button onClick={Delete} ><i className="trash alternate outline icon"></i></button>
          <button onClick={()=>handleEditClick(post)}><i className="edit outline icon"></i></button>
        </div>
      </div>
    )
  }

export default PostCards
