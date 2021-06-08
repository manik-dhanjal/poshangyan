import React, { useState } from "react";
import { Button, Dropdown, Input,Dimmer,Loader } from "semantic-ui-react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import UploadPopup from "../../molecules/upload-popup.admin/upload-popup.component"
import AddPostForm from "../../molecules/add-post-form.admin/add-post-form.component"
import {useFetchPostAgain} from "../../context/post.context"
import Styles from "./add-post.styles"


const AddPost = () => {

  const [updateStatus,setUpdateStatus] = useState({
      status:'',
      message:''
  });
  const [uploadedFiles,setUploadedFiles] = useState([])
  const [uploadedImages,setUploadedImages] = useState([])
  const [postLink,setPostLink] = useState({
      selected:false,
      value:''
  })
  const fetchPostAgain = useFetchPostAgain()


  const handleRadioBtn = (e) => {
      e.persist();
    setPostLink(prevVal =>{
         return {
            ...prevVal,
            selected:(e.target.value == 'link')
        }
    })
  }
  const handleLinkInput = (e) => {
    e.persist();
    setPostLink(prevVal =>{
        return {
           ...prevVal,
           value:e.target.value
       }
   })
  }
  const validateData = (postData) => {
    if(    !postData.label 
        || !postData.themes 
        || !postData.languages 
        || !postData.targetAudience 
        || !postData.source
        || !uploadedImages.length
        || (!uploadedFiles.length&&!postLink.selected)
        || (!postLink.value&&postLink.selected)
    ){
        if(!uploadedFiles.length&&!postLink.selected){
            setUpdateStatus({
                status:"error",
                message:'Please upload files'
            })
        }else{
            setUpdateStatus({
                status:"error",
                message:!uploadedImages.length?'please upload Images':'please fill all the fields'
            })
        }
        return false;
    }   
    return true
  }
  const handleSubmit = async (postData,setAddPostData) =>{
      setUpdateStatus({
          status:"pending",
          message:'request is in process'
      })
     if(!validateData(postData)) return 0;

      const newPostData = {
        ...postData,
        files:uploadedFiles,
        images:uploadedImages,
        link:postLink.value
      }
      try{
        let token = localStorage.getItem("auth-token");
        const response = await axios.post(`/post`,{postData:newPostData},{headers: { "x-auth-token": token },})
        setUploadedFiles([])
        setUploadedImages([])
        setAddPostData({
            label:'',
            themes:'',
            languages:'',
            targetAudience:'',
            source:''
        })
        setPostLink({
            selected:false,
            value:''
        })
        setUpdateStatus({
            status:"success",
            message:'Post is created successfully'
        })
      }
      catch(e){
          console.log(e)
        setUpdateStatus({
            status:"error",
            message:e.message
        })
      }
      fetchPostAgain();
  }



    return (
      <Styles className="root">
        <h2 className="heading-2">Add New Post</h2>
        <hr />
        <div className="upload-section">
          <div className='select-post-type'>
              <div className='radio-group'>
                    <div className='head'>Post Type</div>
                    <div className='input-grp'>
                        <input
                            type='radio'
                            value='file'
                            checked={!postLink.selected}
                            onChange={handleRadioBtn}
                            id='file'
                        />
                        <label htmlFor='file'>File post type</label>
                    </div>
                    <div className='input-grp'>
                        <input
                            type='radio'
                            value='link'
                            checked={postLink.selected}
                            onChange={handleRadioBtn}
                            id='link'
                        />
                        <label htmlFor='link'>Link post type</label>
                    </div>
                </div>
          </div>
          <UploadPopup uploadedFiles={uploadedImages} setUploadedFiles = {setUploadedImages} images={true}>
              <Button type='button' className='upload-btn' color={uploadedImages.length?'green':'red'}>Upload Images</Button>
          </UploadPopup>
          {
             postLink.selected?
              <Input onChange={handleLinkInput} placeholder="Link" name='link'className='link-input' value={postLink.value} required/>
              :<UploadPopup uploadedFiles={uploadedFiles} setUploadedFiles = {setUploadedFiles} images={false}>
                    <Button type='button' className='upload-btn' color={uploadedFiles.length?'green':'red'}>Upload Files</Button>
                </UploadPopup>
          }
    
        </div>
        <AddPostForm handleSubmit={handleSubmit}/>
       
            {
                updateStatus==='pending'?
                    <Dimmer active inverted>
                        <Loader inverted>Uploading</Loader>
                    </Dimmer> 
                    :null
            }       
            <Snackbar open={updateStatus.status=='success'||updateStatus.status=='error'} autoHideDuration={3000} onClose={() => setUpdateStatus({status:'',message:''})}>
                    <Alert onClose={() => setUpdateStatus({status:'',message:''})} severity={updateStatus.status}>
                    {updateStatus.message}
                </Alert>
            </Snackbar>
      </Styles>
    )
}

export default AddPost;
