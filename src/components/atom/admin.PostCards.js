import React from 'react'

const PostCards = ({post,handleEditClick}) =>{
    return(
      <div className='single-post'>
        <div className='title'>{post.label}</div >
        <div className='action-btn'>
          <button><i className="trash alternate outline icon"></i></button>
          <button onClick={()=>handleEditClick(post)}><i className="edit outline icon"></i></button>
        </div>
      </div>
    )
  }

export default PostCards
