import Axios from 'axios'
import React from 'react'
import axios from 'axios'

const PostCards = ({post,handleEditClick,handleDeleteClick,Modal}) =>{
  let  sumMessage = <p className="sub__message">Are you really want to delete <em className="val_container">{post.label}</em> from <em className="val_container">Post</em> ? </p>
  let message = <p className="_message"> Deleting it means you are going to remove it's existance from the database.</p>
    return(
      <div className='single-post'>
        <div className='title'>{post.label}</div >
        <div className='action-btn'>
          <Modal/>
          {/* <button onClick={() => handleDeleteClick(post,message,subMessage)} ><i className="trash alternate outline icon"></i></button> */}
          <button onClick={()=>handleEditClick(post)}><i className="edit outline icon"></i></button>
        </div>
      </div>
    )
  }

export default PostCards
