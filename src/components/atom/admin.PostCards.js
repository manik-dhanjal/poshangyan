import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
const Styles = styled.div`
.content{
  display:flex;
  align-items:center;
  .Content-details{
    margin-left:20px;
  }
  .title{
    color:black;
    font-size:1.2em;
  }
  table{
    margin-top:10px;
    border:0.5px solid grey;
    border-collapse: collapse;
    td{
      padding:5px 10px;
    }
  }
}
.thumbnail{
  width:150px;
  object-fit:contain;
  height:auto;
  img{
    width:100%;
    height:100%;
  }
}
.action-btn{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  button{
    margin-bottom:10px;
    &:last-of-type(){
      margin-bottom:0px;
    }

  }
}
`
const slugCreater = (str) =>{

  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return str.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
const PostCards = ({post,handleEditClick,handleDeleteClick,Modal}) =>{
  let  sumMessage = <p className="sub__message">Are you really want to delete <em className="val_container">{post.label}</em> from <em className="val_container">Post</em> ? </p>
  let message = <p className="_message"> Deleting it means you are going to remove it's existance from the database.</p>
  const mimeString = (files) => {
    const arr = files.reduce((result,file) => {
       return result.find((item) => item === file.mimetype)?result:[...result,file.mimetype];
    },[])
    return `${arr}`
} 
    return(
      <Styles className='single-post'>
        <div className="content">
          <div className = "thumbnail"><img src={post.images[0].location}/></div>
          <div className="Content-details">
            <a className='title' href={`https://poshangyan.niti.gov.in/${slugCreater(post.themes)}/${post.postId}`} target="_blank">{post.label}</a>
            <table className="details-table" border="1">
                    <tbody>
                        <tr>
                            <td className="label">Themes </td>
                            <td className="value">{post.themes} </td>
                        </tr>
                        <tr>
                            <td className="label">Media Type </td>
                            <td className="value">{post.link?'Others':mimeString(post.files)} </td>
                        </tr>
                        <tr>
                            <td className="label">Source </td>
                            <td className="value">{post.source} </td>
                        </tr>
                        <tr>
                            <td className="label">Languages </td>
                            <td className="value">{post.languages} </td>
                        </tr>
                        <tr>
                            <td className="label">Target Audience </td>
                            <td className="value">{post.targetAudience} </td>
                        </tr>
                    </tbody>
                </table>
              </div>
          </div>
        <div className='action-btn'>
          {/* <Modal/> */}
          <button onClick={() => handleDeleteClick(post)} ><i className="trash alternate outline icon"></i></button>
          <button onClick={()=>handleEditClick(post)}><i className="edit outline icon"></i></button>
        </div>
      </Styles>
    )
  }

export default PostCards
